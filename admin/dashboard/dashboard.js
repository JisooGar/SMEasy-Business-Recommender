// Selected business index for editing
let selectedBusinessIndex = null;

// Example admin data (this should come from your backend in a real-world scenario)
const adminData = {
    name: 'Admin 1', // Example name
    id: 'A1',        // Example admin ID
};

// Set the initials in the profile display
const profileInitials = document.getElementById('profileInitials');
profileInitials.textContent = adminData.id; // Set to the admin's ID (e.g., "A1")

// Set the greeting in the dropdown menu
const adminGreeting = document.getElementById('adminGreeting');
adminGreeting.textContent = `Hello, ${adminData.name}!`;

// Toggle dropdown visibility
document.getElementById('profileDropdownButton').addEventListener('click', () => {
    const dropdown = document.getElementById('profileDropdownMenu');
    dropdown.classList.toggle('hidden');
});

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    const button = document.getElementById('profileDropdownButton');
    const dropdown = document.getElementById('profileDropdownMenu');
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});

// Show the Change Password modal
document.getElementById('editProfileButton').addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        console.error("Change Password modal not found!");
    }
});

// Close the modal
document.getElementById('cancelChangePassword').addEventListener('click', () => {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.classList.add('hidden');
    } else {
        console.error("Change Password modal not found!");
    }
});

// Handle Change Password form submission
document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }

    try {
        const response = await fetch('/admin/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message || 'Password updated successfully!');
            document.getElementById('changePasswordModal').classList.add('hidden');
            document.getElementById('changePasswordForm').reset();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to update password.');
        }
    } catch (error) {
        console.error('Error updating password:', error);
        alert('An error occurred. Please try again.');
    }
});

// Example Data
const smeData = [
    { id: 1, name: 'Business 1', address: 'Address 1', subarea: 'Subarea 1', barangay: 'Barangay 1', latitude: '14.56', longitude: '120.98', industry: 'Retail', category: 'Clothing', subcategory: 'Men' },
    { id: 2, name: 'Business 2', address: 'Address 2', subarea: 'Subarea 2', barangay: 'Barangay 2', latitude: '14.57', longitude: '120.99', industry: 'Food', category: 'Restaurant', subcategory: 'Fast Food' },
];

const surveyData = [
   
];

// DOM Elements
const smeDataButton = document.getElementById('smeDataButton');
const surveyDataButton = document.getElementById('surveyDataButton');
const tableBody = document.getElementById('tableBody'); // This must remain in the scrollable div
const searchBar = document.getElementById('searchBar');
const addBusinessButton = document.getElementById('addBusinessButton');
const surveySubButtons = document.getElementById('surveySubButtons');
const preferencesTabButton = document.getElementById('preferencesTabButton');
const marketDemandsTabButton = document.getElementById('marketDemandsTabButton');
const tableHead = document.querySelector("#tableHead"); // Table Head

