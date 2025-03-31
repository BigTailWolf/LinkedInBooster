// 监听扩展安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// 监听扩展图标点击事件
chrome.action.onClicked.addListener((tab) => {
  console.log('扩展图标被点击');
  if (tab.id) {
    // 切换侧边栏状态
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

// 监听来自侧边栏的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'closeSidePanel') {
    console.log('关闭侧边栏');
    // 通知用户点击扩展图标来关闭侧边栏
    chrome.tabs.sendMessage(sender.tab!.id!, {
      action: 'showCloseMessage'
    });
  }
}); 