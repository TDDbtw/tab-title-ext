chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start_scraping') {
        processUrls(request.urls);
    } else if (request.action === 'data_scraped') {
        console.log('Data received:', request.data);
        sendDataToBackend(request.data);
        // Close the tab after scraping
        if (sender.tab && sender.tab.id) {
            chrome.tabs.remove(sender.tab.id);
        }
    }
});

let urlsToProcess = [];

function processUrls(urls) {
    urlsToProcess = [...urls];
    processNextUrl();
}

function processNextUrl() {
    if (urlsToProcess.length === 0) {
        console.log('All URLs processed.');
        return;
    }

    const url = urlsToProcess.shift();
    chrome.tabs.create({ url: url, active: true }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (tabId === tab.id && info.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['content.js']
                });
            }
        });
    });
}

function sendDataToBackend(data) {
    fetch('http://localhost:3000/profiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            processNextUrl(); 
        })
        .catch((error) => {
            console.error('Error:', error);
            processNextUrl(); 
        });
}
