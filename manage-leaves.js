// load leaves
function loadLeaves() {
    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];
    let tableBody = document.querySelector("#leavesTable tbody");
    tableBody.innerHTML = "";

    leaves.forEach((leave, index) => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${leave.date}</td>
            <td>${leave.reason}</td>
            <td><button onclick="deleteLeave(${index})">Delete</button></td>
        `;
    });
}

// date validation
function isValidDate(date) {
    let today = new Date().toISOString().split("T")[0];
    return date >= today;
}

// add
document.getElementById("leaveForm").onsubmit = function (event) {
    event.preventDefault();

    let date = document.getElementById("leaveDate").value;
    let reason = document.getElementById("leaveReason").value;

    if (!isValidDate(date)) {
        alert("Date must be in the future!");
        return;
    }

    let newLeave = { date, reason };
    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];
    leaves.push(newLeave);
    localStorage.setItem("leaves", JSON.stringify(leaves));

    loadLeaves();
    document.getElementById("leaveForm").reset();
};

// delete breaks
function deleteLeave(index) {
    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];
    leaves.splice(index, 1);
    localStorage.setItem("leaves", JSON.stringify(leaves));
    loadLeaves();
}

window.onload = loadLeaves;
