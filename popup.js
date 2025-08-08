document.addEventListener('DOMContentLoaded', () => {
  const hideToggle = document.getElementById('hideToggle');

  // Load saved state
  chrome.storage.sync.get(['hideHome'], (data) => {
    hideToggle.checked = data.hideHome || false;
  });

  // Save state on change
  hideToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ hideHome: hideToggle.checked });
    
    // Optionally tell the active tab to update immediately
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleHide" });
    });
  });
});
