import { FinancialMetrics, PriceData, RevenueSegment, CompetitorData } from './types';

// 模拟财务数据
export const MOCK_FINANCIAL_DATA: Record<string, FinancialMetrics> = {
  AAPL: {
    currentPrice: 175.43,
    marketCap: 2750000000000,
    revenue: 394328000000,
    netIncome: 96995000000,
    grossProfit: 170782000000,
    operatingIncome: 114301000000,
    totalDebt: 95965000000,
    totalAssets: 352755000000,
    totalEquity: 62146000000,
    freeCashFlow: 107148000000,
    peRatio: 28.4,
    pbRatio: 44.3,
    debtToEquity: 1.54,
    roe: 15.6,
    roa: 27.5,
    grossMargin: 43.3,
    netMargin: 24.6,
    operatingMargin: 29.0,
    currentRatio: 1.07,
    quickRatio: 0.95,
    revenueGrowth: 8.1,
    netIncomeGrowth: 5.8,
    epsGrowth: 5.9,
    eps: 6.16,
    bookValuePerShare: 3.96,
    dividendPerShare: 0.96,
    dividendYield: 0.55
  },
  NVDA: {
    currentPrice: 875.28,
    marketCap: 2150000000000,
    revenue: 60922000000,
    netIncome: 29760000000,
    grossProfit: 46568000000,
    operatingIncome: 32972000000,
    totalDebt: 9500000000,
    totalAssets: 65728000000,
    totalEquity: 42960000000,
    freeCashFlow: 27000000000,
    peRatio: 72.3,
    pbRatio: 50.1,
    debtToEquity: 0.22,
    roe: 69.3,
    roa: 45.3,
    grossMargin: 76.4,
    netMargin: 48.9,
    operatingMargin: 54.1,
    currentRatio: 2.85,
    quickRatio: 2.45,
    revenueGrowth: 125.9,
    netIncomeGrowth: 581.6,
    epsGrowth: 586.0,
    eps: 12.09,
    bookValuePerShare: 17.46,
    dividendPerShare: 0.16,
    dividendYield: 0.02
  },
  MSFT: {
    currentPrice: 415.22,
    marketCap: 3080000000000,
    revenue: 236582000000,
    netIncome: 83383000000,
    grossProfit: 167389000000,
    operatingIncome: 101053000000,
    totalDebt: 67000000000,
    totalAssets: 470558000000,
    totalEquity: 206223000000,
    freeCashFlow: 63500000000,
    peRatio: 37.0,
    pbRatio: 14.9,
    debtToEquity: 0.32,
    roe: 40.4,
    roa: 17.7,
    grossMargin: 70.8,
    netMargin: 35.2,
    operatingMargin: 42.7,
    currentRatio: 1.75,
    quickRatio: 1.65,
    revenueGrowth: 13.9,
    netIncomeGrowth: 18.8,
    epsGrowth: 20.1,
    eps: 11.22,
    bookValuePerShare: 27.85,
    dividendPerShare: 3.00,
    dividendYield: 0.72
  },
  GOOGL: {
    currentPrice: 142.56,
    marketCap: 1800000000000,
    revenue: 307000000000,
    netIncome: 69000000000,
    grossProfit: 175000000000,
    operatingIncome: 84000000000,
    totalDebt: 12000000000,
    totalAssets: 400000000000,
    totalEquity: 280000000000,
    freeCashFlow: 65000000000,
    peRatio: 26.1,
    pbRatio: 6.4,
    debtToEquity: 0.04,
    roe: 24.6,
    roa: 17.3,
    grossMargin: 57.0,
    netMargin: 22.5,
    operatingMargin: 27.4,
    currentRatio: 2.85,
    quickRatio: 2.65,
    revenueGrowth: 8.7,
    netIncomeGrowth: 23.1,
    epsGrowth: 24.8,
    eps: 5.47,
    bookValuePerShare: 22.15,
    dividendPerShare: 0.00,
    dividendYield: 0.00
  },
  TSLA: {
    currentPrice: 178.50,
    marketCap: 568000000000,
    revenue: 96800000000,
    netIncome: 15000000000,
    grossProfit: 17500000000,
    operatingIncome: 8900000000,
    totalDebt: 2000000000,
    totalAssets: 106000000000,
    totalEquity: 62000000000,
    freeCashFlow: 2000000000,
    peRatio: 37.9,
    pbRatio: 9.2,
    debtToEquity: 0.03,
    roe: 24.2,
    roa: 14.2,
    grossMargin: 18.1,
    netMargin: 15.5,
    operatingMargin: 9.2,
    currentRatio: 1.95,
    quickRatio: 1.75,
    revenueGrowth: 18.8,
    netIncomeGrowth: 19.2,
    epsGrowth: 20.1,
    eps: 4.71,
    bookValuePerShare: 19.45,
    dividendPerShare: 0.00,
    dividendYield: 0.00
  },
  AMD: {
    currentPrice: 156.78,
    marketCap: 250000000000,
    revenue: 23000000000,
    netIncome: 1950000000,
    grossProfit: 10500000000,
    operatingIncome: 4000000000,
    totalDebt: 3000000000,
    totalAssets: 67000000000,
    totalEquity: 55000000000,
    freeCashFlow: 3500000000,
    peRatio: 128.2,
    pbRatio: 4.5,
    debtToEquity: 0.05,
    roe: 3.5,
    roa: 2.9,
    grossMargin: 45.7,
    netMargin: 8.5,
    operatingMargin: 17.4,
    currentRatio: 2.15,
    quickRatio: 1.85,
    revenueGrowth: 4.2,
    netIncomeGrowth: -27.8,
    epsGrowth: -28.5,
    eps: 1.22,
    bookValuePerShare: 34.85,
    dividendPerShare: 0.00,
    dividendYield: 0.00
  },
  INTC: {
    currentPrice: 32.45,
    marketCap: 130000000000,
    revenue: 63000000000,
    netIncome: 8000000000,
    grossProfit: 25000000000,
    operatingIncome: 2000000000,
    totalDebt: 45000000000,
    totalAssets: 190000000000,
    totalEquity: 105000000000,
    freeCashFlow: -8000000000,
    peRatio: 16.3,
    pbRatio: 1.2,
    debtToEquity: 0.43,
    roe: 7.6,
    roa: 4.2,
    grossMargin: 39.7,
    netMargin: 12.7,
    operatingMargin: 3.2,
    currentRatio: 1.45,
    quickRatio: 1.25,
    revenueGrowth: -14.0,
    netIncomeGrowth: -35.2,
    epsGrowth: -34.8,
    eps: 1.99,
    bookValuePerShare: 26.85,
    dividendPerShare: 1.46,
    dividendYield: 4.50
  }
};

