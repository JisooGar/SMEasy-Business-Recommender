// Selected business index for editing
let selectedBusinessIndex = null;
let smeData = []; // Declare globally

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

// //Fetch SME Data from Backend
// async function fetchSMEData() {
//     try {
//         const response = await fetch('/api/smes');
//         if (!response.ok) throw new Error('Failed to fetch SME data');
        
//         const data = await response.json();
//         console.log('Fetched SME Data:', data); // Debug the response
//         renderSMETable(data); // Render the table
//     } catch (err) {
//         console.error('Error fetching SME data:', err);
//     }
// }

// Fetch SME Data from the API
const fetchSMEData = async () => {
    try {
        const response = await fetch('/api/smes');
        if (!response.ok) throw new Error('Failed to fetch SME data');
        smeData = await response.json(); // Populate the global variable
        renderSMETable(smeData); // Render the initial table
    } catch (error) {
        console.error('Error fetching SME data:', error);
        alert("Failed to fetch SME data. Please try again later.");
    }
};

// Fetch the data on page load
fetchSMEData();


// Edit SME Function
async function editSME(id) {
    try {
        // Fetch the business details by ID
        const response = await fetch(`/api/business/${id}`);
        if (!response.ok) throw new Error("Failed to fetch business details");

        const business = await response.json();

        // Populate the modal with fetched data
        document.getElementById("businessName").value = business.business_name || "";
        document.getElementById("address").value = business.address || "";
        document.getElementById("subarea").value = business.subarea_name || "";
        document.getElementById("barangay").value = business.barangay_name || "";
        document.getElementById("latitude").value = business.latitude || "";
        document.getElementById("longitude").value = business.longitude || "";
        document.getElementById("industry").value = business.sme_type || "";
        document.getElementById("category").value = business.category_name || "";
        document.getElementById("subcategory").value = business.subcategory_name || "";

        // Set `selectedBusinessIndex` to the business ID for updating
        selectedBusinessIndex = id;

        // Show the modal
        addEditBusinessModal.classList.remove("hidden");
    } catch (error) {
        console.error("Error fetching business:", error);
        alert("An error occurred while fetching the business details.");
    }
}

