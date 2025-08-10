export interface Company {
  symbol: string;
  name: string;
  industry: string;
  sector: string;
}

export interface FinancialMetrics {
  currentPrice: number;
  marketCap: number;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  operatingIncome: number;
  totalDebt: number;
  totalAssets: number;
  totalEquity: number;
  freeCashFlow: number;
  
  // Financial Ratios
  peRatio: number;
  pbRatio: number;
  debtToEquity: number;
  roe: number; // Return on Equity
  roa: number; // Return on Assets
  grossMargin: number;
  netMargin: number;
  operatingMargin: number;
  currentRatio: number;
  quickRatio: number;
  
  // Growth Metrics
  revenueGrowth: number;
  netIncomeGrowth: number;
  epsGrowth: number;
  
  // Per Share Data
  eps: number;
  bookValuePerShare: number;
  dividendPerShare: number;
  dividendYield: number;
}

export interface PriceData {
  date: string;
  price: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

export interface RevenueSegment {
  segment: string;
  value: number;
  percentage: number;
  growth: number;
}

export interface CompetitorData {
  symbol: string;
  name: string;
  marketCap: number;
  peRatio: number;
  revenue: number;
  netMargin: number;
  roe: number;
}

export interface FinancialReport {
  id: string;
  company: Company;
  reportType: 'comprehensive' | 'financial' | 'investment';
  generatedAt: Date;
  aiInsights: string[];
  investmentRating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  targetPrice: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  timeframe: '1M' | '3M' | '6M' | '1Y' | '3Y';
}

export type Theme = 'light' | 'dark';

export interface AppState {
  selectedCompany: Company;
  companies: Company[];
  financialData: Record<string, FinancialMetrics>;
  priceData: Record<string, PriceData[]>;
  revenueSegments: Record<string, RevenueSegment[]>;
  competitorData: Record<string, CompetitorData[]>;
  reports: FinancialReport[];
  loading: boolean;
  theme: Theme;
  timeframe: '1M' | '3M' | '6M' | '1Y' | '3Y';
  
  // Actions
  setSelectedCompany: (company: Company) => void;
  setTimeframe: (timeframe: '1M' | '3M' | '6M' | '1Y' | '3Y') => void;
  setTheme: (theme: Theme) => void;
  setLoading: (loading: boolean) => void;
  generateReport: (reportType: FinancialReport['reportType']) => Promise<void>;
  getCurrentFinancialData: () => FinancialMetrics | null;
  getCurrentPriceData: () => PriceData[] | null;
  getCurrentRevenueSegments: () => RevenueSegment[] | null;
  getCurrentCompetitorData: () => CompetitorData[] | null;
}