// 模拟价格数据
export const MOCK_PRICE_DATA: Record<string, PriceData[]> = {
  AAPL: [
    { date: '2024-01-01', price: 185.64, volume: 123456789, high: 186.50, low: 184.20, open: 184.80, close: 185.64 },
    { date: '2024-01-02', price: 187.15, volume: 134567890, high: 188.00, low: 186.50, open: 186.60, close: 187.15 },
    { date: '2024-01-03', price: 186.20, volume: 145678901, high: 187.50, low: 185.80, open: 187.20, close: 186.20 }
  ],
  NVDA: [
    { date: '2024-01-01', price: 485.09, volume: 234567890, high: 486.00, low: 483.50, open: 484.20, close: 485.09 },
    { date: '2024-01-02', price: 487.25, volume: 245678901, high: 488.50, low: 486.00, open: 486.50, close: 487.25 },
    { date: '2024-01-03', price: 486.80, volume: 256789012, high: 487.80, low: 485.50, open: 487.30, close: 486.80 }
  ],
  MSFT: [
    { date: '2024-01-01', price: 374.69, volume: 345678901, high: 375.50, low: 373.20, open: 373.80, close: 374.69 },
    { date: '2024-01-02', price: 376.15, volume: 356789012, high: 377.00, low: 375.50, open: 375.60, close: 376.15 },
    { date: '2024-01-03', price: 375.20, volume: 367890123, high: 376.50, low: 374.80, open: 376.20, close: 375.20 }
  ],
  GOOGL: [
    { date: '2024-01-01', price: 140.25, volume: 456789012, high: 141.00, low: 139.50, open: 139.80, close: 140.25 },
    { date: '2024-01-02', price: 141.75, volume: 467890123, high: 142.50, low: 140.50, open: 140.60, close: 141.75 },
    { date: '2024-01-03', price: 142.56, volume: 478901234, high: 143.00, low: 141.80, open: 142.20, close: 142.56 }
  ],
  TSLA: [
    { date: '2024-01-01', price: 175.20, volume: 567890123, high: 176.00, low: 174.50, open: 174.80, close: 175.20 },
    { date: '2024-01-02', price: 176.80, volume: 578901234, high: 177.50, low: 175.50, open: 175.60, close: 176.80 },
    { date: '2024-01-03', price: 178.50, volume: 589012345, high: 179.00, low: 177.80, open: 178.20, close: 178.50 }
  ],
  AMD: [
    { date: '2024-01-01', price: 154.30, volume: 678901234, high: 155.00, low: 153.50, open: 153.80, close: 154.30 },
    { date: '2024-01-02', price: 155.60, volume: 689012345, high: 156.50, low: 154.50, open: 154.60, close: 155.60 },
    { date: '2024-01-03', price: 156.78, volume: 690123456, high: 157.00, low: 155.80, open: 156.20, close: 156.78 }
  ],
  INTC: [
    { date: '2024-01-01', price: 31.80, volume: 789012345, high: 32.00, low: 31.50, open: 31.60, close: 31.80 },
    { date: '2024-01-02', price: 32.15, volume: 790123456, high: 32.50, low: 31.80, open: 31.90, close: 32.15 },
    { date: '2024-01-03', price: 32.45, volume: 801234567, high: 32.80, low: 32.20, open: 32.30, close: 32.45 }
  ]
};

