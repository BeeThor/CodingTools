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

### 🔒 SM2加密解密
- 密钥对生成与导入
- 支持公钥加密/私钥解密
- 一键复制与粘贴功能

### 📋 Base64编解码
- 文本内容编码/解码
- 支持批量处理
- 实时编码结果预览

### 🔐 哈希计算
- 支持MD5/SHA1/SHA256
- 实时计算多种哈希值
- 结果一键复制

### 🔗 URL编解码
- URL参数编码/解码
- 特殊字符自动处理
- 支持中文编码

### 🎲 密码生成器
- 自定义密码长度和规则
- 密码强度实时检测
- 批量生成功能

### ⏰ 时间工具
- 时间戳与日期转换
- 多种日期格式化模板
- 获取当前时间功能

### 🖼️ 图片工具
- 图片转Base64编码
- Base64转图片预览
- 支持拖拽上传图片

### 📱 二维码工具
- 自定义尺寸生成
- 支持样式配置
- 二维码预览功能

### 🌐 网络工具
- IP地址归属地查询
- 端口扫描功能
- ISP与时区信息查看

### 📂 文件工具
- 文件哈希计算
- 文件类型检测
- 支持拖拽文件处理

## 🚀 快速开始

### 本地部署

<details>
<summary>展开查看部署步骤</summary>

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

<table>
<tr>
<td width="50%" align="center">

### 🎨 前端技术

- **框架**: Vue 3 + Composition API
- **构建**: Vite
- **样式**: TailwindCSS

</td>
<td width="50%" align="center">

### 🔐 加密能力

- **SM2加密**: sm-crypto
- **哈希计算**: crypto-js

</td>
</tr>
<tr>
<td width="50%" align="center">

### 📦 状态管理

- **核心**: Vue Reactivity API
- **组件**: 自定义组件

</td>
<td width="50%" align="center">

### 🛠 开发工具

- **IDE**: VS Code
- **代码规范**: ESLint + Prettier

</td>
</tr>
</table>

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

