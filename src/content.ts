import './content.css';

// 定义组件接口
interface Component {
  render(): HTMLElement;
  destroy(): void;
}

// 账户明细区组件
class AccountDetailsComponent implements Component {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'linkedin-booster-account-details';
  }

  render(): HTMLElement {
    this.element.innerHTML = `
      <div class="linkedin-booster-section">
        <h3>账户明细区</h3>
        <div class="linkedin-booster-placeholder">
          <p>显示账户信息、使用统计和订阅状态</p>
        </div>
      </div>
    `;
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

// LinkedIn 操作区组件
class LinkedInActionsComponent implements Component {
  private element: HTMLElement;
  private isLinkedInPage: boolean;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'linkedin-booster-linkedin-actions';
    this.isLinkedInPage = window.location.hostname.includes('linkedin.com');
  }

  render(): HTMLElement {
    this.element.innerHTML = `
      <div class="linkedin-booster-section">
        <h3>LinkedIn 操作区</h3>
        ${this.isLinkedInPage ? `
          <div class="linkedin-booster-linkedin-content">
            <div class="linkedin-booster-search-status">
              <p>当前页面: ${this.getCurrentPageType()}</p>
            </div>
            <div class="linkedin-booster-actions">
              <button class="linkedin-booster-button" id="extract-candidates">
                提取候选人信息
              </button>
              <button class="linkedin-booster-button" id="batch-connect">
                批量发送连接请求
              </button>
            </div>
          </div>
        ` : `
          <div class="linkedin-booster-placeholder">
            <p>请在 LinkedIn 页面使用此功能</p>
          </div>
        `}
      </div>
    `;

    // 添加事件监听器
    if (this.isLinkedInPage) {
      const extractButton = this.element.querySelector('#extract-candidates');
      const batchConnectButton = this.element.querySelector('#batch-connect');

      if (extractButton) {
        extractButton.addEventListener('click', () => this.handleExtractCandidates());
      }

      if (batchConnectButton) {
        batchConnectButton.addEventListener('click', () => this.handleBatchConnect());
      }
    }

    return this.element;
  }

  private getCurrentPageType(): string {
    if (window.location.pathname.includes('/search/')) {
      return '搜索结果页';
    } else if (window.location.pathname.includes('/in/')) {
      return '个人资料页';
    } else {
      return '其他页面';
    }
  }

  private handleExtractCandidates(): void {
    console.log('提取候选人信息');
  }

  private handleBatchConnect(): void {
    console.log('批量发送连接请求');
  }

  destroy(): void {
    this.element.remove();
  }
}

// AI 集成区组件
class AIIntegrationComponent implements Component {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'linkedin-booster-ai-integration';
  }

  render(): HTMLElement {
    this.element.innerHTML = `
      <div class="linkedin-booster-section">
        <h3>AI 集成区</h3>
        <div class="linkedin-booster-placeholder">
          <p>AI 驱动的候选人分析、评估和建议</p>
        </div>
      </div>
    `;
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

// 侧边栏类
class Sidebar {
  private sidebar: HTMLElement;
  private components: Component[];
  public isVisible: boolean = false;

  constructor() {
    console.log('初始化侧边栏');
    this.components = [
      new AccountDetailsComponent(),
      new LinkedInActionsComponent(),
      new AIIntegrationComponent()
    ];
    this.sidebar = this.createSidebar();
  }

  private createSidebar(): HTMLElement {
    console.log('创建侧边栏元素');
    const sidebar = document.createElement('div');
    sidebar.className = 'linkedin-booster-sidebar';
    sidebar.style.transform = 'translateX(100%)'; // 初始状态隐藏

    // 创建头部
    const header = document.createElement('div');
    header.className = 'linkedin-booster-header';
    header.innerHTML = `
      <h2 class="linkedin-booster-title">LinkedIn Booster</h2>
      <button class="linkedin-booster-close">&times;</button>
    `;

    // 创建内容区域
    const content = document.createElement('div');
    content.className = 'linkedin-booster-content';

    // 渲染所有组件
    this.components.forEach(component => {
      content.appendChild(component.render());
    });

    // 添加关闭按钮事件监听
    const closeButton = header.querySelector('.linkedin-booster-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.hide());
    }

    sidebar.appendChild(header);
    sidebar.appendChild(content);
    return sidebar;
  }

  show(): void {
    console.log('显示侧边栏');
    if (!this.isVisible) {
      document.body.appendChild(this.sidebar);
      // 使用 setTimeout 确保过渡动画生效
      setTimeout(() => {
        this.sidebar.style.transform = 'translateX(0)';
      }, 10);
      this.isVisible = true;
    }
  }

  hide(): void {
    console.log('隐藏侧边栏');
    if (this.isVisible) {
      this.sidebar.style.transform = 'translateX(100%)';
      // 等待过渡动画完成后移除元素
      setTimeout(() => {
        this.sidebar.remove();
        this.isVisible = false;
      }, 300);
    }
  }

  destroy(): void {
    this.components.forEach(component => component.destroy());
    this.sidebar.remove();
    this.isVisible = false;
  }
}

// 创建侧边栏实例
console.log('开始创建侧边栏');
const sidebar = new Sidebar();

// 监听来自background的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('收到消息:', request);
  if (request.action === "toggleSidebar") {
    if (sidebar.isVisible) {
      sidebar.hide();
    } else {
      sidebar.show();
    }
  } else if (request.action === 'showCloseMessage') {
    // 显示提示消息
    const message = document.createElement('div');
    message.className = 'linkedin-booster-message';
    message.textContent = '点击扩展图标关闭侧边栏';
    document.body.appendChild(message);
    
    // 3秒后自动移除消息
    setTimeout(() => {
      message.remove();
    }, 3000);
  }
}); 