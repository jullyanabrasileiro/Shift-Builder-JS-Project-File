window.onload = function () {
    document.getElementById("loginForm").onsubmit = function (event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert("Login successful!");
            window.location.href = "home.html";  
        } else {
            alert("Invalid email or password!"); 
        }
    };
};
