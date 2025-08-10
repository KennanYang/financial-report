# 财务报告生成项目 - MCP学习实践

## 项目概述

这是一个用于学习Model Context Protocol (MCP)的财务报告生成项目。通过这个项目，您将学习如何使用MCP来构建智能的财务报告生成系统，并集成AI模型实现智能化分析。

## 项目目标

- 学习MCP的基本概念和架构
- 实现财务数据的获取和处理
- 构建智能报告生成系统
- 集成多种数据源和工具
- 创建可扩展的MCP服务器
- 集成本地AI模型（Ollama deepseek-r1:7b）

## 核心功能

- ✅ **交互式公司财报生成**: 支持选择或输入公司代码生成详细财报
- ✅ **多公司支持**: 支持NVDA, AAPL, MSFT, GOOGL, TSLA, AMZN, META, NFLX, AMD, INTC等10家公司
- ✅ **多种报告类型**: basic（基础）, comprehensive（综合）, financial_analysis（财务分析）
- ✅ **批量生成**: 支持同时生成多个公司的财报
- ✅ **MCP协议**: 标准MCP工具和资源支持
- ✅ **AI增强功能**: 集成Ollama deepseek-r1:7b模型，提供智能财务分析
- ✅ **本地AI支持**: 支持本地部署的AI模型，无需外部API密钥

## AI功能特性

### Ollama集成
- 🎯 **本地AI模型**: 支持本地部署的deepseek-r1:7b模型
- 🤖 **智能分析**: AI驱动的公司财务分析和投资建议
- 📊 **智能报告**: AI生成的财务报告和投资分析
- 🔄 **灵活切换**: 支持在Ollama和OpenAI之间切换
- ⚡ **快速响应**: 本地模型，响应速度快

### AI功能列表
- **AI公司分析**: 使用AI分析公司财务状况和投资价值
- **AI报告生成**: 使用AI生成智能财务报告
- **AI投资建议**: 使用AI提供投资建议和风险评估

## 重要说明

### 🚨 演示程序使用本地数据
**当前版本使用的是模拟数据，不是真实的财务数据！**

- **数据来源**: 所有财务数据都是程序内部生成的模拟数据
- **用途**: 仅用于学习和演示MCP功能，不构成投资参考
- **真实性**: 股价、财务比率、公司信息等都是模拟值
- **学习价值**: 重点在于学习MCP工具的实现和使用方法

### 🔧 如果要接入真实API，需要修改的地方

#### 1. 修改数据源配置
```python
# 文件: src/mcp_server/tools/company_report_generator.py
# 方法: _get_mock_financial_data()

# 当前代码（模拟数据）:
def _get_mock_financial_data(self, symbol: str) -> Dict[str, Any]:
    # 返回模拟数据...

# 修改为（真实API）:
def _get_real_financial_data(self, symbol: str) -> Dict[str, Any]:
    # 调用真实财务API
    # 例如: Alpha Vantage, Yahoo Finance, IEX Cloud等
    api_key = "your_api_key"
    url = f"https://api.example.com/stock/{symbol}"
    # 发送HTTP请求获取真实数据...
```

#### 2. 添加API配置
```python
# 文件: config/financial_config.yaml
# 添加真实API配置:

api_providers:
  alpha_vantage:
    api_key: "your_alpha_vantage_key"
    base_url: "https://www.alphavantage.co/query"
  yahoo_finance:
    api_key: "your_yahoo_key"
    base_url: "https://query1.finance.yahoo.com"
```

#### 3. 安装必要的依赖
```bash
# 添加到 requirements.txt
requests>=2.25.0
yfinance>=0.1.70
alpha_vantage>=2.3.1
```

#### 4. 处理API限制和错误
```python
# 添加错误处理和重试机制
import time
from requests.exceptions import RequestException

def get_financial_data_with_retry(self, symbol: str, max_retries: int = 3):
    for attempt in range(max_retries):
        try:
            # 调用API
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except RequestException as e:
            if attempt == max_retries - 1:
                raise e
            time.sleep(2 ** attempt)  # 指数退避
```

## MCP学习步骤

### 第一步：环境准备
1. 安装Python 3.8+
2. 安装MCP相关依赖
3. 配置开发环境
4. 安装Ollama（可选，用于AI功能）

### 第二步：理解MCP基础概念
- MCP协议概述
- 服务器-客户端架构
- 工具(Tools)和资源(Resources)概念
- 消息格式和通信协议

### 第三步：实现基础MCP服务器
- 创建MCP服务器框架
- 实现基本的工具注册
- 处理客户端请求

