const loggingOut = async (event) => {

        const answer = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (answer.ok) {
            document.location.replace('/');
        } else {
            alert(answer.statusText);
        }
    };

    document.querySelector('#loggingOut-link').addEventListener('click', loggingOut);