// Delete SME Function
async function deleteSME(id) {
    if (!confirm(`Are you sure you want to delete business with ID ${id}? This action cannot be undone.`)) {
        return; // Exit if user cancels
    }

    try {
        const response = await fetch(`/api/business/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Business deleted successfully!");
            fetchSMEData(); // Refresh the table
        } else {
            const error = await response.json();
            throw new Error(error.message || "Failed to delete business.");
        }
    } catch (error) {
        console.error("Error deleting business:", error);
        alert("An error occurred while deleting the business. Please try again.");
    }
}

// async function deleteSurvey(id) {


//     if (!confirm(`Are you sure you want to delete the survey with ID ${id}? This action cannot be undone.`)) {
//         return; // Exit if user cancels
//     }

//     try {
//         const response = await fetch(`/api/survey/${id}`, { method: "DELETE" });
//         if (response.ok) {
//             alert("Survey deleted successfully!");
//             fetchPreferenceData();
//             fetchMarketDemandData();
//         } else {
//             const error = await response.json();
//             throw new Error(error.message || "Failed to delete survey.");
//         }
//     } catch (error) {
//         console.error("Error deleting survey:", error);
//         alert("An error occurred while deleting the survey. Please try again.");
//     }
// }

async function deleteSurvey(id) {
    const userConfirmed = confirm(`Are you sure you want to delete the survey with ID ${id}? This action cannot be undone.`);
    if (!userConfirmed) return; // Exit if user cancels

    try {
        const response = await fetch(`/api/survey/${id}`, { method: "DELETE" });

        if (response.ok) {
            alert("Survey deleted successfully!");
                // Check which table is currently active and refresh it
                const isPreferencesActive = preferencesTabButton.classList.contains("bg-green-500"); // Adjust based on your active state logic
                if (isPreferencesActive) {
                    await fetchPreferencesData(); // Refresh Preferences table
                } else {
                    await fetchMarketDemandsData(); // Refresh Market Demands table
                }
        } else if (response.status === 404) {
            alert(`Survey with ID ${id} was not found. It may have already been deleted.`);
        } else {
            const error = await response.json();
            throw new Error(error.message || "Failed to delete survey.");
        }
    } catch (error) {
        console.error("Error deleting survey:", error);
        alert("An error occurred while deleting the survey. Please try again.");
    }
}


async function deleteUndefinedSurveys() {
    if (confirm("Are you sure you want to delete all undefined surveys? This action cannot be undone.")) {
        try {
            const response = await fetch('/api/surveys/undefined', { method: 'DELETE' });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || "Undefined surveys deleted successfully!");
                // Optionally refresh data if needed
                fetchSurveyData();
            } else {
                const error = await response.json();
                throw new Error(error.message || "Failed to delete undefined surveys.");
            }
        } catch (error) {
            console.error("Error deleting undefined surveys:", error);
            alert("An error occurred while deleting undefined surveys. Please try again.");
        }
    }
}
  

// Initialize by fetching SME data on page load
fetchSMEData();




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
const addEditBusinessModal = document.getElementById('addEditBusinessModal');
const closeAddEditBusinessModal = document.getElementById('closeAddEditBusinessModal');
const cancelAddEditBusiness = document.getElementById('cancelAddEditBusiness');
const addEditBusinessForm = document.getElementById('addEditBusinessForm');


// Show Add/Edit Business Modal
addBusinessButton.addEventListener("click", () => {
    addEditBusinessForm.reset(); // Reset the form
    selectedBusinessIndex = null; // Clear selected index for new business
    addEditBusinessModal.classList.remove("hidden"); // Show modal
});

// // Show the Add/Edit Business modal (for adding new business)
// addBusinessButton.addEventListener('click', () => {
//     // Clear the form for new entries
//     addEditBusinessForm.reset();
//     selectedBusinessIndex = null; // Set to null for new business
//     addEditBusinessModal.classList.remove('hidden'); // Show modal
// });

// Close Modal
const closeModal = () => addEditBusinessModal.classList.add("hidden");
closeAddEditBusinessModal.addEventListener("click", closeModal);
cancelAddEditBusiness.addEventListener("click", closeModal);

// //Working One
// addEditBusinessForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const newBusiness = {
//         name: document.getElementById("businessName").value.trim(),
//         address: document.getElementById("address").value.trim(),
//         subarea: document.getElementById("subarea").value.trim(),
//         barangay: document.getElementById("barangay").value.trim(),
//         latitude: document.getElementById("latitude").value.trim(),
//         longitude: document.getElementById("longitude").value.trim(),
//         industry: document.getElementById("industry").value.trim(),
//         category: document.getElementById("category").value.trim(),
//         subcategory: document.getElementById("subcategory").value.trim(),
//     };

//     try {
//         const response = await fetch("/api/business", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newBusiness),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             alert(data.message || "Business added successfully!");
//             await fetchSMEData(); // Refresh the table to include the new business
//             addEditBusinessForm.reset();
//             addEditBusinessModal.classList.add("hidden");
//         } else {
//             const error = await response.json();
//             throw new Error(error.message || "Failed to add business.");
//         }
//     } catch (error) {
//         console.error("Error adding business:", error);
//         alert("An error occurred while adding the business. Please try again.");
//     }
// });

addEditBusinessForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const business = {
        name: document.getElementById("businessName").value.trim(),
        address: document.getElementById("address").value.trim(),
        subarea: document.getElementById("subarea").value.trim(),
        barangay: document.getElementById("barangay").value.trim(),
        latitude: document.getElementById("latitude").value.trim(),
        longitude: document.getElementById("longitude").value.trim(),
        industry: document.getElementById("industry").value.trim(),
        category: document.getElementById("category").value.trim(),
        subcategory: document.getElementById("subcategory").value.trim(),
    };

    try {
        if (selectedBusinessIndex) {
            // Edit existing business
            const response = await fetch(`/api/business/${selectedBusinessIndex}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(business),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || "Business updated successfully!");
                await fetchSMEData(); // Refresh table
                closeModal(); // Close modal
                selectedBusinessIndex = null; // Reset selected index
            } else {
                const error = await response.json();
                throw new Error(error.message || "Failed to update business.");
            }
        } else {
            // Add a new business
            const response = await fetch("/api/business", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(business),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || "Business added successfully!");
                await fetchSMEData(); // Refresh table
                addEditBusinessForm.reset(); // Clear form
                closeModal(); // Close modal
            } else {
                const error = await response.json();
                throw new Error(error.message || "Failed to add business.");
            }
        }
    } catch (error) {
        console.error("Error processing business:", error);
        alert("An error occurred while processing the business. Please try again.");
    }
});

