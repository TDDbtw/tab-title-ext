document.getElementById('start').addEventListener('click', () => {
    const urls = document.getElementById('urls').value.split('\n').filter(url => url.trim() !== '');
    if (urls.length < 3) {
        alert('Please enter at least 3 LinkedIn URLs.');
        return;
    }
    chrome.runtime.sendMessage({ action: 'start_scraping', urls: urls });
});
