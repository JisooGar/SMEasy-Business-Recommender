document.addEventListener("DOMContentLoaded", function() {
  // Sidebar toggle functionality
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.toggle');
  const signOutButton = document.getElementById("signOutButton");

  toggle.addEventListener('click', function() {
      sidebar.classList.toggle('close');
  });

  // Dark mode toggle functionality
  const body = document.querySelector('body');
  const modeSwitch = document.querySelector('.toggle-switch');
  const modeText = document.querySelector('.mode-text');

  modeSwitch.addEventListener('click', function() {
      body.classList.toggle('dark');

      if (body.classList.contains('dark')) {
          modeText.innerText = 'Light mode';
      } else {
          modeText.innerText = 'Dark mode';
      }
  });

  // Logout confirmation modal functionality
  const logoutModal = document.getElementById('logoutModal');
  const confirmLogout = document.getElementById('confirmLogout');
  const cancelLogout = document.getElementById('cancelLogout');
  const closeModal = document.querySelector('.modal .close');

  signOutButton.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent direct navigation
      logoutModal.style.display = "block"; // Show the modal
  });

  confirmLogout.addEventListener('click', function() {
      // Perform logout logic here (e.g., Firebase sign-out or redirect)
      window.location.href = "../index.html"; // Redirect to login page
  });

  cancelLogout.addEventListener('click', function() {
      logoutModal.style.display = "none"; // Hide the modal
  });

  closeModal.addEventListener('click', function() {
      logoutModal.style.display = "none"; // Hide the modal
  });

  // Close modal if user clicks outside of it
  window.addEventListener('click', function(event) {
      if (event.target === logoutModal) {
          logoutModal.style.display = "none";
      }
  });
  
  // Search functionality inside the sidebar
  const searchBtn = document.querySelector('.search-box');
  searchBtn.addEventListener('click', function() {
      sidebar.classList.remove('close');
  });

  // Submenu toggle functionality
  const submenuIndicators = document.querySelectorAll('.submenu');
  submenuIndicators.forEach(indicator => {
    indicator.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent link click
      const submenu = this.parentElement.querySelector('.submenu-items'); // Find submenu within parent
      submenu.classList.toggle('show');
    });
  });

  // Submenu item click functionality (if needed)
  const submenuItems = document.querySelectorAll('.dropdown-item');
  submenuItems.forEach(item => {
    item.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent link click
      const barangay = this.innerText.trim(); // Get the text content of the clicked item
      centerMapOnBarangay(barangay); // Call a function to center the map on the selected barangay
    });
  });

});
