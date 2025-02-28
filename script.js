console.log("Manage My Shifts is running!");

//regiter page

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

//login
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

//shift manegement
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
}

//validate form
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


// add new shift
document.getElementById("addShiftForm").onsubmit = function(event) {
    event.preventDefault();

    let shiftDate = document.getElementById("shiftDate").value;
    let shiftStartTime = document.getElementById("shiftStartTime").value;
    let shiftEndTime = document.getElementById("shiftEndTime").value;

    let newShift = {
        date: shiftDate,
        startTime: shiftStartTime,
        endTime: shiftEndTime
    };

    let shifts = JSON.parse(localStorage.getItem("shifts")) || [];
    shifts.push(newShift);

    // save shifts
    localStorage.setItem("shifts", JSON.stringify(shifts));
    loadShifts();

    document.getElementById("addShiftForm").reset();
};

// delete shift
function deleteShift(index) {
    let shifts = JSON.parse(localStorage.getItem("shifts")) || [];
    shifts.splice(index, 1);  

    localStorage.setItem("shifts", JSON.stringify(shifts));

    loadShifts();
}

window.onload = loadShifts;

