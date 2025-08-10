"""
Ollama客户端模块

用于与本地部署的Ollama模型进行交互，特别是deepseek-r1模型。
"""

import asyncio
import json
import logging
from typing import Any, Dict, List, Optional
import aiohttp

from mcp.types import TextContent


class OllamaClient:
    """Ollama客户端"""
    
    def __init__(self, base_url: str = "http://localhost:11434", model: str = "deepseek-r1:7b"):
        self.base_url = base_url.rstrip('/')
        self.model = model
        self.logger = logging.getLogger(__name__)
        self.session: Optional[aiohttp.ClientSession] = None
    
    async def __aenter__(self):
        """异步上下文管理器入口"""
        if self.session is None:
            self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """异步上下文管理器出口"""
        await self.close()
    
    async def _ensure_session(self):
        """确保session已创建"""
        if self.session is None:
            self.session = aiohttp.ClientSession()
    
    async def close(self):
        """关闭session"""
        if self.session:
            await self.session.close()
            self.session = None
    
    async def generate(self, prompt: str, system_prompt: str = "", 
                      temperature: float = 0.7, max_tokens: int = 2048) -> str:
        """
        生成文本响应
        
        Args:
            prompt: 用户提示
            system_prompt: 系统提示
            temperature: 温度参数
            max_tokens: 最大token数
            
        Returns:
            生成的文本响应
        """
        await self._ensure_session()
        
        payload = {
            "model": self.model,
            "prompt": prompt,
            "system": system_prompt,
            "stream": False,
            "options": {
                "temperature": temperature,
                "num_predict": max_tokens
            }
        }
        
        try:
            async with self.session.post(
                f"{self.base_url}/api/generate",
                json=payload,
                timeout=aiohttp.ClientTimeout(total=120)
            ) as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get("response", "")
                else:
                    error_text = await response.text()
                    self.logger.error(f"Ollama API错误: {response.status} - {error_text}")
                    raise Exception(f"Ollama API错误: {response.status}")
                    
        except Exception as e:
            self.logger.error(f"调用Ollama API失败: {e}")
            raise
    
    async def chat(self, messages: List[Dict[str, str]], 
                   temperature: float = 0.7, max_tokens: int = 2048) -> str:
        """
        聊天模式生成响应
        
        Args:
            messages: 消息列表，格式为[{"role": "user", "content": "..."}]
            temperature: 温度参数
            max_tokens: 最大token数
            
        Returns:
            生成的文本响应
        """
        await self._ensure_session()
        
        payload = {
            "model": self.model,
            "messages": messages,
            "stream": False,
            "options": {
                "temperature": temperature,
                "num_predict": max_tokens
            }
        }
        
        try:
            async with self.session.post(
                f"{self.base_url}/api/chat",
                json=payload,
                timeout=aiohttp.ClientTimeout(total=120)
            ) as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get("message", {}).get("content", "")
                else:
                    error_text = await response.text()
                    self.logger.error(f"Ollama Chat API错误: {response.status} - {error_text}")
                    raise Exception(f"Ollama Chat API错误: {response.status}")
                    
        except Exception as e:
            self.logger.error(f"调用Ollama Chat API失败: {e}")
            raise
    
    async def list_models(self) -> List[Dict[str, Any]]:
        """列出可用的模型"""
        await self._ensure_session()
        
        try:
            async with self.session.get(f"{self.base_url}/api/tags") as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get("models", [])
                else:
                    self.logger.error(f"获取模型列表失败: {response.status}")
                    return []
                    
        except Exception as e:
            self.logger.error(f"获取模型列表失败: {e}")
            return []
    
    async def health_check(self) -> bool:
        """健康检查"""
        await self._ensure_session()
        
        try:
            async with self.session.get(f"{self.base_url}/api/tags") as response:
                return response.status == 200
        except Exception:
            return False
