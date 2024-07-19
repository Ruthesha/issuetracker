document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Login successful!');
        window.location.href = 'main_page.html'; 
    });
});
