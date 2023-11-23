document.addEventListener("DOMContentLoaded", function () {
  

    const investmentAmountInput = document.getElementById("investmentAmount");
    const investmentPeriodInput = document.getElementById("investmentPeriod");
    const periodValue = document.getElementById("periodValue");
    const roiElement = document.getElementById("roi");
    const totalAmountElement = document.getElementById("totalAmount");
    const chartCanvas = document.getElementById("cumulativeChart");

    investmentAmountInput.addEventListener("input", calculateTotalAmount);
    investmentPeriodInput.addEventListener("input", updatePeriodValue);

    // Initialize Cumulative Balance Chart.js chart
    const ctx = chartCanvas.getContext("2d");
    const cumulativeChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Cumulative Balance",
                    data: [],
                    borderColor: "blue",
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: "Initial Amount",
                    data: [],
                    borderColor: "green",
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: "Return on Investment",
                    data: [],
                    borderColor: "red",
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: "linear",
                    position: "bottom",
                },
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    function calculateTotalAmount() {
        const investmentAmount = parseFloat(investmentAmountInput.value) || 0;
        const investmentPeriod = parseInt(investmentPeriodInput.value) || 0;

        const cumulativeData = [];
        const initialData = [];
        const roiData = [];

        for (let i = 1; i <= investmentPeriod; i++) {
            const totalAmount = investmentAmount * 0.05 * i;
            const totalWithPrincipal = investmentAmount + totalAmount;

            cumulativeData.push(totalWithPrincipal.toFixed(2));
            initialData.push(investmentAmount.toFixed(2));
            roiData.push(totalAmount.toFixed(2));
        }

        updateChart(cumulativeData, initialData, roiData);

        const roiValue = cumulativeData.length > 0 ? (cumulativeData[cumulativeData.length - 1] - investmentAmount).toFixed(2) : "0.00";
        roiElement.textContent = "Return on Investment: R" + roiValue;
        totalAmountElement.textContent = "Total Amount Returned: R" + (cumulativeData.length > 0 ? cumulativeData[cumulativeData.length - 1] : "0.00");
    }

    function updateChart(cumulativeData, initialData, roiData) {
        cumulativeChart.data.labels = Array.from({ length: cumulativeData.length }, (_, i) => i + 1);
        cumulativeChart.data.datasets[0].data = cumulativeData;
        cumulativeChart.data.datasets[1].data = initialData;
        cumulativeChart.data.datasets[2].data = roiData;
        cumulativeChart.update();
    }

    function updatePeriodValue() {
        const period = parseInt(investmentPeriodInput.value);
        periodValue.textContent = period + (period === 1 ? " month" : " months");
        calculateTotalAmount();
    }
});
