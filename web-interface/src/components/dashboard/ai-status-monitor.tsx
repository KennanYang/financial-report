'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export function AIStatusMonitor() {
  // 模拟AI服务状态
  const aiServices = [
    { name: '财务分析引擎', status: 'online', health: 95, latency: 120 },
    { name: '市场预测模型', status: 'online', health: 88, latency: 180 },
    { name: '风险评估系统', status: 'online', health: 92, latency: 95 },
    { name: '自然语言处理', status: 'online', health: 97, latency: 150 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'offline':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'maintenance':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'offline':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          AI服务状态
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {aiServices.map((service, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(service.status)}
                  <span className="font-medium">{service.name}</span>
                </div>
                <Badge className={getStatusColor(service.status)}>
                  {service.status === 'online' ? '在线' : 
                   service.status === 'offline' ? '离线' : '维护中'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-muted-foreground">健康度</span>
                    <span className={getHealthColor(service.health)}>
                      {service.health}%
                    </span>
                  </div>
                  <Progress value={service.health} className="h-2" />
                </div>
                
                <div>
                  <div className="text-muted-foreground">响应时间</div>
                  <div className="font-medium">{service.latency}ms</div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">总体状态</span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                运行正常
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
