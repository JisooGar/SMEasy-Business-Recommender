document.addEventListener("DOMContentLoaded", function () {

    // Helper function to map text responses to numeric values
    function mapResponseValue(response) {
        const mapping = {
            "Strongly Disagree": 1,
            "Disagree": 2,
            "Agree": 3,
            "Strongly Agree": 4
        };
        return mapping[response] || null; // Return null if the response is undefined or invalid
    }

    // Profile Dropdown Functionality
    const profileDropdownButton = document.getElementById("profileDropdownButton");
    const profileDropdown = document.getElementById("profileDropdown");

    if (profileDropdownButton && profileDropdown) {
        profileDropdownButton.addEventListener("click", function (e) {
            e.stopPropagation();
            profileDropdown.classList.toggle("visible");
        });

        document.addEventListener("click", function (e) {
            if (!profileDropdown.contains(e.target) && !profileDropdownButton.contains(e.target)) {
                profileDropdown.classList.remove("visible");
            }
        });
    }

    // Display user data
    const userNameElement = document.getElementById("userName");
    const userEmailElement = document.getElementById("userEmail");

    const firstName = sessionStorage.getItem("userFirstName");
    const lastName = sessionStorage.getItem("userLastName");
    const email = sessionStorage.getItem("userEmail");

    if (firstName && lastName && email) {
        userNameElement.textContent = `${firstName} ${lastName}`;
        userEmailElement.textContent = email;
    } else {
        console.error("User information not found in sessionStorage. Please sign in again.");
        window.location.href = "../index.html"; // Redirect to login page if user data is missing
    }

    // Modal References
    const popupModal = document.getElementById("popupModal");
    const surveyIntro = document.getElementById("surveyIntro");
    const surveyForm = document.getElementById("surveyForm");
    const preferencesForm = document.getElementById("preferencesForm");
    const preferencesForm2 = document.getElementById("preferencesForm2");
    const marketDemandsForm = document.getElementById("marketDemandsForm");
    const highDemandForm = document.getElementById("highDemandForm");
    const thankYouModal = document.createElement("div");

    // Buttons for navigating
    const proceedToSurvey = document.getElementById("proceedToSurvey");

    // Helper Functions
    function disableOutsideInteraction() {
        document.body.style.pointerEvents = "none";
        if (popupModal) popupModal.style.pointerEvents = "auto";
    }

    function enableOutsideInteraction() {
        document.body.style.pointerEvents = "auto";
    }

    function closeAllModals() {
        const allModals = document.querySelectorAll(".modal, .popup-modal, .fixed");
        allModals.forEach((modal) => modal.classList.add("hidden"));
        enableOutsideInteraction();
    }

    function showModal(modalToShow, modalsToHide) {
        modalsToHide.forEach((modal) => modal.classList.add("hidden"));
        modalToShow.classList.remove("hidden");
    }

    // Thank You Modal Setup
function setupThankYouModal() {
    // Check if the current page is the homepage
    if (window.location.pathname.endsWith("/homepage/homepage.html")) {
        thankYouModal.id = "thankYouModal";
        thankYouModal.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 hidden";
        thankYouModal.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6 w-10/12 max-w-sm text-center">
                <h2 class="text-lg font-bold mb-4">Thank You!</h2>
                <p class="text-gray-600 mb-4">Your responses have been successfully submitted. We appreciate your feedback!</p>
                <button id="closeThankYou" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md">Close</button>
            </div>
        `;
        document.body.appendChild(thankYouModal);

        const closeThankYou = document.getElementById("closeThankYou");
        closeThankYou.addEventListener("click", function () {
            closeAllModals(); // Close all modals
        });
    }
}


    function showThankYouModal() {
        thankYouModal.classList.remove("hidden");
        disableOutsideInteraction();

        // Automatically close after 3 seconds
        setTimeout(function () {
            closeAllModals(); // Close all modals
        }, 3000);
    }

    // Show the first modal
    function showSurveyIntro() {
        const modalShown = sessionStorage.getItem("surveyModalShown");
    
        if (!modalShown) {
            popupModal.classList.remove("hidden");
            showModal(surveyIntro, [surveyForm, preferencesForm, preferencesForm2, marketDemandsForm, highDemandForm]);
            disableOutsideInteraction();
            sessionStorage.setItem("surveyModalShown", "true"); // Mark modal as shown
        }
    }
    

    function validateModalFields(modalId) {
        const modal = document.getElementById(modalId);
        const requiredFields = modal.querySelectorAll('[required], input[type="radio"]');
        let allValid = true;
    
        const radioGroups = {};
    
        // Iterate over fields to check if they are valid
        requiredFields.forEach((field) => {
            if (field.type === "radio") {
                // Group radio buttons by name
                if (!radioGroups[field.name]) {
                    radioGroups[field.name] = [];
                }
                radioGroups[field.name].push(field);
            } else if (!field.value.trim()) {
                // Check for other required fields
                allValid = false;
                field.classList.add("error");
            } else {
                field.classList.remove("error");
            }
        });
    
        // Validate radio button groups
        for (const groupName in radioGroups) {
            const group = radioGroups[groupName];
            if (!group.some((radio) => radio.checked)) {
                allValid = false;
                group.forEach((radio) => radio.classList.add("error"));
            } else {
                group.forEach((radio) => radio.classList.remove("error"));
            }
        }
    
        if (!allValid) {
            alert("Please answer all required fields before proceeding.");
        }
    
        return allValid;
    }
    

    // Modal Transitions
    if (proceedToSurvey) {
        proceedToSurvey.addEventListener("click", function () {
            showModal(surveyForm, [surveyIntro]);
        });
    }

    if (surveyForm) {
        surveyForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (validateModalFields("surveyForm")) {
                showModal(preferencesForm, [surveyForm]);
            }
        });
    }

    if (preferencesForm) {
        preferencesForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (validateModalFields("preferencesForm")) {
                showModal(preferencesForm2, [preferencesForm]);
            }
        });
    }

    if (preferencesForm2) {
        preferencesForm2.addEventListener("submit", function (e) {
            e.preventDefault();
            if (validateModalFields("preferencesForm2")) {
                showModal(marketDemandsForm, [preferencesForm2]);
            }
        });
    }

    if (marketDemandsForm) {
        marketDemandsForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (validateModalFields("marketDemandsForm")) {
                showModal(highDemandForm, [marketDemandsForm]);
            }
        });
    }

    if (highDemandForm) {
        highDemandForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            if (validateModalFields("highDemandForm")) {

            const surveyData = {
                monthConducted: document.getElementById("month_conducted").value,
                ageRange: document.querySelector('input[name="age_range"]:checked')?.value || null,
                gender: document.querySelector('input[name="gender"]:checked')?.value || null,
                education: document.querySelector('input[name="education"]:checked')?.value || null,
                employment: document.querySelector('input[name="employment"]:checked')?.value || null,
                barangay: document.querySelector('input[name="barangay"]:checked')?.value || null,
                businessVisits: document.querySelector('input[name="business_visits"]:checked')?.value || null,
                frequencyVisits: document.querySelector('input[name="frequency_visits"]:checked')?.value || null,
                browsingBehavior: document.querySelector('input[name="browsing_behavior"]:checked')?.value || null,
                satisfactionWithBusinesses: document.querySelector('input[name="satisfaction_with_businesses"]:checked')?.value || null,
                businessesLacking: document.querySelector('input[name="businesses_lacking"]:checked')?.value || null,
                shoppingPreferences: document.querySelector('input[name="shopping_preferences"]:checked')?.value || null,
                motivationForChoosingBusinesses: document.querySelector('input[name="motivation_for_choosing_businesses"]:checked')?.value || null,
                shoppingTraits: document.querySelector('input[name="shopping_traits"]:checked')?.value || null,
                factorsForNewBusiness: document.querySelector('input[name="factors_for_new_business"]:checked')?.value || null,
                shoppingStyle: document.querySelector('input[name="shopping_style"]:checked')?.value || null,
                valuesSupported: document.querySelector('input[name="values_supported"]:checked')?.value || null,
                transportationLinks: document.querySelector('input[name="transportation_links"]:checked')?.value || null,
                commercialAccessibility: document.querySelector('input[name="commercial_accessibility"]:checked')?.value || null,
                travelOutsideBarangay: document.querySelector('input[name="travel_outside_barangay"]:checked')?.value || null,
                transportationChallenges: document.querySelector('input[name="transportation_challenges"]:checked')?.value || null,
                automotiveServices: document.querySelector('input[name="automotive_services"]:checked')?.value || null,
                constructionAndRealEstate: document.querySelector('input[name="construction_and_real_estate"]:checked')?.value || null,
                cooperativeBusiness: document.querySelector('input[name="cooperative_business"]:checked')?.value || null,
                creativeAndMediaServices: document.querySelector('input[name="creative_and_media_services"]:checked')?.value || null,
                educationalServices: document.querySelector('input[name="educational_services"]:checked')?.value || null,
                entertainmentAndRecreation: document.querySelector('input[name="entertainment_and_recreation"]:checked')?.value || null,
                financeAndInsurance: document.querySelector('input[name="finance_and_insurance"]:checked')?.value || null,
                foodServices: document.querySelector('input[name="food_services"]:checked')?.value || null,
                healthcareServices: document.querySelector('input[name="healthcare_services"]:checked')?.value || null,
                itAndDigitalServices: document.querySelector('input[name="it_and_digital_services"]:checked')?.value || null,
                manufacturingAndProduction: document.querySelector('input[name="manufacturing_and_production"]:checked')?.value || null,
                personalAndHouseholdServices: document.querySelector('input[name="personal_and_household_services"]:checked')?.value || null,
                personalCareServices: document.querySelector('input[name="personal_care_services"]:checked')?.value || null,
                professionalServices: document.querySelector('input[name="professional_services"]:checked')?.value || null,
                retailStores: document.querySelector('input[name="retail_stores"]:checked')?.value || null,
                tourismAndHospitality: document.querySelector('input[name="tourism_and_hospitality"]:checked')?.value || null,
                transportationAndLogistics: document.querySelector('input[name="transportation_and_logistics"]:checked')?.value || null,
                wholesaleAndDistribution: document.querySelector('input[name="wholesale_and_distribution"]:checked')?.value || null,
            };
            
            if (!surveyData.employment || !surveyData.barangay) {
                alert("Please complete all required fields before submitting.");
                return;
            }
    
            await submitSurveyData(surveyData);
            alert("Survey data submitted successfully!");
            closeAllModals();
            showThankYouModal();
        }
    });
}
    

    // Initialize the modal functionality
    showSurveyIntro();
    setupThankYouModal();

    // Logout Modal
    const signOutButton = document.getElementById("signOutButton");
    const logoutModal = document.getElementById("logoutModal");
    const confirmLogout = document.getElementById("confirmLogout");
    const cancelLogout = document.getElementById("cancelLogout");
    const closeModal = document.querySelector(".modal .close");

    if (signOutButton && logoutModal) {
        signOutButton.addEventListener("click", function (e) {
            e.preventDefault();
            logoutModal.style.display = "block";
        });

        if (confirmLogout) {
            confirmLogout.addEventListener("click", function () {
                sessionStorage.clear(); // Clear user session on logout
                window.location.href = "../index.html";
            });
        }

        if (cancelLogout) {
            cancelLogout.addEventListener("click", function () {
                logoutModal.style.display = "none";
            });
        }

        if (closeModal) {
            closeModal.addEventListener("click", function () {
                logoutModal.style.display = "none";
            });
        }

        window.addEventListener("click", function (e) {
            if (e.target === logoutModal) {
                logoutModal.style.display = "none";
            }
        });
    }

// This function sends the survey data to your backend
async function submitSurveyData(data) {
    try {
        console.log('Data being sent to server:', data);

        // Send the survey data to the backend using Axios
        const response = await axios.post('http://localhost:3000/submit-survey', data);

        // Log the server's response
        console.log('Survey data submitted successfully:', response.data);

        // Notify the user of success
        alert('Survey data submitted successfully!');

        // Automatically close the current modal and show the Thank You modal
        closeAllModals();
        showThankYouModal();
    } catch (error) {
        // Handle errors
        console.error('Error submitting survey data:', error.response?.data || error.message);
        alert('Failed to submit survey data. Please try again.');
    }
}


// Add this to handle the submission of the final survey form
if (highDemandForm) {
    highDemandForm.addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent the form from refreshing the page

        const surveyData = {
            // Collect all your survey data here, just like before
            monthConducted: document.getElementById("monthConducted").value,
            ageRange: document.querySelector('input[name="age_range"]:checked')?.value || null,
            gender: document.querySelector('input[name="gender"]:checked')?.value || null,
            education: document.querySelector('input[name="education"]:checked')?.value || null,
            // Add all the remaining fields...
            employment: document.querySelector('input[name="employment"]:checked')?.value || null,
                barangay: document.querySelector('input[name="barangay"]:checked')?.value || null,
                businessVisits: document.querySelector('input[name="business_visits"]:checked')?.value || null,
                frequencyVisits: document.querySelector('input[name="frequency_visits"]:checked')?.value || null,
                browsingBehavior: document.querySelector('input[name="browsing_behavior"]:checked')?.value || null,
                satisfactionWithBusinesses: document.querySelector('input[name="satisfaction_with_businesses"]:checked')?.value || null,
                businessesLacking: document.querySelector('input[name="businesses_lacking"]:checked')?.value || null,
                shoppingPreferences: document.querySelector('input[name="shopping_preferences"]:checked')?.value || null,
                motivationForChoosingBusinesses: document.querySelector('input[name="motivation_for_choosing_businesses"]:checked')?.value || null,
                shoppingTraits: document.querySelector('input[name="shopping_traits"]:checked')?.value || null,
                factorsForNewBusiness: document.querySelector('input[name="factors_for_new_business"]:checked')?.value || null,
                shoppingStyle: document.querySelector('input[name="shopping_style"]:checked')?.value || null,
                valuesSupported: document.querySelector('input[name="values_supported"]:checked')?.value || null,
                transportationLinks: document.querySelector('input[name="transportation_links"]:checked')?.value || null,
                commercialAccessibility: document.querySelector('input[name="commercial_accessibility"]:checked')?.value || null,
                travelOutsideBarangay: document.querySelector('input[name="travel_outside_barangay"]:checked')?.value || null,
                transportationChallenges: document.querySelector('input[name="transportation_challenges"]:checked')?.value || null,
                automotiveServices: document.querySelector('input[name="automotive_services"]:checked')?.value || null,
                constructionAndRealEstate: document.querySelector('input[name="construction_and_real_estate"]:checked')?.value || null,
                cooperativeBusiness: document.querySelector('input[name="cooperative_business"]:checked')?.value || null,
                creativeAndMediaServices: document.querySelector('input[name="creative_and_media_services"]:checked')?.value || null,
                educationalServices: document.querySelector('input[name="educational_services"]:checked')?.value || null,
                entertainmentAndRecreation: document.querySelector('input[name="entertainment_and_recreation"]:checked')?.value || null,
                financeAndInsurance: document.querySelector('input[name="finance_and_insurance"]:checked')?.value || null,
                foodServices: document.querySelector('input[name="food_services"]:checked')?.value || null,
                healthcareServices: document.querySelector('input[name="healthcare_services"]:checked')?.value || null,
                itAndDigitalServices: document.querySelector('input[name="it_and_digital_services"]:checked')?.value || null,
                manufacturingAndProduction: document.querySelector('input[name="manufacturing_and_production"]:checked')?.value || null,
                personalAndHouseholdServices: document.querySelector('input[name="personal_and_household_services"]:checked')?.value || null,
                personalCareServices: document.querySelector('input[name="personal_care_services"]:checked')?.value || null,
                professionalServices: document.querySelector('input[name="professional_services"]:checked')?.value || null,
                retailStores: document.querySelector('input[name="retail_stores"]:checked')?.value || null,
                tourismAndHospitality: document.querySelector('input[name="tourism_and_hospitality"]:checked')?.value || null,
                transportationAndLogistics: document.querySelector('input[name="transportation_and_logistics"]:checked')?.value || null,
                wholesaleAndDistribution: document.querySelector('input[name="wholesale_and_distribution"]:checked')?.value || null,
        };

        // Call the function to send the survey data to your server
        await submitSurveyData(surveyData);
    });
}

    
    
});
