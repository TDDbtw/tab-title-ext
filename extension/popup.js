const likeInput = document.getElementById('likeCount');
const commentInput = document.getElementById('commentCount');
const startButton = document.getElementById('start');

function validateInputs() {
    const likes = parseInt(likeInput.value, 10);
    const comments = parseInt(commentInput.value, 10);

    if (likes > 0 && comments > 0) {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
    }
}

likeInput.addEventListener('input', validateInputs);
commentInput.addEventListener('input', validateInputs);

startButton.addEventListener('click', () => {
    const likes = parseInt(likeInput.value, 10);
    const comments = parseInt(commentInput.value, 10);

    chrome.runtime.sendMessage({
        action: 'start_automation',
        likeCount: likes,
        commentCount: comments
    });
});

