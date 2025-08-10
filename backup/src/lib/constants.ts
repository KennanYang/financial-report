import { Company } from './types';

export const COMPANIES: Company[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', industry: 'Consumer Electronics', sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', industry: 'Semiconductors', sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', industry: 'Software', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', industry: 'Internet Services', sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla Inc.', industry: 'Electric Vehicles', sector: 'Automotive' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', industry: 'Semiconductors', sector: 'Technology' },
  { symbol: 'INTC', name: 'Intel Corporation', industry: 'Semiconductors', sector: 'Technology' }
];

export const FINANCIAL_COLORS = {
  primary: '#3B82F6',      // Financial Blue
  secondary: '#10B981',    // Tech Green  
  accent: '#F59E0B',       // Gold
  danger: '#EF4444',       // Red
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Orange
  info: '#3B82F6',         // Blue
  neutral: '#6B7280',      // Gray
  
  // Chart Colors
  chart1: '#3B82F6',
  chart2: '#10B981', 
  chart3: '#F59E0B',
  chart4: '#EF4444',
  chart5: '#8B5CF6',
  chart6: '#06B6D4'
};

export const REPORT_TYPES = [
  { value: 'comprehensive', label: '综合分析报告' },
  { value: 'financial', label: '财务分析报告' },
  { value: 'investment', label: '投资建议报告' }
] as const;

export const TIME_RANGES = [
  { value: '1M', label: '1个月' },
  { value: '3M', label: '3个月' },
  { value: '6M', label: '6个月' },
  { value: '1Y', label: '1年' },
  { value: '3Y', label: '3年' }
] as const;

export const BRAND_CONFIG = {
  name: '恺南AI财务分析',
  shortName: 'KainanAI',
  tagline: 'AI驱动的智能财务洞察',
  copyright: '© 2025 恺南AI实战派. All rights reserved.',
  version: 'v1.0.0'
};
