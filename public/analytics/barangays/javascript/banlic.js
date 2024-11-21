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
        barangays: ['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
                    'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [1, 75, 10, 11, 2, 2, 30, 13, 52, 1, 2, 64, 12, 50, 17, 17, 2], 
        subCategories: ['None'],
        subCategoryCounts: ['None'],  
        barData: [1, 75, 10, 11, 2, 2, 30, 13, 52, 1, 2, 64, 12, 50, 17, 17, 2],
        pieData: [11496],
        stats: {
            totalBusinesses: 361,
            population: '11496',
            stat3: 'Blanks',
            stat4: 'Alimagno Compound, Palmsville Subdivision',
            marketDemands: 'IT and Digital Services, Educational Services',
        
            
        }
    },
    'Automotive Services': {
        barangays: ['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 2, 0, 1, 0, 0], 
        subCategories: ['Auto Repair Services', 'Body and Welding Shops', 'Car wash and Detailing', 'Fuel Services',
            'Motorcycle Dealer', 'Specialized Automotive Services', 'Vulcanizing Services'
        ],
        subCategoryCounts: [2,1,1,1,1,3,1], 
        barData: [0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 2, 0, 1, 0, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 10,
            population: '11496',
            stat3: 'Blanks, National Highway',
            stat4: 'Alimagno Compound, Camella Homes, Camella Homes Bermuda, Dona Ines Compound, Felicias Compound, Gran Seville, Mamatid Road, Palmsville Subdivision, Prince Village, Purok 3, San Isidro Heights, Tamis Compounds',
            marketDemands: '4th'
        }
    },
    'Construction and Real Estate': {
        barangays: ['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 15, 3, 2, 1, 0, 1, 1, 5, 0, 2, 2, 3, 7, 1, 2, 0], 
        subCategories: ['Apartment/Apartelle', 'Building Contractor', 'Construction Services', 'Contractor', 'Electrical/Mechanical Contractor', 'Facilities and Infrastracture',
            'General Contruction', 'General Contractor', 'General Engineering Contractor', 'Heavy Equipment Rental', 'Lessor (Commercial Space', 'Lessor (Excluding Subd. Operators/Lessor',
            'Lessor (Industrial Space', 'Lessor (Residential)', 'Lot Rental', 'Memorial Park', 'Property Rental and Management', 'Real Estate Developer', 'Realty', 'Realy Broker', 'Services Contractor',
            'Warehousing'
        ], 
        subCategoryCounts: [3,0,3,0,1,0,0,0,2,0,25,3,0,0,1,0,1,0,3,0,3,0],  
        barData: [0, 15, 3, 2, 1, 0, 1, 1, 5, 0, 2, 2, 3, 7, 1, 2, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 45,
            population: '11496',
            stat3: 'Blanks',
            stat4: 'Alimagno Compound, Felicias Compound, Palmsville Subdivision, Tamis Compounds',
            marketDemands: '7th'
        }
    },
    'Cooperative Business': {
        barangays: ['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        subCategories: ['Cooperative'], 
        subCategoryCounts: [1],  
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 1,
            population: '11496',
            stat3: 'Purok 3',
            stat4: 'Alimagno Compound, Blanks, Camella Homes, Camella Homes Bermuda, Dona Ines Compound, Felicias Compound, Gran Seville, Mamatid Road, National Highway, Palmsville Subdivision, Prince Village, Purok 1, Purok 2, Purok 4, San Isidro Heights, Tamis Compounds',
            marketDemands: '10th'
        }
    },
    'Creative and Media Service': {
        barangays:['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
        subCategories: ['Advertising and Marketing', 'Event Design Service', 'Photography and Videography', 'Printing Services'], 
        subCategoryCounts: [1,0,2,2],  
        barData: [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 5,
            population: '11496',
            stat3: 'Gran Seville, National Highway, Purok 1, Purok 3, San Isidro Heights',
            stat4: 'Alimagno Compound, Blanks, Camella Homes, Camella Homes Bermuda, Dona Ines Compound, Felicias Compound, Mamatid Road, Palmsville Subdivision, Prince Village, Purok 2, Purok 4, Tamis Compounds',
            marketDemands: '9th'
        }
    },
    'Education Services': {
        barangays: ['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 2, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        subCategories: ['Driving School', 'Learning Center', 'Private School', 'School Service', 'Training Center', 'Tutorial Services',
            'Vocational and Special Schools' 
        ], 
        subCategoryCounts: [1,2,1,0,1,1,1],  
        barData: [0, 2, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 9,
            population: '11496',
            stat3: 'Gran Seville',
            stat4: 'Alimagno Compound, Camella Homes, Camella Homes Bermuda, Dona Ines Compound, Felicias Compound, Gran Seville, Mamatid Road, National Highway, Palmsville Subdivision, Prince Village, Purok 2, Purok 3, Purok 4, San Isidro Heights, Tamis Compounds',
            marketDemands: '1st'
        }
    },
    'Entertainment and Recreation': {
        barangays: ['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        subCategories: ['Dining and Leisure', 'Egames/Ebingo', 'Fireworks and Pyrotechnics', 'Golf Cart Rental', 'Party Rentals', 'Play Center',
            'Sound & Light Rental', 'Sports and Fitness' 
        ], 
        subCategoryCounts: [0,1,0,0,0,1,0,0],  
        barData: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 2,
            population: '11496',
            stat3: 'Blanks, Purok 1',
            stat4: 'Alimagno Compound, Camella Homes, Camella Homes Bermuda, Dona Ines Compound, Felicias Compound, Gran Seville, Mamatid Road, National Highway, Palmsville Subdivision, Prince Village, Purok 2, Purok 3, Purok 4, San Isidro Heights, Tamis Compounds',
            marketDemands: '3rd'
        }
    },
    'Finance and Insurance': {
        barangays: ['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 3, 0, 1, 0, 2, 2, 2, 8, 0, 0, 1, 0, 2, 0, 0, 0],
        subCategories: ['ATM Off Site Stations', 'Banks', 'Financing Institutions', 'General Financial Services', 'Holding Company', 'Insurance Agents/Companies',
            'Lending Investor', 'Money Remittance/ Bill Payment', 'Pawnshop & Financial Services', 'Payment Center' 
        ], 
        subCategoryCounts: [1,2,3,0,0,1,3,3,8,0],  
        barData: [0, 3, 0, 1, 0, 2, 2, 2, 8, 0, 0, 1, 0, 2, 0, 0, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 21,
            population: '11496',
            stat3: 'National Highway',
            stat4: 'Alimagno Compound, Camella Homes, Dona Ines Compound, Palmsville Subdivision, Prince Village, Purok 2, Purok 4, San Isidro Heights, Tamis Compounds',
            marketDemands: '6th'
        }
    },
    'Food Services': {
        barangays: ['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 6, 0, 0, 0, 0, 1, 0, 2, 0, 0, 12, 0, 4, 1, 0, 0],
        subCategories: ['Burger Stand', 'Canteen' , 'Catering Service', 'Coffee Shop', 'Eatery', 'Fast Food', 'Food Concessionaire', 'Food Stand',
            'Milk Tea Shop', 'Panciteria', 'Refreshment Parlor', 'Restaurant', 'Restobar'
        ], 
        subCategoryCounts: [0,2,0,2,1,1,0,10,2,0,3,5,0],  
        barData: [0, 6, 0, 0, 0, 0, 1, 0, 2, 0, 0, 12, 0, 4, 1, 0, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 26,
            population: '11496',
            stat3: 'Purok 1',
            stat4: 'Alimagno Compound, Camella Homes, Camella Homes Bermuda, Dona Ines Compound, Felicias Compound, Mamatid Road, Palmsville Subdivision, Prince Village, Purok 2, San Isidro Heights, Tamis Compounds',
            marketDemands: '6th'
        }
    },
    'Healthcare Services': {
        barangays:['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 4, 0, 0, 0, 0, 0, 3, 3, 0, 0, 2, 0, 1, 0, 0, 0],
        subCategories: ['Animal Bite Clinics', 'Dental Clinics', 'Diagnostic and Medical Clinics', 'Dialysis Center', 'Gerontology Services', 'Hospital', 
            'Laboratory Equipment Repair Service',  'Maternity Clinics & Family Planning', 'Medical and Healthcare Services', 'Optical Clinics', 'Pharmacies', 
             'Pharmacy & Medical Clinics',  'Rehabilitation Centers',  'Service Contractor',  'Therapy Centers',  'Veterinary Clinics'
        ], 
        subCategoryCounts: [0,5,3,0,0,0,0,0,0,0,3,0,0,0,0,2],  
        barData: [0, 4, 0, 0, 0, 0, 0, 3, 3, 0, 0, 2, 0, 1, 0, 0, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 13,
            population: '11496',
            stat3: 'Blanks',
            stat4: 'Alimagno Compound, Camella Homes, Camella Homes Bermuda, Dona Ines Compound, Felicias Compound, Gran Seville, Palmsville Subdivision, Prince Village, Purok 2, Purok 4, San Isidro Heights, Tamis Compounds',
            marketDemands: '6th'
        }
    },
    'IT and Digital Services': {
        barangays: ['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        subCategories: ['Administrative Support Services', 'Audio & Video System Services', 'Computer Services / IT Services', 'Computer Shop', 'Customer Support & BPO Service',
            'Internet Service Provider', 'Repair Service', 'Service Contractor', 'Telecom Services', 'Virtual Assistance' 
        ], 
        subCategoryCounts: [0,0,2,0,1,0,1,0,0,0],  
        barData: [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 4,
            population: '11496',
            stat3: 'Blanks, Camella Homes Bermuda, Dona Ines Compound, San Isidro Heights',
            stat4: 'Alimagno Compound, Camella Homes, Felicias Compound, Gran Seville, Mamatid Road, National Highway, Palmsville Subdivision, Prince Village, Purok 1, Purok 2, Purok 3, Purok 4, Tamis Compounds',
            marketDemands: '1st'
        }
    },
    'Manufacturing and Production': {
        barangays:['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1, 0, 1],
        subCategories: ['Agricultural Products', 'Contractor and Service Manufacturing', 'Essential Manufacturer', 'Fabrication Services',
            'Food Products Manufacturer', 'Garment Manufacturer', 'General Manufacturing', 'Glass & Aluminum Fabrication Services', 'Hollowblock Making',
            'Industrial Equipment Services', 'Machine Fabrication and Shop', 'Metal Fabrication', 'Non-Essential Manufacturer', 'PEZA Registered Business',
            'Plastic Products Manufacturer', 'Specialty Manufacturing', 'Woodcraft'  
        ], 
        subCategoryCounts: [0,0,0,2,2,1,0,0,2,0,0,0,2,0,0,0,0],  
        barData: [0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1, 0, 1],
        pieData: [11496],
        stats: {
            totalBusinesses: 9,
            population: '11496',
            stat3: 'Blanks, Mamatid Road',
            stat4: 'Alimagno Compound, Camella Homes, Camella Homes Bermuda, Dona Ines Compound, Felicias Compound, Gran Seville, National Highway, Palmsville Subdivision, Prince Village, San Isidro Heights',
            marketDemands: '7th'
        }
    },
    'Personal and Household Services': {
        barangays:['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 4, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 1, 2, 0, 1, 0],
        subCategories: ['Air Conditioner Services', 'Bottle Cleaning', 'Funeral Services', 'Furniture & Carpentry', 'Gown/Barong/Dress/Toga Rental',
            'Janitorial Services', 'Kitchen Equipment Repair Services', 'Laundy Shops', 'Pest Control', 'Plumbing Services', 'Refrigerator & Air Con Repair Services',
            'Service Contractor', 'Tailor and Dress Shop', 'Upholstery and Repair Shop' 
        ], 
        subCategoryCounts: [1,0,2,1,0,0,0,4,1,0,2,0,0,0],  
        barData: [0, 4, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 1, 2, 0, 1, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 11,
            population: '11496',
            stat3: 'Blanks',
            stat4: 'Alimagno Compound, Camella Homes, Camella Homes Bermuda, Dona Ines Compound, Felicias Compound, Mamatid Road, Palmsville Subdivision, Prince Village, Purok 1, Purok 4, Tamis Compounds',
            marketDemands: '8th'
        }
    },
    'Personal Care Services': {
        barangays:['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0],
        subCategories: ['Aesthetic Services', 'Barbershop', 'Beauty Taylor', 'Fitness Gym', 'Home Massage Services',
            'Nail Spa', 'Skin care Center' 
        ], 
        subCategoryCounts: [0,0,4,1,0,0,1],  
        barData: [0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 6,
            population: '11496',
            stat3: 'Blanks, National Highway, Purok 1',
            stat4: 'Alimagno Compound, Camella Homes, Camella Homes Bermuda, Dona Ines Compound, Felicias Compound, Gran Seville, Mamatid Road, Palmsville Subdivision, Prince Village, Purok 2, Purok 3, Purok 4, San Isidro Heights, Tamis Compounds',
            marketDemands: '7th'
        }
    },
    'Professional Services': {
        barangays:['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 3, 2, 2, 0, 0, 3, 1, 1, 0, 0, 0, 0, 2, 1, 1, 0],
        subCategories: ['Accounting Agencies', 'Administrative Office Services', 'Administrative Support Services', 'Business Agent', 'Calibration Services',
            'Consultancy and Management Services', 'Contracting and Manpower Services', 'Design Services', 'Emission and Testing Center', 'Engineering and Technical Services',
            'Organizations', 'Referral Service', 'Repair and Maintenance Services', 'Security Agency', 'Water Treatment and Testing Services'  
        ], 
        subCategoryCounts: [0,0,0,0,0,7,6,0,1,2,0,0,0,0,0],  
        barData: [0, 3, 2, 2, 0, 0, 3, 1, 1, 0, 0, 0, 0, 2, 1, 1, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 16,
            population: '11496',
            stat3: 'Blanks, Gran Seville',
            stat4: 'Alimagno Compound, Dona Ines Compound, Felicias Compound, Palmsville Subdivision, Prince Village, Purok 1, Purok 2, Tamis Compounds',
            marketDemands: '7th'
        }
    },
    'Retail Stores': {
        barangays:['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 23, 2, 2, 0, 0, 13, 3, 20, 1, 0, 35, 4, 26, 9, 9, 0],
        subCategories: ['Clothing and Apparel', 'Convenience Store', 'Electronics and Gadgets', 'Food and Beverage', 'Fuel and Energy Supplies', 'Furniture and Home Decor',
            'General Merchandise', 'Grocery and Supermarkets', 'Hardware and Constructiom Supplies', 'Health and Personal Care', 'Household Supplies', 'Online Shops', 'Sari-sari Store',
            'School and Office Supplies', 'Specialty Stores', 'Vehicle and Parts Supplies', 'Water Supply' 
        ], 
        subCategoryCounts: [9,2,8,33,5,2,26,3,16,3,2,2,5,1,11,12,7],  
        barData: [0, 23, 2, 2, 0, 0, 13, 3, 20, 1, 0, 35, 4, 26, 9, 9, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 147,
            population: '11496',
            stat3: 'Purok 1',
            stat4: 'Alimagno Compound, Dona Ines Compound, Felicias Compound, Prince Village, Tamis Compounds',
            marketDemands: '9th'
        }
    },
    'Tourism and Hospitality': {
        barangays: ['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        subCategories: ['Hotel', 'Resort', 'Travel Agency'
        ], 
        subCategoryCounts: [0,0,0],  
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 0,
            population: '11496',
            stat3: 'None',
            stat4: 'All',
            marketDemands: '6th'
        }
    },
    'Transportation and Logistics': {
        barangays:['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [1, 3, 2, 2, 0, 0, 3, 1, 4, 0, 0, 3, 1, 1, 2, 1, 1],
        subCategories: ['Car Rental', 'Common Courier', 'Delivery Services', 'Forwarder', 'Hauling Services', 'Logistic Services', 'Operator & Drivers Association',
            'Service Contractor', 'Shuttle Service/Transport', 'Transport Services', 'Trucking Services/Transport', 'Vehicle Storage', 'Warehous and Storage Services'
        ], 
        subCategoryCounts: [0,2,1,3,5,0,0,0,1,3,5,0,5],  
        barData: [1, 3, 2, 2, 0, 0, 3, 1, 4, 0, 0, 3, 1, 1, 2, 1, 1],
        pieData: [11496],
        stats: {
            totalBusinesses: 25,
            population: '11496',
            stat3: 'National Highway',
            stat4: 'Dona Ines Compound, Felicias Compound, Palmsville Subdivision, Prince Village',
            marketDemands: '2nd'
        }
    },
    'Wholesale and Distribution': {
        barangays:['Alimagno Compound', 'Blanks', 'Camella Homes','Camella Homes Bermuda', 'Dona Ines Compound', 'Felicias Compound', 'Gran Seville', 'Mamatid Road', 
            'National Highway', 'Palmsville Subdivision', 'Prince Village', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'San Isidro Heights', 'Tamis Compounds'],
        counts: [0, 3, 0, 1, 0, 0, 1, 0, 2, 0, 0, 3, 0, 1, 1, 1, 0],
        subCategories: ['Agricultural Products', 'Auction', 'Automotive', 'Cleaning Supplies', 'Electronics Products', 'Essential/ Non Essential', 'Food Products', 'Fuel and Energy Supplies', 
            'Industrial and Construction Supplies', 'Junk Shops', 'Medical and Health Supplies', 'Non Essential', 'Office & Packaging Supplies', 'Recycle Materials', 'Service Contractor', 'Trading'
        ], 
        subCategoryCounts: [1,0,1,0,2,0,1,0,2,4,0,1,0,0,1,0],  
        barData: [0, 3, 0, 1, 0, 0, 1, 0, 2, 0, 0, 3, 0, 1, 1, 1, 0],
        pieData: [11496],
        stats: {
            totalBusinesses: 13,
            population: '11496',
            stat3: 'Blanks, Purok 1',
            stat4: 'Alimagno Compound, Camella Homes, Dona Ines Compound, Felicias Compound, Mamatid Road, Palmsville Subdivision, Prince Village, Purok 2, Tamis Compounds',
            marketDemands: '5th'
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