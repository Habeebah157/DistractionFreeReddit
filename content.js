function removeFeedAndSidebarAndPopularLink() {
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.style.display = 'none';
  }

  const recentPosts = document.querySelector('aside.recent-posts-right-rail');
  if (recentPosts) {
    recentPosts.style.display = 'none';
  }

  const popularLink = document.querySelector('a[href="/r/popular/"]');
  if (popularLink) {
    popularLink.style.display = 'none';
  }
}

removeFeedAndSidebarAndPopularLink();

const observer = new MutationObserver(() => {
  removeFeedAndSidebarAndPopularLink();
});
observer.observe(document.body, { childList: true, subtree: true });
