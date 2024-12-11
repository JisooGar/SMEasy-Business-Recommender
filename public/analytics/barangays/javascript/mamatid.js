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
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [38, 1, 3, 3, 3, 2, 2, 4, 1, 2, 0, 1, 3, 67, 6, 5, 1, 3, 4, 17, 28, 3, 20, 13, 8, 1, 3, 2, 3, 1, 5], 
        subCategories: ['None'],
        subCategoryCounts: ['None'],  
        barData: [38, 1, 3, 3, 3, 2, 2, 4, 1, 2, 0, 1, 3, 67, 6, 5, 1, 3, 4, 17, 28, 3, 20, 13, 8, 1, 3, 2, 3, 1, 5],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 253,
            population: '56761',
            stat3: 'Phase 2 Mabuhay',
            stat4: 'Montrina Subdivision',
            marketDemands: 'Personal and Household Services',
            
            
        }
    },
    'Automotive Services': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 3, 1, 0, 0, 0, 0, 1, 0, 0], 
        subCategories: ['Auto Repair Services', 'Body and Welding Shops', 'Car wash and Detailing', 'Fuel Services',
            'Motorcycle Dealer', 'Specialized Automotive Services', 'Vulcanizing Services'
        ],
        subCategoryCounts: [4, 1, 0, 5, 0, 1, 0
        ], 
        barData: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 3, 1, 0, 0, 0, 0, 1, 0, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 11,
            population: '56761',
            stat3: 'Blanks, Purok 1',
            stat4: 'Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 5 Mabuhay, Phase 7 Mabuhay, Purok 3, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 2, Value Homes 3',
            marketDemands: '6th'
        }
    },
    'Construction and Real Estate': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [6, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1, 1, 0, 0, 2, 0, 0, 3, 0, 0, 1, 0], 
        subCategories: ['Apartment/Apartelle', 'Building Contractor', 'Construction Services', 'Contractor', 'Electrical/Mechanical Contractor', 'Facilities and Infrastracture',
            'General Contruction', 'General Contractor', 'General Engineering Contractor', 'Heavy Equipment Rental', 'Lessor (Commercial Space', 'Lessor (Excluding Subd. Operators/Lessor',
            'Lessor (Industrial Space', 'Lessor (Residential)', 'Lot Rental', 'Memorial Park', 'Property Rental and Management', 'Real Estate Developer', 'Realty', 'Realy Broker', 'Services Contractor',
            'Warehousing'
        ], 
        subCategoryCounts: [2, 0, 5, 0, 0, 0, 1, 1, 0, 0, 7, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 0
        ],  
        barData: [56, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1, 1, 0, 0, 2, 0, 0, 3, 0, 0, 1, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 20,
            population: '56761',
            stat3: 'Blanks',
            stat4: 'Brillianz Residences, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Mamatid Road, Montrina Subdivision, NIA Road, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 7 Mabuhay, Purok 1, Purok 3, Purok 4, St. Vincent Compound, Value Homes 1, Value Homes 3',
            marketDemands: '9th'
        }
    },
    'Cooperative Business': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        subCategories: ['Cooperative'], 
        subCategoryCounts: [2],  
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 2,
            population: '56761',
            stat3: 'Phase 6 Mabuhay',
            stat4: 'Blanks, Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 2 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 5 Mabuhay, Phase 7 Mabuhay, Purok 1, Purok 2, Purok 3, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2, Value Homes 3',
            marketDemands: '9th'
        }
    },
    'Creative and Media Service': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        subCategories: ['Advertising and Marketing', 'Event Design Service', 'Photography and Videography', 'Printing Services'], 
        subCategoryCounts: [1, 0, 0, 3
        ],  
        barData: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 4,
            population: '56761',
            stat3: 'Blanks, Phase 3 Extension Mabuhay, Phase 4 Mabuhay, Purok 1',
            stat4: 'Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 2 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Mabuhay, Phase 5 Mabuhay, Phase 6 Mabuhay, Phase 7 Mabuhay, Purok 2, Purok 3, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2, Value Homes 3',
            marketDemands: '10th'
        }
    },
    'Education Services': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        subCategories: ['Driving School', 'Learning Center', 'Private School', 'School Service', 'Training Center', 'Tutorial Services',
            'Vocational and Special Schools' 
        ], 
        subCategoryCounts: [0, 2, 8, 0, 0, 0, 0
        ],  
        barData: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 10,
            population: '56761',
            stat3: 'Phase 2 Mabuhay',
            stat4: 'Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 4 Mabuhay, Phase 7 Mabuhay, Purok 1, Purok 2, Purok 3, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2, Value Homes 3',
            marketDemands: '2nd'
        }
    },
    'Entertainment and Recreation': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        subCategories: ['Dining and Leisure', 'Egames/Ebingo', 'Fireworks and Pyrotechnics', 'Golf Cart Rental', 'Party Rentals', 'Play Center',
            'Sound & Light Rental', 'Sports and Fitness' 
        ], 
        subCategoryCounts: [0, 0, 0, 0, 0, 0, 1, 0
        ],  
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 1,
            population: '56761',
            stat3: 'Purok 2',
            stat4: 'Blanks, Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 2 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 5 Mabuhay, Phase 6 Mabuhay, Phase 7 Mabuhay, Purok 1, Purok 3, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2, Value Homes 3',
            marketDemands: '8th'
        }
    },
    'Finance and Insurance': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        subCategories: ['ATM Off Site Stations', 'Banks', 'Financing Institutions', 'General Financial Services', 'Holding Company', 'Insurance Agents/Companies',
            'Lending Investor', 'Money Remittance/ Bill Payment', 'Pawnshop & Financial Services', 'Payment Center' 
        ], 
        subCategoryCounts: [1, 1, 0, 0, 0, 0, 0, 4, 3, 0
        ],  
        barData: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 9,
            population: '56761',
            stat3: 'Blanks, Phase 2 Mabuhay',
            stat4: 'Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 5 Mabuhay, Phase 6 Mabuhay, Phase 7 Mabuhay, Purok 1, Purok 2, Purok 3, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 2',
            marketDemands: '2nd'
        }
    },
    'Food Services': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        subCategories: ['Burger Stand', 'Canteen' , 'Catering Service', 'Coffee Shop', 'Eatery', 'Fast Food', 'Food Concessionaire', 'Food Stand',
            'Milk Tea Shop', 'Panciteria', 'Refreshment Parlor', 'Restaurant', 'Restobar'
        ], 
        subCategoryCounts: [0, 1, 0, 1, 3, 0, 0, 0, 0, 0, 3, 1, 0
        ],  
        barData: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 9,
            population: '56761',
            stat3: 'Phase 2 Mabuhay',
            stat4: 'Blanks, Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 6 Mabuhay, Phase 7 Mabuhay, Purok 1, Purok 2, Purok 3, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2, Value Homes 3',
            marketDemands: '7th'
        }
    },
    'Healthcare Services': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 10, 0, 1, 0, 0, 0, 2, 1, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0],
        subCategories: ['Animal Bite Clinics', 'Dental Clinics', 'Diagnostic and Medical Clinics', 'Dialysis Center', 'Gerontology Services', 'Hospital', 
            'Laboratory Equipment Repair Service',  'Maternity Clinics & Family Planning', 'Medical and Healthcare Services', 'Optical Clinics', 'Pharmacies', 
             'Pharmacy & Medical Clinics',  'Rehabilitation Centers',  'Service Contractor',  'Therapy Centers',  'Veterinary Clinics'
        ],
        subCategoryCounts: [0, 5, 0, 0, 0, 0, 0, 3, 0, 0, 11, 0, 0, 0, 0, 0
        ],  
        barData: [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 10, 0, 1, 0, 0, 0, 2, 1, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 19,
            population: '56761',
            stat3: 'Phase 2 Mabuhay',
            stat4: 'Blanks, Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Main Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 7 Mabuhay, Purok 1, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2, Value Homes 3',
            marketDemands: '6th'
        }
    },
    'IT and Digital Services': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        subCategories: ['Administrative Support Services', 'Audio & Video System Services', 'Computer Services / IT Services', 'Computer Shop', 'Customer Support & BPO Service',
            'Internet Service Provider', 'Repair Service', 'Service Contractor', 'Telecom Services', 'Virtual Assistance' 
        ], 
        subCategoryCounts: [0, 0, 2, 0, 0, 0, 1, 0, 0, 0
        ],  
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 3,
            population: '56761',
            stat3: 'Phase 2 Mabuhay',
            stat4: 'Blanks, Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 5 Mabuhay, Phase 6 Mabuhay, Phase 7 Mabuhay, Purok 1, Purok 2, Purok 3, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2, Value Homes 3',
            marketDemands: '6th'
        }
    },
    'Manufacturing and Production': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 2, 0, 3, 0, 1, 0, 0, 0, 0, 0, 1],
        subCategories: ['Agricultural Products', 'Contractor and Service Manufacturing', 'Essential Manufacturer', 'Fabrication Services',
            'Food Products Manufacturer', 'Garment Manufacturer', 'General Manufacturing', 'Glass & Aluminum Fabrication Services', 'Hollowblock Making',
            'Industrial Equipment Services', 'Machine Fabrication and Shop', 'Metal Fabrication', 'Non-Essential Manufacturer', 'PEZA Registered Business',
            'Plastic Products Manufacturer', 'Specialty Manufacturing', 'Woodcraft'  
        ], 
        subCategoryCounts: [0, 1, 0, 3, 2, 0, 0, 3, 0, 0, 1, 2, 1, 0, 0, 0, 0
        ],  
        barData: [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 2, 0, 3, 0, 1, 0, 0, 0, 0, 0, 1],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 13,
            population: '56761',
            stat3: 'Phase 2 Mabuhay, Purok 1',
            stat4: 'Blanks, Brillianz Residences, Buena Rosario, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 7 Mabuhay, Purok 2, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2',
            marketDemands: '5th'
        }
    },
    'Personal and Household Services': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 1, 1, 0, 0, 1, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        subCategories: ['Air Conditioner Services', 'Bottle Cleaning', 'Funeral Services', 'Furniture & Carpentry', 'Gown/Barong/Dress/Toga Rental',
            'Janitorial Services', 'Kitchen Equipment Repair Services', 'Laundy Shops', 'Pest Control', 'Plumbing Services', 'Refrigerator & Air Con Repair Services',
            'Service Contractor', 'Tailor and Dress Shop', 'Upholstery and Repair Shop' 
        ], 
        subCategoryCounts: [2, 0, 2, 0, 0, 0, 1, 5, 0, 0, 2, 0, 2, 0
        ],  
        barData: [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 1, 1, 0, 0, 1, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 14,
            population: '56761',
            stat3: 'Phase 2 Mabuhay, Phase 6 Mabuhay',
            stat4: 'Blanks, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 5 Mabuhay, Phase 7 Mabuhay, Purok 2, Purok 3, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2, Value Homes 3',
            marketDemands: '1st'
        }
    },
    'Personal Care Services': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        subCategories: ['Aesthetic Services', 'Barbershop', 'Beauty Taylor', 'Fitness Gym', 'Home Massage Services',
            'Nail Spa', 'Skin care Center' 
        ], 
        subCategoryCounts: [0, 0, 1, 2, 1, 0, 0
        ],  
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 4,
            population: '56761',
            stat3: 'Phase 6 Mabuhay',
            stat4: 'Blanks, Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 5 Mabuhay, Phase 7 Mabuhay, Purok 1, Purok 2, Purok 3, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2',
            marketDemands: '6th'
        }
    },
    'Professional Services': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0],
        subCategories: ['Accounting Agencies', 'Administrative Office Services', 'Administrative Support Services', 'Business Agent', 'Calibration Services',
            'Consultancy and Management Services', 'Contracting and Manpower Services', 'Design Services', 'Emission and Testing Center', 'Engineering and Technical Services',
            'Organizations', 'Referral Service', 'Repair and Maintenance Services', 'Security Agency', 'Water Treatment and Testing Services'  
        ], 
        subCategoryCounts: [0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0
        ],  
        barData: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 6,
            population: '56761',
            stat3: 'Purok 1',
            stat4: 'Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 5 Mabuhay, Phase 6 Mabuhay, Phase 7 Mabuhay, Purok 2, Purok 3, Purok 4, St. Joseph Village 3, Value Homes 1, Value Homes 2, Value Homes 3',
            marketDemands: '9th'
        }
    },
    'Retail Stores': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [16, 0, 1, 1, 2, 2, 0, 2, 0, 1, 0, 1, 1, 25, 4, 1, 0, 2, 1, 8, 14, 2, 7, 5, 4, 1, 0, 1, 1, 0, 1],
        subCategories: ['Clothing and Apparel', 'Convenience Store', 'Electronics and Gadgets', 'Food and Beverage', 'Fuel and Energy Supplies', 'Furniture and Home Decor',
            'General Merchandise', 'Grocery and Supermarkets', 'Hardware and Constructiom Supplies', 'Health and Personal Care', 'Household Supplies', 'Online Shops', 'Sari-sari Store',
            'School and Office Supplies', 'Specialty Stores', 'Vehicle and Parts Supplies', 'Water Supply' 
        ], 
        subCategoryCounts: [1, 5, 3, 17, 11, 0, 15, 6, 12, 2, 1, 3, 10, 0, 7, 4, 6
        ],  
        barData: [16, 0, 1, 1, 2, 2, 0, 2, 0, 1, 0, 1, 1, 25, 4, 1, 0, 2, 1, 8, 14, 2, 7, 5, 4, 1, 0, 1, 1, 0, 1],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 104,
            population: '56761',
            stat3: 'Phase 2 Mabuhay',
            stat4: 'Brillianz Residences, Luxury Mabuhay City, Main Road, Montrina Subdivision, Phase 3 Extension Mabuhay, St. Joseph Village 3, Value Homes 2',
            marketDemands: '3rd'
        }
    },
    'Tourism and Hospitality': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        subCategories: ['Hotel', 'Resort', 'Travel Agency'
        ], 
        subCategoryCounts: [0, 1, 2
        ],  
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 3,
            population: '56761',
            stat3: 'Phase 1 Mabuhay, Phase 5 Mabuhay, Purok 2',
            stat4: 'Blanks, Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 2 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 6 Mabuhay, Phase 7 Mabuhay, Purok 1, Purok 3, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2, Value Homes 3',
            marketDemands: '4th'
        }
    },
    'Transportation and Logistics': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        subCategories: ['Car Rental', 'Common Courier', 'Delivery Services', 'Forwarder', 'Hauling Services', 'Logistic Services', 'Operator & Drivers Association',
            'Service Contractor', 'Shuttle Service/Transport', 'Transport Services', 'Trucking Services/Transport', 'Vehicle Storage', 'Warehous and Storage Services'
        ], 
        subCategoryCounts: [1, 1, 1, 0, 1, 0, 0, 2, 1, 3, 2, 0, 0
        ],  
        barData: [2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 12,
            population: '56761',
            stat3: 'Blanks, Phase 2 Mabuhay, Phase 5 Mabuhay',
            stat4: 'Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Mabuhay, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 4 Mabuhay, Phase 6 Mabuhay, Phase 7 Mabuhay, Purok 1, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2',
            marketDemands: '7th'
        }
    },
    'Wholesale and Distribution': {
        barangays: ['Blanks', 'Brillianz Residences', 'Buena Rosario', 'Ciudad Montrina', 'Extraordinary Homes Executive', 'Extraordinary Homes Mabuhay', 
            'Luxury Mabuhay City', 'Mabuhay City', 'Main Road', 'Mamatid Road', 'Montrina Subdivision', 'NIA Road', 'Phase 1 Mabuhay', 'Phase 2 Mabuhay', 
            'Phase 3 Cluster Mabuhay', 'Phase 3 Executive Mabuhay', 'Phase 3 Extension Mabuhay', 'Phase 3 Mabuhay', 'Phase 4 Mabuhay', 'Phase 5 Mabuhay', 
            'Phase 6 Mabuhay', 'Phase 7 Mabuhay', 'Purok 1', 'Purok 2', 'Purok 3',' Purok 4', 'St. Joseph Village 3', 'St. Vincent Compound', 'Value Homes 1', 'Value Homes 2', 'Value Homes 3'],
        counts: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        subCategories: ['Agricultural Products', 'Auction', 'Automotive', 'Cleaning Supplies', 'Electronics Products', 'Essential/ Non Essential', 'Food Products', 'Fuel and Energy Supplies', 
            'Industrial and Construction Supplies', 'Junk Shops', 'Medical and Health Supplies', 'Non Essential', 'Office & Packaging Supplies', 'Recycle Materials', 'Service Contractor', 'Trading'
        ], 
        subCategoryCounts: [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 1, 0, 1
        ],  
        barData: [12, 11, 29, 9, 13, 1, 12, 3, 5, 1, 2, 0, 0, 5, 1, 5, 2, 2],
        pieData: [4307, 6930, 5841, 17594, 13291, 6535, 2308],
        stats: {
            totalBusinesses: 9,
            population: '56761',
            stat3: 'Blanks',
            stat4: 'Brillianz Residences, Buena Rosario, Ciudad Montrina, Extraordinary Homes Executive, Extraordinary Homes Mabuhay, Luxury Mabuhay City, Mabuhay City, Main Road, Mamatid Road, Montrina Subdivision, NIA Road, Phase 1 Mabuhay, Phase 3 Cluster Mabuhay, Phase 3 Executive Mabuhay, Phase 3 Extension Mabuhay, Phase 3 Mabuhay, Phase 5 Mabuhay, Purok 2, Purok 4, St. Joseph Village 3, St. Vincent Compound, Value Homes 1, Value Homes 2, Value Homes 3',
            marketDemands: '11th'
        }
    },
};

