// Data for each category
const dataForCategories = {
    All: {
        barData: [1200, 1900, 3000, 5000, 2300, 3200, 4200],
        pieData: [55, 25, 15, 5],
        stats: {
            totalBusinesses: 1234,
            population: 5678,
            stat3: 91011,
            stat4: 121314,
            websiteVisits: 20582
        }
    },
    Retail: {
        barData: [500, 1000, 1500, 2000, 2500, 3000, 3500],
        pieData: [50, 20, 20, 10],
        stats: {
            totalBusinesses: 1234,
            population: 1678,
            stat3: 11011,
            stat4: 121314,
            websiteVisits: 10582
        }
    },
    Coffee: {
        barData: [300, 600, 900, 1200, 1500, 1800, 2100],
        pieData: [40, 30, 20, 10],
        stats: {
            totalBusinesses: 2234,
            population: 2678,
            stat3: 21011,
            stat4: 221314,
            websiteVisits: 20582
        }
    },
    Industry: {
        barData: [800, 1200, 1600, 2000, 2400, 2800, 3200],
        pieData: [60, 15, 15, 10],
        stats: {
            totalBusinesses: 3234,
            population: 3678,
            stat3: 31011,
            stat4: 321314,
            websiteVisits: 30582
        }
    },
    Laundry: {
        barData: [400, 800, 1200, 1600, 2000, 2400, 2800],
        pieData: [45, 25, 20, 10],
        stats: {
            totalBusinesses: 4234,
            population: 4678,
            stat3: 41011,
            stat4: 421314,
            websiteVisits: 40582
        }
    },
    Shop: {
        barData: [700, 1400, 2100, 2800, 3500, 4200, 4900],
        pieData: [55, 20, 15, 10],
        stats: {
            totalBusinesses: 5234,
            population: 5678,
            stat3: 51011,
            stat4: 521314,
            websiteVisits: 50582
        }
    },
    'Whole Sale': {
        barData: [600, 1200, 1800, 2400, 3000, 3600, 4200],
        pieData: [65, 15, 10, 10],
        stats: {
            totalBusinesses: 6234,
            population: 6678,
            stat3: 61011,
            stat4: 621314,
            websiteVisits: 60582
        }
    }
};

// Function to update the stats in the left section
function updateStats(stats) {
    document.getElementById('totalBusinesses').textContent = stats.totalBusinesses;
    document.getElementById('population').textContent = stats.population;
    document.getElementById('stat3').textContent = stats.stat3;
    document.getElementById('stat4').textContent = stats.stat4;
    document.getElementById('websiteVisits').textContent = stats.websiteVisits;
}

// Function to update the charts and stats based on the selected category
function updateChartsAndStats(category) {
    const selectedData = dataForCategories[category];

    // Update Bar Chart
    pageViewsChart.data.datasets[0].data = selectedData.barData;
    pageViewsChart.update();

    // Update Pie Chart
    webTrafficConcentrationChart.data.datasets[0].data = selectedData.pieData;
    webTrafficConcentrationChart.update();

    // Update Stats
    updateStats(selectedData.stats);
}

// Attach event listener to the dropdown
document.getElementById('dateRange').addEventListener('change', function () {
    const selectedCategory = this.value;
    updateChartsAndStats(selectedCategory);
});

// Function to update the charts based on the selected category
function updateCharts(category) {
    const selectedData = dataForCategories[category];

    // Update Bar Chart
    pageViewsChart.data.datasets[0].data = selectedData.barData;
    pageViewsChart.update();

    // Update Pie Chart
    webTrafficConcentrationChart.data.datasets[0].data = selectedData.pieData;
    webTrafficConcentrationChart.update();
}

// Attach event listener to the dropdown
document.getElementById('dateRange').addEventListener('change', function () {
    const selectedCategory = this.value;
    updateCharts(selectedCategory);
});

// Initial chart creation
const ctxPageViews = document.getElementById('pageViews').getContext('2d');
const pageViewsChart = new Chart(ctxPageViews, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Page Views',
            data: dataForCategories.All.barData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctxWebTrafficConcentration = document.getElementById('webTrafficConcentration').getContext('2d');
const webTrafficConcentrationChart = new Chart(ctxWebTrafficConcentration, {
    type: 'pie',
    data: {
        labels: ['Organic Search', 'Direct', 'Referral', 'Social Media'],
        datasets: [{
            label: 'Traffic Source',
            data: dataForCategories.All.pieData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});