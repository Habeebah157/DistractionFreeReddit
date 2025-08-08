// Remove main feed container on Reddit homepage and subreddits
function removeFeed() {
  // Reddit's feed container class (updated to current layout)
  // It usually uses the data-testid or main content with role="main"
  
  // Try removing the main feed div
  const feed = document.querySelector('div[role="main"]');
  if (feed) {
    feed.style.display = 'none';
  }

  // Alternatively remove posts container by known class names (if needed)
  // For older Reddit or new layout, might be:
  // document.querySelector('.rpBJOHq2PR60pnwJlUyP0')?.remove();
}

// Run on page load
removeFeed();

// Also observe for dynamic content loads (Reddit uses SPA style navigation)
const observer = new MutationObserver(() => {
  removeFeed();
});
observer.observe(document.body, { childList: true, subtree: true });
