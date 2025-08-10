export const MOCK_FINANCIAL_DATA = {
  NVDA: {
    currentPrice: 450.25,
    marketCap: 1100000,
    peRatio: 15.1,
    revenue: 60900,
    profit: 29800,
    eps: 12.15,
    grossMargin: 72.7,
    operatingMargin: 49.0,
    netMargin: 48.9,
    roe: 89.0,
    roa: 45.2,
    debtToEquity: 0.24,
    revenueGrowth: 126.0,
    profitGrowth: 577.3,
    epsGrowth: 586.7
  },
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
  META: {
    currentPrice: 485.58,
    marketCap: 1230000,
    peRatio: 22.8,
    revenue: 134902,
    profit: 39098,
    eps: 15.23,
    grossMargin: 78.9,
    operatingMargin: 34.2,
    netMargin: 29.0,
    roe: 25.6,
    roa: 18.7,
    debtToEquity: 0.45,
    revenueGrowth: 15.8,
    profitGrowth: 69.3,
    epsGrowth: 71.2
  },
  NFLX: {
    currentPrice: 485.09,
    marketCap: 215000,
    peRatio: 45.2,
    revenue: 33723,
    profit: 5407,
    eps: 12.03,
    grossMargin: 42.1,
    operatingMargin: 18.2,
    netMargin: 16.0,
    roe: 28.9,
    roa: 12.3,
    debtToEquity: 0.78,
    revenueGrowth: 6.7,
    profitGrowth: 20.3,
    epsGrowth: 21.8
  },
  AMD: {
    currentPrice: 128.25,
    marketCap: 207000,
    peRatio: 35.8,
    revenue: 23500,
    profit: 854,
    eps: 0.54,
    grossMargin: 46.2,
    operatingMargin: 4.8,
    netMargin: 3.6,
    roe: 2.8,
    roa: 1.8,
    debtToEquity: 0.67,
    revenueGrowth: -4.0,
    profitGrowth: -35.0,
    epsGrowth: -35.2
  },
  INTC: {
    currentPrice: 44.12,
    marketCap: 183000,
    peRatio: 15.6,
    revenue: 63054,
    profit: 1689,
    eps: 0.40,
    grossMargin: 41.8,
    operatingMargin: 3.2,
    netMargin: 2.7,
    roe: 2.1,
    roa: 1.4,
    debtToEquity: 0.45,
    revenueGrowth: -14.0,
    profitGrowth: -79.0,
    epsGrowth: -79.5
  }
};

export const MOCK_PRICE_DATA = {
  NVDA: {
    dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    prices: [350, 380, 400, 420, 450, 480, 460, 450],
    volumes: [1500000, 1800000, 2000000, 2200000, 2500000, 2800000, 2600000, 2500000]
  },
  AAPL: {
    dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    prices: [150, 155, 160, 158, 165, 170, 168, 175],
    volumes: [8000000, 8500000, 9000000, 8800000, 9500000, 10000000, 9800000, 10500000]
  },
  MSFT: {
    dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    prices: [320, 325, 330, 328, 335, 340, 338, 345],
    volumes: [3000000, 3200000, 3400000, 3300000, 3600000, 3800000, 3700000, 4000000]
  },
  GOOGL: {
    dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    prices: [140, 145, 150, 148, 155, 160, 158, 165],
    volumes: [2500000, 2700000, 2900000, 2800000, 3100000, 3300000, 3200000, 3500000]
  },
  TSLA: {
    dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    prices: [200, 210, 220, 215, 225, 235, 230, 240],
    volumes: [1200000, 1300000, 1400000, 1350000, 1500000, 1600000, 1550000, 1700000]
  },
  AMZN: {
    dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    prices: [130, 135, 140, 138, 145, 150, 148, 155],
    volumes: [4000000, 4200000, 4400000, 4300000, 4600000, 4800000, 4700000, 5000000]
  },
  META: {
    dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    prices: [420, 440, 460, 450, 470, 480, 475, 485],
    volumes: [1800000, 1900000, 2000000, 1950000, 2100000, 2200000, 2150000, 2300000]
  },
  NFLX: {
    dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    prices: [420, 430, 440, 435, 450, 460, 455, 485],
    volumes: [800000, 850000, 900000, 880000, 950000, 1000000, 980000, 1100000]
  },
  AMD: {
    dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    prices: [110, 115, 120, 118, 125, 130, 128, 128],
    volumes: [1500000, 1600000, 1700000, 1650000, 1800000, 1900000, 1850000, 1900000]
  },
  INTC: {
    dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08'],
    prices: [40, 42, 44, 43, 45, 46, 45, 44],
    volumes: [2000000, 2100000, 2200000, 2150000, 2300000, 2400000, 2350000, 2400000]
  }
};

