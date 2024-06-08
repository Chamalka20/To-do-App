function signup() {
    var userName = $('#new-username').val();
    var password = $('#new-password').val();
    var email = $('#email').val();

    if (userName === '' || password === '' || email === '') {
        $('#error-msg').text('All fields are required.');
        return;
    }

    var userData = {
        userName: userName,
        password: password,
        email: email
    };

    $.ajax({
        url: 'http://localhost:3000/signup',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function(response) {
             // Store the userId in localStorage
            localStorage.setItem('userId', response.userId);
            // Handle the success response from the backend
            alert('Signup successful! You can now log in.');
            window.location.href = '../html/toDolist.html'; 
        },
        error: function(xhr, status, error) {
            // Handle the error response from the backend
            $('#error-msg').text('Error signing up: ' + xhr.responseText);
        }
    });
}
