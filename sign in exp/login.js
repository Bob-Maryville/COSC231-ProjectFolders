document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const remember = loginForm.remember.checked;

        // Perform form validation and submission
        if (validateEmail(email) && validatePassword(password)) {
            // Submit form data to the server
            const formData = {
                email: email,
                password: password,
                remember: remember
            };

            console.log('Form submitted', formData);

        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        // Add your own password validation logic if needed
        return password.length >= 6;
    }
});
