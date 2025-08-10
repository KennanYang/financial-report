#!/usr/bin/env python3
"""
AI+MCP集成演示 - 展示AI模型与MCP工具的完美结合

这个文件演示了如何将AI模型（Ollama deepseek-r1）与MCP工具结合使用，
生成智能的财务分析和报告。
"""

import asyncio
import json
import os
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

# 添加src目录到Python路径
sys.path.insert(0, str(Path(__file__).parent / "src"))

from mcp_server.tools.ai_enhanced_report_generator import AIEnhancedReportGenerator
from mcp_server.tools.ollama_client import OllamaClient
from mcp.types import CallToolRequest, CallToolResult, TextContent


class AIMCPDemo:
    """AI+MCP集成演示类"""
    
    def __init__(self, openai_api_key: Optional[str] = None, 
                 ollama_url: str = "http://localhost:11434",
                 ollama_model: str = "deepseek-r1:7b"):
        """
        初始化AI+MCP集成演示
        
        Args:
            openai_api_key: OpenAI API密钥（可选）
            ollama_url: Ollama服务URL
            ollama_model: Ollama模型名称
        """
        self.openai_api_key = openai_api_key or os.getenv("OPENAI_API_KEY")
        self.ollama_url = ollama_url
        self.ollama_model = ollama_model
        
        # 初始化AI工具
        self.ai_tool = AIEnhancedReportGenerator(
            api_key=self.openai_api_key,
            ollama_url=self.ollama_url,
            ollama_model=self.ollama_model,
            use_ollama=True
        )
        
        print(f"🤖 AI+MCP集成演示初始化完成")
        print(f"   - OpenAI API: {'✅ 已配置' if self.openai_api_key else '❌ 未配置'}")
        print(f"   - Ollama URL: {self.ollama_url}")
        print(f"   - Ollama Model: {self.ollama_model}")
        print()
    
    async def demonstrate_ai_capabilities(self):
        """演示AI功能"""
        print("🚀 AI+MCP集成功能演示")
        print("=" * 60)
        
        # 1. 检查Ollama服务状态
        await self._check_ollama_health()
        
        # 2. 获取可用工具列表
        await self._show_available_tools()
        
        # 3. 演示AI公司分析
        await self._demo_ai_company_analysis()
        
        # 4. 演示AI报告生成
        await self._demo_ai_report_generation()
        
        # 5. 演示AI投资建议
        await self._demo_ai_investment_advice()
        
        # 6. 演示AI与MCP工具协作
        await self._demo_ai_mcp_collaboration()
        
        print("\n🎉 AI+MCP集成演示完成!")
    
    async def _check_ollama_health(self):
        """检查Ollama服务状态"""
        print("🔍 检查Ollama服务状态...")
        print("-" * 40)
        
        try:
            if self.ai_tool.ollama_client:
                is_healthy = await self.ai_tool.ollama_client.health_check()
                if is_healthy:
                    print("✅ Ollama服务正常，deepseek-r1:7b模型可用")
                    print("💡 将使用AI增强功能生成报告")
                else:
                    print("⚠️  Ollama服务不可用，将使用模拟AI功能")
            else:
                print("⚠️  Ollama客户端未初始化")
        except Exception as e:
            print(f"❌ Ollama服务检查失败: {e}")
            print("💡 将使用模拟AI功能")
        
        print()
    
    async def _show_available_tools(self):
        """显示可用的AI工具"""
        print("📋 可用的AI增强工具:")
        print("-" * 40)
        
        try:
            from mcp.types import ListToolsRequest
            tools_result = await self.ai_tool.list_tools(ListToolsRequest(method="tools/list"))
            
            for tool in tools_result.tools:
                print(f"  🔧 {tool.name}: {tool.description}")
                if tool.inputSchema and "properties" in tool.inputSchema:
                    props = tool.inputSchema["properties"]
                    for prop_name, prop_info in props.items():
                        desc = prop_info.get("description", "")
                        required = "（必需）" if prop_name in tool.inputSchema.get("required", []) else "（可选）"
                        print(f"    - {prop_name}: {desc} {required}")
                print()
                
        except Exception as e:
            print(f"❌ 获取工具列表失败: {e}")
            print("💡 将使用模拟演示...")
    
    async def _demo_ai_company_analysis(self):
        """演示AI公司分析"""
        print("🔍 演示AI公司分析...")
        print("-" * 40)
        
        try:
            result = await self.ai_tool._ai_analyze_company({
                "symbol": "NVDA",
                "analysis_type": "comprehensive"
            })
            
            print("✅ AI公司分析成功!")
            print(f"📊 分析结果长度: {len(result.content[0].text)} 字符")
            print("\n📝 AI分析结果预览:")
            print("-" * 30)
            
            # 显示前200个字符作为预览
            preview = result.content[0].text[:200]
            if len(result.content[0].text) > 200:
                preview += "..."
            print(preview)
            
        except Exception as e:
            print(f"❌ AI公司分析失败: {e}")
            print("💡 将使用模拟结果...")
            
            # 模拟AI分析结果
            mock_result = """
基于对NVIDIA (NVDA) 的AI分析，我发现：

1. 财务表现强劲：营收和利润持续增长
2. AI芯片需求旺盛：数据中心和AI训练需求激增
3. 技术优势明显：在GPU领域保持领先地位
4. 风险因素：依赖少数大客户，竞争加剧

投资建议：长期看好，建议适度配置
            """
            print("🤖 模拟AI分析结果:")
            print(mock_result)
        
        print()
    
    async def _demo_ai_report_generation(self):
        """演示AI报告生成"""
        print("📊 演示AI报告生成...")
        print("-" * 40)
        
        try:
            result = await self.ai_tool._ai_generate_report({
                "symbol": "AAPL",
                "report_style": "professional"
            })
            
            print("✅ AI报告生成成功!")
            print(f"📄 报告长度: {len(result.content[0].text)} 字符")
            print("\n📝 AI报告预览:")
            print("-" * 30)
            
            # 显示前300个字符作为预览
            preview = result.content[0].text[:300]
            if len(result.content[0].text) > 300:
                preview += "..."
            print(preview)
            
        except Exception as e:
            print(f"❌ AI报告生成失败: {e}")
            print("💡 将使用模拟结果...")
            
            # 模拟AI报告结果
            mock_result = """
# Apple Inc. (AAPL) 专业财务分析报告

## 执行摘要
Apple Inc. 作为全球科技巨头，在智能手机、个人电脑和服务业务方面表现卓越。

## 财务表现分析
- 营收：$394.3B，同比增长8.1%
- 净利润：$97.0B，净利润率24.6%
- 现金流：$110.5B，财务状况稳健

## AI投资建议
基于当前财务表现和市场地位，建议：**买入**
            """
            print("🤖 模拟AI报告结果:")
            print(mock_result)
        
        print()
    
    async def _demo_ai_investment_advice(self):
        """演示AI投资建议"""
        print("💡 演示AI投资建议...")
        print("-" * 40)
        
        try:
            result = await self.ai_tool._ai_investment_advice({
                "symbol": "MSFT",
                "investment_horizon": "long_term"
            })
            
            print("✅ AI投资建议生成成功!")
            print(f"💬 建议长度: {len(result.content[0].text)} 字符")
            print("\n📝 AI投资建议预览:")
            print("-" * 30)
            
            # 显示前250个字符作为预览
            preview = result.content[0].text[:250]
            if len(result.content[0].text) > 250:
                preview += "..."
            print(preview)
            
        except Exception as e:
            print(f"❌ AI投资建议失败: {e}")
            print("💡 将使用模拟结果...")
            
            # 模拟AI投资建议结果
            mock_result = """
## Microsoft (MSFT) 长期投资建议

### 投资评级：买入
### 目标价格：$450
### 投资期限：3-5年

### 核心优势：
1. 云计算业务强劲增长
2. AI技术领先地位
3. 现金流充裕，分红稳定

### 风险提示：
- 监管风险
- 竞争加剧
- 技术变革风险

### 建议操作：
分批建仓，长期持有
            """
            print("🤖 模拟AI投资建议结果:")
            print(mock_result)
        
        print()
    
    async def _demo_ai_mcp_collaboration(self):
        """演示AI与MCP工具协作"""
        print("🤝 演示AI与MCP工具协作...")
        print("-" * 40)
        
        print("🎯 AI决定调用MCP工具进行数据分析...")
        
        # 模拟AI决策过程
        analysis_steps = [
            "1. AI分析用户需求",
            "2. 选择合适的MCP工具",
            "3. 调用工具获取数据",
            "4. AI对结果进行智能分析",
            "5. 生成最终建议"
        ]
        
        for step in analysis_steps:
            print(f"   {step}")
            await asyncio.sleep(0.5)
        
        print("\n💡 AI与MCP协作的优势:")
        print("   ✅ MCP工具提供标准化数据接口")
        print("   ✅ AI模型专注于智能分析和决策")
        print("   ✅ 两者结合实现1+1>2的效果")
        print("   ✅ 支持复杂的多步骤分析流程")
        
        print()
    
    async def start_ai_server(self):
        """启动AI增强MCP服务器"""
        print("🚀 启动AI增强MCP服务器...")
        print("=" * 50)
        
        try:
            from mcp_server.server import FinancialMCPServer
            
            print("📡 正在启动服务器...")
            server = FinancialMCPServer()
            
            print("✅ 服务器启动成功!")
            print("💡 现在可以运行AI增强的MCP服务了")
            print("🔧 支持的工具包括：")
            print("   - 基础财务报告生成")
            print("   - AI增强公司分析")
            print("   - AI智能报告生成")
            print("   - AI投资建议")
            
            # 注意：这里只是演示，实际启动需要用户选择
            print("\n⚠️  注意：这只是演示，实际启动请运行：")
            print("   python start_ai_server.py")
            
        except Exception as e:
            print(f"❌ 服务器启动失败: {e}")
            print("💡 请检查配置文件和依赖项")
        
        print()
    
    async def close(self):
        """关闭AI客户端"""
        if self.ai_tool:
            try:
                await self.ai_tool.close()
                print("✅ AI客户端已关闭")
            except Exception as e:
                print(f"❌ 关闭AI客户端失败: {e}")


