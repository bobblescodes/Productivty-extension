// content.js

// Function to blur elements
function blurElements() {
  const elementsToBlur = document.querySelectorAll('ytd-browse.style-scope.ytd-page-manager, div#related.style-scope.ytd-watch-flexy');

  elementsToBlur.forEach((element) => {
    element.style.filter = 'blur(100px)';
  });
}

// Function to unblur elements
function unblurElements() {
  const elementsToUnblur = document.querySelectorAll('ytd-browse.style-scope.ytd-page-manager, div#related.style-scope.ytd-watch-flexy');

  elementsToUnblur.forEach((element) => {
    element.style.filter = 'none';
  });
}

// Function to toggle web scraper function
function toggleWebScraper(enabled) {
  if (enabled) {
    blurElements();
  } else {
    unblurElements();
  }
}

// Listen for the message from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleWebScraper' && window.location.hostname.includes('youtube')) {
    // Toggle the web scraper function
    toggleWebScraper(request.enabled);
  } else if (request.action === 'saveWebScraperState') {
    // Save the state of the web scraper function before the tab is closed
    const toggleSwitch = document.querySelector('input[id="toggleSwitch"]');
    const enabled = toggleSwitch ? toggleSwitch.checked : false;

    chrome.storage.sync.set({ scraperEnabled: enabled }, function() {
      if (chrome.runtime.lastError) {
        // Handle the error, if any
        console.error(chrome.runtime.lastError);
      }
    });
  }
});

// Retrieve the stored state and apply the web scraper function on page load
chrome.storage.sync.get({ scraperEnabled: false }, function(data) {
  toggleWebScraper(data.scraperEnabled);
});
