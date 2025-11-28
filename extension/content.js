function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomItems(arr, n) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

async function automateFeed(likeCount, commentCount) {
    console.log(`Starting automation: Likes=${likeCount}, Comments=${commentCount}`);

    console.log("Scrolling to load posts...");
    for (let i = 0; i < 5; i++) {
        window.scrollTo(0, document.body.scrollHeight);
        await sleep(2000);
    }
    window.scrollTo(0, 0);
    await sleep(2000);

    const posts = Array.from(document.querySelectorAll('.feed-shared-update-v2'));

    if (posts.length === 0) {
        console.error("No posts found. Make sure you are logged in.");
        return;
    }

    const postsToLike = getRandomItems(posts, likeCount);
    const postsToComment = getRandomItems(posts, commentCount);

    console.log(`Selected ${postsToLike.length} posts to like.`);
    console.log(`Selected ${postsToComment.length} posts to comment.`);



    for (const post of postsToLike) {
        try {
            const likeButton = post.querySelector('button[aria-label^="React Like"], button.react-button__trigger');

            if (likeButton) {
                const label = likeButton.getAttribute('aria-label') || "";
                if (!label.toLowerCase().includes('undo') && !likeButton.classList.contains('react-button--active')) {
                    likeButton.click();
                    console.log("Liked a post.");
                    await sleep(1000 + Math.random() * 2000);
                } else {
                    console.log("Post already liked, skipping.");
                }
            } else {
                console.log("Like button not found for a post.");
            }
        } catch (e) {
            console.error("Error liking post:", e);
        }
    }



    for (const post of postsToComment) {
        try {
            const commentButton = post.querySelector('button[aria-label^="Comment"], button.comment-button');

            if (commentButton) {
                commentButton.click();
                await sleep(2000); 

                const commentInput = post.querySelector('.comments-comment-box__editor, .ql-editor');

                if (commentInput) {
                    commentInput.focus();
                    document.execCommand('insertText', false, 'Just a quick test comment');
                    await sleep(1000);

                    const submitButton = post.querySelector('button.comments-comment-box__submit-button, button.artdeco-button--primary');
                    if (submitButton && !submitButton.disabled) {
                        submitButton.click();
                        console.log("Commented.");
                        await sleep(2000 + Math.random() * 2000);
                    } else {
                        console.log("submit button not found or disabled.");
                    }
                } else {
                    console.log("comment input not found.");
                }
            } else {
                console.log("comment button not found.");
            }
        } catch (e) {
            console.error("Error commenting on post:", e);
        }
    }

    console.log("Automation complete.");
    alert("Automation complete!");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'config_automation') {
        automateFeed(request.likeCount, request.commentCount);
    }
});

