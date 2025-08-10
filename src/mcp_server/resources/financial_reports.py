"""
财务报告资源

提供财务报告相关的MCP资源。
"""

import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

from mcp.types import (
    ListResourcesRequest,
    ListResourcesResult,
    ReadResourceRequest,
    ReadResourceResult,
    Resource,
    TextContent,
)


class FinancialReportsResource:
    """财务报告资源"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.reports_dir = Path("output")
        self.reports_dir.mkdir(exist_ok=True)
        
    async def list_resources(self, request: ListResourcesRequest) -> ListResourcesResult:
        """列出可用的财务报告资源"""
        resources = []
        
        # 添加示例报告资源
        resources.extend([
            Resource(
                uri="financial://reports/stock_analysis_template",
                name="股票分析报告模板",
                description="标准股票分析报告模板",
                mimeType="text/plain"
            ),
            Resource(
                uri="financial://reports/portfolio_template",
                name="投资组合报告模板",
                description="投资组合分析报告模板",
                mimeType="text/plain"
            ),
            Resource(
                uri="financial://reports/market_analysis_template",
                name="市场分析报告模板",
                description="市场分析报告模板",
                mimeType="text/plain"
            )
        ])
        
        # 添加已生成的报告文件
        if self.reports_dir.exists():
            for report_file in self.reports_dir.glob("*.txt"):
                resources.append(
                    Resource(
                        uri=f"financial://reports/generated/{report_file.name}",
                        name=report_file.stem,
                        description=f"生成的报告文件: {report_file.name}",
                        mimeType="text/plain"
                    )
                )
                
        return ListResourcesResult(resources=resources)
        
    async def read_resource(self, request: ReadResourceRequest) -> ReadResourceResult:
        """读取财务报告资源"""
        try:
            uri = str(request.params.uri)
            
            if uri.startswith("financial://reports/"):
                return await self._read_report_resource(uri)
            else:
                raise ValueError(f"不支持的资源URI: {uri}")
                
        except Exception as e:
            self.logger.error(f"读取资源失败: {e}")
            return ReadResourceResult(
                contents=[
                    TextContent(
                        type="text",
                        text=f"错误: {str(e)}"
                    )
                ]
            )
            
    async def _read_report_resource(self, uri: str) -> ReadResourceResult:
        """读取报告资源"""
        if uri == "financial://reports/stock_analysis_template":
            content = self._get_stock_analysis_template()
        elif uri == "financial://reports/portfolio_template":
            content = self._get_portfolio_template()
        elif uri == "financial://reports/market_analysis_template":
            content = self._get_market_analysis_template()
        elif uri.startswith("financial://reports/generated/"):
            filename = uri.split("/")[-1]
            content = await self._read_generated_report(filename)
        else:
            raise ValueError(f"未知的报告资源: {uri}")
            
        from mcp.types import TextResourceContents
        return ReadResourceResult(
            contents=[
                TextResourceContents(
                    uri=uri,
                    text=content
                )
            ]
        )
        
    def _get_stock_analysis_template(self) -> str:
        """获取股票分析报告模板"""
        return """
股票分析报告模板
====================

基本信息:
- 股票代码: [SYMBOL]
- 公司名称: [COMPANY_NAME]
- 行业: [INDUSTRY]
- 分析日期: [DATE]

价格分析:
- 当前价格: $[CURRENT_PRICE]
- 52周最高: $[52W_HIGH]
- 52周最低: $[52W_LOW]
- 价格变动: $[PRICE_CHANGE] ([PRICE_CHANGE_PCT]%)

财务指标:
- 市值: [MARKET_CAP]
- 市盈率: [PE_RATIO]
- 市净率: [PB_RATIO]
- 股息收益率: [DIVIDEND_YIELD]%

技术分析:
- 趋势: [TREND]
- 支撑位: $[SUPPORT_LEVEL]
- 阻力位: $[RESISTANCE_LEVEL]
- RSI: [RSI]

投资建议: [RECOMMENDATION]

风险提示:
[RISK_WARNINGS]

====================
        """
        
    def _get_portfolio_template(self) -> str:
        """获取投资组合报告模板"""
        return """
投资组合分析报告模板
====================

投资组合信息:
- 组合名称: [PORTFOLIO_NAME]
- 创建日期: [CREATION_DATE]
- 股票数量: [STOCK_COUNT]
- 总价值: $[TOTAL_VALUE]

持仓明细:
[POSITIONS_TABLE]

绩效分析:
- 总收益率: [TOTAL_RETURN]%
- 年化收益率: [ANNUALIZED_RETURN]%
- 波动率: [VOLATILITY]%
- 夏普比率: [SHARPE_RATIO]
- 最大回撤: [MAX_DRAWDOWN]%

风险分析:
- 贝塔系数: [BETA]
- 阿尔法系数: [ALPHA]
- 信息比率: [INFORMATION_RATIO]

资产配置:
[ASSET_ALLOCATION_CHART]

投资建议:
[RECOMMENDATIONS]

====================
        """
        
    def _get_market_analysis_template(self) -> str:
        """获取市场分析报告模板"""
        return """
市场分析报告模板
====================

市场概况:
- 分析日期: [DATE]
- 市场指数: [MARKET_INDEX]
- 指数点位: [INDEX_LEVEL]
- 指数变动: [INDEX_CHANGE]%

行业表现:
[INDUSTRY_PERFORMANCE_TABLE]

市场情绪:
- 恐慌贪婪指数: [FEAR_GREED_INDEX]
- 成交量: [VOLUME]
- 市场宽度: [MARKET_BREADTH]

技术指标:
- 移动平均线: [MOVING_AVERAGES]
- MACD: [MACD_SIGNAL]
- 布林带: [BOLLINGER_BANDS]

宏观经济:
- GDP增长率: [GDP_GROWTH]%
- 通货膨胀率: [INFLATION_RATE]%
- 利率: [INTEREST_RATE]%

市场展望:
[OUTLOOK]

投资策略:
[STRATEGY]

====================
        """
        
    async def _read_generated_report(self, filename: str) -> str:
        """读取已生成的报告文件"""
        report_path = self.reports_dir / filename
        
        if not report_path.exists():
            raise FileNotFoundError(f"报告文件不存在: {filename}")
            
        try:
            with open(report_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            raise IOError(f"读取报告文件失败: {e}") 