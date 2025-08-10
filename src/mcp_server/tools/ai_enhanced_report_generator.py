"""
AI增强报告生成工具

集成AI模型，提供智能财务分析和报告生成功能。
支持OpenAI和Ollama模型。
"""

import asyncio
import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

from mcp.types import (
    CallToolRequest,
    CallToolResult,
    ListToolsRequest,
    ListToolsResult,
    TextContent,
    Tool,
)

# 导入AI模型相关库
try:
    import openai
    from openai import AsyncOpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False
    logging.warning("OpenAI库未安装，OpenAI功能将不可用")

# 导入Ollama客户端
try:
    from .ollama_client import OllamaClient
    OLLAMA_AVAILABLE = True
except ImportError:
    OLLAMA_AVAILABLE = False
    logging.warning("Ollama客户端未安装，Ollama功能将不可用")


class AIEnhancedReportGenerator:
    """AI增强报告生成工具"""
    
    def __init__(self, api_key: Optional[str] = None, 
                 ollama_url: str = "http://localhost:11434", 
                 ollama_model: str = "deepseek-r1:7b",
                 use_ollama: bool = True):
        self.logger = logging.getLogger(__name__)
        self.output_dir = Path("output")
        self.output_dir.mkdir(exist_ok=True)
        
        # 初始化AI客户端
        self.ai_client = None
        self.ollama_client = None
        
        # 优先使用Ollama
        if use_ollama and OLLAMA_AVAILABLE:
            try:
                self.ollama_client = OllamaClient(base_url=ollama_url, model=ollama_model)
                self.logger.info(f"已初始化Ollama客户端，模型: {ollama_model}")
            except Exception as e:
                self.logger.warning(f"Ollama客户端初始化失败: {e}")
        
        # 如果Ollama不可用，尝试使用OpenAI
        if self.ollama_client is None and OPENAI_AVAILABLE and api_key:
            try:
                self.ai_client = AsyncOpenAI(api_key=api_key)
                self.logger.info("已初始化OpenAI客户端")
            except Exception as e:
                self.logger.warning(f"OpenAI客户端初始化失败: {e}")
        
        if self.ollama_client is None and self.ai_client is None:
            self.logger.warning("AI客户端未初始化，将使用基础功能")
        
        # 预定义的公司列表
        self.companies = {
            "NVDA": {"name": "NVIDIA Corporation", "sector": "Technology", "industry": "Semiconductors"},
            "AAPL": {"name": "Apple Inc.", "sector": "Technology", "industry": "Consumer Electronics"},
            "MSFT": {"name": "Microsoft Corporation", "sector": "Technology", "industry": "Software"},
            "GOOGL": {"name": "Alphabet Inc.", "sector": "Technology", "industry": "Internet Services"},
            "TSLA": {"name": "Tesla Inc.", "sector": "Consumer Discretionary", "industry": "Automobiles"},
        }
    
    async def close(self):
        """关闭AI客户端"""
        if self.ollama_client:
            try:
                await self.ollama_client.close()
                self.logger.info("Ollama客户端已关闭")
            except Exception as e:
                self.logger.error(f"关闭Ollama客户端失败: {e}")
        
        if self.ai_client:
            try:
                await self.ai_client.close()
                self.logger.info("OpenAI客户端已关闭")
            except Exception as e:
                self.logger.error(f"关闭OpenAI客户端失败: {e}")
    
    async def __aenter__(self):
        """异步上下文管理器入口"""
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """异步上下文管理器出口"""
        await self.close()
    
    async def list_tools(self, request: ListToolsRequest) -> ListToolsResult:
        """列出可用的AI增强工具"""
        tools = [
            Tool(
                name="ai_analyze_company",
                description="使用AI分析公司财务状况和投资价值",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "symbol": {
                            "type": "string",
                            "description": "公司股票代码，如NVDA、AAPL等"
                        },
                        "analysis_type": {
                            "type": "string",
                            "description": "分析类型：financial, investment, risk, comprehensive",
                            "default": "comprehensive"
                        }
                    },
                    "required": ["symbol"]
                }
            ),
            Tool(
                name="ai_generate_report",
                description="使用AI生成智能财务报告",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "symbol": {
                            "type": "string",
                            "description": "公司股票代码"
                        },
                        "report_style": {
                            "type": "string",
                            "description": "报告风格：professional, simple, detailed",
                            "default": "professional"
                        }
                    },
                    "required": ["symbol"]
                }
            ),
            Tool(
                name="ai_investment_advice",
                description="使用AI提供投资建议",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "symbol": {
                            "type": "string",
                            "description": "公司股票代码"
                        },
                        "investment_horizon": {
                            "type": "string",
                            "description": "投资期限：short_term, medium_term, long_term",
                            "default": "medium_term"
                        }
                    },
                    "required": ["symbol"]
                }
            )
        ]
        
        return ListToolsResult(tools=tools)
    
    async def call_tool(self, request: CallToolRequest) -> CallToolResult:
        """调用AI增强工具"""
        tool_name = request.params.name
        arguments = request.params.arguments
        
        try:
            if tool_name == "ai_analyze_company":
                return await self._ai_analyze_company(arguments)
            elif tool_name == "ai_generate_report":
                return await self._ai_generate_report(arguments)
            elif tool_name == "ai_investment_advice":
                return await self._ai_investment_advice(arguments)
            else:
                raise ValueError(f"未知的工具: {tool_name}")
                
        except Exception as e:
            self.logger.error(f"AI工具调用失败: {e}")
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"错误: {str(e)}"
                    )
                ]
            )
    
    async def _ai_analyze_company(self, arguments: Dict[str, Any]) -> CallToolResult:
        """使用AI分析公司"""
        symbol = arguments.get("symbol", "").upper()
        analysis_type = arguments.get("analysis_type", "comprehensive")
        
        if symbol not in self.companies:
            available_symbols = ", ".join(self.companies.keys())
            raise ValueError(f"不支持的公司代码: {symbol}。可用代码: {available_symbols}")
        
        if not self.ai_client and not self.ollama_client:
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text="AI功能未启用，请配置OpenAI或Ollama API密钥"
                    )
                ]
            )
        
        # 获取基础财务数据
        financial_data = self._get_mock_financial_data(symbol)
        company_info = self.companies[symbol]
        
        # 构建AI分析提示
        prompt = self._build_analysis_prompt(symbol, company_info, financial_data, analysis_type)
        
        try:
            # 调用AI模型
            ai_analysis = await self._call_ai_model(prompt)
            
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"AI分析结果 - {company_info['name']} ({symbol}):\n\n{ai_analysis}"
                    )
                ]
            )
            
        except Exception as e:
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"AI分析失败: {str(e)}"
                    )
                ]
            )
    
    async def _ai_generate_report(self, arguments: Dict[str, Any]) -> CallToolResult:
        """使用AI生成智能报告"""
        symbol = arguments.get("symbol", "").upper()
        report_style = arguments.get("report_style", "professional")
        
        if symbol not in self.companies:
            available_symbols = ", ".join(self.companies.keys())
            raise ValueError(f"不支持的公司代码: {symbol}。可用代码: {available_symbols}")
        
        if not self.ai_client and not self.ollama_client:
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text="AI功能未启用，请配置OpenAI或Ollama API密钥"
                    )
                ]
            )
        
        # 获取基础数据
        financial_data = self._get_mock_financial_data(symbol)
        company_info = self.companies[symbol]
        
        # 构建报告生成提示
        prompt = self._build_report_prompt(symbol, company_info, financial_data, report_style)
        
        try:
            # 调用AI模型
            ai_report = await self._call_ai_model(prompt)
            
            # 确保报告是markdown格式
            markdown_report = self._ensure_markdown_format(ai_report, symbol, company_info)
            
            # 保存报告为markdown格式
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"ai_report_{symbol}_{timestamp}.md"
            filepath = self.output_dir / filename
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(markdown_report)
            
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"AI生成的财务报告:\n\n{markdown_report}\n\n报告文件已保存到: {filepath}"
                    )
                ]
            )
            
        except Exception as e:
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"AI报告生成失败: {str(e)}"
                    )
                ]
            )
    
    async def _ai_investment_advice(self, arguments: Dict[str, Any]) -> CallToolResult:
        """使用AI提供投资建议"""
        symbol = arguments.get("symbol", "").upper()
        investment_horizon = arguments.get("investment_horizon", "medium_term")
        
        if symbol not in self.companies:
            available_symbols = ", ".join(self.companies.keys())
            raise ValueError(f"不支持的公司代码: {symbol}。可用代码: {available_symbols}")
        
        if not self.ai_client and not self.ollama_client:
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text="AI功能未启用，请配置OpenAI或Ollama API密钥"
                    )
                ]
            )
        
        # 获取基础数据
        financial_data = self._get_mock_financial_data(symbol)
        company_info = self.companies[symbol]
        
        # 构建投资建议提示
        prompt = self._build_investment_prompt(symbol, company_info, financial_data, investment_horizon)
        
        try:
            # 调用AI模型
            ai_advice = await self._call_ai_model(prompt)
            
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"AI投资建议 - {company_info['name']} ({symbol}):\n\n{ai_advice}"
                    )
                ]
            )
            
        except Exception as e:
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"AI投资建议生成失败: {str(e)}"
                    )
                ]
            )
    
    def _get_mock_financial_data(self, symbol: str) -> Dict[str, Any]:
        """获取模拟财务数据"""
        data_templates = {
            "NVDA": {
                "current_price": 450.25,
                "market_cap": "1.1T",
                "revenue": "60.9B",
                "net_income": "29.8B",
                "debt_ratio": 0.24,
                "profit_margin": 0.49,
                "pe_ratio": 15.1,
                "roe": 0.89
            },
            "AAPL": {
                "current_price": 175.50,
                "market_cap": "2.7T",
                "revenue": "394.3B",
                "net_income": "97.0B",
                "debt_ratio": 0.82,
                "profit_margin": 0.25,
                "pe_ratio": 28.3,
                "roe": 1.47
            }
        }
        
        return data_templates.get(symbol, {
            "current_price": 100.00,
            "market_cap": "100B",
            "revenue": "10B",
            "net_income": "1B",
            "debt_ratio": 0.40,
            "profit_margin": 0.10,
            "pe_ratio": 20.0,
            "roe": 0.25
        })
    
    def _build_analysis_prompt(self, symbol: str, company_info: Dict[str, str], 
                              financial_data: Dict[str, Any], analysis_type: str) -> str:
        """构建AI分析提示"""
        return f"""
请分析 {company_info['name']} ({symbol}) 的财务状况和投资价值。

公司信息:
- 公司名称: {company_info['name']}
- 行业: {company_info['sector']} - {company_info['industry']}

财务数据:
- 当前股价: ${financial_data['current_price']}
- 市值: ${financial_data['market_cap']}
- 营业收入: ${financial_data['revenue']}
- 净利润: ${financial_data['net_income']}
- 资产负债率: {financial_data['debt_ratio']:.2%}
- 净利润率: {financial_data['profit_margin']:.2%}
- 市盈率: {financial_data['pe_ratio']:.2f}
- 股本收益率: {financial_data['roe']:.2%}

请根据{analysis_type}分析类型，提供详细的分析报告，包括：
1. 财务状况评估
2. 行业地位分析
3. 竞争优势分析
4. 风险因素评估
5. 投资价值分析

请用专业、客观的语言进行分析。
"""
    
    def _build_report_prompt(self, symbol: str, company_info: Dict[str, str], 
                            financial_data: Dict[str, Any], report_style: str) -> str:
        """构建AI报告生成提示"""
        return f"""
请为 {company_info['name']} ({symbol}) 生成一份{report_style}风格的财务报告。

公司信息:
- 公司名称: {company_info['name']}
- 行业: {company_info['sector']} - {company_info['industry']}

财务数据:
- 当前股价: ${financial_data['current_price']}
- 市值: ${financial_data['market_cap']}
- 营业收入: ${financial_data['revenue']}
- 净利润: ${financial_data['net_income']}
- 资产负债率: {financial_data['debt_ratio']:.2%}
- 净利润率: {financial_data['profit_margin']:.2%}
- 市盈率: {financial_data['pe_ratio']:.2f}
- 股本收益率: {financial_data['roe']:.2%}

请生成一份包含以下内容的{report_style}风格报告：
1. 执行摘要
2. 公司概况
3. 财务分析
4. 业务分析
5. 风险评估
6. 投资建议
7. 结论

请确保报告结构清晰、内容专业、数据准确。
"""
    
    def _build_investment_prompt(self, symbol: str, company_info: Dict[str, str], 
                                financial_data: Dict[str, Any], investment_horizon: str) -> str:
        """构建AI投资建议提示"""
        return f"""
请为 {company_info['name']} ({symbol}) 提供{investment_horizon}投资建议。

公司信息:
- 公司名称: {company_info['name']}
- 行业: {company_info['sector']} - {company_info['industry']}

财务数据:
- 当前股价: ${financial_data['current_price']}
- 市值: ${financial_data['market_cap']}
- 营业收入: ${financial_data['revenue']}
- 净利润: ${financial_data['net_income']}
- 资产负债率: {financial_data['debt_ratio']:.2%}
- 净利润率: {financial_data['profit_margin']:.2%}
- 市盈率: {financial_data['pe_ratio']:.2f}
- 股本收益率: {financial_data['roe']:.2%}

请提供{investment_horizon}投资建议，包括：
1. 投资评级（买入/持有/卖出）
2. 目标价格范围
3. 投资理由
4. 主要风险
5. 投资策略建议

请基于客观分析提供建议，并说明风险。
"""

    async def _call_ai_model(self, prompt: str, system_prompt: str = "") -> str:
        """
        调用AI模型生成响应
        
        Args:
            prompt: 用户提示
            system_prompt: 系统提示
            
        Returns:
            AI生成的响应
        """
        # 优先使用Ollama
        if self.ollama_client:
            try:
                # 检查Ollama服务是否可用
                if await self.ollama_client.health_check():
                    response = await self.ollama_client.generate(
                        prompt=prompt,
                        system_prompt=system_prompt,
                        temperature=0.7,
                        max_tokens=2048
                    )
                    return response
                else:
                    self.logger.warning("Ollama服务不可用，尝试使用OpenAI")
            except Exception as e:
                self.logger.error(f"Ollama调用失败: {e}")
        
        # 如果Ollama不可用，使用OpenAI
        if self.ai_client:
            try:
                response = await self.ai_client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=0.7,
                    max_tokens=2048
                )
                return response.choices[0].message.content
            except Exception as e:
                self.logger.error(f"OpenAI调用失败: {e}")
        
        # 如果AI都不可用，返回模拟响应
        return self._get_mock_ai_response(prompt)
    
    def _get_mock_ai_response(self, prompt: str) -> str:
        """获取模拟AI响应"""
        if "分析" in prompt or "analyze" in prompt.lower():
            return """
## AI分析结果

基于提供的财务数据，我进行了综合分析：

### 财务状况评估
- 公司财务状况良好，盈利能力强劲
- 资产负债率处于合理水平
- 现金流充裕，具备良好的偿债能力

### 投资价值分析
- 当前估值相对合理
- 具有长期投资价值
- 建议关注行业发展趋势

### 风险提示
- 市场波动风险
- 行业竞争风险
- 政策变化风险

*注：这是模拟AI分析结果，实际投资请咨询专业投资顾问。*
"""
        elif "报告" in prompt or "report" in prompt.lower():
            return """
## AI生成的财务报告

### 执行摘要
本报告基于最新的财务数据生成，提供了全面的财务分析。

### 财务表现
- 收入增长稳定
- 利润率保持良好水平
- 现金流状况健康

### 投资建议
基于当前分析，建议投资者：
1. 关注公司基本面
2. 分散投资风险
3. 长期持有策略

*注：这是模拟AI生成的报告，仅供参考。*
"""
        else:
            return "AI分析完成。基于提供的数据，建议投资者进行充分的风险评估和投资决策。"

    def _ensure_markdown_format(self, content: str, symbol: str, company_info: Dict[str, str]) -> str:
        """确保内容是正确的markdown格式"""
        # 如果内容已经是markdown格式，直接返回
        if content.strip().startswith('#'):
            return content
        
        # 否则，转换为markdown格式
        lines = content.split('\n')
        markdown_lines = []
        
        # 添加标题
        markdown_lines.append(f"# {company_info['name']} ({symbol}) 财务报告")
        markdown_lines.append("")
        markdown_lines.append(f"**生成日期：** {datetime.now().strftime('%Y年%m月%d日')}")
        markdown_lines.append("")
        markdown_lines.append("**免责声明：** 本报告基于AI分析生成，仅供参考，不构成投资建议。投资者应在做出任何投资决策之前，进行充分的研究并咨询专业财务顾问。")
        markdown_lines.append("")
        
        # 处理内容
        in_list = False
        for line in lines:
            line = line.strip()
            if not line:
                markdown_lines.append("")
                in_list = False
                continue
            
            # 处理标题
            if line.startswith('**') and line.endswith('**'):
                # 移除粗体标记，添加markdown标题
                title = line.replace('**', '').strip()
                if title.isdigit() or title.startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.')):
                    # 数字标题，转换为二级标题
                    title = title.split('.', 1)[1] if '.' in title else title
                    markdown_lines.append(f"## {title}")
                else:
                    # 其他标题，转换为三级标题
                    markdown_lines.append(f"### {title}")
                markdown_lines.append("")
                in_list = False
            elif line.startswith('* **') and line.endswith('**'):
                # 列表项
                if not in_list:
                    markdown_lines.append("")
                item = line.replace('* **', '- **').replace('**', '**')
                markdown_lines.append(item)
                in_list = True
            elif line.startswith('* '):
                # 普通列表项
                if not in_list:
                    markdown_lines.append("")
                markdown_lines.append(line.replace('* ', '- '))
                in_list = True
            elif '|' in line and ('指标' in line or '---' in line):
                # 表格行
                markdown_lines.append(line)
            elif line.startswith('**') and ':' in line:
                # 键值对
                key, value = line.split(':', 1)
                key = key.replace('**', '').strip()
                value = value.replace('**', '').strip()
                markdown_lines.append(f"**{key}：** {value}")
            else:
                # 普通段落
                if in_list:
                    markdown_lines.append("")
                    in_list = False
                markdown_lines.append(line)
        
        # 添加结尾
        markdown_lines.append("")
        markdown_lines.append("---")
        markdown_lines.append("")
        markdown_lines.append("**请注意：** 此报告基于AI分析生成，数据和分析可能随时间变化，请参考最新的财务报告和市场信息。")
        
        return '\n'.join(markdown_lines)
