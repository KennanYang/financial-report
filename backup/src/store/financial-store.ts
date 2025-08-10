import { create } from 'zustand';
import { AppState, Company, FinancialReport } from '../lib/types';
import { COMPANIES } from '../lib/constants';
import { MOCK_FINANCIAL_DATA, MOCK_PRICE_DATA, MOCK_REVENUE_SEGMENTS, MOCK_COMPETITOR_DATA } from '../lib/mock-data';

// 生成AI洞察
const generateAIInsights = (company: Company, reportType: string): string[] => {
  const baseInsights = [
    `${company.name} 在 ${company.industry} 领域保持领先地位，市场份额稳定增长。`,
    `基于AI模型分析，该公司的财务健康状况良好，现金流稳定。`,
    `风险评估显示，当前宏观经济环境对该股票影响有限。`,
    `技术指标表明，股价在近期可能出现上涨趋势。`,
    `建议关注该公司的创新能力和市场扩张战略。`
  ];
  
  // 根据报告类型生成特定的洞察
  const typeSpecificInsights: Record<string, string[]> = {
    comprehensive: [
      `综合分析显示，${company.name} 在多个维度表现均衡，具有长期投资价值。`,
      `公司治理结构完善，管理层执行力强，战略规划清晰。`,
      `行业地位稳固，竞争优势明显，护城河效应显著。`,
      `财务指标健康，各项比率均在行业平均水平之上。`,
      `未来增长潜力巨大，特别是在新兴技术领域。`
    ],
    financial: [
      `财务分析表明，${company.name} 的盈利能力持续改善。`,
      `毛利率和净利率保持在行业领先水平，成本控制有效。`,
      `资产负债结构合理，偿债能力强，财务风险较低。`,
      `现金流充裕，能够支持未来的投资和扩张计划。`,
      `财务透明度高，信息披露及时准确。`
    ],
    investment: [
      `投资分析显示，${company.name} 当前估值相对合理。`,
      `基于DCF模型，公司内在价值高于当前市场价格。`,
      `技术面和基本面共振，买入时机较好。`,
      `风险收益比具有吸引力，适合中长期投资。`,
      `建议分批建仓，关注关键支撑位。`
    ]
  };
  
  const insights = typeSpecificInsights[reportType] || baseInsights;
  return insights.slice(0, 3 + Math.floor(Math.random() * 2));
};

// 生成投资评级
const generateInvestmentRating = (reportType: string): FinancialReport['investmentRating'] => {
  const ratings: FinancialReport['investmentRating'][] = ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'];
  
  // 根据报告类型调整评级权重
  let weights: number[];
  switch (reportType) {
    case 'comprehensive':
      weights = [0.4, 0.35, 0.2, 0.04, 0.01]; // 综合分析偏向正面
      break;
    case 'financial':
      weights = [0.3, 0.4, 0.25, 0.04, 0.01]; // 财务分析更保守
      break;
    case 'investment':
      weights = [0.5, 0.3, 0.15, 0.04, 0.01]; // 投资建议更积极
      break;
    default:
      weights = [0.3, 0.35, 0.25, 0.08, 0.02];
  }
  
  let random = Math.random();
  for (let i = 0; i < ratings.length; i++) {
    random -= weights[i];
    if (random <= 0) return ratings[i];
  }
  return 'Hold';
};

// 生成目标价格
const generateTargetPrice = (currentPrice: number, reportType: string): number => {
  let volatility: number;
  switch (reportType) {
    case 'comprehensive':
      volatility = 0.15; // 综合分析波动较小
      break;
    case 'financial':
      volatility = 0.12; // 财务分析更保守
      break;
    case 'investment':
      volatility = 0.25; // 投资建议波动较大
      break;
    default:
      volatility = 0.2;
  }
  
  // 根据报告类型调整价格方向
  let direction: number;
  switch (reportType) {
    case 'comprehensive':
      direction = 0.05; // 综合分析略微看涨
      break;
    case 'financial':
      direction = 0.02; // 财务分析中性偏涨
      break;
    case 'investment':
      direction = 0.15; // 投资建议更看涨
      break;
    default:
      direction = 0.1;
  }
  
  return currentPrice * (1 + direction + (Math.random() - 0.5) * volatility);
};

