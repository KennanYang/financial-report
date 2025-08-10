export interface Company {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  industry: string;
}

export interface FinancialReport {
  id: string;
  companyId: string;
  type: string;
  period: string;
  data: any;
  insights: string[];
  createdAt: Date;
  investmentRating?: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  targetPrice?: number;
  riskLevel?: 'Low' | 'Medium' | 'High';
}

export interface AppState {
  companies: Company[];
  selectedCompany: Company | null;
  reports: FinancialReport[];
  loading: boolean;
  error: string | null;
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

