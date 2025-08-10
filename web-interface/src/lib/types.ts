export interface Company {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  industry: string;
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
  timeframe: string;
}

export interface AppState {
  companies: Company[];
  selectedCompany: Company;
  financialData: Record<string, FinancialMetrics>;
  priceData: Record<string, PriceData>;
  revenueSegments: Record<string, RevenueSegment[]>;
  competitorData: Record<string, CompetitorData>;
  reports: FinancialReport[];
  loading: boolean;
  theme: 'light' | 'dark';
  timeframe: '1M' | '3M' | '6M' | '1Y' | '2Y' | '5Y' | 'ALL';
  
  // Actions
  setSelectedCompany: (company: Company) => void;
  setTimeframe: (timeframe: AppState['timeframe']) => void;
  setTheme: (theme: AppState['theme']) => void;
  setLoading: (loading: boolean) => void;
  generateReport: (reportType: FinancialReport['reportType']) => Promise<void>;
  getCurrentFinancialData: () => FinancialMetrics | null;
  getCurrentPriceData: () => PriceData | null;
  getCurrentRevenueSegments: () => RevenueSegment[] | null;
  getCurrentCompetitorData: () => CompetitorData | null;
}

export interface FinancialMetrics {
  currentPrice: number;
  marketCap: number;
  peRatio: number;
  revenue: number;
  profit: number;
  eps: number;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  roe: number;
  roa: number;
  debtToEquity: number;
  revenueGrowth: number;
  profitGrowth: number;
  epsGrowth: number;
}

export interface PriceData {
  dates: string[];
  prices: number[];
  volumes: number[];
}

export interface RevenueSegment {
  name: string;
  value: number;
  percentage: number;
}

export interface CompetitorData {
  competitors: Array<{
    name: string;
    marketShare: number;
    revenue: number;
  }>;
}