// Function to update the subcategories table
function updateSubCategoriesTable(category) {
    const tableBody = document.querySelector('#subCategoriesTable tbody');
    tableBody.innerHTML = ''; // Clear previous rows

    const selectedData = dataForCategories[category];

    selectedData.subCategories.forEach((subCategory, index) => {
        const row = document.createElement('tr');
        row.classList.add('divide-y', 'divide-gray-200'); // Add design consistency

        row.innerHTML = `
            <td class="py-2 px-4 border-b">${subCategory}</td>
            <td class="py-2 px-4 border-b text-right">${selectedData.subCategoryCounts[index]}</td>
        `;

        tableBody.appendChild(row);
    });
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

// Function to update stats and charts
function updateStatsAndCharts(category) {
    const selectedData = dataForCategories[category];

    // Update Stats
    document.getElementById('totalBusinesses').textContent = selectedData.stats.totalBusinesses;
    document.getElementById('population').textContent = selectedData.stats.population;
    document.getElementById('stat3').textContent = selectedData.stats.stat3;
    document.getElementById('stat4').textContent = selectedData.stats.stat4;
    document.getElementById('marketDemands').textContent = selectedData.stats.marketDemands;

    // Update Charts
    updateCharts(selectedData);
}

// Function to update charts
function updateCharts(data) {
    // Update Line Chart
    pageViewsChart.data.datasets[0].data = data.barData;
    pageViewsChart.update();

    // Update Pie Chart
    webTrafficConcentrationChart.data.datasets[0].data = data.pieData;
    webTrafficConcentrationChart.update();
}

// Initialize Line Chart with updated design
const ctxPageViews = document.getElementById('pageViews').getContext('2d');
const pageViewsChart = new Chart(ctxPageViews, {
    type: 'bar',
    data: {
        labels: dataForCategories.All.barangays,
        datasets: [{
            label: 'Businesses Count',
            data: dataForCategories.All.barData,
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

// Initialize Pie Chart with updated design
const ctxWebTrafficConcentration = document.getElementById('webTrafficConcentration').getContext('2d');
const webTrafficConcentrationChart = new Chart(ctxWebTrafficConcentration, {
    type: 'doughnut',
    data: {
        labels: dataForCategories.All.barangays,
        datasets: [{
            label: 'Traffic Source',
            data: dataForCategories.All.pieData,
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

// Initialize with default category
updateBusinessCategoriesTable('All');
updateSubCategoriesTable('All');
updateStatsAndCharts('All');

// Event listener for dropdown change
document.getElementById('dateRange').addEventListener('change', function () {
    const selectedCategory = this.value;
    updateBusinessCategoriesTable(selectedCategory);
    updateSubCategoriesTable(selectedCategory);
    updateStatsAndCharts(selectedCategory);
});
