document.addEventListener("DOMContentLoaded", function () {
    // Profile Dropdown Functionality
    const profileDropdownButton = document.getElementById("profileDropdownButton");
    const profileDropdown = document.getElementById("profileDropdown");

    if (profileDropdownButton && profileDropdown) {
        // Toggle dropdown visibility on button click
        profileDropdownButton.addEventListener("click", function (e) {
            e.stopPropagation(); // Prevent click propagation
            profileDropdown.classList.toggle("visible"); // Toggle visibility class
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (e) {
            if (!profileDropdown.contains(e.target) && !profileDropdownButton.contains(e.target)) {
                profileDropdown.classList.remove("visible"); // Ensure dropdown is hidden
            }
        });
    } else {
        console.error("Profile dropdown elements not found in the DOM.");
    }

    // Popup Modal Functionality
    const popupModal = document.getElementById("popupModal");
    const surveyIntro = document.getElementById("surveyIntro");
    const surveyForm = document.getElementById("surveyForm");
    const proceedToSurvey = document.getElementById("proceedToSurvey");

    // Show the first popup modal (Survey Intro) after login
    if (popupModal && surveyIntro) {
        popupModal.classList.remove("hidden");
        surveyIntro.classList.remove("hidden"); // Ensure the survey intro is visible
        surveyForm.classList.add("hidden"); // Ensure the survey form is hidden initially

        // Disable interactions outside modal
        document.body.style.pointerEvents = "none"; // Disable all outside interactions
        popupModal.style.pointerEvents = "auto"; // Enable interactions inside the modal
    }

    // Switch to the survey form when "Proceed to the Survey" is clicked
    if (proceedToSurvey) {
        proceedToSurvey.addEventListener("click", function () {
            if (surveyIntro && surveyForm) {
                surveyIntro.classList.add("hidden"); // Hide the survey intro
                surveyForm.classList.remove("hidden"); // Show the survey form
            }
        });
    }

    // Handle form submission (Optional)
    const surveyFormElement = document.getElementById("survey");
    if (surveyFormElement) {
        surveyFormElement.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent page reload
            // TODO: Add logic to process survey data
            console.log("Survey submitted!");
            popupModal.classList.add("hidden"); // Close the modal after submission

            // Re-enable interactions outside the modal
            document.body.style.pointerEvents = "auto";
        });
    }

    // Focus Trapping
    document.addEventListener("keydown", function (e) {
        if (!popupModal.classList.contains("hidden")) {
            const focusableElements = popupModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            // Handle Tab key
            if (e.key === "Tab") {
                if (e.shiftKey) {
                    // Shift + Tab: move backward
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus(); // Loop back to the last element
                    }
                } else {
                    // Tab: move forward
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus(); // Loop back to the first element
                    }
                }
            }
        }
    });

    // Dark Mode Toggle Functionality
    const modeSwitch = document.querySelector(".toggle-switch");
    const modeText = document.querySelector(".mode-text");
    const body = document.querySelector("body");

    if (modeSwitch && modeText && body) {
        modeSwitch.addEventListener("click", function () {
            body.classList.toggle("dark");
            modeText.innerText = body.classList.contains("dark") ? "Light mode" : "Dark mode";
        });
    } else {
        console.error("Dark mode toggle elements not found in the DOM.");
    }

    // Logout Confirmation Modal
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
                window.location.href = "../index.html"; // Redirect to login page
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

        // Close modal if clicking outside of it
        window.addEventListener("click", function (e) {
            if (e.target === logoutModal) {
                logoutModal.style.display = "none";
            }
        });
    } else {
        console.error("Logout modal elements not found in the DOM.");
    }
});
