document.getElementById("addShiftForm").onsubmit = function(event) {
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
};
