// Initialize the data structure to hold category-specific data
const dataForCategories = {
    'All': {
        barangays: [],
        counts: [],
        subCategories: [],
        subCategoryCounts: [],
        barData: [],
        pieData: [],
        stats: {
            totalBusinesses: '',
            population: '',
            stat3: '',
            stat4: '',
            marketDemands: ''
        }
    }
};

// Function to show the loading overlay
function showLoading() {
    document.getElementById('loading-overlay').style.display = 'flex';
}

// Function to hide the loading overlay
function hideLoading() {
    document.getElementById('loading-overlay').style.display = 'none';
}

// Attach the showLoading function to all barangay items
document.querySelectorAll('.barangay-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default action

        // Show the loading overlay
        showLoading();

        // Simulate a delay to hide the loading screen after the content loads
        setTimeout(() => {
            // Navigate to the href link
            window.location.href = this.href;
        }, 2000); // Adjust the timeout as needed
    });
});

// Function to fetch and update the data for categories
async function fetchBarangayData(category) {
    try {
        // Show loading indicator
        showLoading();

        const response = await fetch(`/api/barangay-counts?selectedCategory=${category}`);
        if (!response.ok) {
            throw new Error('Failed to fetch barangay data');
        }
        const data = await response.json();

        // Fetch subcategory data
        const subcategoryResponse = await fetch(`/api/businesssubcategory-counts?selectedCategory=${category}`);
        if (!subcategoryResponse.ok) {
            throw new Error('Failed to fetch subcategory data');
        }
        const subcategoryData = await subcategoryResponse.json();

        // Fetch the population data
        const populationResponse = await fetch("/api/population-barangay");
        if (!populationResponse.ok) {
            throw new Error("Failed to fetch barangay population data");
        }
        const populationData = await populationResponse.json();

    

        // Update the data for the selected category with both barangay data and subcategory data
        updateDataForCategory(category, data, subcategoryData, populationData);

        hideLoading(); // Hide loading after fetching and updating data
    } catch (error) {
        console.error('Error fetching barangay data:', error);
        hideLoading();
    }
}

// Function to update the dataForCategories object with the fetched data
function updateDataForCategory(category, data, subcategoryData, populationData) {
    const counts = data.map(item => Number(item.business_count)); // Ensure counts are numbers
    const barangays = data.map(item => item.barangay_name);

    // Calculate the total number of businesses
    const totalBusinesses = counts.reduce((acc, count) => acc + count, 0).toLocaleString(); // Convert the total to a string with commas for thousands

    // Find the barangay with the most and least businesses
    const maxBusinesses = Math.max(...counts);
    const minBusinesses = Math.min(...counts);

    // Find the index of the barangay with the most and least businesses
    const stat3Index = counts.indexOf(maxBusinesses); // Index of barangay with most businesses
    const stat4Index = counts.indexOf(minBusinesses); // Index of barangay with least businesses

    // Get the barangay names corresponding to the most and least businesses
    const stat3 = barangays[stat3Index] || 'N/A'; // Barangay with the most businesses
    const stat4 = barangays[stat4Index] || 'N/A'; // Barangay with the least businesses

    // Get subcategory names and counts
    const subcategories = subcategoryData.length > 0 ? subcategoryData.map(item => item.subcategory) : ['None'];
    const subcategoryCounts = subcategoryData.length > 0 ? subcategoryData.map(item => Number(item.counts)) : ['None'];

          
    const pieData = populationData.map(item => Number(item.population)); // Ensure population values are numbers


   // Calculate the total population
  const totalPopulation = pieData.reduce((acc, currentValue) => acc + currentValue, 0);


    // Dynamically update the dataForCategories object
    dataForCategories[category] = {
        barangays: barangays,
        counts: counts, // Ensure counts are numbers
        barData: counts, // Ensure barData is numbers
        subCategories: subcategories,
        subCategoryCounts: subcategoryCounts,
        pieData: pieData,
        // Example for pieData, modify as necessary
        stats: {
            totalBusinesses: totalBusinesses,
            population: totalPopulation, // Example, modify based on your data source
            stat3: stat3,
            stat4: stat4,
            marketDemands: 'Diezmo' // Example, modify as necessary
        }
    };

    // Now update the tables and charts with the new data
    updateBusinessCategoriesTable(category);
    updateSubCategoriesTable(category);
    updateStatsAndCharts(category);
}

