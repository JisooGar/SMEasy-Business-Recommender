document.querySelector('.toggle').addEventListener('click', function() {

    document.querySelector('.container-section').classList.toggle('sidebar-open');
    document.querySelector('.right-section').classList.toggle('sidebar-open');
    document.querySelector('.header-content').classList.toggle('sidebar-open');
});



// Function to show the loading overlay
function showLoadingScreen() {
    document.getElementById('loading-overlay').style.display = 'flex';
}

// Function to hide the loading overlay
function hideLoadingScreen() {
    document.getElementById('loading-overlay').style.display = 'none';
}

// Attach the showLoading function to all buttons with the class 'btn'
document.querySelectorAll('.btn').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default action

        // Show the loading overlay
        showLoadingScreen();

        // Simulate a delay to hide the loading screen after the content loads
        setTimeout(() => {
            // Navigate to the href link
            window.location.href = this.href;
        }, 2000); // Adjust the timeout as needed
    });
});