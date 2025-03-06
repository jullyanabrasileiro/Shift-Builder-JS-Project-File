document.getElementById("registerForm").onsubmit = function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let birthDate = document.getElementById("birthDate").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let user = {
        email,
        username,
        password,
        firstName,
        lastName,
        birthDate
    };

    localStorage.setItem("user", JSON.stringify(user));

    console.log("✅ Registration successful! Everything is OK!");
    alert("User registered successfully!");

    window.location.href = "login.html";
};
