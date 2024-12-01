document.addEventListener("DOMContentLoaded", function () {
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

  // Dark mode toggle functionality
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

  // Logout confirmation modal
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
