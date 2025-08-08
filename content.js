function removeFeedAndSidebarAndPopularLink() {
  // Remove main feed
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.style.display = 'none';
  }

  // Remove "Recent Posts" sidebar
  const recentPosts = document.querySelector('aside.recent-posts-right-rail');
  if (recentPosts) {
    recentPosts.style.display = 'none';
  }

  // Remove the "Popular" link by href
  const popularLink = document.querySelector('a[href="/r/popular/"]');
  if (popularLink) {
    popularLink.style.display = 'none';
  }
}

// Run on page load
removeFeedAndSidebarAndPopularLink();

// Observe dynamic content loading (Reddit uses SPA navigation)
const observer = new MutationObserver(() => {
  removeFeedAndSidebarAndPopularLink();
});
observer.observe(document.body, { childList: true, subtree: true });