// Fetch updated SME data
// const fetchSMEData = async () => {
//     try {
//         const response = await fetch("/api/smes");
//         const data = await response.json();

//         if (response.ok) {
//             renderSMETable(data); // Render the updated SME data in the table
//             // const row = document.querySelector(`tr:nth-child(${newBusiness.id})`);
//             //     if (row) {
//             //         row.classList.add('bg-green-100'); // Highlight the row
//             //         setTimeout(() => row.classList.remove('bg-green-100'), 2000); // Remove highlight after 2 seconds
//             //     }
//         } else {
//             throw new Error("Failed to fetch SME data.");
//         }
//     } catch (error) {
//         console.error("Error fetching SME data:", error);
//         alert("An error occurred while fetching SME data. Please refresh the page.");
//     }
// };

// Initialize by fetching SME data on page load
fetchSMEData();



// const renderSMETable = (data) => {
//     tableHead.innerHTML = `
//         <tr>
//             <th class="px-4 py-2">ID</th>
//             <th class="px-4 py-2">Name</th>
//             <th class="px-4 py-2">Address</th>
//             <th class="px-4 py-2">Barangay</th>
//             <th class="px-4 py-2">Subarea</th>
//             <th class="px-4 py-2">Latitude</th>
//             <th class="px-4 py-2">Longitude</th>
//             <th class="px-4 py-2">SME Type</th>
//             <th class="px-4 py-2">Category</th>
//             <th class="px-4 py-2">Subcategory</th>
//             <th class="px-4 py-2">Actions</th>
//         </tr>
//     `;

//     tableBody.innerHTML = ''; // Clear existing rows

//     data.forEach((item) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td class="px-4 py-2">${item.business_id}</td>
//             <td class="px-4 py-2">${item.business_name}</td>
//             <td class="px-4 py-2">${item.address || 'N/A'}</td>
//             <td class="px-4 py-2">${item.barangay_name || 'N/A'}</td>
//             <td class="px-4 py-2">${item.subarea_name || 'N/A'}</td>
//             <td class="px-4 py-2">${item.latitude || 'N/A'}</td>
//             <td class="px-4 py-2">${item.longitude || 'N/A'}</td>
//             <td class="px-4 py-2">${item.sme_type || 'N/A'}</td>
//             <td class="px-4 py-2">${item.category_name || 'N/A'}</td>
//             <td class="px-4 py-2">${item.subcategory_name || 'N/A'}</td>
//             <td class="px-4 py-2">
//                 <button class="text-blue-500 hover:underline">Edit</button>
//                 <button class="text-red-500 hover:underline">Delete</button>
//             </td>
//         `;
//         tableBody.appendChild(row);
//     });
// };

