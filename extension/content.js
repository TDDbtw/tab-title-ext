function getText(selector) {

    const el = document.querySelector(selector);
    return el ? el.innerText.trim() : '';
}

function scrapeProfile() {
    const name = getText('a[href*="/in/"] h1');
    const location = getText('.yiYkcyjQHafThnMcYsIVClEBeeeuDxZZhNg.mt2 span.text-body-small');
    const about = getText('.ZMCWehAdpmVLGSdEWkvjqLWHPtkMJyeiBxEw .visually-hidden') || 'N/A';
    const bio = getText('.text-body-medium.break-words');
    let follower_count = parseInt(
        document.querySelector("li span.t-bold")?.innerText.replace(/,/g, "") || "N/A",
        10
    );
    let connection_count =document.querySelector("li span.t-black--light span.t-bold")?.innerText || "N/A"

    const data = {
        name,
        url: window.location.href,
        about,
        bio,
        location,
        follower_count,
        connection_count
    };

    console.log('Scraped data:', data);
    chrome.runtime.sendMessage({ action: 'data_scraped', data: data });
}

setTimeout(scrapeProfile, 3000);
