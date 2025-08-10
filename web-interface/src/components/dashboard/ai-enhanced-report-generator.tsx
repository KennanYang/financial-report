'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { useFinancialStore } from '../../store/financial-store';
import { Brain, Sparkles, Loader2, AlertCircle, Download } from 'lucide-react';

export function AIEnhancedReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { selectedCompany, generateReport } = useFinancialStore();

  // 清除之前的AI结果
  useEffect(() => {
    if (selectedCompany) {
      setAiResult('');
      setError('');
    }
  }, [selectedCompany]);

  const generateAIReport = async () => {
    if (!selectedCompany) {
      setError('请先选择一个公司');
      return;
    }

    setIsGenerating(true);
    setError('');
    setAiResult('');

    try {
      // 模拟AI分析API调用
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company: selectedCompany.symbol,
          analysisType: 'comprehensive'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAiResult(data.analysis || 'AI分析完成，但未返回结果');
    } catch (err) {
      console.error('AI分析失败:', err);
      setError(err instanceof Error ? err.message : 'AI分析失败，请稍后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 下载Markdown报告
  const downloadMarkdownReport = () => {
    if (!aiResult || !selectedCompany) return;

    const timestamp = new Date().toLocaleString('zh-CN');
    const markdownContent = `# ${selectedCompany.name} (${selectedCompany.symbol}) AI分析报告

**生成时间**: ${timestamp}  
**分析类型**: 全面AI分析  
**AI模型**: KainanAI-Financial-Analysis-v1.0

---

${aiResult}

---

*本报告由AI系统自动生成，仅供参考，不构成投资建议。投资有风险，入市需谨慎。*`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedCompany.symbol}_AI分析报告_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          AI增强分析
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            AI驱动
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">目标公司</label>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{selectedCompany?.symbol || 'N/A'}</Badge>
            <span className="text-sm text-muted-foreground">
              {selectedCompany?.name || '未知公司'}
            </span>
          </div>
        </div>

        <Button 
          onClick={generateAIReport} 
          disabled={!selectedCompany || isGenerating}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              AI分析中...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-5 w-5" />
              开始AI分析
            </>
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {aiResult && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">AI分析结果</label>
              <Button
                onClick={downloadMarkdownReport}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                下载MD报告
              </Button>
            </div>
            <div className="p-3 bg-muted rounded-md text-sm">
              <div className="whitespace-pre-wrap">{aiResult}</div>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          * AI分析基于最新的财务数据和市场趋势，支持下载Markdown格式报告
        </div>
      </CardContent>
    </Card>
  );
}
