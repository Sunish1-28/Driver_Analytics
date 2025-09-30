import Chart from 'https://cdn.jsdelivr.net/npm/chart.js';

export function renderDriverIncomeChart(rides) {
  const driverTotals = {};

  rides.forEach((ride) => {
    const driver = ride.driverName || "Unknown";
    driverTotals[driver] = (driverTotals[driver] || 0) + parseFloat(ride.totalEarned || 0);
  });

  const ctx = document.getElementById("driverChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(driverTotals),
      datasets: [{
        label: "Total Earnings",
        data: Object.values(driverTotals),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      }],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Earnings by Driver",
        },
      },
    },
  });
}