// 生成风险等级
const generateRiskLevel = (reportType: string): 'Low' | 'Medium' | 'High' => {
  const riskWeights: Record<string, [number, number, number]> = {
    comprehensive: [0.4, 0.4, 0.2], // 综合分析风险分布均匀
    financial: [0.5, 0.35, 0.15],   // 财务分析偏向低风险
    investment: [0.3, 0.4, 0.3]     // 投资建议风险分布更广
  };
  
  const weights = riskWeights[reportType] || [0.4, 0.4, 0.2];
  const random = Math.random();
  
  if (random < weights[0]) return 'Low';
  if (random < weights[0] + weights[1]) return 'Medium';
  return 'High';
};

export const useFinancialStore = create<AppState>((set, get) => ({
  // 初始状态
  selectedCompany: COMPANIES[0],
  companies: COMPANIES,
  financialData: MOCK_FINANCIAL_DATA,
  priceData: MOCK_PRICE_DATA,
  revenueSegments: MOCK_REVENUE_SEGMENTS,
  competitorData: MOCK_COMPETITOR_DATA,
  reports: [],
  loading: false,
  theme: 'dark',
  timeframe: '1Y',
  
  // 设置选中的公司
  setSelectedCompany: (company: Company) => {
    if (company && company.symbol && typeof company.symbol === 'string') {
      console.log('Setting selected company:', company);
      set({ selectedCompany: company });
    } else {
      console.warn('Invalid company data:', company);
    }
  },
  
  // 设置时间范围
  setTimeframe: (timeframe: AppState['timeframe']) => {
    set({ timeframe });
  },
  
  // 设置主题
  setTheme: (theme: AppState['theme']) => {
    set({ theme });
    // 应用主题到文档
    if (typeof document !== 'undefined') {
      document.documentElement.className = theme;
    }
  },
  
  // 设置加载状态
  setLoading: (loading: boolean) => {
    set({ loading });
  },
  
  // 生成报告
  generateReport: async (reportType: FinancialReport['reportType']) => {
    const { selectedCompany, financialData } = get();
    set({ loading: true });
    
    try {
      // 模拟AI处理时间
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      const metrics = financialData[selectedCompany.symbol];
      if (!metrics) {
        throw new Error(`No financial data for ${selectedCompany.symbol}`);
      }
      
      const newReport: FinancialReport = {
        id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        company: selectedCompany,
        reportType,
        generatedAt: new Date(),
        aiInsights: generateAIInsights(selectedCompany, reportType),
        investmentRating: generateInvestmentRating(reportType),
        targetPrice: generateTargetPrice(metrics.currentPrice, reportType),
        riskLevel: generateRiskLevel(reportType),
        timeframe: get().timeframe
      };
      
      set(state => ({
        reports: [newReport, ...state.reports],
        loading: false
      }));
    } catch (error) {
      console.error('Failed to generate report:', error);
      set({ loading: false });
    }
  },
  
  // 获取当前财务数据
  getCurrentFinancialData: () => {
    const { selectedCompany, financialData } = get();
    if (!selectedCompany?.symbol || !financialData) return null;
    return financialData[selectedCompany.symbol] || null;
  },
  
  // 获取当前价格数据
  getCurrentPriceData: () => {
    const { selectedCompany, priceData } = get();
    if (!selectedCompany?.symbol || !priceData) return null;
    return priceData[selectedCompany.symbol] || null;
  },
  
  // 获取当前收入分段数据
  getCurrentRevenueSegments: () => {
    const { selectedCompany, revenueSegments } = get();
    if (!selectedCompany?.symbol || !revenueSegments) return null;
    return revenueSegments[selectedCompany.symbol] || null;
  },
  
  // 获取当前竞争对手数据
  getCurrentCompetitorData: () => {
    const { selectedCompany, competitorData } = get();
    if (!selectedCompany?.symbol || !competitorData) return null;
    return competitorData[selectedCompany.symbol] || null;
  }
}));
