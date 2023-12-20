document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const statusText = document.querySelector('.status');

  // Retrieve the stored state and update the toggle button and text
  chrome.storage.sync.get({ scraperEnabled: false }, function(data) {
    const storedEnabledState = data.scraperEnabled;
    toggleSwitch.checked = storedEnabledState;
    updateStatusText(storedEnabledState);
  });

  toggleSwitch.addEventListener('change', function() {
    const enabled = toggleSwitch.checked;

    // Update the storage with the new state
    chrome.storage.sync.set({ scraperEnabled: enabled });

    // Send a message to the content script to toggle the web scraper function
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, { action: 'toggleWebScraper', enabled });
    });

    // Update the status text
    updateStatusText(enabled);
  });

  function updateStatusText(enabled) {
    statusText.textContent = enabled ? 'Enabled' : 'Disabled';
  }
});
