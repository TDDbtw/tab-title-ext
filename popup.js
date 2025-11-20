document.getElementById('getTitle').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    const title = currentTab.title || "No title found";

    document.getElementById('title').textContent = title;
  });
});
