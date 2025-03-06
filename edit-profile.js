document.getElementById("editProfileForm").onsubmit = function (event) {
    event.preventDefault();

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No user data found!");
        return;
    }

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

    let age = calculateAge(new Date(birthDate));
    if (age < 18 || age > 65) {
        alert("Age must be between 18 and 65.");
        return;
    }

    user.email = email;
    user.username = username;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthDate = birthDate;

    localStorage.setItem("user", JSON.stringify(user));

    alert("Profile updated successfully!");
    window.location.href = "home.html";  
};

function calculateAge(birthDate) {
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html"; 
}

window.onload = loadShifts; 
