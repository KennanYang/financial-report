"""
财务报告生成MCP服务器主文件

实现MCP协议服务器，提供财务数据工具和资源。
"""

import asyncio
import json
import logging
from pathlib import Path
from typing import Any, Dict, List, Optional

from mcp.server import Server
from mcp.server.models import InitializationOptions
from mcp.server.stdio import stdio_server
from mcp.types import (
    CallToolRequest,
    CallToolResult,
    ListResourcesRequest,
    ListResourcesResult,
    ListToolsRequest,
    ListToolsResult,
    Resource,
    TextContent,
    Tool,
)

try:
    from .tools.financial_data import FinancialDataTool
    from .tools.report_generator import ReportGeneratorTool
    from .tools.data_analyzer import DataAnalyzerTool
    from .tools.ocr_tools import OCRTools
    from .tools.company_report_generator import CompanyReportGenerator
    from .tools.ai_enhanced_report_generator import AIEnhancedReportGenerator
    from .resources.financial_reports import FinancialReportsResource
except ImportError:
    # 当直接运行时使用绝对导入
    from mcp_server.tools.financial_data import FinancialDataTool
    from mcp_server.tools.report_generator import ReportGeneratorTool
    from mcp_server.tools.data_analyzer import DataAnalyzerTool
    from mcp_server.tools.ocr_tools import OCRTools
    from mcp_server.tools.company_report_generator import CompanyReportGenerator
    from mcp_server.tools.ai_enhanced_report_generator import AIEnhancedReportGenerator
    from mcp_server.resources.financial_reports import FinancialReportsResource


class FinancialMCPServer:
    """财务报告生成MCP服务器"""
    
    def __init__(self, config_path: Optional[str] = None):
        """初始化MCP服务器
        
        Args:
            config_path: 配置文件路径
        """
        self.config_path = config_path or "config/mcp_config.json"
        self.config = self._load_config()
        self.server = Server("financial-report-mcp-server")
        self._setup_logging()
        self._register_tools()
        self._register_resources()
        
    def _load_config(self) -> Dict[str, Any]:
        """加载配置文件"""
        try:
            with open(self.config_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            logging.warning(f"配置文件 {self.config_path} 未找到，使用默认配置")
            return self._get_default_config()
            
    def _get_default_config(self) -> Dict[str, Any]:
        """获取默认配置"""
        return {
            "server": {
                "name": "financial-report-mcp-server",
                "version": "1.0.0",
                "description": "财务报告生成MCP服务器"
            },
            "tools": {
                "financial_data": {"enabled": True},
                "report_generator": {"enabled": True},
                "data_analyzer": {"enabled": True},
                "ocr_tools": {"enabled": True},
                "company_report_generator": {"enabled": True},
                "ai_enhanced_report_generator": {
                    "enabled": True,
                    "ollama_url": "http://localhost:11434",
                    "ollama_model": "deepseek-r1",
                    "use_ollama": True
                }
            },
            "resources": {
                "financial_reports": {"enabled": True}
            }
        }
        
    def _setup_logging(self):
        """设置日志"""
        log_config = self.config.get("logging", {})
        logging.basicConfig(
            level=getattr(logging, log_config.get("level", "INFO")),
            format=log_config.get("format", "%(asctime)s - %(name)s - %(levelname)s - %(message)s")
        )
        
    def _register_tools(self):
        """注册MCP工具"""
        tools_config = self.config.get("tools", {})
        
        # 注册财务数据工具
        if tools_config.get("financial_data", {}).get("enabled", True):
            financial_data_tool = FinancialDataTool()
            self.server.list_tools()(financial_data_tool.list_tools)
            self.server.call_tool()(financial_data_tool.call_tool)
            
        # 注册报告生成工具
        if tools_config.get("report_generator", {}).get("enabled", True):
            report_generator_tool = ReportGeneratorTool()
            self.server.list_tools()(report_generator_tool.list_tools)
            self.server.call_tool()(report_generator_tool.call_tool)
            
        # 注册数据分析工具
        if tools_config.get("data_analyzer", {}).get("enabled", True):
            data_analyzer_tool = DataAnalyzerTool()
            self.server.list_tools()(data_analyzer_tool.list_tools)
            self.server.call_tool()(data_analyzer_tool.call_tool)
            
        # 注册OCR工具
        if tools_config.get("ocr_tools", {}).get("enabled", True):
            ocr_tool = OCRTools()
            self.server.list_tools()(ocr_tool.list_tools)
            self.server.call_tool()(ocr_tool.call_tool)
            
        # 注册公司财报生成工具
        if tools_config.get("company_report_generator", {}).get("enabled", True):
            company_report_tool = CompanyReportGenerator()
            self.server.list_tools()(company_report_tool.list_tools)
            self.server.call_tool()(company_report_tool.call_tool)
            
        # 注册AI增强报告生成工具
        if tools_config.get("ai_enhanced_report_generator", {}).get("enabled", True):
            ai_enhanced_report_tool = AIEnhancedReportGenerator(
                ollama_url="http://localhost:11434",
                ollama_model="deepseek-r1:7b",
                use_ollama=True
            )
            self.server.list_tools()(ai_enhanced_report_tool.list_tools)
            self.server.call_tool()(ai_enhanced_report_tool.call_tool)
            
    def _register_resources(self):
        """注册MCP资源"""
        resources_config = self.config.get("resources", {})
        
        # 注册财务报告资源
        if resources_config.get("financial_reports", {}).get("enabled", True):
            financial_reports_resource = FinancialReportsResource()
            self.server.list_resources()(financial_reports_resource.list_resources)
            self.server.read_resource()(financial_reports_resource.read_resource)
            
    async def run(self):
        """运行MCP服务器"""
        async with stdio_server() as (read_stream, write_stream):
            await self.server.run(
                read_stream,
                write_stream,
                InitializationOptions(
                    server_name="financial-report-mcp-server",
                    server_version="1.0.0",
                    capabilities=self.server.get_capabilities(),
                ),
            )


async def main():
    """主函数"""
    server = FinancialMCPServer()
    await server.run()


if __name__ == "__main__":
    asyncio.run(main()) 