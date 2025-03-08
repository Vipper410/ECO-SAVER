document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("tableBody");
    const addEntryBtn = document.getElementById("addEntryBtn");
    const ctx = document.getElementById("consumptionChart").getContext("2d");

    // Function to extract data and update the chart
    function updateChart() {
        const rows = tableBody.querySelectorAll("tr");
        let dates = [];
        let consumptions = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            dates.push(cells[0].textContent);
            consumptions.push(parseInt(cells[2].textContent));
        });

        chart.data.labels = dates;
        chart.data.datasets[0].data = consumptions;
        chart.update();
    }

    // Initialize Chart.js
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Electricity Consumed Each Month",
                data: [],
                borderColor: "#f04193",
                fill: false,
                tension: 0.1
            }]
        }
    });

    // Initial chart update
    updateChart();

    // Event listener to delete rows
    tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            event.target.parentElement.parentElement.remove();
            updateChart();
        }
    });

    // Add new entry
    addEntryBtn.addEventListener("click", function () {
        const date = prompt("Enter Date (YYYY-MM-DD):");
        const bill = prompt("Enter Bill Amount:");
        const consumed = prompt("Enter Consumed Units:");

        if (date && bill && consumed) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${date}</td>
                <td>${bill}</td>
                <td>${consumed}</td>
                <td><button class="delete-btn">X</button></td>
            `;
            tableBody.appendChild(newRow);
            updateChart();
        }
    });
});