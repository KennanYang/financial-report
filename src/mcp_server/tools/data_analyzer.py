"""
数据分析工具

提供财务数据分析的MCP工具。
"""

import json
import logging
from typing import Any, Dict, List

import numpy as np
from mcp.types import (
    CallToolRequest,
    CallToolResult,
    ListToolsRequest,
    ListToolsResult,
    TextContent,
    Tool,
)


class DataAnalyzerTool:
    """数据分析工具"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        
    async def list_tools(self, request: ListToolsRequest) -> ListToolsResult:
        """列出可用的数据分析工具"""
        tools = [
            Tool(
                name="calculate_returns",
                description="计算投资收益率",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "prices": {
                            "type": "array",
                            "items": {"type": "number"},
                            "description": "价格序列"
                        },
                        "period": {
                            "type": "string",
                            "description": "计算周期：daily, weekly, monthly",
                            "default": "daily"
                        }
                    },
                    "required": ["prices"]
                }
            ),
            Tool(
                name="calculate_volatility",
                description="计算波动率",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "returns": {
                            "type": "array",
                            "items": {"type": "number"},
                            "description": "收益率序列"
                        },
                        "period": {
                            "type": "string",
                            "description": "年化周期：daily, weekly, monthly",
                            "default": "daily"
                        }
                    },
                    "required": ["returns"]
                }
            ),
            Tool(
                name="calculate_sharpe_ratio",
                description="计算夏普比率",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "returns": {
                            "type": "array",
                            "items": {"type": "number"},
                            "description": "收益率序列"
                        },
                        "risk_free_rate": {
                            "type": "number",
                            "description": "无风险利率",
                            "default": 0.02
                        }
                    },
                    "required": ["returns"]
                }
            )
        ]
        
        return ListToolsResult(tools=tools)
        
    async def call_tool(self, request: CallToolRequest) -> CallToolResult:
        """调用数据分析工具"""
        try:
            # 从params中获取name和arguments
            name = request.params.name
            arguments = request.params.arguments or {}
            
            if name == "calculate_returns":
                return await self._calculate_returns(arguments)
            elif name == "calculate_volatility":
                return await self._calculate_volatility(arguments)
            elif name == "calculate_sharpe_ratio":
                return await self._calculate_sharpe_ratio(arguments)
            else:
                raise ValueError(f"未知的工具: {name}")
                
        except Exception as e:
            self.logger.error(f"数据分析失败: {e}")
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"错误: {str(e)}"
                    )
                ]
            )
            
    async def _calculate_returns(self, arguments: Dict[str, Any]) -> CallToolResult:
        """计算投资收益率"""
        prices = arguments.get("prices", [])
        period = arguments.get("period", "daily")
        
        if len(prices) < 2:
            raise ValueError("价格序列至少需要2个数据点")
            
        # 计算收益率
        prices_array = np.array(prices)
        returns = np.diff(prices_array) / prices_array[:-1]
        
        # 计算统计指标
        total_return = (prices_array[-1] / prices_array[0] - 1) * 100
        avg_return = np.mean(returns) * 100
        max_return = np.max(returns) * 100
        min_return = np.min(returns) * 100
        
        result = {
            "period": period,
            "total_return_pct": round(total_return, 2),
            "avg_return_pct": round(avg_return, 2),
            "max_return_pct": round(max_return, 2),
            "min_return_pct": round(min_return, 2),
            "return_count": len(returns)
        }
        
        return CallToolResult(
            content=[
                TextContent(
                    type="text",
                    text=f"收益率分析结果:\n{json.dumps(result, indent=2, ensure_ascii=False)}"
                )
            ]
        )
        
    async def _calculate_volatility(self, arguments: Dict[str, Any]) -> CallToolResult:
        """计算波动率"""
        returns = arguments.get("returns", [])
        period = arguments.get("period", "daily")
        
        if len(returns) < 2:
            raise ValueError("收益率序列至少需要2个数据点")
            
        returns_array = np.array(returns)
        
        # 计算波动率
        volatility = np.std(returns_array)
        
        # 年化波动率
        period_multipliers = {
            "daily": np.sqrt(252),
            "weekly": np.sqrt(52),
            "monthly": np.sqrt(12)
        }
        
        annualized_volatility = volatility * period_multipliers.get(period, np.sqrt(252))
        
        result = {
            "period": period,
            "volatility": round(volatility * 100, 2),
            "annualized_volatility_pct": round(annualized_volatility * 100, 2),
            "data_points": len(returns)
        }
        
        return CallToolResult(
            content=[
                TextContent(
                    type="text",
                    text=f"波动率分析结果:\n{json.dumps(result, indent=2, ensure_ascii=False)}"
                )
            ]
        )
        
    async def _calculate_sharpe_ratio(self, arguments: Dict[str, Any]) -> CallToolResult:
        """计算夏普比率"""
        returns = arguments.get("returns", [])
        risk_free_rate = arguments.get("risk_free_rate", 0.02)
        
        if len(returns) < 2:
            raise ValueError("收益率序列至少需要2个数据点")
            
        returns_array = np.array(returns)
        
        # 计算平均收益率和波动率
        avg_return = np.mean(returns_array)
        volatility = np.std(returns_array)
        
        if volatility == 0:
            raise ValueError("波动率不能为零")
            
        # 计算夏普比率
        sharpe_ratio = (avg_return - risk_free_rate / 252) / volatility
        
        # 年化夏普比率
        annualized_sharpe = sharpe_ratio * np.sqrt(252)
        
        result = {
            "avg_return_pct": round(avg_return * 100, 2),
            "volatility_pct": round(volatility * 100, 2),
            "risk_free_rate_pct": round(risk_free_rate * 100, 2),
            "sharpe_ratio": round(sharpe_ratio, 3),
            "annualized_sharpe_ratio": round(annualized_sharpe, 3),
            "data_points": len(returns)
        }
        
        return CallToolResult(
            content=[
                TextContent(
                    type="text",
                    text=f"夏普比率分析结果:\n{json.dumps(result, indent=2, ensure_ascii=False)}"
                )
            ]
        ) 