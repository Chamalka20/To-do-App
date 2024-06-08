function login() {
    var email = $('#email').val();
    var password = $('#password').val();

    if (email === '' || password === '') {
        $('#error-msg').text('Both email and password are required.');
        return;
    }

    var loginData = {
        email: email,
        password: password
    };

    $.ajax({
        url: 'http://localhost:3000/signIn',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(loginData),
        success: function(response) {
            // Store user ID in localStorage
            localStorage.setItem('userId', response.userId);
            window.location.href = '../html/toDolist.html';
        },
        error: function(xhr, status, error) {
            // Handle the error response from the backend
            $('#error-msg').text('Error signing in: ' + xhr.responseText);
        }
    });
}