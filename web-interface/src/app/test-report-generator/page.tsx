'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import { Loader2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function TestReportGenerator() {
  const [testResults, setTestResults] = useState<Array<{
    test: string;
    status: 'pending' | 'running' | 'success' | 'error';
    message: string;
    details?: any;
  }>>([
    { test: '网络连接测试', status: 'pending', message: '等待测试' },
    { test: 'API端点测试', status: 'pending', message: '等待测试' },
    { test: 'AI分析功能测试', status: 'pending', message: '等待测试' },
    { test: '错误处理测试', status: 'pending', message: '等待测试' },
  ]);

  const runAllTests = async () => {
    // 重置测试状态
    setTestResults(prev => prev.map(test => ({ ...test, status: 'pending', message: '等待测试' })));
    
    // 测试1: 网络连接
    await runTest(0, '网络连接测试', async () => {
      try {
        const response = await fetch('/api/ai-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company: 'AAPL', analysisType: 'comprehensive' })
        });
        return { success: true, message: '网络连接正常', details: { status: response.status } };
      } catch (error) {
        return { success: false, message: '网络连接失败', details: { error: error.message } };
      }
    });

    // 测试2: API端点
    await runTest(1, 'API端点测试', async () => {
      try {
        const response = await fetch('/api/ai-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company: 'AAPL', analysisType: 'comprehensive' })
        });
        
        if (response.ok) {
          const data = await response.json();
          return { 
            success: true, 
            message: 'API端点正常', 
            details: { 
              status: response.status, 
              hasAnalysis: !!data.analysis,
              model: data.model 
            } 
          };
        } else {
          return { 
            success: false, 
            message: `API端点错误: ${response.status}`, 
            details: { status: response.status } 
          };
        }
      } catch (error) {
        return { success: false, message: 'API端点测试失败', details: { error: error.message } };
      }
    });

    // 测试3: AI分析功能
    await runTest(2, 'AI分析功能测试', async () => {
      try {
        const startTime = Date.now();
        const response = await fetch('/api/ai-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company: 'AAPL', analysisType: 'comprehensive' })
        });
        
        if (response.ok) {
          const data = await response.json();
          const responseTime = Date.now() - startTime;
          
          return { 
            success: true, 
            message: `AI分析功能正常 (响应时间: ${responseTime}ms)`, 
            details: { 
              responseTime,
              analysisLength: data.analysis?.length || 0,
              model: data.model 
            } 
          };
        } else {
          return { 
            success: false, 
            message: 'AI分析功能异常', 
            details: { status: response.status } 
          };
        }
      } catch (error) {
        return { success: false, message: 'AI分析功能测试失败', details: { error: error.message } };
      }
    });

    // 测试4: 错误处理
    await runTest(3, '错误处理测试', async () => {
      try {
        const response = await fetch('/api/ai-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company: '', analysisType: 'invalid' })
        });
        
        // 应该返回400错误
        if (response.status === 400) {
          const data = await response.json();
          return { 
            success: true, 
            message: '错误处理正常', 
            details: { 
              expectedStatus: 400, 
              actualStatus: response.status,
              errorMessage: data.error 
            } 
          };
        } else {
          return { 
            success: false, 
            message: '错误处理异常', 
            details: { 
              expectedStatus: 400, 
              actualStatus: response.status 
            } 
          };
        }
      } catch (error) {
        return { success: false, message: '错误处理测试失败', details: { error: error.message } };
      }
    });
  };

  const runTest = async (index: number, testName: string, testFunction: () => Promise<any>) => {
    // 设置运行状态
    setTestResults(prev => prev.map((test, i) => 
      i === index ? { ...test, status: 'running', message: '测试中...' } : test
    ));

    try {
      const result = await testFunction();
      
      setTestResults(prev => prev.map((test, i) => 
        i === index ? { 
          ...test, 
          status: result.success ? 'success' : 'error', 
          message: result.message,
          details: result.details
        } : test
      ));
    } catch (error) {
      setTestResults(prev => prev.map((test, i) => 
        i === index ? { 
          ...test, 
          status: 'error', 
          message: '测试执行失败',
          details: { error: error.message }
        } : test
      ));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <div className="w-4 h-4 rounded-full bg-gray-300" />;
      case 'running': return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">报告生成器诊断测试</h1>
        <p className="text-gray-600">
          这个页面帮助诊断报告生成器的问题。点击下面的按钮运行所有测试。
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>测试控制</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={runAllTests} className="w-full">
            运行所有测试
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {testResults.map((test, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(test.status)}
                {test.test}
                <Badge className={getStatusColor(test.status)}>
                  {test.status === 'pending' && '等待中'}
                  {test.status === 'running' && '测试中'}
                  {test.status === 'success' && '成功'}
                  {test.status === 'error' && '失败'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">{test.message}</p>
                {test.details && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-gray-600">查看详情</summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                      {JSON.stringify(test.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>常见问题解决方案</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>网络连接失败：</strong>检查网络设置，确保可以访问外部API
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>API端点错误：</strong>检查后端服务是否正常运行，端口是否正确
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>AI分析功能异常：</strong>检查AI模型配置，确保API密钥有效
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>错误处理异常：</strong>检查前端错误处理逻辑，确保用户友好的错误提示
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
