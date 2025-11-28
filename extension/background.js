chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start_automation') {
        startAutomation(request.likeCount, request.commentCount);
    }
});

function startAutomation(likeCount, commentCount) {
    const url = 'https://www.linkedin.com/feed/';
    chrome.tabs.create({ url: url, active: true }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (tabId === tab.id && info.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);

                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['content.js']
                }, () => {

                    chrome.tabs.sendMessage(tabId, {
                        action: 'config_automation',
                        likeCount: likeCount,
                        commentCount: commentCount
                    });
                });
            }
        });
    });
}

