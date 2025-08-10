'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { useFinancialStore } from '../../store/financial-store';
import { Brain, Sparkles, Loader2, AlertCircle, Download, RefreshCw, CheckCircle } from 'lucide-react';
import { logError } from '../../lib/error-monitor';

export function AIEnhancedReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [lastSuccessTime, setLastSuccessTime] = useState<Date | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const { selectedCompany, generateReport } = useFinancialStore();

  const MAX_RETRIES = 3;
  const TIMEOUT_DURATION = 30000; // 30秒超时

  // 清除之前的AI结果
  useEffect(() => {
    if (selectedCompany) {
      setAiResult('');
      setError('');
      setRetryCount(0);
    }
  }, [selectedCompany]);

  // 重置错误状态
  const resetError = useCallback(() => {
    setError('');
    setRetryCount(0);
  }, []);

  // 生成AI报告的主要函数
  const generateAIReport = useCallback(async (isRetry = false) => {
    if (!selectedCompany) {
      setError('请先选择一个公司');
      return;
    }

    if (isRetry) {
      setIsRetrying(true);
    } else {
      setIsGenerating(true);
    }
    
    setError('');
    if (!isRetry) {
      setAiResult('');
    }

    try {
      // 创建超时控制器
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

      // 调用AI分析API
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company: selectedCompany.symbol,
          analysisType: 'comprehensive'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`服务器响应错误: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setAiResult(data.analysis || 'AI分析完成，但未返回结果');
      setLastSuccessTime(new Date());
      setRetryCount(0);
      
      // 成功后的状态更新
      if (isRetry) {
        setIsRetrying(false);
      } else {
        setIsGenerating(false);
      }

    } catch (err) {
      console.error('AI分析失败:', err);
      
      // 记录错误到监控系统
      logError('AIEnhancedReportGenerator', err, {
        company: selectedCompany?.symbol,
        analysisType: 'comprehensive',
        isRetry,
        retryCount
      });
      
      let errorMessage = 'AI分析失败，请稍后重试';
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = '请求超时，请检查网络连接或稍后重试';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = '网络连接失败，请检查网络设置';
        } else if (err.message.includes('服务器响应错误')) {
          errorMessage = err.message;
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      
      // 如果不是重试，增加重试计数
      if (!isRetry && retryCount < MAX_RETRIES) {
        setRetryCount(prev => prev + 1);
      }
      
      if (isRetry) {
        setIsRetrying(false);
      } else {
        setIsGenerating(false);
      }
    }
  }, [selectedCompany, retryCount]);

  // 重试函数
  const handleRetry = useCallback(() => {
    if (retryCount < MAX_RETRIES) {
      generateAIReport(true);
    }
  }, [retryCount, generateAIReport]);

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

  // 检查是否可以重试
  const canRetry = retryCount < MAX_RETRIES && !isGenerating && !isRetrying;
  const showRetryButton = error && canRetry;

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

        {/* 状态指示器 */}
        {lastSuccessTime && (
          <div className="flex items-center gap-2 text-xs text-green-600">
            <CheckCircle className="h-3 w-3" />
            上次成功: {lastSuccessTime.toLocaleString('zh-CN')}
          </div>
        )}

        <Button 
          onClick={() => generateAIReport(false)} 
          disabled={!selectedCompany || isGenerating || isRetrying}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              AI分析中...
            </>
          ) : isRetrying ? (
            <>
              <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              重试中... ({retryCount + 1}/{MAX_RETRIES})
            </>
          ) : (
            <>
              <Brain className="mr-2 h-5 w-5" />
              开始AI分析
            </>
          )}
        </Button>

        {/* 错误提示 */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <div>{error}</div>
              {showRetryButton && (
                <div className="flex items-center gap-2">
                  <span className="text-xs">重试次数: {retryCount}/{MAX_RETRIES}</span>
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    size="sm"
                    className="h-6 px-2"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    重试
                  </Button>
                </div>
              )}
              {retryCount >= MAX_RETRIES && (
                <div className="text-xs">
                  已达到最大重试次数，请稍后重试或联系技术支持
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* AI分析结果 */}
        {aiResult && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">AI分析结果</label>
              <div className="flex gap-2">
                <Button
                  onClick={downloadMarkdownReport}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  下载MD报告
                </Button>
                <Button
                  onClick={() => {
                    setAiResult('');
                    setError('');
                    setRetryCount(0);
                  }}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  重新分析
                </Button>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-md text-sm">
              <div className="whitespace-pre-wrap">{aiResult}</div>
            </div>
          </div>
        )}

        {/* 帮助信息 */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <div>* AI分析基于最新的财务数据和市场趋势，支持下载Markdown格式报告</div>
          <div>* 如果遇到问题，可以尝试重试或刷新页面</div>
          <div>* 网络不稳定时建议使用重试功能</div>
        </div>
      </CardContent>
    </Card>
  );
}
