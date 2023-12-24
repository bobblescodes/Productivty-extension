// Add an event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the toggle switch and status text elements
  const toggleSwitch = document.getElementById('toggleSwitch');
  const statusText = document.querySelector('.status');

  // Retrieve the stored state and update the toggle button and text
  chrome.storage.sync.get({ scraperEnabled: false }, function(data) {
    const storedEnabledState = data.scraperEnabled;
    toggleSwitch.checked = storedEnabledState;
    updateStatusText(storedEnabledState);
  });

  // Add a change event listener to the toggle switch
  toggleSwitch.addEventListener('change', function() {
    const enabled = toggleSwitch.checked;

    // Update the storage with the new state
    chrome.storage.sync.set({ scraperEnabled: enabled });

    // Query the active tab to get its URL
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      // Check if the tab's URL contains 'youtube'
      const isYouTubeTab = tabs[0] && tabs[0].url && tabs[0].url.includes('youtube');

      // Send a message to the content script only if it's a YouTube tab
      if (isYouTubeTab) {
        const tabId = tabs[0].id;
        chrome.tabs.sendMessage(tabId, { action: 'toggleWebScraper', enabled });
      }
    });

    // Update the status text
    updateStatusText(enabled);
  });

  // Function to update the status text
  function updateStatusText(enabled) {
    statusText.textContent = enabled ? 'Enabled' : 'Disabled';
  }
});