### 第四步：开发财务数据工具
- 实现数据获取工具
- 实现数据处理工具
- 实现报告生成工具

### 第五步：集成外部数据源
- 连接财务API
- 处理CSV/Excel文件
- 数据库集成

### 第六步：高级功能实现
- 智能报告生成
- 数据可视化
- 报告模板系统
- AI模型集成

### 第七步：测试和优化
- 单元测试
- 集成测试
- 性能优化

## 快速开始

### 1. 安装依赖
```bash
pip install -r requirements.txt
```

### 2. 安装Ollama（可选，用于AI功能）
```bash
# 下载并安装Ollama
# 访问 https://ollama.ai 下载安装包

# 安装deepseek-r1模型
ollama pull deepseek-r1:7b
```

### 3. 运行演示

#### 纯MCP功能演示
```bash
# 运行纯MCP功能演示（包含交互式选择）
python interactive_company_demo_real.py
```

#### AI+MCP集成演示
```bash
# 运行AI+MCP集成演示（需要Ollama服务运行）
python ai_mcp_demo.py
```

### 4. 启动MCP服务器
```bash
# 启动纯MCP服务器
python -m src.mcp_server.server

# 或者直接运行交互式演示，其中包含服务器启动选项
```

## AI功能使用

### 前置条件
1. 安装Ollama服务
2. 下载deepseek-r1:7b模型：`ollama pull deepseek-r1:7b`
3. 启动Ollama服务：`ollama serve`

### 使用AI功能
```python
from mcp_server.tools.ai_enhanced_report_generator import AIEnhancedReportGenerator

# 初始化AI工具（使用Ollama）
ai_tool = AIEnhancedReportGenerator(
    ollama_url="http://localhost:11434",
    ollama_model="deepseek-r1:7b",
    use_ollama=True
)

# 使用AI分析公司
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
```

## 项目结构

```
financial-report/
├── README.md                           # 项目说明
├── requirements.txt                    # Python依赖
├── interactive_company_demo_real.py    # 纯MCP功能演示（交互式）
├── ai_mcp_demo.py                     # AI+MCP集成演示
├── config/                             # 配置文件
│   ├── mcp_config.json                # MCP配置
│   ├── financial_config.yaml          # 财务数据配置
│   └── ollama_config.yaml             # Ollama配置
├── src/                               # 源代码
│   └── mcp_server/                    # MCP服务器实现
│       ├── server.py                  # 主服务器
│       ├── tools/                     # MCP工具
│       │   ├── company_report_generator.py  # 公司财报生成工具
│       │   ├── financial_data.py     # 财务数据工具
│       │   ├── report_generator.py   # 报告生成工具
│       │   ├── ai_enhanced_report_generator.py  # AI增强报告生成器
│       │   └── ollama_client.py      # Ollama客户端
│       └── resources/                 # MCP资源
│           └── financial_reports.py   # 财务报告资源
├── output/                            # 输出目录
│   └── reports/                       # 生成的报告
└── docs/                              # 文档
    └── README.md                      # 详细文档
```

## 关键学习点

1. **MCP协议理解**: 学习MCP的请求-响应模式
2. **工具开发**: 实现自定义MCP工具
3. **资源管理**: 处理MCP资源
4. **错误处理**: 实现健壮的错误处理机制
5. **性能优化**: 优化MCP服务器性能

## 使用示例

### 纯MCP功能演示
1. 运行 `python interactive_company_demo_real.py`
2. 选择功能：`1` (生成单个公司财报)
3. 选择公司：输入公司代码（如 `NVDA`）或数字（如 `1`）
4. 选择报告类型：`1`(基础), `2`(综合), `3`(财务分析)
5. 查看生成的报告

### 批量生成财报
1. 选择功能：`2` (批量生成多个公司财报)
2. 输入公司代码：`NVDA,AAPL,MSFT`
3. 选择报告类型
4. 等待批量生成完成

### AI+MCP集成演示
1. 确保Ollama服务运行：`ollama serve`
2. 运行 `python ai_mcp_demo.py`
3. 查看AI功能演示：
   - AI公司分析
   - AI报告生成
   - AI投资建议
   - AI与MCP工具协作

## 支持的公司

| 代码 | 公司名称 | 行业 |
|------|----------|------|
| NVDA | NVIDIA Corporation | 半导体 |
| AAPL | Apple Inc. | 消费电子 |
| MSFT | Microsoft Corporation | 软件 |
| GOOGL | Alphabet Inc. | 互联网服务 |
| TSLA | Tesla Inc. | 汽车 |
| AMZN | Amazon.com Inc. | 电子商务 |
| META | Meta Platforms Inc. | 社交媒体 |
| NFLX | Netflix Inc. | 流媒体 |
| AMD | Advanced Micro Devices | 半导体 |
| INTC | Intel Corporation | 半导体 |