async def main():
    """主函数"""
    print("🚀 AI模型与MCP工具集成演示")
    print("=" * 60)
    
    # 检查环境配置
    openai_api_key = os.getenv("OPENAI_API_KEY")
    ollama_url = os.getenv("OLLAMA_URL", "http://localhost:11434")
    ollama_model = os.getenv("OLLAMA_MODEL", "deepseek-r1:7b")
    
    if not openai_api_key:
        print("⚠️  未找到 OPENAI_API_KEY 环境变量")
        print("💡 请设置环境变量: export OPENAI_API_KEY='your-api-key'")
        print("🔧 将使用Ollama本地模型...")
    
    # 创建AI+MCP演示实例
    ai_demo = AIMCPDemo(openai_api_key, ollama_url, ollama_model)
    
    try:
        # 演示AI功能
        await ai_demo.demonstrate_ai_capabilities()
        
        # 演示服务器启动
        await ai_demo.start_ai_server()
        
    except KeyboardInterrupt:
        print("\n\n👋 程序被用户中断")
    except Exception as e:
        print(f"\n❌ 程序运行出错: {e}")
        import traceback
        traceback.print_exc()
    finally:
        # 确保AI客户端被正确关闭
        await ai_demo.close()
    
    print("\n🎉 演示完成!")
    print("\n💡 关键要点:")
    print("  - MCP工具为AI模型提供标准化接口")
    print("  - AI模型可以动态选择调用哪个工具")
    print("  - 工具返回结构化数据供AI分析")
    print("  - 支持AI模型的后处理和分析")
    print("  - 支持OpenAI和Ollama两种AI模型")
    print("  - 本地Ollama服务提供离线AI能力")


if __name__ == "__main__":
    asyncio.run(main())
