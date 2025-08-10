export const MOCK_FINANCIAL_DATA = {
  AAPL: {
    revenue: 394328,
    profit: 96995,
    growth: 8.1,
    marketCap: 3000000,
    peRatio: 31.2
  },
  MSFT: {
    revenue: 198270,
    profit: 72420,
    growth: 13.6,
    marketCap: 2800000,
    peRatio: 38.7
  },
  GOOGL: {
    revenue: 307394,
    profit: 76033,
    growth: 8.9,
    marketCap: 1800000,
    peRatio: 23.6
  },
  AMZN: {
    revenue: 574785,
    profit: 30425,
    growth: 11.8,
    marketCap: 1600000,
    peRatio: 52.6
  },
  TSLA: {
    revenue: 96773,
    profit: 15000,
    growth: 18.8,
    marketCap: 800000,
    peRatio: 53.3
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

