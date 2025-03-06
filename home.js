console.log("Manage My Shifts is running!");

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
            <td>${shift.hourlyWage}</td>
            <td>${shift.workplace}</td>
            <td>${calculateProfit(shift)}</td>
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


function filterShifts() {
    const searchTerm = document.getElementById("shiftSearch").value.toLowerCase();
    const dateFrom = document.getElementById("dateFrom").value;
    const dateTo = document.getElementById("dateTo").value;

    let shifts = JSON.parse(localStorage.getItem("shifts")) || [];
    let filteredShifts = shifts.filter(shift => {
        let matchSearch = shift.workplace.toLowerCase().includes(searchTerm) || shift.date.includes(searchTerm);
        let matchDate = true;

        if (dateFrom) matchDate = matchDate && new Date(shift.date) >= new Date(dateFrom);
        if (dateTo) matchDate = matchDate && new Date(shift.date) <= new Date(dateTo);

        return matchSearch && matchDate;
    });


    renderShifts(filteredShifts);
}

function renderShifts(shifts) {
    let shiftsTableBody = document.getElementById("shiftsTable").getElementsByTagName("tbody")[0];
    shiftsTableBody.innerHTML = ''; 

    shifts.forEach(function(shift, index) {
        let row = shiftsTableBody.insertRow();
        row.innerHTML = `
            <td>${shift.date}</td>
            <td>${shift.startTime}</td>
            <td>${shift.endTime}</td>
            <td>${shift.hourlyWage}</td>
            <td>${shift.workplace}</td>
            <td>${calculateProfit(shift)}</td>
            <td><button onclick="deleteShift(${index})">Delete</button></td>
        `;
    });
}

function deleteShift(index) {
    let shifts = JSON.parse(localStorage.getItem("shifts")) || [];
    shifts.splice(index, 1);

    localStorage.setItem("shifts", JSON.stringify(shifts));
    loadShifts(); 
}

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

window.onload = loadShifts;
