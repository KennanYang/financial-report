# Vercel 部署指南

## 项目概述
这是一个包含Python MCP服务器和Next.js Web界面的财务报告系统。

## 部署配置

### 1. 项目设置
- **Framework Preset**: Next.js
- **Root Directory**: `./web-interface`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 2. 环境变量配置
在Vercel项目设置中添加以下环境变量（如果需要）：

```bash
# 数据库连接（如果有）
DATABASE_URL=your_database_url

# API密钥（如果需要）
API_KEY=your_api_key

# 其他配置
NODE_ENV=production
```

### 3. 部署步骤

#### 步骤1: 连接GitHub仓库
1. 在Vercel中点击"New Project"
2. 选择GitHub仓库: `KennanYang/financial-report`
3. 选择分支: `master`

#### 步骤2: 配置项目
- **Project Name**: `financial-report` (或您喜欢的名称)
- **Framework Preset**: `Next.js`
- **Root Directory**: `./web-interface`
- **Build Command**: `npm run build` (自动检测)
- **Output Directory**: `.next` (自动检测)

#### 步骤3: 环境变量
根据需要在"Environment Variables"部分添加配置

#### 步骤4: 部署
点击"Deploy"按钮开始部署

### 4. 项目结构说明

```
financial-report/
├── web-interface/          # Next.js前端应用（Vercel部署目标）
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React组件
│   │   └── lib/          # 工具函数和常量
│   ├── package.json
│   ├── next.config.ts
│   └── vercel.json       # Vercel配置文件（在web-interface目录中）
├── src/                   # Python MCP服务器（不在Vercel部署）
└── config/               # 配置文件
```

### 5. 注意事项

1. **Python后端**: MCP服务器部分不会部署到Vercel，Vercel只部署Next.js前端
2. **API路由**: Next.js API路由位于 `web-interface/src/app/api/`
3. **静态资源**: 公共文件位于 `web-interface/public/`
4. **构建输出**: 构建后的文件位于 `web-interface/.next/`

### 6. 自定义域名（可选）

部署成功后，您可以在Vercel项目设置中配置自定义域名。

### 7. 自动部署

每次推送到 `master` 分支时，Vercel会自动触发新的部署。

## 故障排除

### 常见问题

1. **构建失败**: 检查 `npm run build` 是否在本地成功
2. **依赖问题**: 确保 `package.json` 中的依赖版本兼容
3. **环境变量**: 检查必要的环境变量是否已配置

### 本地测试

在部署前，建议在本地测试：

```bash
cd web-interface
npm install
npm run build
npm start
```

## 支持

如果遇到部署问题，请检查：
1. Vercel部署日志
2. 本地构建是否成功
3. 环境变量配置
4. 项目依赖版本兼容性
