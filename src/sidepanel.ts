import './content.css';

// 初始化侧边栏
document.addEventListener('DOMContentLoaded', () => {
  console.log('侧边栏初始化');
  
  // 添加关闭按钮事件监听
  const closeButton = document.querySelector('.linkedin-booster-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      console.log('关闭侧边栏');
      // 通知 background 脚本关闭侧边栏
      chrome.runtime.sendMessage({ action: 'closeSidePanel' });
    });
  }

  // 添加按钮事件监听
  const extractButton = document.getElementById('extract-candidates');
  const batchConnectButton = document.getElementById('batch-connect');

  if (extractButton) {
    extractButton.addEventListener('click', () => {
      console.log('提取候选人信息');
      // TODO: 实现提取候选人信息的逻辑
    });
  }

  if (batchConnectButton) {
    batchConnectButton.addEventListener('click', () => {
      console.log('批量发送连接请求');
      // TODO: 实现批量发送连接请求的逻辑
    });
  }
}); 