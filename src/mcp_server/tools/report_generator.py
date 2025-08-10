"""
报告生成工具

提供生成财务报告的MCP工具。
"""

import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

from mcp.types import (
    CallToolRequest,
    CallToolResult,
    ListToolsRequest,
    ListToolsResult,
    TextContent,
    Tool,
)


class ReportGeneratorTool:
    """报告生成工具"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.output_dir = Path("output")
        self.output_dir.mkdir(exist_ok=True)
        
    async def list_tools(self, request: ListToolsRequest) -> ListToolsResult:
        """列出可用的报告生成工具"""
        tools = [
            Tool(
                name="generate_stock_report",
                description="生成股票分析报告",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "symbol": {
                            "type": "string",
                            "description": "股票代码"
                        },
                        "report_type": {
                            "type": "string",
                            "description": "报告类型：basic, detailed",
                            "default": "basic"
                        }
                    },
                    "required": ["symbol"]
                }
            ),
            Tool(
                name="generate_portfolio_report",
                description="生成投资组合报告",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "symbols": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "股票代码列表"
                        }
                    },
                    "required": ["symbols"]
                }
            )
        ]
        
        return ListToolsResult(tools=tools)
        
    async def call_tool(self, request: CallToolRequest) -> CallToolResult:
        """调用报告生成工具"""
        try:
            # 从params中获取name和arguments
            name = request.params.name
            arguments = request.params.arguments or {}
            
            if name == "generate_stock_report":
                return await self._generate_stock_report(arguments)
            elif name == "generate_portfolio_report":
                return await self._generate_portfolio_report(arguments)
            else:
                raise ValueError(f"未知的工具: {name}")
                
        except Exception as e:
            self.logger.error(f"报告生成失败: {e}")
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"错误: {str(e)}"
                    )
                ]
            )
            
    async def _generate_stock_report(self, arguments: Dict[str, Any]) -> CallToolResult:
        """生成股票分析报告"""
        symbol = arguments.get("symbol")
        report_type = arguments.get("report_type", "basic")
        
        if not symbol:
            raise ValueError("股票代码不能为空")
            
        # 生成示例报告数据
        report_data = {
            "symbol": symbol,
            "report_type": report_type,
            "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "current_price": 150.25,
            "price_change": 2.50,
            "price_change_pct": 1.69,
            "recommendation": "持有"
        }
        
        # 生成报告内容
        report_content = f"""
股票分析报告
====================

股票代码: {report_data['symbol']}
报告类型: {report_data['report_type']}
生成时间: {report_data['generated_at']}

价格信息:
- 当前价格: ${report_data['current_price']}
- 价格变动: ${report_data['price_change']} ({report_data['price_change_pct']}%)

投资建议: {report_data['recommendation']}

====================
        """
        
        # 保存报告文件
        filename = f"stock_report_{symbol}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        report_path = self.output_dir / filename
        
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report_content)
            
        return CallToolResult(
            content=[
                TextContent(
                    type="text",
                    text=f"股票报告已生成:\n\n{report_content}\n\n报告文件已保存到: {report_path}"
                )
            ]
        )
        
    async def _generate_portfolio_report(self, arguments: Dict[str, Any]) -> CallToolResult:
        """生成投资组合报告"""
        symbols = arguments.get("symbols", [])
        
        if not symbols:
            raise ValueError("股票代码列表不能为空")
            
        # 生成投资组合数据
        portfolio_data = {
            "symbols": symbols,
            "total_value": 100000,
            "daily_return": 0.85,
            "total_return": 12.5
        }
        
        # 生成报告内容
        report_content = f"""
投资组合报告
====================

生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

投资组合:
{chr(10).join([f"- {symbol}" for symbol in portfolio_data['symbols']])}

绩效摘要:
- 总价值: ${portfolio_data['total_value']}
- 日收益率: {portfolio_data['daily_return']}%
- 总收益率: {portfolio_data['total_return']}%

====================
        """
        
        # 保存报告文件
        filename = f"portfolio_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        report_path = self.output_dir / filename
        
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report_content)
            
        return CallToolResult(
            content=[
                TextContent(
                    type="text",
                    text=f"投资组合报告已生成:\n\n{report_content}\n\n报告文件已保存到: {report_path}"
                )
            ]
        ) 