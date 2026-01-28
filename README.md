# Companion AI - 跨平台对话类应用

基于 UniApp (Vue3) 开发的跨平台对话类应用，支持 H5、微信小程序、Android 和 iOS 平台。

## � 项目演示

> [点击观看真机演示视频](./demo_video.mp4)

## �📱 功能特性

### 1. 对话列表页
- ✅ 展示会话记录（头像、昵称、最后消息、时间、未读数）
- ✅ 支持下拉刷新
- ✅ 支持上拉加载
- ✅ 点击跳转聊天详情

### 2. 聊天详情页
- ✅ 展示完整对话记录
- ✅ 支持文本和图片消息
- ✅ 左右分布区分发送方
- ✅ 底部输入框发送消息
- ✅ 发送后自动滚动
- ✅ 消息发送动画效果
- ✅ AI 自动回复模拟

### 3. 联系人详情页
- ✅ 展示联系人完整信息
- ✅ 头像、昵称、等级、个性签名
- ✅ 在线状态显示
- ✅ 支持返回交互

### 4. 个人中心页
- ✅ 展示当前用户信息
- ✅ 功能入口展示
- ✅ 设置和帮助入口

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| UniApp | 跨平台开发框架 |
| Vue3 | 前端框架 (Composition API) |
| Pinia | 状态管理 |
| SCSS | 样式预处理器 |
| Vite | 构建工具 |

## 📁 项目结构

```
chat-app/
├── pages/                  # 页面文件
│   ├── index/             # 对话列表页
│   ├── chat/              # 聊天详情页
│   ├── contact/           # 联系人详情页
│   └── profile/           # 个人中心页
├── components/            # 公共组件
│   ├── ChatBubble.vue    # 聊天气泡
│   ├── MessageInput.vue  # 消息输入框
│   └── UserAvatar.vue    # 用户头像
├── stores/                # Pinia 状态管理
│   └── chat.js           # 聊天状态
├── mock/                  # Mock 数据
│   └── data.js           # 模拟数据
├── styles/                # 样式文件
│   ├── variables.scss    # 样式变量
│   └── app.scss          # 全局样式
├── static/                # 静态资源
│   ├── avatars/          # 头像图片
│   ├── icons/            # 图标资源
│   └── images/           # 其他图片
├── App.vue               # 根组件
├── main.js               # 入口文件
├── manifest.json         # 应用配置
├── pages.json            # 页面配置
└── package.json          # 依赖配置
```

## 🚀 快速开始

### 安装依赖

```bash
cd chat-app
npm install
```

### 运行 H5 版本

```bash
npm run dev:h5
```

访问 http://localhost:8080 查看效果。

### 运行微信小程序

```bash
npm run dev:mp-weixin
```

使用微信开发者工具打开 `dist/dev/mp-weixin` 目录。

### 构建生产版本

```bash
# H5
npm run build:h5

# 微信小程序
npm run build:mp-weixin
```

## 🎨 设计特点

### 配色方案
- **主色调**: 薄荷绿渐变 (#A8D4C2 → #E8D4C4)
- **AI 气泡**: 薄荷绿 (#A8D4C2)
- **用户气泡**: 米橙色 (#E8D4C4)
- **强调色**: 橙色 (#E8AA6E)

### 动画效果
- 页面转场动画（滑入/滑出）
- 消息发送淡入动画
- 点击反馈缩放效果
- 列表项渐显动画

## 📝 注意事项

1. **静态资源**: 项目使用 Mock 数据，头像图片需要放置在 `static/avatars/` 目录下
2. **真机调试**: 需要使用 HBuilderX 或对应平台开发工具进行真机调试
3. **图标资源**: TabBar 图标需要放置在 `static/icons/` 目录下

## 📄 License

MIT License
