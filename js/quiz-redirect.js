// Function to redirect to main site after quiz completion
function goToMainSite() {
    // Save user data before leaving
    if (typeof saveUserData === 'function') {
        saveUserData();
    }

    // Redirect to index.html
    window.location.href = 'index.html';
}
