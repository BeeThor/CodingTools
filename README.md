# CodingTools - 多功能编码工具集

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D.svg?logo=vue.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg?logo=tailwind-css)

</div>


## 📝 项目介绍

CodingTool 是一个现代化的编码工具集合，提供多种常用的编码、加密和解密功能。项目采用 Vue 3 和 TailwindCSS 构建，具有简洁美观的界面和流畅的用户体验。

### ✨ 主要特性

- 🔒 **SM2加密解密**
  - 支持密钥对生成
  - 文本加密/解密
  - 密钥导入导出
- 📋 **Base64编解码**
  - 支持文本编码/解码
  - 支持中文字符
  - 文件Base64转换
- 🔐 **哈希计算**
  - MD5
  - SHA1
  - SHA256
  - SHA512
  - 实时计算
- 🔗 **URL编解码**
  - URL编码/解码
  - 批量处理
  - 特殊字符自动处理

## 🚀 快速开始

### 本地部署

1. **克隆仓库**
```bash
git clone https://github.com/BeeThor/CodingTool.git
cd CodingTool
```

2. **安装依赖**
```bash
npm install
# 或者使用 yarn
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或者使用 yarn
yarn dev
```

4. **构建生产版本**
```bash
npm run build
# 或者使用 yarn
yarn build
```

## 🏗️ 技术架构

- **前端框架**：Vue 3 + Composition API
- **构建工具**：Vite
- **CSS框架**：TailwindCSS
- **加密库**：
  - sm-crypto (SM2加密)
  - crypto-js (哈希计算)
- **状态管理**：Vue Reactivity API
- **UI组件**：自定义组件

## 📁 项目结构

```
CodingTool/
├── src/                # 源代码目录
│   ├── assets/         # 静态资源
│   ├── components/     # Vue组件
│   ├── utils/          # 工具函数
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── index.html          # HTML模板
├── vite.config.js      # Vite配置
└── package.json        # 项目配置
```


## 🤝 贡献指南

我们欢迎所有形式的贡献，无论是新功能、bug修复还是文档改进。请查看我们的[贡献指南](./CONTRIBUTING.md)了解更多信息。

## 📄 开源协议

本项目采用 [MIT](./LICENSE) 协议。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者们！


## 🔄 更新日志

查看完整的[更新日志](./CHANGELOG.md)了解项目的最新变化。 