const renderSMETable = (data) => {
    tableHead.innerHTML = `
        <tr>
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Address</th>
            <th class="px-4 py-2">Barangay</th>
            <th class="px-4 py-2">Subarea</th>
            <th class="px-4 py-2">Latitude</th>
            <th class="px-4 py-2">Longitude</th>
            <th class="px-4 py-2">SME Type</th>
            <th class="px-4 py-2">Category</th>
            <th class="px-4 py-2">Subcategory</th>
            <th class="px-4 py-2">Actions</th>
        </tr>
    `;

    tableBody.innerHTML = ""; // Clear existing rows

    data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-4 py-2">${item.business_id}</td>
            <td class="px-4 py-2">${item.business_name}</td>
            <td class="px-4 py-2">${item.address || "N/A"}</td>
            <td class="px-4 py-2">${item.barangay_name || "N/A"}</td>
            <td class="px-4 py-2">${item.subarea_name || "N/A"}</td>
            <td class="px-4 py-2">${item.latitude || "N/A"}</td>
            <td class="px-4 py-2">${item.longitude || "N/A"}</td>
            <td class="px-4 py-2">${item.sme_type || "N/A"}</td>
            <td class="px-4 py-2">${item.category_name || "N/A"}</td>
            <td class="px-4 py-2">${item.subcategory_name || "N/A"}</td>
            <td class="px-4 py-2">
                <button class="edit-button text-blue-500 hover:underline" data-id="${item.business_id}">Edit</button>
                <button class="delete-button text-red-500 hover:underline" data-id="${item.business_id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

//NEWLY ADDDED
tableBody.addEventListener("click", (e) => {
    const target = e.target;

    // Handle Edit Button
    if (target.classList.contains("edit-button")) {
        const businessId = target.getAttribute("data-id");
        editSME(businessId);
    }

    // Handle Delete Button
    if (target.classList.contains("delete-button")) {
        const businessId = target.getAttribute("data-id");
        deleteSME(businessId);
    }
    if (target.classList.contains("surveymddelete-button")) {
        const surveyId = target.getAttribute("surveydata-id");
        deleteSurvey(surveyId);
    }

    if (target.classList.contains("surveypdelete-button")) {
        const surveyId = target.getAttribute("surveydata-id");
        deleteSurvey(surveyId);
    }
});

// Attach Edit and Delete Button Handlers
function attachActionHandlers(data) {
    // Attach Edit Handlers
    document.querySelectorAll(".edit-button").forEach((button) => {
        button.addEventListener("click", async () => {
            const id = button.dataset.id;
            await editSME(id); // Call edit function
        });
    });

    // Attach Delete Handlers
    document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", async () => {
            const id = button.dataset.id;
            await deleteSME(id); // Call delete function
        });
    });

    // Attach Delete Handlers
    document.querySelectorAll(".surveymddelete-button").forEach((button) => {
        button.addEventListener("click", async () => {
            const id = button.dataset.id;
            await deleteSurvey(id); // Call delete function
        });
    });

    // Attach Delete Handlers
    document.querySelectorAll(".surveypdelete-button").forEach((button) => {
        button.addEventListener("click", async () => {
            const id = button.dataset.id;
            await deleteSurvey(id); // Call delete function
        });
    });

}

function renderGridTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach((sme) => {
        const rowHTML = `
            <div>${sme.business_id}</div>
            <div>${sme.business_name}</div>
            <div>${sme.address}</div>
            <div>${sme.subarea_name || 'N/A'}</div>
            <div>${sme.barangay_name || 'N/A'}</div>
            <div>${sme.latitude || 'N/A'}</div>
            <div>${sme.longitude || 'N/A'}</div>
            <div>${sme.sme_type || 'N/A'}</div>
            <div>${sme.category_name || 'N/A'}</div>
            <div>${sme.subcategory_name || 'N/A'}</div>
            <div>
                <button class="text-blue-500 hover:underline">Edit</button>
                <button class="text-red-500 hover:underline">Delete</button>
            </div>
        `;
        tableBody.innerHTML += rowHTML;
    });
}


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
                <button class="delete-button text-red-500 hover:underline" data-id="${item.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};



