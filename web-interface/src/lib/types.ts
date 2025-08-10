export interface Company {
  id: string;
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
}

export interface AppState {
  companies: Company[];
  selectedCompany: Company | null;
  reports: FinancialReport[];
  loading: boolean;
  error: string | null;
}

export interface FinancialMetrics {
  revenue: number;
  profit: number;
  growth: number;
  marketCap: number;
  peRatio: number;
}

