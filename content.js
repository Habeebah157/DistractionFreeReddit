function hideFeed() {
  const feed = document.querySelector('.masonryContainer');
  if (feed) feed.style.display = 'none';
}

function showFeed() {
  const feed = document.querySelector('.masonryContainer');
  if (feed) feed.style.display = '';
}

// Runs initially when extension is loaded on the page
chrome.storage.sync.get(['hideHome'], (data) => {
  if (data.hideHome) hideFeed();
});

// Listen for toggle messages from popup.js
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "toggleHide") {
    chrome.storage.sync.get(['hideHome'], (data) => {
      if (data.hideHome) {
        hideFeed();
      } else {
        showFeed();
      }
    });
  }
});

// Handle Pinterest's dynamic navigation (single-page app)
let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    chrome.storage.sync.get(['hideHome'], (data) => {
      if (data.hideHome) hideFeed();
    });
  }
}).observe(document, { subtree: true, childList: true });