// 模拟收入分段数据
export const MOCK_REVENUE_SEGMENTS: Record<string, RevenueSegment[]> = {
  AAPL: [
    { segment: 'iPhone', value: 203480000000, percentage: 51.6, growth: 6.2 },
    { segment: 'Mac', value: 29100000000, percentage: 7.4, growth: -3.8 },
    { segment: 'iPad', value: 28300000000, percentage: 7.2, growth: -3.4 },
    { segment: 'Wearables', value: 39800000000, percentage: 10.1, growth: 7.2 },
    { segment: 'Services', value: 85100000000, percentage: 21.6, growth: 9.0 }
  ],
  NVDA: [
    { segment: 'Data Center', value: 47500000000, percentage: 78.0, growth: 217.0 },
    { segment: 'Gaming', value: 10400000000, percentage: 17.1, growth: 15.0 },
    { segment: 'Professional Visualization', value: 1500000000, percentage: 2.5, growth: 1.0 },
    { segment: 'Automotive', value: 1520000000, percentage: 2.5, growth: 15.0 }
  ],
  MSFT: [
    { segment: 'Productivity & Business', value: 75000000000, percentage: 31.7, growth: 12.0 },
    { segment: 'Intelligent Cloud', value: 87000000000, percentage: 36.8, growth: 17.0 },
    { segment: 'More Personal Computing', value: 75000000000, percentage: 31.7, growth: 12.0 }
  ],
  GOOGL: [
    { segment: 'Google Search & Other', value: 175000000000, percentage: 57.0, growth: 8.5 },
    { segment: 'YouTube Ads', value: 40000000000, percentage: 13.0, growth: 12.0 },
    { segment: 'Google Network', value: 18000000000, percentage: 5.9, growth: 3.2 },
    { segment: 'Google Cloud', value: 35000000000, percentage: 11.4, growth: 25.0 },
    { segment: 'Other Bets', value: 4000000000, percentage: 1.3, growth: 15.0 }
  ],
  TSLA: [
    { segment: 'Automotive Sales', value: 85000000000, percentage: 87.8, growth: 18.5 },
    { segment: 'Automotive Leasing', value: 3000000000, percentage: 3.1, growth: 12.0 },
    { segment: 'Energy Generation & Storage', value: 6000000000, percentage: 6.2, growth: 25.0 },
    { segment: 'Services & Other', value: 3000000000, percentage: 3.1, growth: 22.0 }
  ],
  AMD: [
    { segment: 'Data Center', value: 12000000000, percentage: 52.2, growth: 15.0 },
    { segment: 'Client', value: 7000000000, percentage: 30.4, growth: -5.0 },
    { segment: 'Gaming', value: 2500000000, percentage: 10.9, growth: 8.0 },
    { segment: 'Embedded', value: 1500000000, percentage: 6.5, growth: 12.0 }
  ],
  INTC: [
    { segment: 'Client Computing', value: 25000000000, percentage: 39.7, growth: -15.0 },
    { segment: 'Data Center & AI', value: 20000000000, percentage: 31.7, growth: -20.0 },
    { segment: 'Network & Edge', value: 8000000000, percentage: 12.7, growth: -10.0 },
    { segment: 'Mobileye', value: 2000000000, percentage: 3.2, growth: 5.0 },
    { segment: 'Intel Foundry', value: 8000000000, percentage: 12.7, growth: -5.0 }
  ]
};

