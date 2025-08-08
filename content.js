function hideFeedIfHome() {
  if (window.location.search.includes('feed=home')) {
    const mainContent = document.querySelector('.main.w-full.min-w-0');
    if (mainContent) mainContent.style.display = 'none';

    const popularLink = document.querySelector('a[href="/r/popular/"]');
    if (popularLink) popularLink.style.display = 'none';
  }
}

function showFeed() {
  const mainContent = document.querySelector('.main.w-full.min-w-0');
  if (mainContent) mainContent.style.display = '';

  const popularLink = document.querySelector('a[href="/r/popular/"]');
  if (popularLink) popularLink.style.display = '';
}

// Listen for popup toggle
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "toggleHide") {
    chrome.storage.sync.get(['hideHome'], (data) => {
      if (data.hideHome) hideFeedIfHome();
      else showFeed();
    });
  }
});

// Initial run on page load + SPA navigation
chrome.storage.sync.get(['hideHome'], (data) => {
  if (data.hideHome) {
    hideFeedIfHome();

    let lastUrl = location.href;
    new MutationObserver(() => {
      const currentUrl = location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        hideFeedIfHome();
      }
    }).observe(document, { subtree: true, childList: true });
  }
});
