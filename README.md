# Miks Valorant Agent 🎮

Valorant 特工信息查询站 - 特工技能详解、对比工具和使用攻略

## 功能特性

- ✅ 所有特工信息展示
- ✅ 按角色筛选（决斗者/先锋/控场者/哨卫）
- ✅ 特工搜索功能
- ✅ 特工详情页（技能展示）
- ✅ 中文界面
- ✅ 响应式设计（支持移动端）

## 技术栈

- **Frontend:** Next.js 14 + React 18
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Data:** [Valorant API](https://valorant-api.com/)
- **Deployment:** Vercel

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
```

## 部署

### Vercel 部署

1. 安装 Vercel CLI
```bash
npm install -g vercel
```

2. 部署
```bash
vercel
```

3. 生产部署
```bash
vercel --prod
```

## 项目结构

```
miks-valorant-agent/
├── app/
│   ├── page.tsx              # 首页（特工列表）
│   ├── agents/
│   │   └── [uuid]/
│   │       └── page.tsx      # 特工详情页
│   ├── layout.tsx            # 全局布局
│   └── globals.css           # 全局样式
├── components/
│   └── AgentCard.tsx         # 特工卡片组件
├── lib/
│   ├── api.ts                # API 调用封装
│   └── types.ts              # TypeScript 类型定义
└── public/
    └── images/               # 静态图片
```

## API 使用

本项目使用 [Valorant API](https://valorant-api.com/) 获取特工数据：

- 获取所有特工：`GET https://valorant-api.com/v1/agents`
- 获取特工详情：`GET https://valorant-api.com/v1/agents/{uuid}`

## 开发计划

- [ ] 特工对比功能
- [ ] 特工使用攻略
- [ ] 克制关系展示
- [ ] 地图推荐
- [ ] 个人战绩统计（需要 Riot API）

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 链接

- [GitHub](https://github.com/joshua-9919/miks-valorant-agent)
- [Valorant 官网](https://playvalorant.com/)
- [Valorant API](https://valorant-api.com/)

---

Made with ❤️ by 周建华