export const MOCK_REVENUE_SEGMENTS = {
  NVDA: [
    { name: '数据中心', value: 42800, percentage: 70.3 },
    { name: '游戏', value: 15200, percentage: 25.0 },
    { name: '专业可视化', value: 1600, percentage: 2.6 },
    { name: '汽车', value: 1100, percentage: 1.8 },
    { name: '其他', value: 200, percentage: 0.3 }
  ],
  AAPL: [
    { name: 'iPhone', value: 200000, percentage: 50.7 },
    { name: 'Mac', value: 40000, percentage: 10.1 },
    { name: 'iPad', value: 30000, percentage: 7.6 },
    { name: '服务', value: 80000, percentage: 20.3 },
    { name: '其他', value: 44328, percentage: 11.3 }
  ],
  MSFT: [
    { name: '云服务', value: 80000, percentage: 40.3 },
    { name: 'Office', value: 50000, percentage: 25.2 },
    { name: 'Windows', value: 30000, percentage: 15.1 },
    { name: '游戏', value: 20000, percentage: 10.1 },
    { name: '其他', value: 18270, percentage: 9.3 }
  ],
  GOOGL: [
    { name: '广告', value: 224000, percentage: 72.9 },
    { name: '云服务', value: 35000, percentage: 11.4 },
    { name: '硬件', value: 25000, percentage: 8.1 },
    { name: 'YouTube', value: 15000, percentage: 4.9 },
    { name: '其他', value: 8394, percentage: 2.7 }
  ],
  TSLA: [
    { name: '汽车销售', value: 85000, percentage: 87.8 },
    { name: '监管积分', value: 1500, percentage: 1.6 },
    { name: '服务', value: 8000, percentage: 8.3 },
    { name: '能源', value: 2000, percentage: 2.1 },
    { name: '其他', value: 273, percentage: 0.2 }
  ],
  AMZN: [
    { name: '在线商店', value: 220000, percentage: 38.3 },
    { name: '第三方卖家', value: 120000, percentage: 20.9 },
    { name: 'AWS', value: 80000, percentage: 13.9 },
    { name: '订阅服务', value: 35000, percentage: 6.1 },
    { name: '其他', value: 119785, percentage: 20.8 }
  ],
  META: [
    { name: '广告', value: 131948, percentage: 97.8 },
    { name: '其他收入', value: 2954, percentage: 2.2 }
  ],
  NFLX: [
    { name: '流媒体', value: 33500, percentage: 99.3 },
    { name: 'DVD租赁', value: 223, percentage: 0.7 }
  ],
  AMD: [
    { name: '数据中心', value: 12000, percentage: 51.1 },
    { name: '客户端', value: 8000, percentage: 34.0 },
    { name: '游戏', value: 2500, percentage: 10.6 },
    { name: '嵌入式', value: 1000, percentage: 4.3 }
  ],
  INTC: [
    { name: '客户端计算', value: 30000, percentage: 47.6 },
    { name: '数据中心', value: 20000, percentage: 31.7 },
    { name: '网络和边缘', value: 8000, percentage: 12.7 },
    { name: 'Mobileye', value: 3000, percentage: 4.8 },
    { name: '其他', value: 2054, percentage: 3.2 }
  ]
};

