# Flight Finder 网页版 - 部署指南

## 项目概述

Flight Finder 网页版是一个使用 React + TypeScript + Vite 构建的现代化机票查询应用。

## 当前部署状态

✅ **已部署到临时服务器**

- **访问地址**：https://5173-ip7zzx62ohudb3ts9h67g-80b74f4b.sg1.manus.computer
- **部署方式**：临时公网代理
- **有效期**：沙箱活跃期间

## 永久部署方案

### 方案 1：Vercel 部署（推荐）

Vercel 是最适合部署 React 应用的平台，提供免费的静态托管和自动部署。

#### 步骤：

1. **创建 Vercel 账户**
   - 访问 https://vercel.com
   - 使用 GitHub、GitLab 或 Bitbucket 账户登录

2. **连接 Git 仓库**
   - 将项目上传到 GitHub
   - 在 Vercel 中导入项目

3. **自动部署**
   - Vercel 会自动检测到 Vite 项目
   - 配置无需修改，直接部署
   - 每次 Git push 时自动重新部署

4. **获取永久链接**
   - 部署完成后会获得 `*.vercel.app` 域名
   - 支持自定义域名

### 方案 2：Netlify 部署

Netlify 也是优秀的静态网站托管平台。

#### 步骤：

1. **创建 Netlify 账户**
   - 访问 https://netlify.com
   - 使用 GitHub 等账户登录

2. **连接仓库**
   - 选择 GitHub 仓库
   - 配置构建命令：`npm run build`
   - 发布目录：`dist`

3. **部署**
   - Netlify 会自动构建和部署
   - 获得 `*.netlify.app` 域名

### 方案 3：自托管（Docker + 云服务器）

如果需要完全控制，可以使用 Docker 自托管。

#### Dockerfile：

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf：

```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

#### 部署到云服务器：

```bash
# 构建 Docker 镜像
docker build -t flight-finder-web .

# 运行容器
docker run -d -p 80:80 flight-finder-web

# 推送到 Docker Hub（可选）
docker tag flight-finder-web yourusername/flight-finder-web
docker push yourusername/flight-finder-web
```

### 方案 4：GitHub Pages

如果项目是公开的，可以使用 GitHub Pages 免费托管。

#### 步骤：

1. **修改 vite.config.ts**
   ```typescript
   export default {
     base: '/flight-finder-web/',
     // ... 其他配置
   }
   ```

2. **添加部署脚本到 package.json**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **运行部署**
   ```bash
   npm run deploy
   ```

4. **启用 GitHub Pages**
   - 在仓库设置中启用 GitHub Pages
   - 选择 `gh-pages` 分支

## 环境变量配置

如果需要使用 API，可以创建 `.env` 文件：

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Flight Finder
```

在代码中使用：

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## 性能优化

### 已实现的优化：

- ✅ 代码分割（Vite 自动处理）
- ✅ CSS 压缩和优化
- ✅ JavaScript 压缩
- ✅ 响应式设计
- ✅ 本地存储（localStorage）

### 建议的进一步优化：

1. **图片优化**
   ```bash
   npm install vite-plugin-imagemin
   ```

2. **预加载关键资源**
   ```html
   <link rel="preload" href="/assets/critical.js" as="script">
   ```

3. **启用 Gzip 压缩**
   - Vercel/Netlify 自动启用
   - 自托管需要在 nginx/Apache 中配置

## 监控和维护

### 部署后的检查清单：

- [ ] 测试所有功能
- [ ] 检查浏览器兼容性
- [ ] 验证移动端响应式设计
- [ ] 测试本地存储功能
- [ ] 检查控制台是否有错误

### 常见问题排查：

**问题：页面加载缓慢**
- 检查网络连接
- 清除浏览器缓存
- 检查 DevTools 中的网络标签

**问题：样式不显示**
- 确保 CSS 文件已加载
- 检查浏览器开发者工具中的网络标签
- 清除浏览器缓存

**问题：本地存储不工作**
- 检查浏览器是否允许本地存储
- 检查隐私浏览模式
- 查看浏览器控制台错误

## 更新和回滚

### 更新应用：

1. 修改代码
2. 提交到 Git
3. 自动部署（Vercel/Netlify）或手动部署

### 回滚到上一个版本：

- Vercel/Netlify：在部署历史中选择之前的版本
- 自托管：重新构建并部署上一个 Git 提交

## 自定义域名

### 在 Vercel 上添加自定义域名：

1. 项目设置 → Domains
2. 输入域名
3. 按照说明配置 DNS 记录
4. 等待 DNS 传播（通常 24 小时内）

## 备份和恢复

### 备份代码：

```bash
# 创建备份
git clone --mirror https://github.com/yourusername/flight-finder-web.git
```

### 恢复代码：

```bash
# 从备份恢复
git clone --mirror flight-finder-web.git flight-finder-web
```

## 成本估算

| 平台 | 成本 | 特点 |
|------|------|------|
| Vercel | 免费 | 最简单，自动部署 |
| Netlify | 免费 | 功能丰富，构建时间充足 |
| GitHub Pages | 免费 | 仅限公开仓库 |
| 自托管 | $5-50/月 | 完全控制，需要维护 |

## 获取帮助

- Vercel 文档：https://vercel.com/docs
- Netlify 文档：https://docs.netlify.com
- Vite 文档：https://vitejs.dev
- React 文档：https://react.dev

## 总结

推荐使用 **Vercel** 进行永久部署，因为：
- ✅ 完全免费
- ✅ 自动部署
- ✅ 性能优秀
- ✅ 支持自定义域名
- ✅ 无需维护
