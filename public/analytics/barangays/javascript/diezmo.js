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
    item.addEventListener('click', function(e) {
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

// Data for each category including dynamic barangays
const dataForCategories = {
    All: {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [1, 2, 94, 1], 
        subCategories: ['None'],
        subCategoryCounts: ['None'],  
        barData: [1, 2, 94, 1],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 98,
            population: '6,622',
            stat3: 'Pulo',
            stat4: 'Casile',
            marketDemands: 0,
            marketGaps: 'Tourism'
            
        }
    },
    'Automotive Services': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 0, 0], 
        subCategories: ['Auto Repair Services', 'Body and Welding Shops', 'Car wash and Detailing', 'Fuel Services',
            'Motorcycle Dealer', 'Specialized Automotive Services', 'Vulcanizing Services'
        ],
        subCategoryCounts: [0, 0, 0, 0, 0, 0, 0], 
        barData: [0, 0, 0, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 0,
            population: '6,622',
            stat3: 'Pulo',
            stat4: 'Poblacion Dos',
            marketDemands: 0
        }
    },
    'Construction and Real Estate': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [1, 0, 22, 0], 
        subCategories: ['Apartment/Apartelle', 'Building Contractor', 'Construction Services', 'Contractor', 'Electrical/Mechanical Contractor', 'Facilities and Infrastracture',
            'General Contruction', 'General Contractor', 'General Engineering Contractor', 'Heavy Equipment Rental', 'Lessor (Commercial Space', 'Lessor (Excluding Subd. Operators/Lessor',
            'Lessor (Industrial Space', 'Lessor (Residential)', 'Lot Rental', 'Memorial Park', 'Property Rental and Management', 'Real Estate Developer', 'Realty', 'Realy Broker', 'Services Contractor',
            'Warehousing'
        ], 
        subCategoryCounts: [0, 0, 1, 0, 1, 0, 0, 2, 1, 0, 5, 8, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1],  
        barData: [1, 0, 22, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 23,
            population: '6,622',
            stat3: 'Pulo',
            stat4: 'Butong',
            marketDemands: 0
        }
    },
    'Cooperative Business': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 3, 0],
        subCategories: ['Cooperative'], 
        subCategoryCounts: [3],  
        barData: [0, 0, 3, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 3,
            population: '6,622',
            stat3: 'Sala',
            stat4: 'Butong',
            marketDemands: 0
        }
    },
    'Creative and Media Service': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 1, 0],
        subCategories: ['Advertising and Marketing', 'Event Design Service', 'Photography and Videography', 'Printing Services'], 
        subCategoryCounts: [1, 0, 0, 0],  
        barData: [0, 0, 1, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 1,
            population: '6,622',
            stat3: 'Banaybanay',
            stat4: 'Poblacion Dos',
            marketDemands: 0
        }
    },
    'Education Services': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 0, 0],
        subCategories: ['Driving School', 'Learning Center', 'Private School', 'School Service', 'Training Center', 'Tutorial Services',
            'Vocational and Special Schools' 
        ], 
        subCategoryCounts: [0, 0, 0, 0, 0, 0, 0],  
        barData: [0, 0, 0, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 0,
            population: '6,622',
            stat3: 'Mamatid',
            stat4: 'Diezmo',
            marketDemands: 0
        }
    },
    'Entertainment and Recreation': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 1, 0],
        subCategories: ['Dining and Leisure', 'Egames/Ebingo', 'Fireworks and Pyrotechnics', 'Golf Cart Rental', 'Party Rentals', 'Play Center',
            'Sound & Light Rental', 'Sports and Fitness' 
        ], 
        subCategoryCounts: [0, 0, 0, 0, 0, 0, 0, 1],  
        barData: [0, 0, 1, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 1,
            population: '6,622',
            stat3: 'Banlic',
            stat4: 'Poblacion Uno',
            marketDemands: 0
        }
    },
    'Finance and Insurance': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 11, 0],
        subCategories: ['ATM Off Site Stations', 'Banks', 'Financing Institutions', 'General Financial Services', 'Holding Company', 'Insurance Agents/Companies',
            'Lending Investor', 'Money Remittance/ Bill Payment', 'Pawnshop & Financial Services', 'Payment Center' 
        ], 
        subCategoryCounts: [4, 2, 0, 0, 5, 0, 0, 0, 0, 0],  
        barData: [0, 0, 11, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 11,
            population: '6,622',
            stat3: 'Banlic',
            stat4: 'Baclaran',
            marketDemands: 0
        }
    },
    'Food Services': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 17, 0],
        subCategories: ['Burger Stand', 'Canteen' , 'Catering Service', 'Coffee Shop', 'Eatery', 'Fast Food', 'Food Concessionaire', 'Food Stand',
            'Milk Tea Shop', 'Panciteria', 'Refreshment Parlor', 'Restaurant', 'Restobar'
        ], 
        subCategoryCounts: [0, 12, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],  
        barData: [0, 0, 17, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 17,
            population: '6,622',
            stat3: 'Pulo',
            stat4: 'Bigaa',
            marketDemands: 0
        }
    },
    'Healthcare Services': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 2, 0],
        subCategories: ['Animal Bite Clinics', 'Dental Clinics', 'Diagnostic and Medical Clinics', 'Dialysis Center', 'Gerontology Services', 'Hospital', 
            'Laboratory Equipment Repair Service',  'Maternity Clinics & Family Planning', 'Medical and Healthcare Services', 'Optical Clinics', 'Pharmacies', 
             'Pharmacy & Medical Clinics',  'Rehabilitation Centers',  'Service Contractor',  'Therapy Centers',  'Veterinary Clinics'
        ],  
        subCategoryCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],  
        barData: [0, 0, 2, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 2,
            population: '6,622',
            stat3: 'Pulo',
            stat4: 'Casile',
            marketDemands: 0
        }
    },
    'IT and Digital Services': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 1, 0],
        subCategories: ['Administrative Support Services', 'Audio & Video System Services', 'Computer Services / IT Services', 'Computer Shop', 'Customer Support & BPO Service',
            'Internet Service Provider', 'Repair Service', 'Service Contractor', 'Telecom Services', 'Virtual Assistance' 
        ], 
        subCategoryCounts: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],  
        barData: [0, 0, 1, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 1,
            population: '6,622',
            stat3: 'Sala',
            stat4: 'Poblacion Dos',
            marketDemands: 0
        }
    },
    'Manufacturing and Production': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 20, 0],
        subCategories: ['Agricultural Products', 'Contractor and Service Manufacturing', 'Essential Manufacturer', 'Fabrication Services',
            'Food Products Manufacturer', 'Garment Manufacturer', 'General Manufacturing', 'Glass & Aluminum Fabrication Services', 'Hollowblock Making',
            'Industrial Equipment Services', 'Machine Fabrication and Shop', 'Metal Fabrication', 'Non-Essential Manufacturer', 'PEZA Registered Business',
            'Plastic Products Manufacturer', 'Specialty Manufacturing', 'Woodcraft'  
        ], 
        subCategoryCounts: [0, 2, 1, 0, 1, 0, 1, 0, 0, 0, 0, 2, 3, 9, 0, 1, 0],  
        barData: [0, 0, 20, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 20,
            population: '6,622',
            stat3: 'Diezmo',
            stat4: 'Poblacion Uno',
            marketDemands: 0
        }
    },
    'Personal and Household Services': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 0, 0],
        subCategories: ['Air Conditioner Services', 'Bottle Cleaning', 'Funeral Services', 'Furniture & Carpentry', 'Gown/Barong/Dress/Toga Rental',
            'Janitorial Services', 'Kitchen Equipment Repair Services', 'Laundy Shops', 'Pest Control', 'Plumbing Services', 'Refrigerator & Air Con Repair Services',
            'Service Contractor', 'Tailor and Dress Shop', 'Upholstery and Repair Shop' 
        ], 
        subCategoryCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
        barData: [0, 0, 0, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 0,
            population: '6,622',
            stat3: 'Mamatid',
            stat4: 'Pittland',
            marketDemands: 0
        }
    },
    'Personal Care Services': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 0, 0],
        subCategories: ['Aesthetic Services', 'Barbershop', 'Beauty Taylor', 'Fitness Gym', 'Home Massage Services',
            'Nail Spa', 'Skin care Center' 
        ], 
        subCategoryCounts: [0, 0, 0, 0, 0, 0, 0],  
        barData: [0, 0, 0, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 0,
            population: '6,622',
            stat3: 'Pulo',
            stat4: 'Niugan',
            marketDemands: 0
        }
    },
    'Professional Services': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 0, 1],
        subCategories: ['Accounting Agencies', 'Administrative Office Services', 'Administrative Support Services', 'Business Agent', 'Calibration Services',
            'Consultancy and Management Services', 'Contracting and Manpower Services', 'Design Services', 'Emission and Testing Center', 'Engineering and Technical Services',
            'Organizations', 'Referral Service', 'Repair and Maintenance Services', 'Security Agency', 'Water Treatment and Testing Services'  
        ], 
        subCategoryCounts: [0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0],  
        barData: [0, 0, 0, 1],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 4,
            population: '6,622',
            stat3: 'Banaybanay',
            stat4: 'Poblacion Dos',
            marketDemands: 0
        }
    },
    'Retail Stores': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 0, 1],
        subCategories: ['Clothing and Apparel', 'Convenience Store', 'Electronics and Gadgets', 'Food and Beverage', 'Fuel and Energy Supplies', 'Furniture and Home Decor',
            'General Merchandise', 'Grocery and Supermarkets', 'Hardware and Constructiom Supplies', 'Health and Personal Care', 'Household Supplies', 'Online Shops', 'Sari-sari Store',
            'School and Office Supplies', 'Specialty Stores', 'Vehicle and Parts Supplies', 'Water Supply' 
        ], 
        subCategoryCounts: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
        barData: [0, 0, 0, 1],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 1,
            population: '6,622',
            stat3: 'Banlic',
            stat4: 'Diezmo',
            marketDemands: 0
        }
    },
    'Tourism and Hospitality': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 0, 0, 0],
        subCategories: ['Hotel', 'Resort', 'Travel Agency'
        ], 
        subCategoryCounts: [0, 0, 0],  
        barData: [0, 0, 0, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 0,
            population: '6,622',
            stat3: 'Pulo',
            stat4: 'Niugan',
            marketDemands: 0
        }
    },
    'Transportation and Logistics': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 1, 8, 0 ],
        subCategories: ['Car Rental', 'Common Courier', 'Delivery Services', 'Forwarder', 'Hauling Services', 'Logistic Services', 'Operator & Drivers Association',
            'Service Contractor', 'Shuttle Service/Transport', 'Transport Services', 'Trucking Services/Transport', 'Vehicle Storage', 'Warehous and Storage Services'
        ], 
        subCategoryCounts: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 8],  
        barData: [0, 1, 8, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 9,
            population: '6,622',
            stat3: 'Pulo',
            stat4: 'Poblacion Dos',
            marketDemands: 0
        }
    },
    'Wholesale and Distribution': {
        barangays: ['Diezmo Road', 'East Road', 'LISP 1', 'St. Felix Ville'],
        counts: [0, 1, 4, 0],
        subCategories: ['Agricultural Products', 'Auction', 'Automotive', 'Cleaning Supplies', 'Electronics Products', 'Essential/ Non Essential', 'Food Products', 'Fuel and Energy Supplies', 
            'Industrial and Construction Supplies', 'Junk Shops', 'Medical and Health Supplies', 'Non Essential', 'Office & Packaging Supplies', 'Recycle Materials', 'Service Contractor', 'Trading'
        ], 
        subCategoryCounts: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2],  
        barData: [10, 1, 4, 0],
        pieData: [579, 821, 636, 2225, 1755, 543, 245],
        stats: {
            totalBusinesses: 5,
            population: '6,622',
            stat3: 'Banaybanay',
            stat4: 'Poblacion Tres',
            marketDemands: 0
        }
    },
};

