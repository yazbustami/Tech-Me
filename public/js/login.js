const { response } = require("express");

const loggingInFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#userName-input-LI').value.trim();
    const password = document.querySelector('#password-input-LI').value.trim();

    if (userName && password) {
        const answer = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
        }
    };

    document
        .querySelector('#loggingIn-form')
        .addEventListener('submit', loggingInFormHandler);