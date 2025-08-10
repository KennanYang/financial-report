'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useFinancialStore } from '@/store/financial-store';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function FinancialMetrics() {
  const { getCurrentFinancialData, selectedCompany } = useFinancialStore();
  const metrics = getCurrentFinancialData();

  if (!metrics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>财务指标</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            暂无财务数据
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  const getGrowthIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getGrowthColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>财务指标</span>
          <Badge variant="outline">{selectedCompany?.symbol}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 价格和市值 */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">当前价格</div>
            <div className="text-2xl font-bold">{formatCurrency(metrics.currentPrice)}</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">市值</div>
            <div className="text-2xl font-bold">{formatCurrency(metrics.marketCap)}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">P/E比率</div>
            <div className="text-2xl font-bold">{metrics.peRatio.toFixed(1)}</div>
          </div>

          {/* 收入指标 */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">收入</div>
            <div className="text-xl font-semibold">{formatCurrency(metrics.revenue)}</div>
            <div className={`flex items-center text-sm ${getGrowthColor(metrics.revenueGrowth)}`}>
              {getGrowthIcon(metrics.revenueGrowth)}
              <span className="ml-1">{formatPercentage(metrics.revenueGrowth)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">净利润</div>
            <div className="text-xl font-semibold">{formatCurrency(metrics.netIncome)}</div>
            <div className={`flex items-center text-sm ${getGrowthColor(metrics.netIncomeGrowth)}`}>
              {getGrowthIcon(metrics.netIncomeGrowth)}
              <span className="ml-1">{formatPercentage(metrics.netIncomeGrowth)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">每股收益</div>
            <div className="text-xl font-semibold">{formatCurrency(metrics.eps)}</div>
            <div className={`flex items-center text-sm ${getGrowthColor(metrics.epsGrowth)}`}>
              {getGrowthIcon(metrics.epsGrowth)}
              <span className="ml-1">{formatPercentage(metrics.epsGrowth)}</span>
            </div>
          </div>

          {/* 利润率 */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">毛利率</div>
            <div className="text-xl font-semibold">{formatPercentage(metrics.grossMargin)}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">营业利润率</div>
            <div className="text-xl font-semibold">{formatPercentage(metrics.operatingMargin)}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">净利润率</div>
            <div className="text-xl font-semibold">{formatPercentage(metrics.netMargin)}</div>
          </div>

          {/* 财务健康度 */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">ROE</div>
            <div className="text-xl font-semibold">{formatPercentage(metrics.roe)}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">ROA</div>
            <div className="text-xl font-semibold">{formatPercentage(metrics.roa)}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">负债权益比</div>
            <div className="text-xl font-semibold">{metrics.debtToEquity.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