// Function to update the business categories table (barangays) based on the selected category
function updateBusinessCategoriesTable(category) {
    const tableBody = document.getElementById('businessCategoriesTable').querySelector('tbody');
    const categoryHeader = document.getElementById('categoryHeader'); // Select the header

    tableBody.innerHTML = ''; // Clear the table body before adding new rows

    // Update the category name in the table header
    categoryHeader.textContent = category;

    const selectedCategoryData = dataForCategories[category];

    // Use the dynamically selected barangays
    const selectedBarangays = selectedCategoryData.barangays;

    // Loop through the selected barangays and populate the table
    selectedBarangays.forEach((barangay, index) => {
        const row = document.createElement('tr');

        // Create the cell for barangay name
        const nameCell = document.createElement('td');
        nameCell.textContent = barangay;
        row.appendChild(nameCell);

        // Create the cell for count
        const countCell = document.createElement('td');
        countCell.textContent = selectedCategoryData.counts[index];
        row.appendChild(countCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// Function to update the subcategories table based on the selected category
function updateSubCategoriesTable(category) {
    const tableBody = document.getElementById('subCategoriesTable').querySelector('tbody');
    const subCategoryHeader = document.getElementById('subCategoryHeader'); // Select the header for subcategories

    tableBody.innerHTML = ''; // Clear the table body before adding new rows

    // Update the subcategory header with the selected category
    subCategoryHeader.textContent = `Sub Categories for ${category}`;

    const selectedCategoryData = dataForCategories[category];

    // Loop through the subcategories and populate the table
    selectedCategoryData.subCategories.forEach((subCategory, index) => {
        const row = document.createElement('tr');

        // Create the cell for subcategory name
        const nameCell = document.createElement('td');
        nameCell.textContent = subCategory;
        row.appendChild(nameCell);

        // Create the cell for count
        const countCell = document.createElement('td');
        countCell.textContent = selectedCategoryData.subCategoryCounts[index];
        row.appendChild(countCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// Initial table population for the default category ("All")
updateBusinessCategoriesTable('All');
updateSubCategoriesTable('All');

// Attach event listener to the dropdown to update the tables and charts when a category is selected
document.getElementById('dateRange').addEventListener('change', function () {
    const selectedCategory = this.value;
    updateBusinessCategoriesTable(selectedCategory);  // Updates barangay counts
    updateSubCategoriesTable(selectedCategory);       // Updates subcategory counts
    updateChartsAndStats(selectedCategory);  // Updates charts and stats
});

// Function to update stats and charts (already in my code)
function updateStats(stats) {
    document.getElementById('totalBusinesses').textContent = stats.totalBusinesses;
    document.getElementById('population').textContent = stats.population;
    document.getElementById('stat3').textContent = stats.stat3;
    document.getElementById('stat4').textContent = stats.stat4;
    document.getElementById('marketDemands').textContent = stats.marketDemands;
    document.getElementById('marketGaps').textContent = stats.marketGaps;
}

function updateChartsAndStats(category) {
    const selectedData = dataForCategories[category];

    // Update Line Chart
    pageViewsChart.data.datasets[0].data = selectedData.barData;
    pageViewsChart.update();

    // Update Pie Chart
    webTrafficConcentrationChart.data.datasets[0].data = selectedData.pieData;
    webTrafficConcentrationChart.update();

    // Update Stats
    updateStats(selectedData.stats);
}

// Initial chart creation (line chart and pie chart)
const ctxPageViews = document.getElementById('pageViews').getContext('2d');
const pageViewsChart = new Chart(ctxPageViews, {
    type: 'line',
    data: {
        labels: dataForCategories.All.barangays, // Dynamically use barangays from default category
        datasets: [{
            label: 'Businesses',
            data: dataForCategories.All.barData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true
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

//PIE GRAPH
const ctxWebTrafficConcentration = document.getElementById('webTrafficConcentration').getContext('2d');
const webTrafficConcentrationChart = new Chart(ctxWebTrafficConcentration, {
    type: 'pie',
    data: {
        labels: ['Children 0-5','Children 6-12', 'Children 13-17', 'Children 18-35', 'Adult 36-50', 'Adult 51-65', 'Adult 66-above'], // Dynamically use barangays from default category
        datasets: [{
            label: 'Traffic Source',
            data: dataForCategories.All.pieData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',   // Soft Red
                'rgba(54, 162, 235, 0.2)',   // Light Blue
                'rgba(255, 206, 86, 0.2)',   // Light Yellow
                'rgba(75, 192, 192, 0.2)',   // Soft Teal
                'rgba(153, 102, 255, 0.2)',  // Light Purple
                'rgba(255, 159, 64, 0.2)',   // Orange
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',   // Red
                'rgba(54, 162, 235, 1)',   // Blue
                'rgba(255, 206, 86, 1)',   // Yellow
                'rgba(75, 192, 192, 1)',   // Teal
                'rgba(153, 102, 255, 1)',  // Purple
                'rgba(255, 159, 64, 1)',   // Orange
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});