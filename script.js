console.log("Manage My Shifts is running!");

// Register page
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

    window.location.href = "index.html";
};

// Login
document.getElementById("loginForm").onsubmit = function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert("Login successful!");

        window.location.href = "dashboard.html"; 
    } else {
        alert("Invalid email or password!");
    }
};

// Shift management
function loadShifts() {
    let shifts = JSON.parse(localStorage.getItem("shifts")) || [];
    let shiftsTableBody = document.getElementById("shiftsTable").getElementsByTagName("tbody")[0];
    shiftsTableBody.innerHTML = ''; 

    shifts.forEach(function(shift, index) {
        let row = shiftsTableBody.insertRow();
        row.innerHTML = `
            <td>${shift.date}</td>
            <td>${shift.startTime}</td>
            <td>${shift.endTime}</td>
            <td><button onclick="deleteShift(${index})">Delete</button></td>
        `;
    });

    displayTopEarningMonth(shifts);
}

function displayTopEarningMonth(shifts) {
    let earningsByMonth = {};

    shifts.forEach(shift => {
        const month = shift.date.split("-")[1];
        const profit = calculateProfit(shift);

        if (!earningsByMonth[month]) {
            earningsByMonth[month] = 0;
        }
        earningsByMonth[month] += parseFloat(profit);
    });

    let topMonth = "";
    let maxEarnings = 0;
    for (const month in earningsByMonth) {
        if (earningsByMonth[month] > maxEarnings) {
            maxEarnings = earningsByMonth[month];
            topMonth = month;
        }
    }

    const topEarningMonthElement = document.getElementById("topEarningMonth");
    topEarningMonthElement.textContent = `Month: ${topMonth} | Earnings: $${maxEarnings.toFixed(2)}`;
}

function calculateProfit(shift) {
    const startTime = new Date(`1970-01-01T${shift.startTime}:00`);
    const endTime = new Date(`1970-01-01T${shift.endTime}:00`);
    const durationInHours = (endTime - startTime) / (1000 * 60 * 60); 
    return (durationInHours * shift.hourlyWage).toFixed(2);
}

// Validate form
function validateForm(date, startTime, endTime) {
    if (!date || !startTime || !endTime) {
        alert("Please fill in all fields.");
        return false;
    }

    let currentDate = new Date();
    let selectedDate = new Date(date);
    if (selectedDate < currentDate) {
        alert("The date cannot be in the past.");
        return false;
    }

    if (startTime >= endTime) {
        alert("End time must be after start time.");
        return false;
    }

    return true;
}

// Add new shift
function addShift(event) {
    event.preventDefault();

    const date = document.getElementById("shiftDate").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const hourlyWage = document.getElementById("hourlyWage").value;
    const workplace = document.getElementById("workplace").value;

    const newShift = {
        date,
        startTime,
        endTime,
        hourlyWage: parseFloat(hourlyWage),
        workplace
    };

    const shifts = JSON.parse(localStorage.getItem("shifts")) || [];

    shifts.push(newShift);

    localStorage.setItem("shifts", JSON.stringify(shifts));

    window.location.href = "home.html";
}

// Profile edit
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
