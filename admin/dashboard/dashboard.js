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

// Example Data for SME and Survey
const smeData = [
    { id: 1, name: 'Business 1', address: 'Address 1', subarea: 'Subarea 1', barangay: 'Barangay 1', latitude: '14.56', longitude: '120.98' },
    { id: 2, name: 'Business 2', address: 'Address 2', subarea: 'Subarea 2', barangay: 'Barangay 2', latitude: '14.57', longitude: '120.99' },
];

const surveyData = [
    { id: 1, name: 'Survey 1', address: 'Survey Address 1', subarea: 'Survey Subarea 1', barangay: 'Survey Barangay 1', latitude: '14.58', longitude: '120.97' },
    { id: 2, name: 'Survey 2', address: 'Survey Address 2', subarea: 'Survey Subarea 2', barangay: 'Survey Barangay 2', latitude: '14.59', longitude: '120.96' },
];

// DOM Elements
const smeDataButton = document.getElementById('smeDataButton');
const surveyDataButton = document.getElementById('surveyDataButton');
const tableBody = document.getElementById('tableBody');
const searchBar = document.getElementById('searchBar');
const addBusinessButton = document.getElementById('addBusinessButton');

// Utility to render table
const renderTable = (data) => {
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
            <td class="px-4 py-2">${item.industry}</td>
            <td class="px-4 py-2">${item.category}</td>
            <td class="px-4 py-2">${item.subcategory}</td>
            <td class="px-4 py-2">
                <button class="text-blue-500 hover:underline">Edit</button>
                <button class="text-red-500 hover:underline">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

// Event Listeners for toggling data
smeDataButton.addEventListener('click', () => {
    renderTable(smeData);
    smeDataButton.classList.add('bg-orange-500', 'text-white');
    surveyDataButton.classList.remove('bg-orange-500', 'text-white');
    surveyDataButton.classList.add('bg-gray-200', 'text-gray-800');
});

surveyDataButton.addEventListener('click', () => {
    renderTable(surveyData);
    surveyDataButton.classList.add('bg-orange-500', 'text-white');
    smeDataButton.classList.remove('bg-orange-500', 'text-white');
    smeDataButton.classList.add('bg-gray-200', 'text-gray-800');
});

// Initialize with SME Data
renderTable(smeData);

// Add search functionality
searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();

    const filteredData = smeDataButton.classList.contains('bg-orange-500')
        ? smeData.filter(item => item.name.toLowerCase().includes(searchTerm))
        : surveyData.filter(item => item.name.toLowerCase().includes(searchTerm));

    renderTable(filteredData);
});

// Handle Edit Button Click
tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('text-blue-500')) {
        // Get the row data to edit
        const row = e.target.closest('tr');
        const id = row.children[0].textContent; // Get the ID from the first cell
        const businessToEdit = smeData.find((business) => business.id == id);

        if (businessToEdit) {
            // Populate the form fields with the existing data
            document.getElementById('businessName').value = businessToEdit.name;
            document.getElementById('address').value = businessToEdit.address;
            document.getElementById('subarea').value = businessToEdit.subarea;
            document.getElementById('barangay').value = businessToEdit.barangay;
            document.getElementById('latitude').value = businessToEdit.latitude;
            document.getElementById('longitude').value = businessToEdit.longitude;
            document.getElementById('industry').value = businessToEdit.industry;
            document.getElementById('category').value = businessToEdit.category;
            document.getElementById('subcategory').value = businessToEdit.subcategory;

            // Set the selected index for updating
            selectedBusinessIndex = smeData.findIndex((business) => business.id == id);

            // Show the modal
            addEditBusinessModal.classList.remove('hidden');
        }
    }

    // Handle Delete Button Click
    if (e.target.classList.contains('text-red-500')) {
        const row = e.target.closest('tr');
        const id = row.children[0].textContent; // Get the ID from the first cell
        const confirmDelete = confirm(`Are you sure you want to delete the business with ID: ${id}?`);

        if (confirmDelete) {
            // Remove the business from the data
            const indexToDelete = smeData.findIndex((business) => business.id == id);
            if (indexToDelete !== -1) {
                smeData.splice(indexToDelete, 1);
                renderTable(smeData); // Re-render the table
                alert(`Business with ID: ${id} has been deleted.`);
            }
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
addEditBusinessForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const updatedBusiness = {
        id: selectedBusinessIndex !== null ? smeData[selectedBusinessIndex].id : smeData.length + 1,
        name: document.getElementById('businessName').value,
        address: document.getElementById('address').value,
        subarea: document.getElementById('subarea').value,
        barangay: document.getElementById('barangay').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value,
        industry: document.getElementById('industry').value,
        category: document.getElementById('category').value,
        subcategory: document.getElementById('subcategory').value,
    };

    if (selectedBusinessIndex !== null) {
        // Update existing business
        smeData[selectedBusinessIndex] = updatedBusiness;
        alert(`Business with ID: ${updatedBusiness.id} has been updated.`);
    } else {
        // Add new business
        smeData.push(updatedBusiness);
        alert(`New business with ID: ${updatedBusiness.id} has been added.`);
    }

    // Re-render the table and reset form
    renderTable(smeData);
    addEditBusinessForm.reset();
    closeModal();

    // Reset the selected index for editing
    selectedBusinessIndex = null;
});

