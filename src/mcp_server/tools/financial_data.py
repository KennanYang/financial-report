"""
财务数据获取工具

提供获取股票价格、财务指标等数据的MCP工具。
"""

import asyncio
import json
import logging
from typing import Any, Dict, List, Optional

import pandas as pd
import yfinance as yf
from mcp.types import (
    CallToolRequest,
    CallToolResult,
    ListToolsRequest,
    ListToolsResult,
    TextContent,
    Tool,
)


class FinancialDataTool:
    """财务数据获取工具"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        
    async def list_tools(self, request: ListToolsRequest) -> ListToolsResult:
        """列出可用的财务数据工具"""
        tools = [
            Tool(
                name="get_stock_price",
                description="获取股票实时价格和历史价格数据",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "symbol": {
                            "type": "string",
                            "description": "股票代码，如AAPL、GOOGL"
                        },
                        "period": {
                            "type": "string",
                            "description": "时间周期：1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max",
                            "default": "1mo"
                        },
                        "interval": {
                            "type": "string", 
                            "description": "数据间隔：1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo",
                            "default": "1d"
                        }
                    },
                    "required": ["symbol"]
                }
            ),
            Tool(
                name="get_financial_info",
                description="获取公司财务信息",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "symbol": {
                            "type": "string",
                            "description": "股票代码"
                        },
                        "info_type": {
                            "type": "string",
                            "description": "信息类型：info, financials, balance_sheet, cashflow",
                            "default": "info"
                        }
                    },
                    "required": ["symbol"]
                }
            ),
            Tool(
                name="get_market_data",
                description="获取市场数据",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "symbols": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "股票代码列表"
                        },
                        "data_type": {
                            "type": "string",
                            "description": "数据类型：price, volume, market_cap",
                            "default": "price"
                        }
                    },
                    "required": ["symbols"]
                }
            )
        ]
        
        return ListToolsResult(tools=tools)
        
    async def call_tool(self, request: CallToolRequest) -> CallToolResult:
        """调用财务数据工具"""
        try:
            # 从params中获取name和arguments
            name = request.params.name
            arguments = request.params.arguments or {}
            
            if name == "get_stock_price":
                return await self._get_stock_price(arguments)
            elif name == "get_financial_info":
                return await self._get_financial_info(arguments)
            elif name == "get_market_data":
                return await self._get_market_data(arguments)
            else:
                raise ValueError(f"未知的工具: {name}")
                
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
            
    async def _get_stock_price(self, arguments: Dict[str, Any]) -> CallToolResult:
        """获取股票价格数据"""
        symbol = arguments.get("symbol")
        period = arguments.get("period", "1mo")
        interval = arguments.get("interval", "1d")
        
        if not symbol:
            raise ValueError("股票代码不能为空")
            
        # 使用yfinance获取数据
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period=period, interval=interval)
        
        if hist.empty:
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"未找到股票 {symbol} 的数据"
                    )
                ]
            )
            
        # 格式化数据
        data_summary = {
            "symbol": symbol,
            "period": period,
            "interval": interval,
            "data_points": len(hist),
            "latest_price": float(hist['Close'].iloc[-1]),
            "price_change": float(hist['Close'].iloc[-1] - hist['Close'].iloc[0]),
            "price_change_pct": float((hist['Close'].iloc[-1] / hist['Close'].iloc[0] - 1) * 100),
            "high": float(hist['High'].max()),
            "low": float(hist['Low'].min()),
            "volume": int(hist['Volume'].sum())
        }
        
        return CallToolResult(
            content=[
                TextContent(
                    type="text",
                    text=f"股票价格数据:\n{json.dumps(data_summary, indent=2, ensure_ascii=False)}"
                )
            ]
        )
        
    async def _get_financial_info(self, arguments: Dict[str, Any]) -> CallToolResult:
        """获取财务信息"""
        symbol = arguments.get("symbol")
        info_type = arguments.get("info_type", "info")
        
        if not symbol:
            raise ValueError("股票代码不能为空")
            
        ticker = yf.Ticker(symbol)
        
        try:
            if info_type == "info":
                info = ticker.info
                # 提取关键信息
                key_info = {
                    "公司名称": info.get("longName", "N/A"),
                    "行业": info.get("industry", "N/A"),
                    "市值": info.get("marketCap", "N/A"),
                    "市盈率": info.get("trailingPE", "N/A"),
                    "市净率": info.get("priceToBook", "N/A"),
                    "股息收益率": info.get("dividendYield", "N/A"),
                    "52周最高": info.get("fiftyTwoWeekHigh", "N/A"),
                    "52周最低": info.get("fiftyTwoWeekLow", "N/A")
                }
                
                return CallToolResult(
                    content=[
                        TextContent(
                            type="text",
                            text=f"公司信息:\n{json.dumps(key_info, indent=2, ensure_ascii=False)}"
                        )
                    ]
                )
            else:
                return CallToolResult(
                    content=[
                        TextContent(
                            type="text",
                            text=f"暂不支持 {info_type} 类型的信息获取"
                        )
                    ]
                )
                
        except Exception as e:
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"获取财务信息失败: {str(e)}"
                    )
                ]
            )
            
    async def _get_market_data(self, arguments: Dict[str, Any]) -> CallToolResult:
        """获取市场数据"""
        symbols = arguments.get("symbols", [])
        data_type = arguments.get("data_type", "price")
        
        if not symbols:
            raise ValueError("股票代码列表不能为空")
            
        results = []
        
        for symbol in symbols:
            try:
                ticker = yf.Ticker(symbol)
                info = ticker.info
                
                if data_type == "price":
                    current_price = info.get("currentPrice", "N/A")
                    results.append({
                        "symbol": symbol,
                        "current_price": current_price
                    })
                elif data_type == "volume":
                    volume = info.get("volume", "N/A")
                    results.append({
                        "symbol": symbol,
                        "volume": volume
                    })
                elif data_type == "market_cap":
                    market_cap = info.get("marketCap", "N/A")
                    results.append({
                        "symbol": symbol,
                        "market_cap": market_cap
                    })
                    
            except Exception as e:
                results.append({
                    "symbol": symbol,
                    "error": str(e)
                })
                
        return CallToolResult(
            content=[
                TextContent(
                    type="text",
                    text=f"市场数据:\n{json.dumps(results, indent=2, ensure_ascii=False)}"
                )
            ]
        ) 