const renderSMETable = (data) => {
    // Update Table Headers for SME Data
    tableHead.innerHTML = `
        <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subarea</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Barangay</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Latitude</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Longitude</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subcategory</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
    `;

    // Update Table Body
    tableBody.innerHTML = ''; // Clear existing rows
    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2">${item.id}</td>
            <td class="px-4 py-2">${item.name}</td>
            <td class="px-4 py-2">${item.address}</td>
            <td class="px-4 py-2">${item.subarea}</td>
            <td class="px-4 py-2">${item.barangay}</td>
            <td class="px-4 py-2">${item.latitude}</td>
            <td class="px-4 py-2">${item.longitude}</td>
            <td class="px-4 py-2">${item.industry || 'N/A'}</td>
            <td class="px-4 py-2">${item.category || 'N/A'}</td>
            <td class="px-4 py-2">${item.subcategory || 'N/A'}</td>
            <td class="px-4 py-2">
                <button class="text-blue-500 hover:underline">Edit</button>
                <button class="text-red-500 hover:underline">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

const renderSurveyTable = (data) => {
    tableBody.innerHTML = ''; // Clear existing rows
    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2">${item.id}</td>
            <td class="px-4 py-2">${item.name}</td>
            <td class="px-4 py-2">${item.address}</td>
            <td class="px-4 py-2">${item.subarea}</td>
            <td class="px-4 py-2">${item.barangay}</td>
            <td class="px-4 py-2">${item.latitude}</td>
            <td class="px-4 py-2">${item.longitude}</td>
            <td class="px-4 py-2">${item.industry || 'N/A'}</td>
            <td class="px-4 py-2">${item.category || 'N/A'}</td>
            <td class="px-4 py-2">${item.subcategory || 'N/A'}</td>
            <td class="px-4 py-2">
                <button class="text-red-500 hover:underline">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

// Preferences Table Rendering Function
const renderPreferencesTable = (data) => {
    // Update Table Headers
    tableHead.innerHTML = `
        <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Barangay</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Age Range</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Education</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Employment</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Business Visits</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Frequent Visits</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Browsing Behavior</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Satisfaction</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Lacking</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Shopping Preference</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Motivation for Choosing</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Shopping Traits</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Factors for New Businesses</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Shopping Style</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Values</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Transportation Links</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Accessibility</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Outside Barangay Travel</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Transportation Challenges</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
    `;

    // Update Table Body
    tableBody.innerHTML = ''; // Clear existing rows
    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2">${item.id}</td>
            <td class="px-4 py-2">${item.month}</td>
            <td class="px-4 py-2">${item.barangay}</td>
            <td class="px-4 py-2">${item.ageRange}</td>
            <td class="px-4 py-2">${item.gender}</td>
            <td class="px-4 py-2">${item.education}</td>
            <td class="px-4 py-2">${item.employment}</td>
            <td class="px-4 py-2">${item.businessVisits}</td>
            <td class="px-4 py-2">${item.frequentVisits}</td>
            <td class="px-4 py-2">${item.browsingBehavior}</td>
            <td class="px-4 py-2">${item.satisfaction}</td>
            <td class="px-4 py-2">${item.lacking}</td>
            <td class="px-4 py-2">${item.shoppingPreference}</td>
            <td class="px-4 py-2">${item.motivationForChoosing}</td>
            <td class="px-4 py-2">${item.shoppingTraits}</td>
            <td class="px-4 py-2">${item.factorsForNewBusinesses}</td>
            <td class="px-4 py-2">${item.shoppingStyle}</td>
            <td class="px-4 py-2">${item.values}</td>
            <td class="px-4 py-2">${item.transportationLinks}</td>
            <td class="px-4 py-2">${item.accessibility}</td>
            <td class="px-4 py-2">${item.outsideBarangayTravel}</td>
            <td class="px-4 py-2">${item.transportationChallenges}</td>
            <td class="px-4 py-2">
                <button class="text-red-500 hover:underline delete-button" data-id="${item.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Attach Delete Button Functionality
    attachDeleteHandlers(data, renderPreferencesTable);
};


// Market Demands Table Rendering Function
const renderMarketDemandsTable = (data) => {
    // Update Table Headers
    tableHead.innerHTML = `
        <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Barangay</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Automotive Services</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Construction</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cooperative Business</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Creative Media</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Education Services</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Entertainment</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Finance and Insurance</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Food Services</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Healthcare Services</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">IT Services</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Manufacturing</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Personal Services</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Professional Services</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Retail Stores</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tourism and Hospitality</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Transportation</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Wholesale</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
    `;

    // Update Table Body
    tableBody.innerHTML = ''; // Clear existing rows
    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2">${item.id}</td>
            <td class="px-4 py-2">${item.barangay}</td>
            <td class="px-4 py-2">${item.automotive}</td>
            <td class="px-4 py-2">${item.construction}</td>
            <td class="px-4 py-2">${item.cooperativeBusiness}</td>
            <td class="px-4 py-2">${item.creativeMedia}</td>
            <td class="px-4 py-2">${item.educationServices}</td>
            <td class="px-4 py-2">${item.entertainment}</td>
            <td class="px-4 py-2">${item.financeInsurance}</td>
            <td class="px-4 py-2">${item.foodServices}</td>
            <td class="px-4 py-2">${item.healthcare}</td>
            <td class="px-4 py-2">${item.itDigital}</td>
            <td class="px-4 py-2">${item.manufacturing}</td>
            <td class="px-4 py-2">${item.personalHousehold}</td>
            <td class="px-4 py-2">${item.professionalServices}</td>
            <td class="px-4 py-2">${item.retail}</td>
            <td class="px-4 py-2">${item.tourismHospitality}</td>
            <td class="px-4 py-2">${item.transportation}</td>
            <td class="px-4 py-2">${item.wholesale}</td>
            <td class="px-4 py-2">
                <button class="text-red-500 hover:underline delete-button" data-id="${item.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Attach Delete Button Functionality
    attachDeleteHandlers(data, renderMarketDemandsTable);
};

const attachDeleteHandlers = (data, renderFunction) => {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const id = parseInt(button.dataset.id, 10);
            const indexToDelete = data.findIndex(item => item.id === id);

            if (indexToDelete !== -1) {
                if (confirm(`Are you sure you want to delete item with ID ${id}?`)) {
                    data.splice(indexToDelete, 1);
                    data.forEach((item, index) => (item.id = index + 1)); // Reassign IDs
                    renderFunction(data); // Re-render the table
                }
            }
        });
    });
};



