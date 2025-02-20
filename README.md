# CodingTools - 多功能编码工具集 🛠️

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D.svg?logo=vue.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg?logo=tailwind-css)

---

**[📝 项目介绍](#-项目介绍)** •
**[✨ 主要特性](#-主要特性)** •
**[🚀 快速开始](#-快速开始)** •
**[🏗 技术架构](#-技术架构)** •
**[📸 系统截图](#-系统截图)**

</div>

## 📝 项目介绍

> CodingTool 是一个现代化的编码工具集合，提供多种常用的编码、加密和解密功能。项目采用 Vue 3 和 TailwindCSS 构建，具有简洁美观的界面和流畅的用户体验。

## ✨ 主要特性

<div align="center">

|🔒 加密解密|🛠 实用工具|🌐 网络工具|📂 文件处理|
|:--|:--|:--|:--|
|• SM2 密钥对生成与导入<br>• Base64 编解码与批量处理<br>• 多种哈希算法计算<br>• URL 编解码与中文支持|• 智能密码生成与强度检测<br>• 时间戳转换与格式化<br>• 图片 Base64 互转<br>• 二维码生成与识别|• IP 地址归属地查询<br>• 端口扫描与检测<br>• ISP 与时区信息查看<br>• 网络连接状态监测|• 文件哈希快速计算<br>• 文件类型智能检测<br>• 文件编码自动识别<br>• 拖拽上传便捷操作|

</div>

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
</details>

## 🏗 技术架构

|![Vue](https://img.shields.io/badge/-Vue_3-4FC08D?style=flat-square&logo=vue.js&logoColor=white)|![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)|![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)|
|:-:|:-:|:-:|
|**前端框架**|**构建工具**|**样式框架**|

### 📦 核心依赖

```bash
vue: ^3.3.0          # 渐进式 JavaScript 框架
vite: ^5.0.0         # 下一代前端构建工具
tailwindcss: ^3.3.0  # 原子化 CSS 框架
sm-crypto: ^0.3.12   # SM2/SM3/SM4 国密算法
crypto-js: ^4.2.0    # 加密算法库
```

## 📁 项目结构

<details>
<summary>展开查看项目结构</summary>

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
</details>

## 📸 系统截图

<div align="center">

| SM2 加解密功能 | 哈希计算工具 |
|:-:|:-:|
| ![主界面](./public/img/1.png) | ![哈希计算](./public/img/2.png) |
| **二维码工具** | **网络工具** |
| ![二维码工具](./public/img/3.png) | ![网络工具](./public/img/4.png) |

</div>

## 🤝 贡献指南

> 我们欢迎所有形式的贡献，无论是新功能、bug修复还是文档改进。请查看我们的[贡献指南](./CONTRIBUTING.md)了解更多信息。

## 📄 开源协议

本项目采用 [MIT](./LICENSE) 协议。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者们！

## 🔄 更新日志

查看完整的[更新日志](./CHANGELOG.md)了解项目的最新变化。

---

<div align="center">

**如果这个项目对您有帮助，请考虑给它一个星星 ⭐️**

Made with ❤️ by BeeThor

</div>

