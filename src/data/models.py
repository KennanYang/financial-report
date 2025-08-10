"""
财务数据模型

定义财务数据的结构和类型。
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Dict, List, Optional, Any


@dataclass
class StockPrice:
    """股票价格数据"""
    symbol: str
    date: datetime
    open: float
    high: float
    low: float
    close: float
    volume: int
    adj_close: Optional[float] = None


@dataclass
class FinancialMetrics:
    """财务指标"""
    symbol: str
    date: datetime
    market_cap: Optional[float] = None
    pe_ratio: Optional[float] = None
    pb_ratio: Optional[float] = None
    dividend_yield: Optional[float] = None
    eps: Optional[float] = None
    revenue: Optional[float] = None
    net_income: Optional[float] = None


@dataclass
class CompanyInfo:
    """公司信息"""
    symbol: str
    name: str
    industry: str
    sector: str
    country: str
    website: Optional[str] = None
    description: Optional[str] = None


@dataclass
class FinancialData:
    """财务数据容器"""
    symbol: str
    prices: List[StockPrice]
    metrics: Optional[FinancialMetrics] = None
    company_info: Optional[CompanyInfo] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """转换为字典格式"""
        return {
            "symbol": self.symbol,
            "prices": [
                {
                    "date": price.date.isoformat(),
                    "open": price.open,
                    "high": price.high,
                    "low": price.low,
                    "close": price.close,
                    "volume": price.volume,
                    "adj_close": price.adj_close
                }
                for price in self.prices
            ],
            "metrics": {
                "market_cap": self.metrics.market_cap,
                "pe_ratio": self.metrics.pe_ratio,
                "pb_ratio": self.metrics.pb_ratio,
                "dividend_yield": self.metrics.dividend_yield,
                "eps": self.metrics.eps,
                "revenue": self.metrics.revenue,
                "net_income": self.metrics.net_income
            } if self.metrics else None,
            "company_info": {
                "name": self.company_info.name,
                "industry": self.company_info.industry,
                "sector": self.company_info.sector,
                "country": self.company_info.country,
                "website": self.company_info.website,
                "description": self.company_info.description
            } if self.company_info else None
        }


@dataclass
class PortfolioData:
    """投资组合数据"""
    name: str
    symbols: List[str]
    weights: List[float]
    total_value: float
    created_date: datetime
    last_updated: datetime
    
    def to_dict(self) -> Dict[str, Any]:
        """转换为字典格式"""
        return {
            "name": self.name,
            "symbols": self.symbols,
            "weights": self.weights,
            "total_value": self.total_value,
            "created_date": self.created_date.isoformat(),
            "last_updated": self.last_updated.isoformat()
        }


@dataclass
class MarketData:
    """市场数据"""
    index_symbol: str
    index_name: str
    current_level: float
    change: float
    change_pct: float
    volume: int
    date: datetime
    
    def to_dict(self) -> Dict[str, Any]:
        """转换为字典格式"""
        return {
            "index_symbol": self.index_symbol,
            "index_name": self.index_name,
            "current_level": self.current_level,
            "change": self.change,
            "change_pct": self.change_pct,
            "volume": self.volume,
            "date": self.date.isoformat()
        } 