// background.js
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  // Save the state of the web scraper function before the tab is closed
  chrome.tabs.sendMessage(tabId, { action: 'saveWebScraperState' });
});
