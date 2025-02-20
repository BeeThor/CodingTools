# CodingTools - 多功能编码工具集 🛠️

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D.svg?logo=vue.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg?logo=tailwind-css)

</div>

<div align="center">

[📝 项目介绍](#-项目介绍) |
[🚀 快速开始](#-快速开始) |
[🏗 技术架构](#-技术架构) |
[📸 系统截图](#-系统截图) |
[🤝 贡献指南](#-贡献指南)

</div>

## 📝 项目介绍

CodingTool 是一个现代化的编码工具集合，提供多种常用的编码、加密和解密功能。项目采用 Vue 3 和 TailwindCSS 构建，具有简洁美观的界面和流畅的用户体验。

### ✨ 主要特性

| 功能 | 描述 |
|------|------|
| 🔒 **SM2加密解密** | • 支持密钥对生成<br>• 文本加密/解密<br>• 密钥导入导出 |
| 📋 **Base64编解码** | • 支持文本编码/解码<br>• 支持中文字符<br>• 文件Base64转换 |
| 🔐 **哈希计算** | • MD5<br>• SHA1/SHA256/SHA512<br>• 实时计算 |
| 🔗 **URL编解码** | • URL编码/解码<br>• 批量处理<br>• 特殊字符自动处理 |

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

## 🏗 技术架构

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

## 📸 系统截图

<div align="center">
  <p><strong>功能界面展示</strong></p>
  <img src="/public/img/1.png" alt="主界面" width="800"/>
  <p><em>SM2 加解密功能</em></p>
  
  <img src="/public/img/2.png" alt="SM2加密" width="800"/>
  <p><em>哈希计算工具</em></p>
  
  <img src="/public/img/3.png" alt="Base64转换" width="800"/>
  <p><em>二维码工具</em></p>
  
  <img src="/public/img/4.png" alt="哈希计算" width="800"/>
  <p><em>网络工具</em></p>
</div>

## 🤝 贡献指南

我们欢迎所有形式的贡献，无论是新功能、bug修复还是文档改进。请查看我们的[贡献指南](./CONTRIBUTING.md)了解更多信息。

## 📄 开源协议

本项目采用 [MIT](./LICENSE) 协议。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者们！

## 🔄 更新日志

查看完整的[更新日志](./CHANGELOG.md)了解项目的最新变化。

---

<div align="center">
  <p>如果这个项目对您有帮助，请考虑给它一个星星 ⭐️</p>
  <p>Made with ❤️ by BeeThor</p>
</div>

