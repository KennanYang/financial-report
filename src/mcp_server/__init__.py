"""
财务报告生成MCP服务器

这个包实现了基于MCP协议的财务报告生成服务器，
提供财务数据获取、分析和报告生成功能。
"""

__version__ = "1.0.0"
__author__ = "MCP学习项目"
__description__ = "财务报告生成MCP服务器"

from .server import FinancialMCPServer

__all__ = ["FinancialMCPServer"] 