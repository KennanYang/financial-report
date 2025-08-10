'use client';

import { useEffect } from 'react';
import { CompanySelector } from '@/components/common/company-selector';
import { TimeRangeSelector } from '@/components/common/time-range-selector';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { FinancialMetrics } from '@/components/dashboard/financial-metrics';
import { ReportGenerator } from '@/components/dashboard/report-generator';
import { AIEnhancedReportGenerator } from '@/components/dashboard/ai-enhanced-report-generator';
import { AIStatusMonitor } from '@/components/dashboard/ai-status-monitor';
import { useFinancialStore } from '@/store/financial-store';
import { BRAND_CONFIG } from '@/lib/constants';

export default function HomePage() {
  const { companies, selectedCompany, setSelectedCompany } = useFinancialStore();

  // 确保有默认选中的公司
  useEffect(() => {
    if (companies.length > 0 && !selectedCompany) {
      setSelectedCompany(companies[0]);
    }
  }, [companies, selectedCompany, setSelectedCompany]);

  // 如果公司数据还没加载，显示加载状态
  if (!companies.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">正在加载财务数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 头部 */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">
                {BRAND_CONFIG.name}
              </h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                {BRAND_CONFIG.tagline}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <CompanySelector />
              <TimeRangeSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧列 */}
          <div className="lg:col-span-2 space-y-8">
            <FinancialMetrics />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ReportGenerator />
              <AIEnhancedReportGenerator />
            </div>
          </div>

          {/* 右侧列 */}
          <div className="space-y-6">
            <AIStatusMonitor />
            
            {/* 快速操作 */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">快速操作</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">当前公司</div>
                  <div className="text-muted-foreground">
                    {selectedCompany?.symbol} - {selectedCompany?.name}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">行业</div>
                  <div className="text-muted-foreground">
                    {selectedCompany?.industry}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">板块</div>
                  <div className="text-muted-foreground">
                    {selectedCompany?.sector}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>{BRAND_CONFIG.copyright}</p>
            <p className="mt-1">版本 {BRAND_CONFIG.version}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
