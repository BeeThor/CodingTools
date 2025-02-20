# CodingTools - 多功能编码工具集 🛠️

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D.svg?logo=vue.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg?logo=tailwind-css)

</div>

<div align="center">
<div style="background: linear-gradient(45deg, #f6f8fa, #ffffff); padding: 20px; border-radius: 12px; margin: 20px 0; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">

[📝 项目介绍](#-项目介绍) |
[🚀 快速开始](#-快速开始) |
[🏗 技术架构](#-技术架构) |
[📸 系统截图](#-系统截图) |
[🤝 贡献指南](#-贡献指南)

</div>
</div>

## 📝 项目介绍

<div style="background-color: #ffffff; border-radius: 12px; padding: 24px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

CodingTool 是一个现代化的编码工具集合，提供多种常用的编码、加密和解密功能。项目采用 Vue 3 和 TailwindCSS 构建，具有简洁美观的界面和流畅的用户体验。

</div>

### ✨ 主要特性

<div class="feature-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 20px 0;">

<div style="padding: 20px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<h4 style="margin: 0; display: flex; align-items: center; gap: 8px; color: #1e40af;">
🔒 <b>SM2加密解密</b>
</h4>
<ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569;">
<li>密钥对生成与导入</li>
<li>支持公钥加密/私钥解密</li>
<li>一键复制与粘贴功能</li>
</ul>
</div>

<div style="padding: 20px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<h4 style="margin: 0; display: flex; align-items: center; gap: 8px; color: #1e40af;">
📋 <b>Base64编解码</b>
</h4>
<ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569;">
<li>文本内容编码/解码</li>
<li>支持批量处理</li>
<li>实时编码结果预览</li>
</ul>
</div>

<div style="padding: 20px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<h4 style="margin: 0; display: flex; align-items: center; gap: 8px; color: #1e40af;">
🔐 <b>哈希计算</b>
</h4>
<ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569;">
<li>支持MD5/SHA1/SHA256</li>
<li>实时计算多种哈希值</li>
<li>结果一键复制</li>
</ul>
</div>

<div style="padding: 20px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<h4 style="margin: 0; display: flex; align-items: center; gap: 8px; color: #1e40af;">
🔗 <b>URL编解码</b>
</h4>
<ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569;">
<li>URL参数编码/解码</li>
<li>特殊字符自动处理</li>
<li>支持中文编码</li>
</ul>
</div>

<div style="padding: 20px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<h4 style="margin: 0; display: flex; align-items: center; gap: 8px; color: #1e40af;">
🎲 <b>密码生成器</b>
</h4>
<ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569;">
<li>自定义密码长度和规则</li>
<li>密码强度实时检测</li>
<li>批量生成功能</li>
</ul>
</div>

<div style="padding: 20px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<h4 style="margin: 0; display: flex; align-items: center; gap: 8px; color: #1e40af;">
⏰ <b>时间工具</b>
</h4>
<ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569;">
<li>时间戳与日期转换</li>
<li>多种日期格式化模板</li>
<li>获取当前时间功能</li>
</ul>
</div>

<div style="padding: 20px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<h4 style="margin: 0; display: flex; align-items: center; gap: 8px; color: #1e40af;">
🖼️ <b>图片工具</b>
</h4>
<ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569;">
<li>图片转Base64编码</li>
<li>Base64转图片预览</li>
<li>支持拖拽上传图片</li>
</ul>
</div>

<div style="padding: 20px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<h4 style="margin: 0; display: flex; align-items: center; gap: 8px; color: #1e40af;">
📱 <b>二维码工具</b>
</h4>
<ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569;">
<li>自定义尺寸生成</li>
<li>支持样式配置</li>
<li>二维码预览功能</li>
</ul>
</div>

<div style="padding: 20px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<h4 style="margin: 0; display: flex; align-items: center; gap: 8px; color: #1e40af;">
🌐 <b>网络工具</b>
</h4>
<ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569;">
<li>IP地址归属地查询</li>
<li>端口扫描功能</li>
<li>ISP与时区信息查看</li>
</ul>
</div>

<div style="padding: 20px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<h4 style="margin: 0; display: flex; align-items: center; gap: 8px; color: #1e40af;">
📂 <b>文件工具</b>
</h4>
<ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569;">
<li>文件哈希计算</li>
<li>文件类型检测</li>
<li>支持拖拽文件处理</li>
</ul>
</div>

</div>

## 🚀 快速开始

<div style="background-color: #ffffff; border-radius: 12px; padding: 24px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

### 本地部署

<div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 10px 0;">

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

</div>
</div>

## 🏗 技术架构

<div style="background-color: #ffffff; border-radius: 12px; padding: 24px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">

<div style="background-color: #f8fafc; border-radius: 8px; padding: 16px;">
<h4 style="margin: 0 0 12px 0; color: #1e40af;">🎨 前端技术</h4>

- **框架**: Vue 3 + Composition API
- **构建**: Vite
- **样式**: TailwindCSS
</div>

<div style="background-color: #f8fafc; border-radius: 8px; padding: 16px;">
<h4 style="margin: 0 0 12px 0; color: #1e40af;">🔐 加密能力</h4>

- **SM2加密**: sm-crypto
- **哈希计算**: crypto-js
</div>

<div style="background-color: #f8fafc; border-radius: 8px; padding: 16px;">
<h4 style="margin: 0 0 12px 0; color: #1e40af;">📦 状态管理</h4>

- **核心**: Vue Reactivity API
- **组件**: 自定义组件
</div>

<div style="background-color: #f8fafc; border-radius: 8px; padding: 16px;">
<h4 style="margin: 0 0 12px 0; color: #1e40af;">🛠 开发工具</h4>

- **IDE**: VS Code
- **代码规范**: ESLint + Prettier
</div>

</div>
</div>

## 📁 项目结构

<div style="background-color: #ffffff; border-radius: 12px; padding: 24px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

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

</div>

## 📸 系统截图

<div align="center">
  <p><strong>功能界面展示</strong></p>
  <table border="0" cellspacing="0" cellpadding="20">
    <tr>
      <td align="center" width="50%">
        <img src="./public/img/1.png" alt="主界面" width="400" style="border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"/>
        <p><em>SM2 加解密功能</em></p>
      </td>
      <td align="center" width="50%">
        <img src="./public/img/2.png" alt="SM2加密" width="400" style="border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"/>
        <p><em>哈希计算工具</em></p>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="./public/img/3.png" alt="Base64转换" width="400" style="border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"/>
        <p><em>二维码工具</em></p>
      </td>
      <td align="center">
        <img src="./public/img/4.png" alt="哈希计算" width="400" style="border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"/>
        <p><em>网络工具</em></p>
      </td>
    </tr>
  </table>
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

<div align="center" style="background: linear-gradient(45deg, #f6f8fa, #ffffff); padding: 20px; border-radius: 12px; margin: 20px 0; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
  <p>如果这个项目对您有帮助，请考虑给它一个星星 ⭐️</p>
  <p style="margin: 10px 0 0 0;">Made with ❤️ by BeeThor</p>
</div>

