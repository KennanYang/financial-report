# Ollama deepseek-r1 集成指南

## 概述

本指南将帮助您将本地部署的deepseek-r1模型集成到财务报告生成项目中。

## 前置条件

### 1. 安装Ollama

1. 访问 [Ollama官网](https://ollama.ai)
2. 下载适合您操作系统的安装包
3. 安装Ollama

### 2. 安装deepseek-r1模型

```bash
# 安装deepseek-r1模型
ollama pull deepseek-r1
```

### 3. 启动Ollama服务

```bash
# 启动Ollama服务
ollama serve
```

## 快速开始

### 1. 测试集成

运行测试脚本检查集成是否正常：

```bash
python test_ollama_integration.py
```

### 2. 运行AI演示

```bash
python ai_demo_with_ollama.py
```

### 3. 使用启动脚本

```bash
python start_ollama_demo.py
```

## 配置说明

### Ollama配置

配置文件位置：`config/ollama_config.yaml`

```yaml
ollama:
  service:
    base_url: "http://localhost:11434"
    timeout: 120
    retry_attempts: 3
    
  default_model: "deepseek-r1"
  
  models:
    deepseek-r1:
      name: "deepseek-r1"
      description: "DeepSeek R1 模型"
      temperature: 0.7
      max_tokens: 2048
      system_prompt: "你是一个专业的财务分析师，擅长分析公司财务状况和投资价值。"
```

### 代码集成

#### 1. 初始化AI工具

```python
from mcp_server.tools.ai_enhanced_report_generator import AIEnhancedReportGenerator

# 使用Ollama
ai_tool = AIEnhancedReportGenerator(
    ollama_url="http://localhost:11434",
    ollama_model="deepseek-r1",
    use_ollama=True
)
```

#### 2. 使用AI功能

```python
# AI公司分析
result = await ai_tool.call_tool(CallToolRequest(
    method="tools/call",
    params={
        "name": "ai_analyze_company",
        "arguments": {
            "symbol": "NVDA",
            "analysis_type": "comprehensive"
        }
    }
))

# AI报告生成
result = await ai_tool.call_tool(CallToolRequest(
    method="tools/call",
    params={
        "name": "ai_generate_report",
        "arguments": {
            "symbol": "AAPL",
            "report_style": "professional"
        }
    }
))

# AI投资建议
result = await ai_tool.call_tool(CallToolRequest(
    method="tools/call",
    params={
        "name": "ai_investment_advice",
        "arguments": {
            "symbol": "MSFT",
            "investment_horizon": "long_term"
        }
    }
))
```

## 功能特性

### 1. AI公司分析

- **功能**: 使用AI分析公司财务状况和投资价值
- **支持的分析类型**: financial, investment, risk, comprehensive
- **输出**: 详细的财务分析和投资价值评估

### 2. AI报告生成

- **功能**: 使用AI生成智能财务报告
- **支持的风格**: professional, simple, detailed
- **输出**: 结构化的财务报告

### 3. AI投资建议

- **功能**: 使用AI提供投资建议
- **支持的投资期限**: short_term, medium_term, long_term
- **输出**: 投资建议和风险评估

## 故障排除

### 1. Ollama服务不可用

**症状**: 连接失败或超时

**解决方案**:
1. 检查Ollama服务是否运行：`ollama serve`
2. 检查端口11434是否被占用
3. 检查防火墙设置

### 2. 模型未找到

**症状**: 模型不存在或无法加载

**解决方案**:
1. 检查模型是否已安装：`ollama list`
2. 重新安装模型：`ollama pull deepseek-r1`
3. 检查模型名称是否正确

### 3. 响应速度慢

**症状**: AI响应时间过长

**解决方案**:
1. 检查系统资源使用情况
2. 调整模型参数（temperature, max_tokens）
3. 考虑使用更小的模型

### 4. 内存不足

**症状**: 模型加载失败或崩溃

**解决方案**:
1. 检查可用内存
2. 关闭其他占用内存的程序
3. 考虑使用更小的模型

## 性能优化

### 1. 模型参数调优

```python
# 调整温度和最大token数
ai_tool = AIEnhancedReportGenerator(
    ollama_url="http://localhost:11434",
    ollama_model="deepseek-r1",
    use_ollama=True
)

# 在调用时指定参数
response = await ai_tool._call_ai_model(
    prompt=prompt,
    system_prompt=system_prompt,
    temperature=0.5,  # 降低温度提高一致性
    max_tokens=1024   # 减少token数提高速度
)
```

### 2. 缓存机制

```python
# 实现简单的缓存机制
import hashlib
import json

class CachedAIEnhancedReportGenerator(AIEnhancedReportGenerator):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.cache = {}
    
    async def _call_ai_model(self, prompt: str, system_prompt: str = "") -> str:
        # 生成缓存键
        cache_key = hashlib.md5(
            f"{prompt}:{system_prompt}".encode()
        ).hexdigest()
        
        # 检查缓存
        if cache_key in self.cache:
            return self.cache[cache_key]
        
        # 调用AI模型
        response = await super()._call_ai_model(prompt, system_prompt)
        
        # 保存到缓存
        self.cache[cache_key] = response
        return response
```

## 扩展功能

### 1. 支持更多模型

```python
# 支持多个模型
models = {
    "deepseek-r1": "deepseek-r1",
    "llama3.1-8b": "llama3.1-8b",
    "qwen2.5-7b": "qwen2.5-7b"
}

# 根据需求选择模型
selected_model = models.get(model_name, "deepseek-r1")
ai_tool = AIEnhancedReportGenerator(
    ollama_url="http://localhost:11434",
    ollama_model=selected_model,
    use_ollama=True
)
```

### 2. 批量处理

```python
# 批量处理多个公司
companies = ["NVDA", "AAPL", "MSFT", "GOOGL"]
results = []

for symbol in companies:
    result = await ai_tool.call_tool(CallToolRequest(
        method="tools/call",
        params={
            "name": "ai_analyze_company",
            "arguments": {
                "symbol": symbol,
                "analysis_type": "comprehensive"
            }
        }
    ))
    results.append(result)
```

## 总结

通过本指南，您已经成功将Ollama deepseek-r1模型集成到财务报告生成项目中。这个集成提供了：

1. **本地AI能力**: 无需外部API密钥
2. **智能分析**: AI驱动的财务分析
3. **灵活配置**: 支持多种模型和参数
4. **易于使用**: 简单的API接口

如果您在使用过程中遇到任何问题，请参考故障排除部分或查看项目文档。