// SME Data Button Event Listener
smeDataButton.addEventListener("click", () => {
    renderSMETable(smeData); // Call SME table rendering function
    smeDataButton.classList.add("bg-orange-500", "text-white");
    surveyDataButton.classList.remove("bg-orange-500", "text-white");
    surveyDataButton.classList.add("bg-gray-200", "text-gray-800");

    // Show the "Add Business" button
    addBusinessButton.classList.remove("hidden");

    // Hide sub-buttons for Survey Data
    surveySubButtons.classList.add("hidden");
});

// Survey Data Button Event Listener
surveyDataButton.addEventListener("click", () => {
    // Clear any existing table content (Survey Data no longer displays a table)
    tableHead.innerHTML = ''; // Clear table headers
    tableBody.innerHTML = ''; // Clear table body

    // Automatically render the Preferences table
    renderPreferencesTable(preferencesData);

    // Activate the "Preferences" tab button by default
    preferencesTabButton.classList.add("bg-green-500", "text-white");
    marketDemandsTabButton.classList.remove("bg-green-500", "text-white");

    // Highlight the Survey Data button
    surveyDataButton.classList.add("bg-orange-500", "text-white");
    smeDataButton.classList.remove("bg-orange-500", "text-white");
    smeDataButton.classList.add("bg-gray-200", "text-gray-800");

    // Hide the "Add Business" button (specific to SME Data)
    addBusinessButton.classList.add("hidden");

    // Show the sub-buttons for Preferences and Market Demands
    surveySubButtons.classList.remove("hidden");
});


// Preferences and Market Demands Data
const preferencesData = [
    {
        id: 1,
        month: "January",
        barangay: "Barangay 1",
        ageRange: "18-25",
        gender: "Male",
        education: "College",
        employment: "Employed",
        businessVisits: 5,
        frequentVisits: "Grocery",
        browsingBehavior: "Price Comparison",
        satisfaction: "Very Satisfied",
        lacking: "Parking Space",
        shoppingPreference: "Online",
        motivationForChoosing: "Proximity",
        shoppingTraits: "Price Sensitive",
        factorsForNewBusinesses: "Accessibility",
        shoppingStyle: "Planned",
        values: "Affordability",
        transportationLinks: "Available",
        accessibility: "Good",
        outsideBarangayTravel: "Occasionally",
        transportationChallenges: "Traffic",
    },
];

const marketDemandsData = [
    {
        id: 1,
        barangay: "Barangay 1",
        automotive: "High",
        construction: "Moderate",
        cooperativeBusiness: "Low",
        creativeMedia: "High",
        educationServices: "Low",
        entertainment: "Moderate",
        financeInsurance: "High",
        foodServices: "High",
        healthcare: "Moderate",
        itDigital: "High",
        manufacturing: "Low",
        personalHousehold: "Moderate",
        personalCare: "Moderate",
        professionalServices: "High",
        retail: "Very High",
        tourismHospitality: "High",
        transportation: "Moderate",
        wholesale: "High",
    },
];

// Preferences Button Event Listener
preferencesTabButton.addEventListener("click", () => {
    renderPreferencesTable(preferencesData);
    preferencesTabButton.classList.add("bg-green-500", "text-white");
    marketDemandsTabButton.classList.remove("bg-green-500", "text-white");
});

// Market Demands Button Event Listener
marketDemandsTabButton.addEventListener("click", () => {
    renderMarketDemandsTable(marketDemandsData);
    marketDemandsTabButton.classList.add("bg-green-500", "text-white");
    preferencesTabButton.classList.remove("bg-green-500", "text-white");
});


// Initialize with SME Data (default table)
renderSMETable(smeData);



// Add search functionality
searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase().trim(); // Normalize search term
    let filteredData = [];

    if (smeDataButton.classList.contains('bg-orange-500')) {
        // Filter SME Data
        filteredData = smeData.filter(item => item.name.toLowerCase().includes(searchTerm));
        renderSMETable(filteredData);
    } else if (surveyDataButton.classList.contains('bg-orange-500')) {
        // Filter Survey Data
        filteredData = surveyData.filter(item => item.name.toLowerCase().includes(searchTerm));
        renderSurveyTable(filteredData);
    }
});