## 报告内容详解

### 报告类型说明

#### 1. **basic** - 基础财报
- 基本信息（公司名称、股票代码、行业分类）
- 财务数据摘要（股价、市值、收入、利润等）
- 基本财务比率（资产负债率、利润率等）

#### 2. **comprehensive** - 综合财报（推荐）
- 完整财务数据
- 详细财务比率分析
- 业务分析（核心业务、增长驱动因素、竞争优势）
- 风险因素分析
- 投资建议
- 技术分析（52周高低点、均线、RSI）
- 市场表现（收益率数据）

#### 3. **financial_analysis** - 财务分析报告
- 深度财务分析
- 行业对比
- 趋势分析
- 投资风险评估

### 报告内容示例

#### NVIDIA (NVDA) 综合财报示例

```
NVIDIA Corporation (NVDA) 财务报告
============================================================

基本信息:
- 公司名称: NVIDIA Corporation
- 股票代码: NVDA
- 行业分类: Technology - Semiconductors
- 报告类型: comprehensive
- 报告期间: latest
- 生成时间: 2025-08-08 08:23:11

财务数据摘要:
- 当前股价: $450.25
- 市值: $1.1T
- 营业收入: $60.9B
- 净利润: $29.8B
- 总资产: $106.1B
- 总负债: $25.3B

财务比率分析:
- 资产负债率: 24.00%
- 净利润率: 49.00%
- 资产收益率: 28.00%
- 股本收益率: 89.00%
- 市盈率: 15.10
- 市净率: 13.40

业务分析:
NVIDIA是全球领先的图形处理器(GPU)和人工智能计算平台提供商。

核心业务:
- GPU业务: 游戏、数据中心、专业可视化
- AI计算: 数据中心GPU、自动驾驶、机器人
- 软件平台: CUDA、AI框架、开发工具

增长驱动因素:
- AI革命推动数据中心GPU需求激增
- 游戏市场持续增长
- 自动驾驶和机器人技术发展
- 云计算和边缘计算扩张

竞争优势:
- 技术领先优势明显
- 强大的生态系统和开发者网络
- 专利组合和知识产权保护
- 与主要云服务提供商的深度合作

风险因素:
主要风险因素:
1. 宏观经济风险: 经济周期波动可能影响需求
2. 竞争风险: 行业竞争加剧可能影响市场份额
3. 技术风险: 技术变革可能影响产品竞争力
4. 监管风险: 政策变化可能影响业务运营
5. 供应链风险: 供应链中断可能影响生产和交付
6. 汇率风险: 汇率波动可能影响国际业务
7. 市场风险: 股票价格波动风险

投资建议:
投资建议: 买入
理由: 估值适中，财务状况稳定，具有投资价值

风险提示:
- 本报告仅供参考，不构成投资建议
- 投资有风险，入市需谨慎
- 请根据自身情况做出投资决策
- 建议咨询专业投资顾问

技术分析:
- 52周最高: $505.48
- 52周最低: $138.84
- 50日均线: $435.2
- 200日均线: $320.15
- 相对强弱指数(RSI): 65.80

市场表现:
- 年初至今收益率: 85.00%
- 过去一年收益率: 225.00%
- 过去三年收益率: 450.00%
```

## 使用方法详解

### 方法一：自动演示版本
```bash
python interactive_company_demo.py
```
- 自动演示所有功能
- 无需用户输入
- 适合快速了解功能

### 方法二：真正交互式版本
```bash
python interactive_company_demo_real.py
```
- 需要用户实际输入
- 支持单个和批量生成
- 完整的交互体验

## 使用步骤详解

### 单个公司财报生成

1. **启动程序**
   ```bash
   python interactive_company_demo_real.py
   ```

2. **选择功能**
   ```
   📋 请选择功能:
   1. 生成单个公司财报
   2. 批量生成多个公司财报
   3. 退出
   ```

3. **查看公司列表**
   ```
   📋 正在获取可用公司列表...
   NVDA: NVIDIA Corporation
   AAPL: Apple Inc.
   MSFT: Microsoft Corporation
   ...
   ```

4. **选择公司**
   - 输入公司代码：`NVDA`
   - 或输入数字：`1` (选择NVIDIA)

