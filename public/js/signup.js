const signingUpFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#userName-input-SU').value.trim();
    const password = document.querySelector('#password-input-SU').value.trim();

    if (userName && password) {
        const answer = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (answer.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(answer.statusText);
        }
        }
    };

    document
        .querySelector('#signingUp-form')
        .addEventListener('submit', signingUpFormHandler);