export const MOCK_FINANCIAL_DATA = {
  AAPL: {
    currentPrice: 175.43,
    marketCap: 2750000,
    peRatio: 28.4,
    revenue: 394328,
    profit: 96995,
    eps: 6.16,
    grossMargin: 43.3,
    operatingMargin: 29.0,
    netMargin: 24.6,
    roe: 15.6,
    roa: 27.5,
    debtToEquity: 1.54,
    revenueGrowth: 8.1,
    profitGrowth: 5.8,
    epsGrowth: 5.9
  },
  MSFT: {
    currentPrice: 345.67,
    marketCap: 2800000,
    peRatio: 38.7,
    revenue: 198270,
    profit: 72420,
    eps: 8.93,
    grossMargin: 68.2,
    operatingMargin: 41.5,
    netMargin: 36.5,
    roe: 39.8,
    roa: 18.9,
    debtToEquity: 0.89,
    revenueGrowth: 13.6,
    profitGrowth: 12.8,
    epsGrowth: 13.2
  },
  GOOGL: {
    currentPrice: 165.89,
    marketCap: 1800000,
    peRatio: 23.6,
    revenue: 307394,
    profit: 76033,
    eps: 3.22,
    grossMargin: 56.8,
    operatingMargin: 24.7,
    netMargin: 24.7,
    roe: 25.3,
    roa: 15.8,
    debtToEquity: 0.12,
    revenueGrowth: 8.9,
    profitGrowth: 7.2,
    epsGrowth: 7.8
  },
  AMZN: {
    currentPrice: 155.23,
    marketCap: 1600000,
    peRatio: 52.6,
    revenue: 574785,
    profit: 30425,
    eps: 2.89,
    grossMargin: 45.2,
    operatingMargin: 5.3,
    netMargin: 5.3,
    roe: 12.8,
    roa: 4.2,
    debtToEquity: 1.23,
    revenueGrowth: 11.8,
    profitGrowth: 18.5,
    epsGrowth: 19.2
  },
  TSLA: {
    currentPrice: 240.56,
    marketCap: 800000,
    peRatio: 53.3,
    revenue: 96773,
    profit: 15000,
    eps: 4.51,
    grossMargin: 18.2,
    operatingMargin: 15.5,
    netMargin: 15.5,
    roe: 23.4,
    roa: 8.9,
    debtToEquity: 0.67,
    revenueGrowth: 18.8,
    profitGrowth: 25.6,
    epsGrowth: 26.8
  }
};

export const MOCK_PRICE_DATA = {
  AAPL: [150, 155, 160, 158, 165, 170, 168, 175],
  MSFT: [320, 325, 330, 328, 335, 340, 338, 345],
  GOOGL: [140, 145, 150, 148, 155, 160, 158, 165],
  AMZN: [130, 135, 140, 138, 145, 150, 148, 155],
  TSLA: [200, 210, 220, 215, 225, 235, 230, 240]
};

export const MOCK_REVENUE_SEGMENTS = {
  AAPL: [
    { name: 'iPhone', value: 200000 },
    { name: 'Mac', value: 40000 },
    { name: 'iPad', value: 30000 },
    { name: '服务', value: 80000 },
    { name: '其他', value: 44328 }
  ],
  MSFT: [
    { name: '云服务', value: 80000 },
    { name: 'Office', value: 50000 },
    { name: 'Windows', value: 30000 },
    { name: '游戏', value: 20000 },
    { name: '其他', value: 18270 }
  ]
};

export const MOCK_COMPETITOR_DATA = {
  AAPL: [
    { name: '三星', marketShare: 20.1, growth: 2.3 },
    { name: '华为', marketShare: 15.2, growth: -5.1 },
    { name: '小米', marketShare: 12.8, growth: 8.7 },
    { name: 'OPPO', marketShare: 8.9, growth: 4.2 }
  ],
  MSFT: [
    { name: 'AWS', marketShare: 32.1, growth: 12.3 },
    { name: 'Google Cloud', marketShare: 11.2, growth: 15.7 },
    { name: '阿里云', marketShare: 6.8, growth: 18.2 },
    { name: 'IBM', marketShare: 4.2, growth: 2.1 }
  ]
};

