const postingBtn = $('#posting-btn');
const deleteBtn = $('deleting-btn');

function postingNew(event) {
    event.preventDefault();
    const Title = $('#posting-title');
    const Content = $('#posting-content');

    const postingNew = {
        title: Title.val(),
        content: Content.val(),
    };
fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify(postingNew),
    headers: { 'Content-Type': 'application/json' }
    }) 
    .then(response => response.json())
    .then(response => {
        if (!response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('NOT FOUND');
        }
    })
};

const deletingPost = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch('/api/posts/${id}', {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert( 'NOT FOUND');

        }
        }
    };

postingBtn.on('click', postingNew);
deleteBtn.on('click', deletingPost);