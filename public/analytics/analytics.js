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
        barangays: ['Pulo', 'Sala', 'Banaybanay', 'Mamatid', 'Banlic', 'Bigaa', 'San Isidro', 'Marinig', 'Niugan', 'Gulod', 
                    'Baclaran', 'Poblacion Tres', 'Casile', 'Butong', 'Poblacion Uno', 'Diezmo', 'Pittland', 'Poblacion Dos'],
        counts: [414, 234, 364, 253, 361, 74, 171, 136, 139, 69, 46, 62, 18, 49, 62, 98, 33, 96 ], 
        subCategories: ['None'],
        subCategoryCounts: ['None'],  
        barData: [414, 235, 364, 253, 361, 74, 171, 136, 139, 69, 46, 62, 18, 49, 62, 98, 33, 96],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 2679,
            population: '421,440',
            stat3: 'Pulo',
            stat4: 'Casile',
            marketDemands: 0
        }
    },
    'Automotive Services': {
        barangays: ['Pulo', 'Sala', 'Banaybanay', 'Mamatid', 'Banlic', 'Bigaa', 'San Isidro', 'Marinig', 'Niugan', 'Gulod', 
                    'Baclaran', 'Poblacion Tres', 'Casile', 'Butong', 'Poblacion Uno', 'Diezmo', 'Pittland', 'Poblacion Dos'],
        counts: [19, 16, 12, 11, 10, 6, 5, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0], 
        subCategories: ['Auto Repair Services', 'Body and Welding Shops', 'Car wash and Detailing', 'Fuel Services',
            'Motorcycle Dealer', 'Specialized Automotive Services', 'Vulcanizing Services'
        ],
        subCategoryCounts: [23, 6, 9, 34, 7, 9, 6], 
        barData: [19, 16, 12, 11, 10, 6, 5, 3, 3, 2, 2, 2, 1, 1, 1, 0,0,0],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 94,
            population: '421,440',
            stat3: 'Pulo',
            stat4: 'Poblacion Dos',
            marketDemands: 'Diezmo'
        }
    },
    'Construction and Real Estate': {
        barangays: ['Pulo', 'Banlic', 'Banaybanay', 'Sala', 'Diezmo', 'San Isidro', 'Mamatid', 'Niugan', 'Bigaa',
             'Marinig', 'Poblacion Uno', 'Gulod', 'Poblacion Tres', 'Poblacion Dos', 'Pittland', 'Casile', 'Baclaran','Butong'],
        counts: [53, 45, 37, 31, 23, 22, 20, 18, 17, 15, 13, 9, 8, 6, 5, 2, 2, 0], 
        subCategories: ['Apartment/Apartelle', 'Building Contractor', 'Construction Services', 'Contractor', 'Electrical/Mechanical Contractor', 'Facilities and Infrastracture',
            'General Contruction', 'General Contractor', 'General Engineering Contractor', 'Heavy Equipment Rental', 'Lessor (Commercial Space', 'Lessor (Excluding Subd. Operators/Lessor',
            'Lessor (Industrial Space', 'Lessor (Residential)', 'Lot Rental', 'Memorial Park', 'Property Rental and Management', 'Real Estate Developer', 'Realty', 'Realy Broker', 'Services Contractor',
            'Warehousing'
        ], 
        subCategoryCounts: [14, 5, 47, 9, 4, 1, 3, 10, 6, 2, 133, 15, 1, 6, 4, 5, 3, 2, 24, 2, 39, 1],  
        barData: [53, 31, 37, 20, 45, 17, 22, 15, 18, 9, 2, 8, 2, 0, 13, 23, 5, 6],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 336,
            population: '421,440',
            stat3: 'Pulo',
            stat4: 'Butong',
            marketDemands: 'Sala'
        }
    },
    'Cooperative Business': {
        barangays: ['Sala', 'Poblacion Dos', 'Diezmo', 'Bigaa', 'Pulo', 'San Isidro', 'Banaybanay', 'Mamatid', 'Poblacion Tres', 'Banlic', 'Casile', 'Maring',
            'Pittland', 'Baclaran', 'Poblacion Uno', 'Niugan', 'Gulod', 'Butong'
         ],
        counts: [8, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        subCategories: ['Cooperative'], 
        subCategoryCounts: [14],  
        barData: [2, 8, 2, 2, 1, 2, 2, 1, 0, 0, 1, 1, 1, 0, 0, 3, 1, 3],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 30,
            population: '421,440',
            stat3: 'Sala',
            stat4: 'Butong',
            marketDemands: 'Poblacion Tres, Pittland'
        }
    },
    'Creative and Media Service': {
        barangays: ['Banaybanay', 'Banlic', 'Mamatid', 'Sala', 'Baclaran', 'Poblacion Tres', 'Pulo', 'Marinig', 'Niugan', 'Gulod', 
            'Poblacion Uno', 'Bigaa', 'Diezmo', 'Butong', 'Casile', 'San Isidro', 'Pittland', 'Poblacion Dos'
         ],
        counts: [6, 5, 4, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        subCategories: ['Advertising and Marketing', 'Event Design Service', 'Photography and Videography', 'Printing Services'], 
        subCategoryCounts: [5,1,4,23],  
        barData: [2, 3, 6, 4, 5, 1, 0, 2, 2, 1, 3, 2, 0, 0, 1, 1, 0, 0],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 30,
            population: '421,440',
            stat3: 'Banaybanay',
            stat4: 'Poblacion Dos',
            marketDemands: 'Niugan'
        }
    },
    'Education Services': {
        barangays: ['Mamatid', 'San Isidro', 'Banaybanay', 'Banlic', 'Pulo', 'Sala', 'Poblacion Uno', 'Marinig', 'Butong', 'Gulod',
            'Bigaa', 'Poblacion Tres', 'Baclaran', 'Niugan', 'Poblacion Dos', 'Casile', 'Pittland', 'Diezmo'
         ],
        counts: [10, 9, 8, 7, 5, 5, 4, 4, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0],
        subCategories: ['Driving School', 'Learning Center', 'Private School', 'School Service', 'Training Center', 'Tutorial Services',
            'Vocational and Special Schools' 
        ], 
        subCategoryCounts: [2 ,8, 34, 1, 7, 4, 5],  
        barData: [5, 5, 8, 10, 7, 1, 9, 4, 1, 2, 1, 1, 0, 2, 4, 0, 0, 1],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 61,
            population: '421,440',
            stat3: 'Mamatid',
            stat4: 'Diezmo',
            marketDemands: 'Pittland'
        }
    },
    'Entertainment and Recreation': {
        barangays: ['Banlic', 'Pulo', 'Diezmo', 'Banaybanay', 'Niugan', 'Poblacion Dos', 'Sala', 'Bigaa', 'San isidro', 'Casile', 'Mamatid',
            'Pittland', 'Marinig', 'Baclaran', 'Gulod', 'Butong', 'Poblacion Tres', 'Poblacion Uno' 
         ],
        counts: [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        subCategories: ['Dining and Leisure', 'Egames/Ebingo', 'Fireworks and Pyrotechnics', 'Golf Cart Rental', 'Party Rentals', 'Play Center',
            'Sound & Light Rental', 'Sports and Fitness' 
        ], 
        subCategoryCounts: [1, 2, 1, 1, 2, 2, 2, 2],  
        barData: [2, 1, 1, 1, 2, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 13,
            population: '421,440',
            stat3: 'Banlic',
            stat4: 'Poblacion Uno',
            marketDemands: 'San Isidro'
        }
    },
    'Finance and Insurance': {
        barangays: ['Banlic', 'Pulo', 'Sala', 'Diezmo', 'Mamatid', 'Poblacion Uno', 'Poblacion Dos', 'Banaybanay', 'Niugan', 'Poblacion Tres', 'San Isidro',
            'Gulod', 'Pittland', 'Bigaa', 'Marinig', 'Butong', 'Casile', 'Baclaran'
         ],
        counts: [21, 14, 13, 11, 9, 8, 8, 7, 7, 5, 4, 2, 2, 1, 0, 0, 0, 0],
        subCategories: ['ATM Off Site Stations', 'Banks', 'Financing Institutions', 'General Financial Services', 'Holding Company', 'Insurance Agents/Companies',
            'Lending Investor', 'Money Remittance/ Bill Payment', 'Pawnshop & Financial Services', 'Payment Center' 
        ], 
        subCategoryCounts: [9 ,20, 11, 1, 8, 2, 14, 13, 31, 3],  
        barData: [14, 13, 7, 9, 21, 1, 4, 0, 7, 2, 0, 5, 0, 0, 8, 11, 2, 8],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 112,
            population: '421,440',
            stat3: 'Banlic',
            stat4: 'Baclaran',
            marketDemands: 'Marinig'
        }
    },
    'Food Services': {
        barangays: ['Pulo', 'Banaybanay', 'Banlic', 'Sala', 'Diezmo', 'Mamatid', 'Poblacion Tres', 'Poblacion Dos', 'Niugan', 'Poblacion Uno',
            'Pittland', 'San Isidro', 'Casile', 'Baclaran', 'Butong', 'Gulod', 'Marinig', 'Bigaa'
         ],
        counts: [29, 26, 26, 22, 17, 9, 8, 7, 7, 4, 4, 3, 3, 2, 1, 1, 0, 0],
        subCategories: ['Burger Stand', 'Canteen' , 'Catering Service', 'Coffee Shop', 'Eatery', 'Fast Food', 'Food Concessionaire', 'Food Stand',
            'Milk Tea Shop', 'Panciteria', 'Refreshment Parlor', 'Restaurant', 'Restobar'
        ], 
        subCategoryCounts: [3, 27, 10, 11, 8, 3 ,2 , 37, 6, 1, 12, 45, 4],  
        barData: [29, 22, 26, 9, 26, 0, 3, 0, 7, 1, 2, 8, 3, 1, 4, 17, 4, 7],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 169,
            population: '421,440',
            stat3: 'Pulo',
            stat4: 'Bigaa',
            marketDemands: 'Poblacion Tres'
        }
    },
    'Healthcare Services': {
        barangays: ['Pulo', 'Mamatid', 'Banaybanay', 'Sala', 'San Isidro', 'Banlic', 'Marinig', 'Poblacion Dos', 'Niugan', 'Poblacion Tres', 'Baclaran',
            'Poblacion Uno', 'Gulod', 'Butong', 'Diezmo', 'Bigaa', 'Pittland', 'Casile'
         ],
        counts: [20, 19, 18, 14, 14, 13, 11, 9, 7, 7, 4, 4, 3, 3, 2, 1, 0,0],
        subCategories: ['Animal Bite Clinics', 'Dental Clinics', 'Diagnostic and Medical Clinics', 'Dialysis Center', 'Gerontology Services', 'Hospital', 
            'Laboratory Equipment Repair Service',  'Maternity Clinics & Family Planning', 'Medical and Healthcare Services', 'Optical Clinics', 'Pharmacies', 
             'Pharmacy & Medical Clinics',  'Rehabilitation Centers',  'Service Contractor',  'Therapy Centers',  'Veterinary Clinics'
        ],
        subCategoryCounts: [4, 41, 10, 1, 1, 1, 1, 9, 1, 2, 62, 4, 4, 1, 2, 5
        ],  
        barData: [20, 14, 18, 19, 13, 1, 14, 11, 7, 3, 4, 7, 0, 3, 4, 2, 0, 9 ],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 149,
            population: '421,440',
            stat3: 'Pulo',
            stat4: 'Casile',
            marketDemands: 'Poblacion Uno'
        }
    },
    'IT and Digital Services': {
        barangays: ['Sala', 'Banlic', 'Banaybanay', 'Mamatid', 'Pulo', 'San Isidro', 'Niugan', 'Diezmo', 'Marinig', 'Poblacion Uno', 'Baclaran',
            'Pittland', 'Casile', 'Gulod', 'Bigaa', 'Poblacion Tres', 'Butong', 'Poblacion Dos' 
         ],
        counts: [5, 4, 4, 3, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
        subCategories: ['Administrative Support Services', 'Audio & Video System Services', 'Computer Services / IT Services', 'Computer Shop', 'Customer Support & BPO Service',
            'Internet Service Provider', 'Repair Service', 'Service Contractor', 'Telecom Services', 'Virtual Assistance' 
        ], 
        subCategoryCounts: [2, 1, 8, 1, 3, 1, 3, 4, 3, 1],  
        barData: [2, 5, 4, 3, 4, 0, 2, 1, 2, 0, 1, 0, 0, 0, 1, 1, 1, 0],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 27,
            population: '421,440',
            stat3: 'Sala',
            stat4: 'Poblacion Dos',
            marketDemands: 'Banlic, Casile, Pulo'
        }
    },
    'Manufacturing and Production': {
        barangays: ['Diezmo', 'Pulo', 'Banaybanay', 'San Isidro', 'Mamatid', 'Niugan', 'Sala', 'Banlic', 'Pittland', 'Bigaa','Butong',
            'Poblacion Tres', 'Gulod', 'Marinig', 'Poblacion Dos', 'Baclaran', 'Casile', 'Poblacion Uno' 
         ],
        counts: [20, 20, 17, 13, 13, 11, 9, 9, 4, 3, 3, 3, 2, 1, 1, 0, 0, 0],
        subCategories: ['Agricultural Products', 'Contractor and Service Manufacturing', 'Essential Manufacturer', 'Fabrication Services',
            'Food Products Manufacturer', 'Garment Manufacturer', 'General Manufacturing', 'Glass & Aluminum Fabrication Services', 'Hollowblock Making',
            'Industrial Equipment Services', 'Machine Fabrication and Shop', 'Metal Fabrication', 'Non-Essential Manufacturer', 'PEZA Registered Business',
            'Plastic Products Manufacturer', 'Specialty Manufacturing', 'Woodcraft'  
        ], 
        subCategoryCounts: [4, 10, 2, 18, 15, 7, 1, 11, 2, 3, 8, 9, 19, 9, 1, 7, 3],  
        barData: [20, 9, 17, 13, 9, 3, 13, 1, 11, 2, 0, 3, 0, 3, 0, 20, 4, 1],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 129,
            population: '421,440',
            stat3: 'Diezmo',
            stat4: 'Poblacion Uno',
            marketDemands: 'Baclaran, Gulod'
        }
    },
    'Personal and Household Services': {
        barangays: ['Mamatid', 'Banlic', 'Banaybanay', 'Pulo', 'Niugan', 'Sala', 'Gulod' , 'Marinig', 'San Isidro',
            'Butong', 'Casile', 'Bigaa', 'Poblacion Uno', 'Poblacion Tres', 'Baclaran', 'Poblacion Dos', 'Diezmo', 'Pittland'  
         ],
        counts: [14, 11, 10, 10, 7, 4, 4, 4, 3, 2, 2, 1, 1, 1, 1, 1, 0, 0],
        subCategories: ['Air Conditioner Services', 'Bottle Cleaning', 'Funeral Services', 'Furniture & Carpentry', 'Gown/Barong/Dress/Toga Rental',
            'Janitorial Services', 'Kitchen Equipment Repair Services', 'Laundy Shops', 'Pest Control', 'Plumbing Services', 'Refrigerator & Air Con Repair Services',
            'Service Contractor', 'Tailor and Dress Shop', 'Upholstery and Repair Shop' 
        ], 
        subCategoryCounts: [6, 1, 8, 1, 1, 2, 1 ,31, 5, 2, 12, 2, 3, 1],  
        barData: [10, 4, 10, 14, 11, 1, 3, 4, 7, 4, 1, 1, 2, 2, 1, 0, 0, 1],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 76,
            population: '421,440',
            stat3: 'Mamatid',
            stat4: 'Pittland',
            marketDemands: 'Baclaran, Sala'
        }
    },
    'Personal Care Services': {
        barangays: ['Pulo', 'Banlic', 'Mamatid', 'Poblacion Dos', 'Sala', 'Banaybanay', 'Poblacion Uno', 'Poblacion Tres', 'San Isidro', 'Butong', 'Gulod',
            'Diezmo', 'Bigaa', 'Baclaran', 'Pittland', 'Casile', 'Marinig', 'Niugan'
         ],
        counts: [8, 6, 4, 3, 2, 2, 1, 1, 1,  0, 0, 0, 0, 0, 0, 0, 0, 0],
        subCategories: ['Aesthetic Services', 'Barbershop', 'Beauty Taylor', 'Fitness Gym', 'Home Massage Services',
            'Nail Spa', 'Skin care Center' 
        ], 
        subCategoryCounts: [4, 2, 14, 4, 1, 1, 2],  
        barData: [8, 2, 2, 4, 6, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 3],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 28,
            population: '421,440',
            stat3: 'Pulo',
            stat4: 'Niugan',
            marketDemands: 'Gulod'
        }
    },
    'Professional Services': {
        barangays: ['Banaybanay', 'Pulo', 'Banlic', 'San Isidro', 'Sala', 'Niugan', 'Mamatid', 'Pittland', 'Butong', 'Diezmo', 
            'Bigaa', 'Poblacion Uno', 'Marinig', 'Gulod', 'Baclaran', 'Casile', 'Poblacion Tres', 'Poblacion Dos' 
         ],
        counts: [28, 27, 16, 14, 6, 6, 6, 5, 4, 4, 3, 2, 2, 2, 1, 0, 0 ,0],
        subCategories: ['Accounting Agencies', 'Administrative Office Services', 'Administrative Support Services', 'Business Agent', 'Calibration Services',
            'Consultancy and Management Services', 'Contracting and Manpower Services', 'Design Services', 'Emission and Testing Center', 'Engineering and Technical Services',
            'Organizations', 'Referral Service', 'Repair and Maintenance Services', 'Security Agency', 'Water Treatment and Testing Services'  
        ], 
        subCategoryCounts: [4, 2, 14, 4, 1, 1, 2],  
        barData: [27, 6, 28, 6, 16, 3, 14, 2, 6, 2, 1, 0, 0, 4, 2, 4, 5, 0],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 126,
            population: '421,440',
            stat3: 'Banaybanay',
            stat4: 'Poblacion Dos',
            marketDemands: 'San Isidro'
        }
    },
    'Retail Stores': {
        barangays: ['Banlic', 'Banaybanay', 'Pulo', 'Mamatid', 'Marinig', 'Sala', 'Poblacion Dos', 'Niugan', 'San Isidro', 'Gulod',
            'Bigaa', 'Butong', 'Baclaran', 'Poblacion Tres', 'Poblacion Uno', 'Casile', 'Pittland', 'Diezmo'
         ],
        counts: [147, 128, 120, 104, 77, 60, 53, 51, 50, 30, 26, 24, 24, 20, 19, 7, 6 ,1],
        subCategories: ['Clothing and Apparel', 'Convenience Store', 'Electronics and Gadgets', 'Food and Beverage', 'Fuel and Energy Supplies', 'Furniture and Home Decor',
            'General Merchandise', 'Grocery and Supermarkets', 'Hardware and Constructiom Supplies', 'Health and Personal Care', 'Household Supplies', 'Online Shops', 'Sari-sari Store',
            'School and Office Supplies', 'Specialty Stores', 'Vehicle and Parts Supplies', 'Water Supply' 
        ], 
        subCategoryCounts: [37, 44, 22, 170, 84, 11, 130, 30, 110, 10, 9, 21, 82, 15, 74, 66, 32],  
        barData: [120, 60, 128, 104, 147, 26, 50, 77, 51, 30, 24, 20, 7, 24, 19, 1, 6, 53 ],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 947,
            population: '421,440',
            stat3: 'Banlic',
            stat4: 'Diezmo',
            marketDemands: 'Sala, Banaybanay'
        }
    },
    'Tourism and Hospitality': {
        barangays: ['Pulo', 'Sala', 'Mamatid', 'Banaybanay', 'Bigaa', 'Poblacion Dos', 'Casile' , 'Gulod', 'Pittland', 'Diezmo', 'Poblacion Tres', 'Banlic',
            'Butong', 'Poblacion Uno', 'Baclaran', 'San Isidro', 'Marinig', 'Niugan'
         ],
        counts: [6, 4, 3, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        subCategories: ['Hotel', 'Resort', 'Travel Agency'
        ], 
        subCategoryCounts: [2, 5, 12],  
        barData: [6, 4, 2, 3, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1 ],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 19,
            population: '421,440',
            stat3: 'Pulo',
            stat4: 'Niugan',
            marketDemands: 'Baclaran'
        }
    },
    'Transportation and Logistics': {
        barangays: ['Pulo', 'Banaybanay', 'Banlic', 'Sala', 'San Isidro', 'Marinig', 'Mamatid', 'Niugan', 'Bigaa', 'Gulod' , 'Diezmo', 
            'Butong', 'Poblacion Tres', 'Pittland', 'Poblacion Uno', 'Baclaran', 'Casile', 'Poblacion Dos'
         ],
        counts: [63, 27, 25, 20, 16, 12, 12, 11, 9, 9, 9, 4, 3, 3, 2, 2, 0, 0 ],
        subCategories: ['Car Rental', 'Common Courier', 'Delivery Services', 'Forwarder', 'Hauling Services', 'Logistic Services', 'Operator & Drivers Association',
            'Service Contractor', 'Shuttle Service/Transport', 'Transport Services', 'Trucking Services/Transport', 'Vehicle Storage', 'Warehous and Storage Services'
        ], 
        subCategoryCounts: [2, 10, 12, 9, 17, 22, 2, 3, 11, 35, 63, 6, 35],  
        barData: [63, 20, 27, 12, 25, 9, 16, 12, 11, 9, 2, 3, 0, 4, 2, 9, 3, 0],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 227,
            population: '421,440',
            stat3: 'Pulo',
            stat4: 'Poblacion Dos',
            marketDemands: 'Poblacion Dos'
        }
    },
    'Wholesale and Distribution': {
        barangays: ['Banaybanay', 'Banlic', 'San Isidro', 'Pulo', 'Sala', 'Mamatid', 'Diezmo', 'Niugan', 'Butong', 'Marinig', 'Poblacion Dos', 'Baclaran',
            'Pittland', 'Poblacion Uno', 'Gulod', 'Bigaa', 'Casile', 'Poblacion Tres' 
         ],
        counts: [29, 13, 12, 12, 11, 9, 5, 5, 5, 3, 2, 2, 2, 1, 1, 1, 0, 0],
        subCategories: ['Agricultural Products', 'Auction', 'Automotive', 'Cleaning Supplies', 'Electronics Products', 'Essential/ Non Essential', 'Food Products', 'Fuel and Energy Supplies', 
            'Industrial and Construction Supplies', 'Junk Shops', 'Medical and Health Supplies', 'Non Essential', 'Office & Packaging Supplies', 'Recycle Materials', 'Service Contractor', 'Trading'
        ], 
        subCategoryCounts: [4, 2, 5, 1, 3, 5, 16, 8, 9, 18, 3, 14, 3, 9, 2, 11],  
        barData: [12, 11, 29, 9, 13, 1, 12, 3, 5, 1, 2, 0, 0, 5, 1, 5, 2, 2],
        pieData: [36444, 10903, 40936, 56761, 11496, 14235, 30509, 56154, 87645, 17873, 15164, 4274, 3794, 14764, 7025, 6622, 4733, 2108],
        stats: {
            totalBusinesses: 113,
            population: '421,440',
            stat3: 'Banaybanay',
            stat4: 'Poblacion Tres',
            marketDemands: 'Niugan'
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
        labels: dataForCategories.All.barangays, // Dynamically use barangays from default category
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
                'rgba(201, 203, 207, 0.2)',  // Light Grey
                'rgba(0, 128, 128, 0.2)',    // Teal
                'rgba(70, 130, 180, 0.2)',   // Steel Blue
                'rgba(46, 204, 113, 0.2)',   // Light Green
                'rgba(231, 76, 60, 0.2)',    // Tomato Red
                'rgba(241, 196, 15, 0.2)',   // Gold
                'rgba(142, 68, 173, 0.2)',   // Dark Purple
                'rgba(39, 174, 96, 0.2)',    // Emerald Green
                'rgba(44, 62, 80, 0.2)',     // Dark Slate
                'rgba(192, 57, 43, 0.2)',    // Brick Red
                'rgba(41, 128, 185, 0.2)',   // Ocean Blue
                'rgba(127, 255, 212, 0.2)'   // Aquamarine
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',   // Red
                'rgba(54, 162, 235, 1)',   // Blue
                'rgba(255, 206, 86, 1)',   // Yellow
                'rgba(75, 192, 192, 1)',   // Teal
                'rgba(153, 102, 255, 1)',  // Purple
                'rgba(255, 159, 64, 1)',   // Orange
                'rgba(201, 203, 207, 1)',  // Grey
                'rgba(0, 128, 128, 1)',    // Dark Teal
                'rgba(70, 130, 180, 1)',   // Steel Blue
                'rgba(46, 204, 113, 1)',   // Green
                'rgba(231, 76, 60, 1)',    // Red
                'rgba(241, 196, 15, 1)',   // Gold
                'rgba(142, 68, 173, 1)',   // Dark Purple
                'rgba(39, 174, 96, 1)',    // Green
                'rgba(44, 62, 80, 1)',     // Slate Grey
                'rgba(192, 57, 43, 1)',    // Brick Red
                'rgba(41, 128, 185, 1)',   // Ocean Blue
                'rgba(127, 255, 212, 1)'   // Aquamarine
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});