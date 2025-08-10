'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { errorMonitor } from '../../lib/error-monitor';
import { AlertCircle, Trash2, Download, RefreshCw, Eye, EyeOff } from 'lucide-react';

export function ErrorMonitorPanel() {
  const [errorLogs, setErrorLogs] = useState<any[]>([]);
  const [errorStats, setErrorStats] = useState<any>({});
  const [showDetails, setShowDetails] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const refreshData = () => {
    setErrorLogs(errorMonitor.getErrorLogs());
    setErrorStats(errorMonitor.getErrorStats());
  };

  useEffect(() => {
    refreshData();
    
    if (autoRefresh) {
      const interval = setInterval(refreshData, 5000); // 每5秒刷新一次
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const clearLogs = () => {
    errorMonitor.clearLogs();
    refreshData();
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(errorLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `error-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (component: string) => {
    const count = errorStats.errorsByComponent?.[component] || 0;
    if (count === 0) return 'bg-green-100 text-green-800';
    if (count <= 2) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          错误监控面板
          <Badge variant="secondary" className="ml-auto">
            {errorStats.totalErrors || 0} 个错误
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 控制按钮 */}
        <div className="flex gap-2">
          <Button onClick={refreshData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            刷新
          </Button>
          <Button onClick={clearLogs} variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-1" />
            清除日志
          </Button>
          <Button onClick={exportLogs} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            导出
          </Button>
          <Button 
            onClick={() => setShowDetails(!showDetails)} 
            variant="outline" 
            size="sm"
          >
            {showDetails ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {showDetails ? '隐藏详情' : '显示详情'}
          </Button>
          <Button 
            onClick={() => setAutoRefresh(!autoRefresh)} 
            variant={autoRefresh ? "default" : "outline"} 
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
            自动刷新
          </Button>
        </div>

        {/* 错误统计 */}
        {Object.keys(errorStats.errorsByComponent || {}).length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">错误统计</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(errorStats.errorsByComponent || {}).map(([component, count]) => (
                <Badge key={component} className={getStatusColor(component)}>
                  {component}: {count}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* 错误日志列表 */}
        {errorLogs.length > 0 ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">错误日志</h4>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {errorLogs.map((log, index) => (
                <div key={log.id} className="p-3 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="text-xs">
                        {log.component}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(log.timestamp).toLocaleString('zh-CN')}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                  <p className="text-sm text-red-600 mb-2">{log.error}</p>
                  {showDetails && log.details && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-gray-600">查看详情</summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              暂无错误日志。系统运行正常！
            </AlertDescription>
          </Alert>
        )}

        {/* 帮助信息 */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div>* 错误监控面板帮助诊断报告生成器的问题</div>
          <div>* 自动刷新每5秒更新一次数据</div>
          <div>* 可以导出错误日志进行分析</div>
          <div>* 建议在遇到问题时查看此面板</div>
        </div>
      </CardContent>
    </Card>
  );
}