// Handle Edit and Delete Button Click
tableBody.addEventListener('click', (e) => {
    const row = e.target.closest('tr'); // Get the row element
    if (!row) return;

    const id = parseInt(row.children[0].textContent, 10); // Get the ID from the first cell

    // Handle Edit Button Click (Only for SME Data)
    if (e.target.classList.contains('text-blue-500') && smeDataButton.classList.contains('bg-orange-500')) {
        const dataToEdit = smeData.find((business) => business.id === id);

        if (dataToEdit) {
            // Populate the form fields with the existing data
            document.getElementById('businessName').value = dataToEdit.name;
            document.getElementById('address').value = dataToEdit.address;
            document.getElementById('subarea').value = dataToEdit.subarea;
            document.getElementById('barangay').value = dataToEdit.barangay;
            document.getElementById('latitude').value = dataToEdit.latitude;
            document.getElementById('longitude').value = dataToEdit.longitude;
            document.getElementById('industry').value = dataToEdit.industry || '';
            document.getElementById('category').value = dataToEdit.category || '';
            document.getElementById('subcategory').value = dataToEdit.subcategory || '';

            // Set the selected index for updating
            selectedBusinessIndex = smeData.findIndex((business) => business.id === id);

            // Show the modal
            addEditBusinessModal.classList.remove('hidden');
        }
    }

    // Handle Delete Button Click
    if (e.target.classList.contains('text-red-500')) {
        const confirmDelete = confirm(`Are you sure you want to delete the item with ID: ${id}?`);

        if (confirmDelete) {
            const isSMEDataActive = smeDataButton.classList.contains('bg-orange-500');
            if (isSMEDataActive) {
                // Remove the item and reassign IDs for SME Data
                const indexToDelete = smeData.findIndex((business) => business.id === id);
                if (indexToDelete !== -1) {
                    smeData.splice(indexToDelete, 1); // Remove the item

                    // Reassign IDs
                    smeData.forEach((business, index) => {
                        business.id = index + 1; // Sequential numbering (1-based index)
                    });

                    renderSMETable(smeData); // Re-render the table
                }
            } else {
                // Remove the item and reassign IDs for Survey Data
                const indexToDelete = surveyData.findIndex((survey) => survey.id === id);
                if (indexToDelete !== -1) {
                    surveyData.splice(indexToDelete, 1); // Remove the item

                    // Reassign IDs
                    surveyData.forEach((survey, index) => {
                        survey.id = index + 1; // Sequential numbering (1-based index)
                    });

                    renderSurveyTable(surveyData); // Re-render the table
                }
            }
            alert(`Item with ID: ${id} has been deleted.`);
        }
    }
});


// Add/Edit Business Modal Elements
const addEditBusinessModal = document.getElementById('addEditBusinessModal');
const closeAddEditBusinessModal = document.getElementById('closeAddEditBusinessModal');
const cancelAddEditBusiness = document.getElementById('cancelAddEditBusiness');
const addEditBusinessForm = document.getElementById('addEditBusinessForm');

// Show the Add/Edit Business modal
addBusinessButton.addEventListener('click', () => {
    addEditBusinessModal.classList.remove('hidden');
});

// Close the modal
const closeModal = () => addEditBusinessModal.classList.add('hidden');
closeAddEditBusinessModal.addEventListener('click', closeModal);
cancelAddEditBusiness.addEventListener('click', closeModal);

// Handle Form Submission for Add/Edit
addEditBusinessForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const newBusiness = {
        id: selectedBusinessIndex !== null ? smeData[selectedBusinessIndex].id : smeData.length + 1,
        name: document.getElementById("businessName").value,
        address: document.getElementById("address").value,
        subarea: document.getElementById("subarea").value,
        barangay: document.getElementById("barangay").value,
        latitude: document.getElementById("latitude").value,
        longitude: document.getElementById("longitude").value,
        industry: document.getElementById("industry").value,
        category: document.getElementById("category").value,
        subcategory: document.getElementById("subcategory").value,
    };

    if (selectedBusinessIndex !== null) {
        // Update existing business
        if (smeDataButton.classList.contains("bg-orange-500")) {
            smeData[selectedBusinessIndex] = newBusiness;
        }
        alert(`Business with ID: ${newBusiness.id} has been updated.`);
    } else {
        // Add new business
        if (smeDataButton.classList.contains("bg-orange-500")) {
            smeData.push(newBusiness);
        }
        alert(`New business with ID: ${newBusiness.id} has been added.`);
    }

    // Immediately update the table
    if (smeDataButton.classList.contains("bg-orange-500")) {
        renderSMETable(smeData); // Update the SME Data table in real-time
    }

    // Reset form and close modal
    addEditBusinessForm.reset();
    closeModal();

    // Reset selected index
    selectedBusinessIndex = null;
});

