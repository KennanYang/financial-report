"""
公司财报生成工具

提供交互式公司财报生成功能，支持选择或输入公司名称。
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


class CompanyReportGenerator:
    """公司财报生成工具"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.output_dir = Path("output")
        self.output_dir.mkdir(exist_ok=True)
        
        # 预定义的公司列表
        self.companies = {
            "NVDA": {"name": "NVIDIA Corporation", "sector": "Technology", "industry": "Semiconductors"},
            "AAPL": {"name": "Apple Inc.", "sector": "Technology", "industry": "Consumer Electronics"},
            "MSFT": {"name": "Microsoft Corporation", "sector": "Technology", "industry": "Software"},
            "GOOGL": {"name": "Alphabet Inc.", "sector": "Technology", "industry": "Internet Services"},
            "TSLA": {"name": "Tesla Inc.", "sector": "Consumer Discretionary", "industry": "Automobiles"},
            "AMZN": {"name": "Amazon.com Inc.", "sector": "Consumer Discretionary", "industry": "E-commerce"},
            "META": {"name": "Meta Platforms Inc.", "sector": "Technology", "industry": "Social Media"},
            "NFLX": {"name": "Netflix Inc.", "sector": "Communication Services", "industry": "Streaming"},
            "AMD": {"name": "Advanced Micro Devices", "sector": "Technology", "industry": "Semiconductors"},
            "INTC": {"name": "Intel Corporation", "sector": "Technology", "industry": "Semiconductors"}
        }
        
    async def list_tools(self, request: ListToolsRequest) -> ListToolsResult:
        """列出可用的公司财报生成工具"""
        tools = [
            Tool(
                name="list_companies",
                description="列出可用的公司列表",
                inputSchema={
                    "type": "object",
                    "properties": {},
                    "required": []
                }
            ),
            Tool(
                name="generate_company_report",
                description="生成指定公司的财报",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "symbol": {
                            "type": "string",
                            "description": "公司股票代码，如NVDA、AAPL等"
                        },
                        "report_type": {
                            "type": "string",
                            "description": "报告类型：basic, comprehensive, financial_analysis",
                            "default": "comprehensive"
                        },
                        "period": {
                            "type": "string",
                            "description": "报告期间：quarterly, annual, latest",
                            "default": "latest"
                        }
                    },
                    "required": ["symbol"]
                }
            ),
            Tool(
                name="interactive_report_generation",
                description="交互式财报生成，支持选择公司",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "auto_select": {
                            "type": "boolean",
                            "description": "是否自动选择公司（用于演示）",
                            "default": False
                        }
                    },
                    "required": []
                }
            )
        ]
        
        return ListToolsResult(tools=tools)
        
    async def call_tool(self, request: CallToolRequest) -> CallToolResult:
        """调用公司财报生成工具"""
        tool_name = request.params.name
        arguments = request.params.arguments
        
        try:
            if tool_name == "list_companies":
                return await self._list_companies()
            elif tool_name == "generate_company_report":
                return await self._generate_company_report(arguments)
            elif tool_name == "interactive_report_generation":
                return await self._interactive_report_generation(arguments)
            else:
                raise ValueError(f"未知的工具: {tool_name}")
                
        except Exception as e:
            self.logger.error(f"工具调用失败: {e}")
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"错误: {str(e)}"
                    )
                ]
            )
            
    async def _list_companies(self) -> CallToolResult:
        """列出可用的公司"""
        company_list = "可用的公司列表:\n"
        company_list += "=" * 50 + "\n"
        
        for symbol, info in self.companies.items():
            company_list += f"{symbol}: {info['name']}\n"
            company_list += f"    行业: {info['sector']} - {info['industry']}\n\n"
            
        company_list += "使用方法:\n"
        company_list += "1. 使用 generate_company_report 工具\n"
        company_list += "2. 参数: {\"symbol\": \"NVDA\", \"report_type\": \"comprehensive\"}\n"
        
        return CallToolResult(
            content=[
                TextContent(
                    type="text",
                    text=company_list
                )
            ]
        )
        
    async def _generate_company_report(self, arguments: Dict[str, Any]) -> CallToolResult:
        """生成指定公司的财报"""
        symbol = arguments.get("symbol", "").upper()
        report_type = arguments.get("report_type", "comprehensive")
        period = arguments.get("period", "latest")
        
        if symbol not in self.companies:
            available_symbols = ", ".join(self.companies.keys())
            raise ValueError(f"不支持的公司代码: {symbol}。可用代码: {available_symbols}")
            
        company_info = self.companies[symbol]
        
        # 生成财报内容
        report_content = self._create_company_report(symbol, company_info, report_type, period)
        
        # 保存到文件
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"company_report_{symbol}_{timestamp}.txt"
        filepath = self.output_dir / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(report_content)
            
        return CallToolResult(
            content=[
                TextContent(
                    type="text",
                    text=f"公司财报已生成:\n\n{report_content}\n\n报告文件已保存到: {filepath}"
                )
            ]
        )
        
    async def _interactive_report_generation(self, arguments: Dict[str, Any]) -> CallToolResult:
        """交互式财报生成"""
        auto_select = arguments.get("auto_select", False)
        
        if auto_select:
            # 自动选择NVIDIA作为示例
            symbol = "NVDA"
            company_info = self.companies[symbol]
            report_content = self._create_company_report(symbol, company_info, "comprehensive", "latest")
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"interactive_report_{symbol}_{timestamp}.txt"
            filepath = self.output_dir / filename
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(report_content)
                
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"交互式财报生成完成 (自动选择: {symbol}):\n\n{report_content}\n\n报告文件已保存到: {filepath}"
                    )
                ]
            )
        else:
            # 提供交互式选择指南
            guide = """
交互式财报生成指南:
====================

1. 首先使用 list_companies 工具查看可用公司列表
2. 选择您感兴趣的公司代码
3. 使用 generate_company_report 工具生成财报

示例:
- 生成NVIDIA财报: {"symbol": "NVDA", "report_type": "comprehensive"}
- 生成Apple财报: {"symbol": "AAPL", "report_type": "financial_analysis"}
- 生成Tesla财报: {"symbol": "TSLA", "report_type": "basic"}

支持的报告类型:
- basic: 基础财报
- comprehensive: 综合财报
- financial_analysis: 财务分析报告

支持的报告期间:
- latest: 最新数据
- quarterly: 季度报告
- annual: 年度报告
            """
            
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=guide
                    )
                ]
            )
            
    def _create_company_report(self, symbol: str, company_info: Dict[str, str], 
                              report_type: str, period: str) -> str:
        """创建公司财报内容"""
        company_name = company_info["name"]
        sector = company_info["sector"]
        industry = company_info["industry"]
        
        # 模拟财务数据（实际应用中可以从API获取）
        financial_data = self._get_mock_financial_data(symbol)
        
        report = f"""
{company_name} ({symbol}) 财务报告
{'=' * 60}

基本信息:
- 公司名称: {company_name}
- 股票代码: {symbol}
- 行业分类: {sector} - {industry}
- 报告类型: {report_type}
- 报告期间: {period}
- 生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

财务数据摘要:
- 当前股价: ${financial_data['current_price']}
- 市值: ${financial_data['market_cap']}
- 营业收入: ${financial_data['revenue']}
- 净利润: ${financial_data['net_income']}
- 总资产: ${financial_data['total_assets']}
- 总负债: ${financial_data['total_liabilities']}

财务比率分析:
- 资产负债率: {financial_data['debt_ratio']:.2%}
- 净利润率: {financial_data['profit_margin']:.2%}
- 资产收益率: {financial_data['roa']:.2%}
- 股本收益率: {financial_data['roe']:.2%}
- 市盈率: {financial_data['pe_ratio']:.2f}
- 市净率: {financial_data['pb_ratio']:.2f}

业务分析:
{self._get_business_analysis(symbol)}

风险因素:
{self._get_risk_factors(symbol)}

投资建议:
{self._get_investment_recommendation(symbol, financial_data)}

技术分析:
- 52周最高: ${financial_data['52w_high']}
- 52周最低: ${financial_data['52w_low']}
- 50日均线: ${financial_data['ma_50']}
- 200日均线: ${financial_data['ma_200']}
- 相对强弱指数(RSI): {financial_data['rsi']:.2f}

市场表现:
- 年初至今收益率: {financial_data['ytd_return']:.2%}
- 过去一年收益率: {financial_data['1y_return']:.2%}
- 过去三年收益率: {financial_data['3y_return']:.2%}

{'=' * 60}
        """
        
        return report
        
    def _get_mock_financial_data(self, symbol: str) -> Dict[str, Any]:
        """获取模拟财务数据"""
        # 根据公司代码返回不同的模拟数据
        data_templates = {
            "NVDA": {
                "current_price": 450.25,
                "market_cap": "1.1T",
                "revenue": "60.9B",
                "net_income": "29.8B",
                "total_assets": "106.1B",
                "total_liabilities": "25.3B",
                "debt_ratio": 0.24,
                "profit_margin": 0.49,
                "roa": 0.28,
                "roe": 0.89,
                "pe_ratio": 15.1,
                "pb_ratio": 13.4,
                "52w_high": 505.48,
                "52w_low": 138.84,
                "ma_50": 435.20,
                "ma_200": 320.15,
                "rsi": 65.8,
                "ytd_return": 0.85,
                "1y_return": 2.25,
                "3y_return": 4.50
            },
            "AAPL": {
                "current_price": 175.50,
                "market_cap": "2.7T",
                "revenue": "394.3B",
                "net_income": "97.0B",
                "total_assets": "352.8B",
                "total_liabilities": "287.9B",
                "debt_ratio": 0.82,
                "profit_margin": 0.25,
                "roa": 0.27,
                "roe": 1.47,
                "pe_ratio": 28.3,
                "pb_ratio": 35.2,
                "52w_high": 198.23,
                "52w_low": 124.17,
                "ma_50": 172.40,
                "ma_200": 165.80,
                "rsi": 58.2,
                "ytd_return": 0.12,
                "1y_return": 0.41,
                "3y_return": 0.85
            }
        }
        
        # 返回默认数据或特定公司数据
        return data_templates.get(symbol, {
            "current_price": 100.00,
            "market_cap": "100B",
            "revenue": "10B",
            "net_income": "1B",
            "total_assets": "50B",
            "total_liabilities": "20B",
            "debt_ratio": 0.40,
            "profit_margin": 0.10,
            "roa": 0.20,
            "roe": 0.25,
            "pe_ratio": 20.0,
            "pb_ratio": 2.0,
            "52w_high": 120.00,
            "52w_low": 80.00,
            "ma_50": 105.00,
            "ma_200": 95.00,
            "rsi": 50.0,
            "ytd_return": 0.05,
            "1y_return": 0.15,
            "3y_return": 0.30
        })
        
    def _get_business_analysis(self, symbol: str) -> str:
        """获取业务分析"""
        analysis_templates = {
            "NVDA": """
NVIDIA是全球领先的图形处理器(GPU)和人工智能计算平台提供商。

核心业务:
- GPU业务: 游戏、数据中心、专业可视化
- AI计算: 数据中心GPU、自动驾驶、机器人
- 软件平台: CUDA、AI框架、开发工具

增长驱动因素:
- AI革命推动数据中心GPU需求激增
- 游戏市场持续增长
- 自动驾驶和机器人技术发展
- 云计算和边缘计算扩张

竞争优势:
- 技术领先优势明显
- 强大的生态系统和开发者网络
- 专利组合和知识产权保护
- 与主要云服务提供商的深度合作
            """,
            "AAPL": """
Apple是全球领先的消费电子和软件服务公司。

核心业务:
- iPhone: 智能手机市场领导者
- Mac: 个人电脑和笔记本电脑
- iPad: 平板电脑市场
- 服务业务: App Store、iCloud、Apple Music等

增长驱动因素:
- 服务业务收入持续增长
- 新兴市场扩张
- 产品创新和生态系统整合
- 5G技术推动设备升级

竞争优势:
- 强大的品牌价值和用户忠诚度
- 完整的生态系统和用户体验
- 创新能力和设计优势
- 强大的供应链管理
            """
        }
        
        return analysis_templates.get(symbol, """
该公司在各自行业中具有重要地位，拥有稳定的业务模式和增长潜力。
具体业务分析需要根据最新财务数据和市场情况进行详细评估。
        """)
        
    def _get_risk_factors(self, symbol: str) -> str:
        """获取风险因素"""
        return """
主要风险因素:
1. 宏观经济风险: 经济周期波动可能影响需求
2. 竞争风险: 行业竞争加剧可能影响市场份额
3. 技术风险: 技术变革可能影响产品竞争力
4. 监管风险: 政策变化可能影响业务运营
5. 供应链风险: 供应链中断可能影响生产和交付
6. 汇率风险: 汇率波动可能影响国际业务
7. 市场风险: 股票价格波动风险

投资者应充分了解这些风险因素，并根据自身风险承受能力做出投资决策。
        """
        
    def _get_investment_recommendation(self, symbol: str, financial_data: Dict[str, Any]) -> str:
        """获取投资建议"""
        pe_ratio = financial_data.get('pe_ratio', 20)
        debt_ratio = financial_data.get('debt_ratio', 0.4)
        profit_margin = financial_data.get('profit_margin', 0.1)
        
        if pe_ratio < 15 and debt_ratio < 0.3 and profit_margin > 0.2:
            recommendation = "强烈买入"
            reason = "估值合理，财务状况良好，盈利能力强劲"
        elif pe_ratio < 25 and debt_ratio < 0.5 and profit_margin > 0.1:
            recommendation = "买入"
            reason = "估值适中，财务状况稳定，具有投资价值"
        elif pe_ratio < 35 and debt_ratio < 0.7:
            recommendation = "持有"
            reason = "估值偏高，建议观望或适度持有"
        else:
            recommendation = "谨慎"
            reason = "估值较高，风险较大，建议谨慎投资"
            
        return f"""
投资建议: {recommendation}

理由: {reason}

风险提示:
- 本报告仅供参考，不构成投资建议
- 投资有风险，入市需谨慎
- 请根据自身情况做出投资决策
- 建议咨询专业投资顾问
        """