// Function to update the business categories table
function updateBusinessCategoriesTable(category) {
    const tableBody = document.getElementById('businessCategoriesTable');
    tableBody.innerHTML = ''; // Clear the table body

    const selectedData = dataForCategories[category];

    // Populate table rows
    selectedData.barangays.forEach((barangay, index) => {
        const row = document.createElement('tr');

        const barangayCell = document.createElement('td');
        barangayCell.textContent = barangay;

        const countCell = document.createElement('td');
        countCell.textContent = selectedData.counts[index];

        row.appendChild(barangayCell);
        row.appendChild(countCell);
        tableBody.appendChild(row);
    });
}

// Function to update the subcategories table
function updateSubCategoriesTable(category) {
    const tableBody = document.querySelector('#subCategoriesTable tbody');
    tableBody.innerHTML = ''; // Clear previous rows

    const selectedData = dataForCategories[category];

    // Assuming you have subcategories data, modify as needed
    selectedData.subCategories?.forEach((subCategory, index) => {
        const row = document.createElement('tr');
        row.classList.add('divide-y', 'divide-gray-200'); // Add design consistency

        row.innerHTML = `
            <td class="py-2 px-4 border-b">${subCategory}</td>
            <td class="py-2 px-4 border-b text-right">${selectedData.subCategoryCounts[index]}</td>
        `;

        tableBody.appendChild(row);
    });
}


// Function to update stats and charts
function updateStatsAndCharts(category) {
    const selectedData = dataForCategories[category];

    // Update Stats
    document.getElementById('totalBusinesses').textContent = selectedData.stats.totalBusinesses || 'N/A';
    document.getElementById('population').textContent = selectedData.stats.population;
    document.getElementById('stat3').textContent = selectedData.stats.stat3;
    document.getElementById('stat4').textContent = selectedData.stats.stat4;
    document.getElementById('marketDemands').textContent = selectedData.stats.marketDemands;

    // Hide population container if the category is not "All"
    const populationContainer = document.getElementById('populationContainer');
    if (category === 'All') {
        populationContainer.classList.remove('hidden'); // Show population container
    } else {
        populationContainer.classList.add('hidden'); // Hide population container
    }

    // Update Charts
    updateCharts(selectedData);

    // Toggle visibility of the pie chart based on selected category
    const cabuyaoPopulationGraph = document.getElementById('cabuyaoPopulationGraph');
    if (category === 'All') {
        cabuyaoPopulationGraph.classList.remove('hidden'); // Show the pie chart
    } else {
        cabuyaoPopulationGraph.classList.add('hidden'); // Hide the pie chart
    }
}

// Function to update charts
function updateCharts(selectedData) {
    // Update Line Chart
    pageViewsChart.data.labels = selectedData.barangays;  // Update X-axis labels (barangays)
    pageViewsChart.data.datasets[0].data = selectedData.barData; // Update data for the bars
    pageViewsChart.update(); // Redraw the chart with updated data

    // Update Pie Chart
    webTrafficConcentrationChart.data.labels = selectedData.barangays; // Update Pie Chart labels (barangays)
    webTrafficConcentrationChart.data.datasets[0].data = selectedData.pieData; 
    webTrafficConcentrationChart.update(); // Redraw the chart with updated data
}
// Initialize Line Chart with updated design
const ctxPageViews = document.getElementById('pageViews').getContext('2d');
const pageViewsChart = new Chart(ctxPageViews, {
    type: 'bar',
    data: {
        labels: [],  // This will be updated dynamically
        datasets: [{
            label: 'Businesses Count',
            data: [],  // This will be updated dynamically
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});



// Event listener for dropdown change
document.getElementById('dateRange').addEventListener('change', function () {
    const selectedCategory = this.value;

    // Fetch and update data for the selected category
    fetchBarangayData(selectedCategory);
});

// Initialize with default category (fetch data for 'All' category)
fetchBarangayData('All');


// Function to update the population pie chart with population data
function updatePopulationPieChart(barangays, pieData) {
    webTrafficConcentrationChart.data.labels = barangays; // Update Pie Chart labels (barangays)
    webTrafficConcentrationChart.data.datasets[0].data = pieData; // Update Pie Chart data (population)
    webTrafficConcentrationChart.update(); // Redraw the chart with updated data
}

// Initialize Pie Chart with updated design
const ctxWebTrafficConcentration = document.getElementById('webTrafficConcentration').getContext('2d');
const webTrafficConcentrationChart = new Chart(ctxWebTrafficConcentration, {
    type: 'doughnut',
    data: {
        labels: [], // Will be updated dynamically
        datasets: [{
            label: 'Barangay Population',
            data: [], // Will be updated dynamically
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

