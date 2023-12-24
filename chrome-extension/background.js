chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  // Get information about the removed tab
  chrome.tabs.get(tabId, function(tab) {
    // Check for errors and if the URL contains 'youtube'
    if (!chrome.runtime.lastError && tab && tab.url && tab.url.includes('youtube')) {
      // Save the state of the web scraper function before the tab is closed
      chrome.tabs.sendMessage(tabId, { action: 'saveWebScraperState' });
    }
  });
});