// 模拟竞争对手数据
export const MOCK_COMPETITOR_DATA: Record<string, CompetitorData[]> = {
  AAPL: [
    { symbol: 'SAMSUNG', name: 'Samsung Electronics', marketCap: 350000000000, peRatio: 15.2, revenue: 200000000000, netMargin: 12.5, roe: 18.2 },
    { symbol: 'XIAOMI', name: 'Xiaomi Corporation', marketCap: 45000000000, peRatio: 25.8, revenue: 35000000000, netMargin: 5.2, roe: 12.8 },
    { symbol: 'OPPO', name: 'OPPO Electronics', marketCap: 30000000000, peRatio: 22.1, revenue: 28000000000, netMargin: 4.8, roe: 11.5 }
  ],
  NVDA: [
    { symbol: 'AMD', name: 'Advanced Micro Devices', marketCap: 250000000000, peRatio: 45.2, revenue: 23000000000, netMargin: 8.5, roe: 15.2 },
    { symbol: 'INTC', name: 'Intel Corporation', marketCap: 180000000000, peRatio: 18.5, revenue: 63000000000, netMargin: 12.8, roe: 8.5 },
    { symbol: 'QCOM', name: 'Qualcomm Inc.', marketCap: 180000000000, peRatio: 22.1, revenue: 35000000000, netMargin: 25.2, roe: 18.5 }
  ],
  MSFT: [
    { symbol: 'GOOGL', name: 'Alphabet Inc.', marketCap: 1800000000000, peRatio: 28.5, revenue: 307000000000, netMargin: 22.5, roe: 25.8 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', marketCap: 1800000000000, peRatio: 65.2, revenue: 574000000000, netMargin: 5.2, roe: 12.5 },
    { symbol: 'META', name: 'Meta Platforms Inc.', marketCap: 1200000000000, peRatio: 25.8, revenue: 134000000000, netMargin: 28.5, roe: 35.2 }
  ],
  GOOGL: [
    { symbol: 'META', name: 'Meta Platforms Inc.', marketCap: 1200000000000, peRatio: 25.8, revenue: 134000000000, netMargin: 28.5, roe: 35.2 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', marketCap: 1800000000000, peRatio: 65.2, revenue: 574000000000, netMargin: 5.2, roe: 12.5 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', marketCap: 3080000000000, peRatio: 37.0, revenue: 236582000000, netMargin: 35.2, roe: 40.4 }
  ],
  TSLA: [
    { symbol: 'BYD', name: 'BYD Company Limited', marketCap: 80000000000, peRatio: 22.5, revenue: 85000000000, netMargin: 8.5, roe: 15.2 },
    { symbol: 'NIO', name: 'NIO Inc.', marketCap: 15000000000, peRatio: 0, revenue: 8000000000, netMargin: -15.2, roe: -25.8 },
    { symbol: 'XPEV', name: 'XPeng Inc.', marketCap: 8000000000, peRatio: 0, revenue: 4000000000, netMargin: -18.5, roe: -30.2 }
  ],
  AMD: [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', marketCap: 2150000000000, peRatio: 72.3, revenue: 60922000000, netMargin: 48.9, roe: 69.3 },
    { symbol: 'INTC', name: 'Intel Corporation', marketCap: 130000000000, peRatio: 16.3, revenue: 63000000000, netMargin: 12.7, roe: 7.6 },
    { symbol: 'QCOM', name: 'Qualcomm Inc.', marketCap: 180000000000, peRatio: 22.1, revenue: 35000000000, netMargin: 25.2, roe: 18.5 }
  ],
  INTC: [
    { symbol: 'AMD', name: 'Advanced Micro Devices', marketCap: 250000000000, peRatio: 128.2, revenue: 23000000000, netMargin: 8.5, roe: 3.5 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', marketCap: 2150000000000, peRatio: 72.3, revenue: 60922000000, netMargin: 48.9, roe: 69.3 },
    { symbol: 'TSM', name: 'Taiwan Semiconductor', marketCap: 600000000000, peRatio: 25.8, revenue: 70000000000, netMargin: 35.2, roe: 28.5 }
  ]
};
