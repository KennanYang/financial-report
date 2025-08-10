#!/usr/bin/env python3
"""
真正的交互式公司财报生成器

提供真正的交互式界面，让用户可以选择或输入公司代码来生成财报。
"""

import asyncio
import sys
from pathlib import Path

# 添加src目录到Python路径
sys.path.insert(0, str(Path(__file__).parent / "src"))

from mcp_server.tools.company_report_generator import CompanyReportGenerator


def get_user_input(prompt: str) -> str:
    """获取用户输入"""
    return input(prompt)


async def interactive_company_selection():
    """真正的交互式公司选择"""
    print("🎯 交互式公司财报生成器")
    print("=" * 50)
    
    # 创建工具实例
    tool = CompanyReportGenerator()
    
    # 1. 显示可用公司列表
    print("\n📋 正在获取可用公司列表...")
    from mcp.types import ListToolsRequest
    tools_result = await tool.list_tools(ListToolsRequest(method="tools/list"))
    
    # 调用list_companies工具
    from mcp.types import CallToolRequest
    list_request = CallToolRequest(
        method="tools/call",
        params={"name": "list_companies", "arguments": {}}
    )
    
    try:
        result = await tool.call_tool(list_request)
        print(result.content[0].text)
    except Exception as e:
        print(f"❌ 获取公司列表失败: {e}")
        return
    
    # 2. 用户选择公司
    print("\n🔍 请选择您要生成财报的公司:")
    print("1. 输入公司代码 (如: NVDA, AAPL, MSFT)")
    print("2. 输入数字选择预设公司:")
    
    # 预设公司选项
    preset_companies = [
        ("1", "NVDA", "NVIDIA Corporation"),
        ("2", "AAPL", "Apple Inc."),
        ("3", "MSFT", "Microsoft Corporation"),
        ("4", "GOOGL", "Alphabet Inc."),
        ("5", "TSLA", "Tesla Inc."),
        ("6", "AMZN", "Amazon.com Inc."),
        ("7", "META", "Meta Platforms Inc."),
        ("8", "NFLX", "Netflix Inc."),
        ("9", "AMD", "Advanced Micro Devices"),
        ("10", "INTC", "Intel Corporation")
    ]
    
    for num, symbol, name in preset_companies:
        print(f"   {num}. {symbol} - {name}")
    
    # 获取用户输入
    user_input = get_user_input("\n请输入选择 (公司代码或数字): ").strip()
    
    # 解析用户输入
    selected_symbol = None
    if user_input.isdigit():
        num = int(user_input)
        if 1 <= num <= len(preset_companies):
            selected_symbol = preset_companies[num-1][1]
        else:
            print("❌ 无效的数字选择")
            return
    else:
        # 用户直接输入了公司代码
        selected_symbol = user_input.upper()
    
    if not selected_symbol:
        print("❌ 无效的选择")
        return
    
    # 3. 选择报告类型
    print(f"\n📊 已选择公司: {selected_symbol}")
    print("请选择报告类型:")
    print("1. basic - 基础财报")
    print("2. comprehensive - 综合财报 (推荐)")
    print("3. financial_analysis - 财务分析报告")
    
    report_type_map = {
        "1": "basic",
        "2": "comprehensive", 
        "3": "financial_analysis"
    }
    
    # 获取用户选择报告类型
    report_choice = get_user_input("请输入选择 (1-3): ").strip()
    report_type = report_type_map.get(report_choice, "comprehensive")
    
    # 4. 生成财报
    print(f"\n🚀 正在生成 {selected_symbol} 的 {report_type} 财报...")
    
    generate_request = CallToolRequest(
        method="tools/call",
        params={
            "name": "generate_company_report",
            "arguments": {
                "symbol": selected_symbol,
                "report_type": report_type,
                "period": "latest"
            }
        }
    )
    
    try:
        result = await tool.call_tool(generate_request)
        print("✅ 财报生成成功!")
        print("\n" + "="*60)
        print(result.content[0].text)
        print("="*60)
        
        # 显示文件保存位置
        if "报告文件已保存到:" in result.content[0].text:
            lines = result.content[0].text.split('\n')
            for line in lines:
                if "报告文件已保存到:" in line:
                    print(f"\n💾 {line}")
                    break
                    
    except Exception as e:
        print(f"❌ 生成财报失败: {e}")


async def batch_generate_reports():
    """批量生成多个公司财报"""
    print("\n🔄 批量生成公司财报")
    print("=" * 50)
    
    tool = CompanyReportGenerator()
    
    # 获取用户输入要生成的公司
    print("请输入要生成财报的公司代码，用逗号分隔 (如: NVDA,AAPL,MSFT):")
    companies_input = get_user_input("公司代码: ").strip()
    
    if not companies_input:
        print("❌ 未输入公司代码")
        return
    
    companies = [code.strip().upper() for code in companies_input.split(',')]
    
    # 选择报告类型
    print("\n请选择报告类型:")
    print("1. basic - 基础财报")
    print("2. comprehensive - 综合财报")
    print("3. financial_analysis - 财务分析报告")
    
    report_choice = get_user_input("请输入选择 (1-3): ").strip()
    report_type_map = {
        "1": "basic",
        "2": "comprehensive", 
        "3": "financial_analysis"
    }
    report_type = report_type_map.get(report_choice, "comprehensive")
    
    print(f"\n🚀 开始批量生成 {len(companies)} 个公司的 {report_type} 财报...")
    
    success_count = 0
    for i, symbol in enumerate(companies, 1):
        print(f"\n[{i}/{len(companies)}] 正在生成 {symbol} 的财报...")
        
        from mcp.types import CallToolRequest
        request = CallToolRequest(
            method="tools/call",
            params={
                "name": "generate_company_report",
                "arguments": {
                    "symbol": symbol,
                    "report_type": report_type,
                    "period": "latest"
                }
            }
        )
        
        try:
            result = await tool.call_tool(request)
            print(f"✅ {symbol} 财报生成成功!")
            success_count += 1
            
            # 显示文件保存位置
            if "报告文件已保存到:" in result.content[0].text:
                lines = result.content[0].text.split('\n')
                for line in lines:
                    if "报告文件已保存到:" in line:
                        print(f"💾 {line}")
                        break
                        
        except Exception as e:
            print(f"❌ {symbol} 财报生成失败: {e}")
        
        print("-" * 30)
    
    print(f"\n🎉 批量生成完成! 成功生成 {success_count}/{len(companies)} 个财报")


async def main():
    """主函数"""
    print("🌟 公司财报生成器 - 真正交互式版本")
    print("=" * 60)
    
    while True:
        print("\n📋 请选择功能:")
        print("1. 生成单个公司财报")
        print("2. 批量生成多个公司财报")
        print("3. 退出")
        
        choice = get_user_input("请输入选择 (1-3): ").strip()
        
        if choice == "1":
            await interactive_company_selection()
        elif choice == "2":
            await batch_generate_reports()
        elif choice == "3":
            print("👋 感谢使用公司财报生成器!")
            break
        else:
            print("❌ 无效的选择，请重新输入")
        
        # 询问是否继续
        if choice in ["1", "2"]:
            continue_choice = get_user_input("\n是否继续使用? (y/n): ").strip().lower()
            if continue_choice not in ['y', 'yes', '是']:
                print("👋 感谢使用公司财报生成器!")
                break


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\n👋 程序被用户中断，感谢使用!")
    except Exception as e:
        print(f"\n❌ 程序运行出错: {e}")
        import traceback
        traceback.print_exc()
