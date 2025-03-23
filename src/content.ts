interface SidebarMessage {
  action: string;
}

// 创建侧边栏
function createSidebar(): void {
  // 避免重复注入
  if (document.getElementById('custom-sidebar')) return;

  // 注入侧边栏 HTML
  const sidebar = document.createElement('div');
  sidebar.id = 'custom-sidebar';
  sidebar.style.display = 'none'; // 初始状态设为隐藏
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <h2>Sidebar</h2>
      <button id="toggle-btn">关闭</button>
    </div>
    <div class="sidebar-content">
      <p>这是一个自定义侧边栏！</p>
      <input type="text" id="sidebar-input" placeholder="输入内容...">
      <button id="submit-btn">提交</button>
      <p id="result">结果会显示在这里</p>
    </div>
  `;
  document.body.appendChild(sidebar);

  // 添加事件监听器
  const toggleBtn = document.getElementById('toggle-btn') as HTMLButtonElement;
  const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
  const input = document.getElementById('sidebar-input') as HTMLInputElement;
  const result = document.getElementById('result') as HTMLParagraphElement;

  toggleBtn.addEventListener('click', () => {
    sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
  });

  submitBtn.addEventListener('click', () => {
    const value = input.value;
    result.textContent = `你输入了: ${value}`;
    input.value = ''; // 清空输入框
  });
}

// 确保在页面加载完成后创建侧边栏
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createSidebar);
} else {
  createSidebar();
}

// 监听来自background的消息
chrome.runtime.onMessage.addListener((request: SidebarMessage, sender, sendResponse) => {
  if (request.action === "toggleSidebar") {
    const sidebar = document.getElementById('custom-sidebar');
    if (sidebar) {
      sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    }
  }
}); 