export const MOCK_COMPETITOR_DATA = {
  NVDA: {
    competitors: [
      { name: 'AMD', marketShare: 18.5, revenue: 23500 },
      { name: 'Intel', marketShare: 62.8, revenue: 63054 },
      { name: 'Qualcomm', marketShare: 8.2, revenue: 35000 },
      { name: 'Broadcom', marketShare: 10.5, revenue: 45000 }
    ]
  },
  AAPL: {
    competitors: [
      { name: '三星', marketShare: 20.1, revenue: 180000 },
      { name: '华为', marketShare: 15.2, revenue: 120000 },
      { name: '小米', marketShare: 12.8, revenue: 80000 },
      { name: 'OPPO', marketShare: 8.9, revenue: 60000 }
    ]
  },
  MSFT: {
    competitors: [
      { name: 'AWS', marketShare: 32.1, revenue: 80000 },
      { name: 'Google Cloud', marketShare: 11.2, revenue: 35000 },
      { name: '阿里云', marketShare: 6.8, revenue: 25000 },
      { name: 'IBM', marketShare: 4.2, revenue: 20000 }
    ]
  },
  GOOGL: {
    competitors: [
      { name: 'Meta', marketShare: 23.8, revenue: 134902 },
      { name: 'Amazon', marketShare: 9.8, revenue: 574785 },
      { name: 'Microsoft', marketShare: 6.4, revenue: 198270 },
      { name: 'Twitter', marketShare: 1.2, revenue: 5000 }
    ]
  },
  TSLA: {
    competitors: [
      { name: '比亚迪', marketShare: 15.2, revenue: 80000 },
      { name: '大众', marketShare: 12.8, revenue: 300000 },
      { name: '通用', marketShare: 8.9, revenue: 150000 },
      { name: '福特', marketShare: 7.2, revenue: 120000 }
    ]
  },
  AMZN: {
    competitors: [
      { name: '阿里巴巴', marketShare: 8.9, revenue: 120000 },
      { name: '京东', marketShare: 3.2, revenue: 80000 },
      { name: 'eBay', marketShare: 2.1, revenue: 15000 },
      { name: '沃尔玛', marketShare: 1.8, revenue: 600000 }
    ]
  },
  META: {
    competitors: [
      { name: 'TikTok', marketShare: 18.9, revenue: 80000 },
      { name: 'YouTube', marketShare: 15.2, revenue: 15000 },
      { name: 'Snapchat', marketShare: 8.7, revenue: 5000 },
      { name: 'Twitter', marketShare: 3.2, revenue: 5000 }
    ]
  },
  NFLX: {
    competitors: [
      { name: 'Disney+', marketShare: 18.2, revenue: 25000 },
      { name: 'Amazon Prime', marketShare: 15.8, revenue: 35000 },
      { name: 'HBO Max', marketShare: 12.3, revenue: 20000 },
      { name: 'Hulu', marketShare: 8.9, revenue: 15000 }
    ]
  },
  AMD: {
    competitors: [
      { name: 'Intel', marketShare: 62.8, revenue: 63054 },
      { name: 'NVIDIA', marketShare: 18.5, revenue: 60900 },
      { name: 'Qualcomm', marketShare: 8.2, revenue: 35000 },
      { name: 'Broadcom', marketShare: 10.5, revenue: 45000 }
    ]
  },
  INTC: {
    competitors: [
      { name: 'AMD', marketShare: 18.5, revenue: 23500 },
      { name: 'NVIDIA', marketShare: 18.5, revenue: 60900 },
      { name: 'Qualcomm', marketShare: 8.2, revenue: 35000 },
      { name: 'Broadcom', marketShare: 10.5, revenue: 45000 }
    ]
  }
};

