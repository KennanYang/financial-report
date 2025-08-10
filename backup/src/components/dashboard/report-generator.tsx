'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { useFinancialStore } from '@/store/financial-store';
import { REPORT_TYPES } from '@/lib/constants';
import { FileText, Download, Loader2, Info, Brain } from 'lucide-react';

export function ReportGenerator() {
  const [selectedType, setSelectedType] = useState<string>('financial'); // 设置默认值
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<{
    company: { name: string; symbol: string };
    reportType: string;
    generatedAt: Date;
    investmentRating: string;
    targetPrice: number;
    riskLevel: string;
    timeframe: string;
    aiInsights: string[];
  } | null>(null);
  const { generateReport, selectedCompany, reports } = useFinancialStore();

  // 报告类型说明
  const getReportTypeDescription = (type: string) => {
    switch (type) {
      case 'comprehensive':
        return '综合分析报告：包含财务、技术、行业等多维度分析，适合长期投资决策';
      case 'financial':
        return '财务分析报告：专注于财务指标、盈利能力、资产负债等财务数据深度分析';
      case 'investment':
        return '投资建议报告：基于技术分析和估值模型，提供具体的投资建议和时机';
      default:
        return '';
    }
  };

  const handleGenerateReport = async () => {
    if (!selectedType) {
      console.error('No report type selected');
      return;
    }
    
    setIsGenerating(true);
    try {
      await generateReport(selectedType as 'comprehensive' | 'financial' | 'investment');
      
      // 获取最新生成的报告
      const latestReport = reports[0];
      if (latestReport) {
        setGeneratedReport(latestReport);
      }
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedReport) {
      console.error('No report to download');
      return;
    }
    
    // 生成报告内容
    const reportContent = `
${generatedReport.company.name} (${generatedReport.company.symbol}) - ${REPORT_TYPES.find(t => t.value === generatedReport.reportType)?.label}

生成时间: ${generatedReport.generatedAt.toLocaleString()}
投资评级: ${generatedReport.investmentRating}
目标价格: $${generatedReport.targetPrice.toFixed(2)}
风险等级: ${generatedReport.riskLevel}
时间范围: ${generatedReport.timeframe}

AI洞察:
${generatedReport.aiInsights.map((insight: string, index: number) => `${index + 1}. ${insight}`).join('\n')}
    `.trim();
    
    // 模拟下载功能
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent);
    link.download = `${selectedCompany?.symbol}_${selectedType}_报告.txt`;
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          报告生成器
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">报告类型</label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="选择报告类型" />
            </SelectTrigger>
            <SelectContent>
              {REPORT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* 报告类型说明 */}
          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              {getReportTypeDescription(selectedType)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">目标公司</label>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{selectedCompany?.symbol || 'N/A'}</Badge>
            <span className="text-sm text-muted-foreground">{selectedCompany?.name || '未知公司'}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleGenerateReport} 
            disabled={!selectedType || isGenerating}
            className="flex-1"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                生成{REPORT_TYPES.find(t => t.value === selectedType)?.label}
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleDownload}
            disabled={!generatedReport}
          >
            <Download className="mr-2 h-4 w-4" />
            下载
          </Button>
        </div>

        {generatedReport && (
          <div className="p-4 bg-muted rounded-lg border">
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              最新生成的报告
            </h4>
            <div className="space-y-3">
              {/* 报告基本信息 - 使用网格布局 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">报告类型:</span>
                    <Badge variant="outline" className="text-xs">
                      {REPORT_TYPES.find(t => t.value === generatedReport.reportType)?.label}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">投资评级:</span>
                    <Badge 
                      variant={generatedReport.investmentRating.includes('Buy') ? 'default' : 
                              generatedReport.investmentRating.includes('Sell') ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {generatedReport.investmentRating}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">目标价格:</span>
                    <span className="text-sm font-medium">${generatedReport.targetPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">风险等级:</span>
                    <Badge 
                      variant={generatedReport.riskLevel === 'Low' ? 'default' : 
                              generatedReport.riskLevel === 'High' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {generatedReport.riskLevel}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* AI洞察展示 */}
              <div className="pt-2 border-t">
                <h5 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Brain className="h-3 w-3" />
                  AI洞察分析
                </h5>
                <div className="space-y-2">
                  {generatedReport.aiInsights.map((insight: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-background/50 rounded-md">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-foreground leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          * 报告生成需要1-3分钟，请耐心等待
        </div>
      </CardContent>
    </Card>
  );
}
