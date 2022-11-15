const addCommentBtn = $('addComment-btn');
function addComment(event) {
    event.preventDefault();
    const commentStuff = $('#comment-Stuff');
    const addComment = {
        body: commentStuff.val()
    };
        fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify(addComment),
            headers: { 'Content-Type': 'application/json' }})
            .then(response => response.json())
            .then(response => {
                if (!response.ok) {
                    document.location.replace('/dashboard');
                } else {
                    alert('Error');
                }
            })
};

addCommentBtn.on('click', addComment);