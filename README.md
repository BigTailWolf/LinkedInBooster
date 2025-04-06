# LinkedIn Booster

LinkedIn Booster 是一个 Chrome 扩展，旨在帮助招聘人员更高效地处理 LinkedIn 上的候选人信息。它提供了一个便捷的侧边栏界面，集成了候选人信息提取、批量处理等功能。

## 功能特点

### 1. 账户明细区
- 显示账户信息
- 使用统计
- 订阅状态

### 2. LinkedIn 操作区
- 自动识别当前页面类型（搜索结果页/个人资料页）
- 提取候选人信息
- 批量发送连接请求

### 3. AI 集成区
- AI 驱动的候选人分析
- 智能评估和建议
- 自动化报告生成

## 安装说明

### 普通用户安装（推荐）
1. 下载最新版本的扩展包（`dist` 目录）
2. 在 Chrome 浏览器中：
   - 打开 `chrome://extensions/`
   - 启用右上角的"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择下载的 `dist` 目录

### 开发者安装
如果你想要参与开发或修改扩展，请按照以下步骤：

1. 克隆仓库到本地
2. 安装依赖：
   ```bash
   npm install
   ```
3. 构建项目：
   ```bash
   npm run build
   ```
4. 在 Chrome 中：
   - 打开 `chrome://extensions/`
   - 启用"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目的 `dist` 目录

### 使用说明
1. 安装扩展后，在 LinkedIn 网站上点击扩展图标
2. 侧边栏会显示在页面右侧
3. 根据当前页面类型，可以使用相应的功能：
   - 在搜索结果页：提取候选人信息、批量发送连接请求
   - 在个人资料页：查看候选人详细信息、生成评估报告

## 技术栈
- TypeScript
- Webpack
- Chrome Extension API
- HTML/CSS

## 开发指南
1. 项目结构：
   ```
   LinkedInBooster/
   ├── src/
   │   ├── background.ts    # 后台脚本
   │   ├── content.ts       # 内容脚本
   │   ├── sidepanel.ts     # 侧边栏脚本
   │   ├── content.css      # 样式文件
   │   └── sidepanel.html   # 侧边栏模板
   ├── dist/                # 构建输出目录
   ├── icons/               # 扩展图标
   ├── manifest.json        # 扩展配置文件
   └── webpack.config.js    # Webpack 配置
   ```

2. 开发流程：
   - 修改源代码
   - 运行 `npm run build`
   - 在 Chrome 中重新加载扩展

## 注意事项
- 本扩展需要访问 LinkedIn 网站的权限
- 使用批量功能时请遵守 LinkedIn 的使用条款
- 建议合理控制批量操作的频率，避免触发 LinkedIn 的限制
- 安装扩展时需要启用"开发者模式"，这是 Chrome 的安全要求

## 常见问题
1. **为什么需要启用开发者模式？**
   - 这是 Chrome 的安全机制，允许安装未通过 Chrome 网上应用店审核的扩展
   - 启用开发者模式不会影响扩展的正常使用

2. **如何更新扩展？**
   - 下载新版本的 `dist` 目录
   - 在 Chrome 扩展管理页面删除旧版本
   - 按照安装说明重新安装新版本

## 贡献指南
欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证
MIT License