// Render Preferences Table
const renderPreferencesTable = (data) => {

    // Update Table Headers
    tableHead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Month</th>
            <th>Barangay</th>
            <th>Age Range</th>
            <th>Gender</th>
            <th>Education</th>
            <th>Employment</th>
            <th>Business Visits</th>
            <th>Frequent Visits</th>
            <th>Browsing Behavior</th>
            <th>Satisfaction</th>
            <th>Lacking</th>
            <th>Shopping Preference</th>
            <th>Motivation for Choosing</th>
            <th>Shopping Traits</th>
            <th>Factors for New Businesses</th>
            <th>Shopping Style</th>
            <th>Values</th>
            <th>Transportation Links</th>
            <th>Accessibility</th>
            <th>Outside Barangay Travel</th>
            <th>Transportation Challenges</th>
            <th>Actions</th>
        </tr>
    `;

    // Update Table Body
    tableBody.innerHTML = "";
    data.forEach((item) => {
        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.month}</td>
                <td>${item.barangay}</td>
                <td>${item.ageRange}</td>
                <td>${item.gender}</td>
                <td>${item.education}</td>
                <td>${item.employment}</td>
                <td>${item.businessVisits}</td>
                <td>${item.frequentVisits}</td>
                <td>${item.browsingBehavior}</td>
                <td>${item.satisfaction}</td>
                <td>${item.lacking}</td>
                <td>${item.shoppingPreference}</td>
                <td>${item.motivationForChoosing}</td>
                <td>${item.shoppingTraits}</td>
                <td>${item.factorsForNewBusinesses}</td>
                <td>${item.shoppingStyle}</td>
                <td>${item.values}</td>
                <td>${item.transportationLinks}</td>
                <td>${item.accessibility}</td>
                <td>${item.outsideBarangayTravel}</td>
                <td>${item.transportationChallenges}</td>
                <td class="px-4 py-2">
                <button class="surveypdelete-button text-red-500 hover:underline" surveydata-id="${item.id}">Delete</button>
            </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
};

// Render Market Demands Table
const renderMarketDemandsTable = (data) => {

    // Update Table Headers
    tableHead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Barangay</th>
            <th>Automotive Services</th>
            <th>Construction</th>
            <th>Cooperative Business</th>
            <th>Creative Media</th>
            <th>Education Services</th>
            <th>Entertainment</th>
            <th>Finance and Insurance</th>
            <th>Food Services</th>
            <th>Healthcare Services</th>
            <th>IT Services</th>
            <th>Manufacturing</th>
            <th>Personal Services</th>
            <th>Professional Services</th>
            <th>Retail Stores</th>
            <th>Tourism and Hospitality</th>
            <th>Transportation</th>
            <th>Wholesale</th>
            <th>Actions</th>
        </tr>
    `;

    // Update Table Body
    tableBody.innerHTML = "";
    data.forEach((item) => {
        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.barangay}</td>
                <td>${item.automotive}</td>
                <td>${item.construction}</td>
                <td>${item.cooperativeBusiness}</td>
                <td>${item.creativeMedia}</td>
                <td>${item.educationServices}</td>
                <td>${item.entertainment}</td>
                <td>${item.financeInsurance}</td>
                <td>${item.foodServices}</td>
                <td>${item.healthcare}</td>
                <td>${item.itDigital}</td>
                <td>${item.manufacturing}</td>
                <td>${item.personalHousehold}</td>
                <td>${item.professionalServices}</td>
                <td>${item.retail}</td>
                <td>${item.tourismHospitality}</td>
                <td>${item.transportation}</td>
                <td>${item.wholesale}</td>
                            <td class="px-4 py-2">
                <button class="surveymddelete-button text-red-500 hover:underline" surveydata-id="${item.id}">Delete</button>
            </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
};

// Fetch Preferences Data
const fetchPreferencesData = async () => {
    try {
        const response = await fetch("/api/preferences");
        if (!response.ok) throw new Error("Failed to fetch Preferences data");
        const data = await response.json();
        renderPreferencesTable(data); // Render the Preferences table
    } catch (err) {
        console.error("Error fetching Preferences data:", err);
    }
};

// Fetch Market Demands Data
const fetchMarketDemandsData = async () => {
    try {
        const response = await fetch("/api/market-demands");
        if (!response.ok) throw new Error("Failed to fetch Market Demands data");
        const data = await response.json();
        renderMarketDemandsTable(data); // Render the Market Demands table
    } catch (err) {
        console.error("Error fetching Market Demands data:", err);
    }
};

// Handle SME Data Button Click
smeDataButton.addEventListener("click", () => {
    // Highlight SME Data button
    smeDataButton.classList.add("bg-orange-500", "text-white");
    surveyDataButton.classList.remove("bg-orange-500", "text-white");
    surveyDataButton.classList.add("bg-gray-200", "text-gray-800");

    // Show the Search Bar and Add Business button
    searchBar.classList.remove("hidden");
    addBusinessButton.classList.remove("hidden");

    // Hide survey sub-buttons
    surveySubButtons.classList.add("hidden");

    // Render SME Data table
    fetchSMEData();
});


// Handle Survey Data Button Click
surveyDataButton.addEventListener("click", () => {
    // Highlight Survey Data button
    surveyDataButton.classList.add("bg-orange-500", "text-white");
    smeDataButton.classList.remove("bg-orange-500", "text-white");
    smeDataButton.classList.add("bg-gray-200", "text-gray-800");

    // Hide the Search Bar and Add Business button
    searchBar.classList.add("hidden");
    addBusinessButton.classList.add("hidden");

    // Show survey sub-buttons
    surveySubButtons.classList.remove("hidden");

    // Clear the table content and render Preferences data by default
    tableHead.innerHTML = ''; // Clear table headers
    tableBody.innerHTML = ''; // Clear table body
    renderPreferencesTable(preferencesData);
});


smeDataButton.addEventListener("click", () => {
    console.log("SME Data Button Clicked");
    fetchSMEData();
});

surveyDataButton.addEventListener("click", () => {
        // Highlight Survey Data button
        surveyDataButton.classList.add("bg-orange-500", "text-white");
        smeDataButton.classList.remove("bg-orange-500", "text-white");
        smeDataButton.classList.add("bg-gray-200", "text-gray-800");
    
        // Show sub-buttons for Preferences and Market Demands
        surveySubButtons.classList.remove("hidden");
    
        // Clear the table and show loading placeholder
        tableHead.innerHTML = '<tr><td colspan="22" class="text-center text-gray-500">Loading...</td></tr>';
        tableBody.innerHTML = '';
    
        // Default to Preferences tab
        preferencesTabButton.click();
});



// //Preferences and Market Demands Data
// const preferencesData = [
//     {
//         id: "",
//         month: "",
//         barangay: "",
//         ageRange: "",
//         gender: "",
//         education: "",
//         employment: "",
//         businessVisits: "",
//         frequentVisits: "",
//         browsingBehavior: "",
//         satisfaction: "",
//         lacking: "",
//         shoppingPreference: "",
//         motivationForChoosing: "",
//         shoppingTraits:"",
//         factorsForNewBusinesses: "",
//         shoppingStyle: "",
//         values: "",
//         transportationLinks: "",
//         accessibility: "",
//         outsideBarangayTravel: "",
//         transportationChallenges:"",
//     },
// ];

// const marketDemandsData = [
//     {
//         id:"",
//         barangay: "",
//         automotive: "",
//         construction: "",
//         cooperativeBusiness: "",
//         creativeMedia: "",
//         educationServices: "",
//         entertainment: "",
//         financeInsurance: "",
//         foodServices: "",
//         healthcare: "",
//         itDigital: "",
//         manufacturing: "",
//         personalHousehold: "",
//         personalCare: "",
//         professionalServices: "",
//         retail: "",
//         tourismHospitality:"",
//         transportation: "",
//         wholesale: "",
//     },
// ];

// Preferences Button Event Listener
preferencesTabButton.addEventListener("click", async () => { // Add 'async' here
    // Update button states
    preferencesTabButton.classList.add("bg-green-500", "text-white");
    marketDemandsTabButton.classList.remove("bg-green-500", "text-white");

    // Clear the table and show loading placeholder
    tableHead.innerHTML = '<tr><td colspan="22" class="text-center text-gray-500">Loading Preferences...</td></tr>';
    tableBody.innerHTML = '';

    // Fetch and render Preferences data
    await fetchPreferencesData(); // Ensure this is awaited
});


// Market Demands Button Event Listener
marketDemandsTabButton.addEventListener("click", async () => { // Add 'async' here
    // Update button states
    marketDemandsTabButton.classList.add("bg-green-500", "text-white");
    preferencesTabButton.classList.remove("bg-green-500", "text-white");

    // Clear the table and show loading placeholder
    tableHead.innerHTML = '<tr><td colspan="19" class="text-center text-gray-500">Loading Market Demands...</td></tr>';
    tableBody.innerHTML = '';

    // Fetch and render Market Demands data
    await fetchMarketDemandsData(); // Ensure this is awaited
});


// Initialize with SME Data (default table)
renderSMETable(smeData);



// Add search functionality
searchBar.addEventListener("input", () => {
    const searchTerm = searchBar.value.trim().toLowerCase(); // Normalize search term
    if (!searchTerm) {
        renderSMETable(smeData); // If search is empty, render the full table
        return;
    }

    // Filter data based on the search term
    const filteredData = smeData.filter((item) => {
        return (
            item.business_name?.toLowerCase().includes(searchTerm) || // Match business name
            item.address?.toLowerCase().includes(searchTerm) || // Match address
            item.barangay_name?.toLowerCase().includes(searchTerm) || // Match barangay
            item.subarea_name?.toLowerCase().includes(searchTerm) || // Match subarea
            item.business_id?.toString().includes(searchTerm) // Match ID
        );
    });

    // Render the filtered table or show a message for no results
    if (filteredData.length > 0) {
        renderSMETable(filteredData);
    } else {
        tableBody.innerHTML = `<tr><td colspan="11" class="text-center text-gray-500">No results found for "${searchTerm}"</td></tr>`;
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