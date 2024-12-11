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

// Data for each category including dynamic barangays
const dataForCategories = {
    All: {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [4, 46, 1, 1, 19, 10, 18, 12, 1, 18, 66, 22, 74, 9, 1, 60, 2], 
        subCategories: ['None'],
        subCategoryCounts: ['None'],  
        barData: [4, 46, 1, 1, 19, 10, 18, 12, 1, 18, 66, 22, 74, 9, 1, 60, 2],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
                totalBusinesses: 364,
                population: '40936',
                stat3: 'National Highway',
                stat4: 'Corner Road 1, Del Rosario Compound, Greenleaf Residences, San Carlos Village',
                marketDemands: 'Retail Stores',
              
                        
            
        }
    },
    'Automotive Services': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1, 3, 2, 0, 1, 0], 
        subCategories: ['Auto Repair Services', 'Body and Welding Shops', 'Car wash and Detailing', 'Fuel Services',
            'Motorcycle Dealer', 'Specialized Automotive Services', 'Vulcanizing Services'
        ],
        subCategoryCounts: [4,0,0,5,0,1,2], 
        barData: [0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1, 3, 2, 0, 1, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 12,
            population: '40,936',
            stat3: 'National Highway',
            stat4: 'Bamboo Orchard, Corner Road 1, Del Rosario Compound, Don Onofre Village, Gatchalian Industrial Estate, Grand Acacia Grove, Greenleaf Residences, Hongkong Village, San Carlos Village, Southville 1',
            marketDemands: '4th'
        }
    },
    'Construction and Real Estate': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [0, 1, 0, 0, 4, 1, 2, 0, 1, 1, 8, 2, 9, 0, 0, 7, 1], 
        subCategories: ['Apartment/Apartelle', 'Building Contractor', 'Construction Services', 'Contractor', 'Electrical/Mechanical Contractor', 'Facilities and Infrastracture',
            'General Contruction', 'General Contractor', 'General Engineering Contractor', 'Heavy Equipment Rental', 'Lessor (Commercial Space', 'Lessor (Excluding Subd. Operators/Lessor',
            'Lessor (Industrial Space', 'Lessor (Residential)', 'Lot Rental', 'Memorial Park', 'Property Rental and Management', 'Real Estate Developer', 'Realty', 'Realy Broker', 'Services Contractor',
            'Warehousing'
        ], 
        subCategoryCounts: [3,1,3,2,0,0,0,2,1,0,18,1,1,1,1,0,0,0,1,0,2,0],  
        barData: [0, 1, 0, 0, 4, 1, 2, 0, 1, 1, 8, 2, 9, 0, 0, 7, 1],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 37,
            population: '40,936',
            stat3: 'National Highway',
            stat4: 'Bamboo Orchard, Corner Road 1, Del Rosario Compound, Grand Acacia Grove, NIA Road, San Carlos Village',
            marketDemands: '2nd'
        }
    },
    'Cooperative Business': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        subCategories: ['Cooperative'], 
        subCategoryCounts: [2],  
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 2,
            population: '40,936',
            stat3: 'Katapatan Homes, National Highway',
            stat4: 'Bamboo Orchard, Blanks, Corner Road 1, Del Rosario Compound, Don Onofre Village, Gatchalian Industrial Estate, Gatchalian Subdivision, Grand Acacia Grove, Greenleaf Residences, Hongkong Village, Lakeside Nest Subdivision, NIA Road, San Carlos Village, Southpoint Subdivision, Southville 1',
            marketDemands: '10th'
        }
    },
    'Creative and Media Service': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1' ],
        counts: [0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1, 0, 0, 1, 0],
        subCategories: ['Advertising and Marketing', 'Event Design Service', 'Photography and Videography', 'Printing Services'], 
        subCategoryCounts: [0,1,0,5],  
        barData: [0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1, 0, 0, 1, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 6,
            population: '40,936',
            stat3: 'Hongkong Village',
            stat4: 'Bamboo Orchard, Corner Road 1, Del Rosario Compound, Don Onofre Village, Gatchalian Industrial Estate, Gatchalian Subdivision, Grand Acacia Grove, Greenleaf Residences, Lakeside Nest Subdivision, NIA Road, San Carlos Village, Southville 1',
            marketDemands: '6th'
        }
    },
    'Education Services': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 2, 0, 2, 0, 0, 0, 0],
        subCategories: ['Driving School', 'Learning Center', 'Private School', 'School Service', 'Training Center', 'Tutorial Services',
            'Vocational and Special Schools' 
        ], 
        subCategoryCounts: [0,0,4,1,0,2,1],  
        barData: [0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 2, 0, 2, 0, 0, 0, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 8,
            population: '40,936',
            stat3: 'Hongkong Village, Katapatan Homes, National Highway',
            stat4: 'Bamboo Orchard, Blanks, Corner Road 1, Don Onofre Village, Gatchalian Industrial Estate, Gatchalian Subdivision, Greenleaf Residences, Lakeside Nest Subdivision, NIA Road, San Carlos Village, Southpoint Subdivision, Southville 1',
            marketDemands: '11th'
        }
    },
    'Entertainment and Recreation': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        subCategories: ['Dining and Leisure', 'Egames/Ebingo', 'Fireworks and Pyrotechnics', 'Golf Cart Rental', 'Party Rentals', 'Play Center',
            'Sound & Light Rental', 'Sports and Fitness' 
        ], 
        subCategoryCounts: [0,0,0,0,0,0,0,1],  
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 1,
            population: '40,936',
            stat3: 'Southpoint Subdivision',
            stat4: 'Bamboo Orchard, Blanks, Corner Road 1, Del Rosario Compound, Don Onofre Village, Gatchalian Industrial Estate, Gatchalian Subdivision, Grand Acacia Grove, Greenleaf Residences, Hongkong Village, Katapatan Homes, Lakeside Nest Subdivision, National Highway, NIA Road, San Carlos Village, Southville 1',
            marketDemands: '7th'
        }
    },
    'Finance and Insurance': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1' ],
        counts: [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 2, 0, 0, 1, 0],
        subCategories: ['ATM Off Site Stations', 'Banks', 'Financing Institutions', 'General Financial Services', 'Holding Company', 'Insurance Agents/Companies',
            'Lending Investor', 'Money Remittance/ Bill Payment', 'Pawnshop & Financial Services', 'Payment Center' 
        ], 
        subCategoryCounts: [0,0,0,0,1,0,3,0,3,0],  
        barData: [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 2, 0, 0, 1, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 7,
            population: '40,936',
            stat3: 'National Highway',
            stat4: 'Bamboo Orchard, Corner Road 1, Del Rosario Compound, Don Onofre Village, Gatchalian Industrial Estate, Gatchalian Subdivision, Greenleaf Residences, Lakeside Nest Subdivision, NIA Road, San Carlos Village, Southville 1',
            marketDemands: '4th'
        }
    },
    'Food Services': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 4, 2, 4, 1, 0, 9, 0],
        subCategories: ['Burger Stand', 'Canteen' , 'Catering Service', 'Coffee Shop', 'Eatery', 'Fast Food', 'Food Concessionaire', 'Food Stand',
            'Milk Tea Shop', 'Panciteria', 'Refreshment Parlor', 'Restaurant', 'Restobar'
        ], 
        subCategoryCounts: [1,0,1,2,1,0,0,7,2,0,4,7,1],  
        barData: [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 4, 2, 4, 1, 0, 9, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 26,
            population: '40,936',
            stat3: 'Southpoint Subdivision',
            stat4: 'Del Rosario Compound, Don Onofre Village, Gatchalian Industrial Estate, Gatchalian Subdivision, Grand Acacia Grove, Greenleaf Residences, Hongkong Village, San Carlos Village, Southville 1',
            marketDemands: '2nd'
        }
    },
    'Healthcare Services': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1' ],
        counts: [0, 4, 0, 0, 0, 0, 1, 0, 0, 0, 4, 4, 4, 1, 0, 0, 0],
        subCategories: ['Animal Bite Clinics', 'Dental Clinics', 'Diagnostic and Medical Clinics', 'Dialysis Center', 'Gerontology Services', 'Hospital', 
            'Laboratory Equipment Repair Service',  'Maternity Clinics & Family Planning', 'Medical and Healthcare Services', 'Optical Clinics', 'Pharmacies', 
             'Pharmacy & Medical Clinics',  'Rehabilitation Centers',  'Service Contractor',  'Therapy Centers',  'Veterinary Clinics'
        ], 
        subCategoryCounts: [0,2,2,0,0,0,0,2,1,0,9,1,0,0,0,1],  
        barData: [0, 4, 0, 0, 0, 0, 1, 0, 0, 0, 4, 4, 4, 1, 0, 0, 0 ],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 18,
            population: '40,936',
            stat3: 'Blanks, Katapatan Homes, Lakeside Nest Subdivision, National Highway',
            stat4: 'Bamboo Orchard, Corner Road 1, Del Rosario Compound, Don Onofre Village, Gatchalian Industrial Estate, Grand Acacia Grove, Greenleaf Residences, Hongkong Village, San Carlos Village, Southpoint Subdivision, Southville 1',
            marketDemands: '4th'
        }
    },
    'IT and Digital Services': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0],
        subCategories: ['Administrative Support Services', 'Audio & Video System Services', 'Computer Services / IT Services', 'Computer Shop', 'Customer Support & BPO Service',
            'Internet Service Provider', 'Repair Service', 'Service Contractor', 'Telecom Services', 'Virtual Assistance' 
        ], 
        subCategoryCounts: [0,0,1,1,1,0,0,1,0,0],  
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 4,
            population: '40,936',
            stat3: 'Katapatan Homes',
            stat4: 'Bamboo Orchard, Blanks, Corner Road 1, Del Rosario Compound, Don Onofre Village, Gatchalian Industrial Estate, Gatchalian Subdivision, Grand Acacia Grove, Greenleaf Residences, Lakeside Nest Subdivision, National Highway, NIA Road, San Carlos Village, Southville 1',
            marketDemands: '9th'
        }
    },
    'Manufacturing and Production': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [0, 1, 0, 0, 1, 2, 5, 0, 0, 0, 0, 0, 7, 1, 0, 0, 0],
        subCategories: ['Agricultural Products', 'Contractor and Service Manufacturing', 'Essential Manufacturer', 'Fabrication Services',
            'Food Products Manufacturer', 'Garment Manufacturer', 'General Manufacturing', 'Glass & Aluminum Fabrication Services', 'Hollowblock Making',
            'Industrial Equipment Services', 'Machine Fabrication and Shop', 'Metal Fabrication', 'Non-Essential Manufacturer', 'PEZA Registered Business',
            'Plastic Products Manufacturer', 'Specialty Manufacturing', 'Woodcraft'  
        ], 
        subCategoryCounts: [0,1,0,2,2,3,0,3,0,1,1,0,1,0,1,1,1],  
        barData: [0, 1, 0, 0, 1, 2, 5, 0, 0, 0, 0, 0, 7, 1, 0, 0, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 17,
            population: '40,936',
            stat3: 'National Highway',
            stat4: 'Bamboo Orchard, Corner Road 1, Del Rosario Compound, Grand Acacia Grove, Greenleaf Residences, Hongkong Village, Katapatan Homes, Lakeside Nest Subdivision, San Carlos Village, Southpoint Subdivision, Southville 1',
            marketDemands: '9th'
        }
    },
    'Personal and Household Services': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 3, 0, 0, 0, 0],
        subCategories: ['Air Conditioner Services', 'Bottle Cleaning', 'Funeral Services', 'Furniture & Carpentry', 'Gown/Barong/Dress/Toga Rental',
            'Janitorial Services', 'Kitchen Equipment Repair Services', 'Laundy Shops', 'Pest Control', 'Plumbing Services', 'Refrigerator & Air Con Repair Services',
            'Service Contractor', 'Tailor and Dress Shop', 'Upholstery and Repair Shop' 
        ], 
        subCategoryCounts: [0,0,0,0,0,1,0,7,0,1,0,1,0,0],  
        barData: [10, 3, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 3, 0, 0, 0, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 10,
            population: '40,936',
            stat3: 'Blanks, Katapatan Homes, National Highway',
            stat4: 'Bamboo Orchard, Corner Road 1, Del Rosario Compound, Don Onofre Village, Gatchalian Industrial Estate, Gatchalian Subdivision, Greenleaf Residences, Hongkong Village, Lakeside Nest Subdivision, NIA Road, San Carlos Village, Southpoint Subdivision, Southville 1',
            marketDemands: '9th'
        }
    },
    'Personal Care Services': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        subCategories: ['Aesthetic Services', 'Barbershop', 'Beauty Taylor', 'Fitness Gym', 'Home Massage Services',
            'Nail Spa', 'Skin care Center' 
        ], 
        subCategoryCounts: [1,1,0,0,0,0,0],  
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 2,
            population: '40,936',
            stat3: 'National Highway, Southpoint Subdivision',
            stat4: 'Bamboo Orchard, Blanks, Corner Road 1, Del Rosario Compound, Don Onofre Village, Gatchalian Industrial Estate, Gatchalian Subdivision, Grand Acacia Grove, Greenleaf Residences, Hongkong Village, Katapatan Homes, Lakeside Nest Subdivision, NIA Road, San Carlos Village, Southville 1',
            marketDemands: '6th'
        }
    },
    'Professional Services': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [1, 4, 0, 0, 1, 1, 2, 1, 0, 2, 5, 0, 3, 0, 1, 7, 0],
        subCategories: ['Accounting Agencies', 'Administrative Office Services', 'Administrative Support Services', 'Business Agent', 'Calibration Services',
            'Consultancy and Management Services', 'Contracting and Manpower Services', 'Design Services', 'Emission and Testing Center', 'Engineering and Technical Services',
            'Organizations', 'Referral Service', 'Repair and Maintenance Services', 'Security Agency', 'Water Treatment and Testing Services'  
        ], 
        subCategoryCounts: [1,2,0,0,2,6,9,0,0,1,2,1,0,2,2],  
        barData: [1, 4, 0, 0, 1, 1, 2, 1, 0, 2, 5, 0, 3, 0, 1, 7, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 28,
            population: '40,936',
            stat3: 'Southpoint Subdivision',
            stat4: 'Corner Road 1, Del Rosario Compound, Greenleaf Residences, Lakeside Nest Subdivision, NIA Road, Southville 1',
            marketDemands: '3rd'
        }
    },
    'Retail Stores': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [1, 19, 0, 0, 3, 1, 1, 8, 0, 7, 29, 12, 29, 2, 0, 15, 1],
        subCategories: ['Clothing and Apparel', 'Convenience Store', 'Electronics and Gadgets', 'Food and Beverage', 'Fuel and Energy Supplies', 'Furniture and Home Decor',
            'General Merchandise', 'Grocery and Supermarkets', 'Hardware and Constructiom Supplies', 'Health and Personal Care', 'Household Supplies', 'Online Shops', 'Sari-sari Store',
            'School and Office Supplies', 'Specialty Stores', 'Vehicle and Parts Supplies', 'Water Supply' 
        ], 
        subCategoryCounts: [3,8,4,23,10,0,18,1,18,0,0,0,6,4,19,9,5],  
        barData: [1, 19, 0, 0, 3, 1, 1, 8, 0, 7, 29, 12, 29, 2, 0, 15, 1 ],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 128,
            population: '40,936',
            stat3: 'Katapatan Homes, National Highway',
            stat4: 'Corner Road 1, Del Rosario Compound, Greenleaf Residences, San Carlos Village',
            marketDemands: '1st'
        }
    },
    'Tourism and Hospitality': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1' ],
        counts: [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        subCategories: ['Hotel', 'Resort', 'Travel Agency'
        ], 
        subCategoryCounts: [0,1,1],  
        barData: [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 2,
            population: '40,936',
            stat3: 'Blanks, Don Onofre Village',
            stat4: 'Bamboo Orchard, Corner Road 1, Del Rosario Compound, Gatchalian Industrial Estate, Gatchalian Subdivision, Grand Acacia Grove, Greenleaf Residences, Hongkong Village, Katapatan Homes, Lakeside Nest Subdivision, National Highway, NIA Road, San Carlos Village, Southpoint Subdivision, Southville 1',
            marketDemands: '8th'
        }
    },
    'Transportation and Logistics': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1' ],
        counts: [0, 2, 0, 0, 5, 2, 2, 0, 0, 1, 2, 1, 4, 0, 0, 8, 0],
        subCategories: ['Car Rental', 'Common Courier', 'Delivery Services', 'Forwarder', 'Hauling Services', 'Logistic Services', 'Operator & Drivers Association',
            'Service Contractor', 'Shuttle Service/Transport', 'Transport Services', 'Trucking Services/Transport', 'Vehicle Storage', 'Warehous and Storage Services'
        ], 
        subCategoryCounts: [0,2,0,2,3,2,0,0,0,2,10,0,6],  
        barData: [0, 2, 0, 0, 5, 2, 2, 0, 0, 1, 2, 1, 4, 0, 0, 8, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 27,
            population: '40,936',
            stat3: 'Southpoint Subdivision',
            stat4: 'Bamboo Orchard, Corner Road 1, Del Rosario Compound, Grand Acacia Grove, Greenleaf Residences, NIA Road, San Carlos Village, Southville 1',
            marketDemands: '8th'
        }
    },
    'Wholesale and Distribution': {
        barangays: ['Bamboo Orchard', 'Blanks', 'Corner Road 1', 'Del Rosario Compound', 'Don Onofre Village', 'Gatchalian Industrial Estate','Gatchalian Subdivision', 
                    'Grand Acacia Grove', 'Greenleaf Residences', 'Hongkong Village', 'Katapatan Homes', 'Lakeside Nest Subdivision', 'National Highway', 
                    'NIA Road', 'San Carlos Village',  'Southpoint Subdivision', 'Southville 1'],
        counts: [1, 3, 0, 0, 4, 3, 4, 0, 0, 1, 2, 0, 1, 2, 0, 8, 0],
        subCategories: ['Agricultural Products', 'Auction', 'Automotive', 'Cleaning Supplies', 'Electronics Products', 'Essential/ Non Essential', 'Food Products', 'Fuel and Energy Supplies', 
            'Industrial and Construction Supplies', 'Junk Shops', 'Medical and Health Supplies', 'Non Essential', 'Office & Packaging Supplies', 'Recycle Materials', 'Service Contractor', 'Trading'
        ], 
        subCategoryCounts: [0,1,0,1,0,2,5,2,2,1,2,5,1,3,0,4],  
        barData: [1, 3, 0, 0, 4, 3, 4, 0, 0, 1, 2, 0, 1, 2, 0, 8, 0],
        pieData: [4444, 5345, 5875, 9782, 7745, 6374, 1371],
        stats: {
            totalBusinesses: 29,
            population: '40,936',
            stat3: 'Southpoint Subdivision',
            stat4: 'Corner Road 1, Del Rosario Compound, Grand Acacia Grove, Greenleaf Residences, Lakeside Nest Subdivision, San Carlos Village, Southville 1',
            marketDemands: '5th'
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