5. **选择报告类型**
   ```
   1. basic - 基础财报
   2. comprehensive - 综合财报 (推荐)
   3. financial_analysis - 财务分析报告
   ```

6. **生成报告**
   ```
   🚀 正在生成 NVDA 的 comprehensive 财报...
   ✅ 财报生成成功!
   ```

### 批量公司财报生成

1. **选择批量功能**
   ```
   2. 批量生成多个公司财报
   ```

2. **输入公司代码**
   ```
   请输入要生成财报的公司代码，用逗号分隔 (如: NVDA,AAPL,MSFT):
   公司代码: NVDA,AAPL,MSFT
   ```

3. **选择报告类型**
   ```
   1. basic - 基础财报
   2. comprehensive - 综合财报
   3. financial_analysis - 财务分析报告
   ```

4. **批量生成**
   ```
   🚀 开始批量生成 3 个公司的 comprehensive 财报...
   [1/3] 正在生成 NVDA 的财报...
   ✅ NVDA 财报生成成功!
   [2/3] 正在生成 AAPL 的财报...
   ✅ AAPL 财报生成成功!
   [3/3] 正在生成 MSFT 的财报...
   ✅ MSFT 财报生成成功!
   ```

## 输出文件

所有生成的报告都会自动保存到 `output/` 目录：

```
output/
├── company_report_NVDA_20250808_082311.txt
├── company_report_AAPL_20250808_082312.txt
├── company_report_MSFT_20250808_082313.txt
└── ...
```

文件命名格式：`company_report_{公司代码}_{时间戳}.txt`

## 注意事项

- 当前版本使用模拟数据，实际应用中可集成真实财务API
- 报告中的投资建议仅供参考，不构成实际投资建议
- 所有报告自动保存到 `output/` 目录
- `interactive_company_demo_real.py` 是已发布的公众号文章基础，请勿修改
- AI功能需要本地Ollama服务支持，确保模型名称正确（deepseek-r1:7b）

## 故障排除

### 常见问题

1. **导入错误**
   ```
   ImportError: attempted relative import with no known parent package
   ```
   - 解决方案：确保在项目根目录运行脚本

2. **公司代码错误**
   ```
   ValueError: 不支持的公司代码: XXX
   ```
   - 解决方案：检查公司代码是否正确，参考支持的公司列表

3. **文件保存失败**
   ```
   PermissionError: [Errno 13] Permission denied
   ```
   - 解决方案：检查output目录权限，或手动创建output目录

4. **Ollama连接失败**
   ```
   ConnectionError: Cannot connect to Ollama service
   ```
   - 解决方案：确保Ollama服务运行，检查端口11434是否开放

### 获取帮助

如果遇到问题，请：
1. 检查错误信息
2. 确认运行环境
3. 查看日志文件
4. 参考本文档

## 扩展功能

### 添加新公司
在 `src/mcp_server/tools/company_report_generator.py` 中的 `companies` 字典添加新公司：

```python
self.companies = {
    "NEW": {"name": "New Company", "sector": "Technology", "industry": "Software"},
    # ... 其他公司
}
```

### 自定义报告模板
修改 `_create_company_report` 方法来自定义报告格式和内容。

### 集成真实数据
替换 `_get_mock_financial_data` 方法，集成真实的财务数据API。

## 贡献指南

欢迎提交Issue和Pull Request来改进这个项目。

## Demo文件说明

### 简化后的文件结构
项目已经简化为两个核心演示文件：

#### 1. `interactive_company_demo_real.py` - 纯MCP功能演示
- **功能**: 展示纯MCP工具的核心能力
- **特点**: 
  - 交互式用户输入
  - 支持单个和批量财报生成
  - 多种报告类型选择
  - 完整的MCP工具演示
- **用途**: 学习MCP基础概念和工具使用
- **注意**: 此文件是已发布公众号文章的基础，请勿修改

#### 2. `ai_mcp_demo.py` - AI+MCP集成演示
- **功能**: 展示AI模型与MCP工具的完美结合
- **特点**:
  - 集成Ollama deepseek-r1:7b模型
  - AI驱动的财务分析
  - 智能报告生成
  - AI投资建议
  - AI与MCP工具协作演示
- **用途**: 学习AI模型与MCP工具的集成方法
- **前置条件**: 需要运行Ollama服务

### 使用建议
1. **初学者**: 先运行 `interactive_company_demo_real.py` 学习MCP基础
2. **进阶用户**: 运行 `ai_mcp_demo.py` 体验AI增强功能
3. **开发学习**: 查看 `src/` 目录下的源代码实现

## 许可证

MIT License 