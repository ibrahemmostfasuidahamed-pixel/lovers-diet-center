// Simple Loading Screen Controller for index.html
document.addEventListener('DOMContentLoaded', function () {
  const loadingScreen = document.getElementById('screen-loading');
  const mainContent = document.getElementById('mainContent');

  // Check if user completed quiz
  const quizCompleted = localStorage.getItem('loverSDC_userData');

  if (!quizCompleted) {
    // First visit - redirect to quiz after 2 seconds
    setTimeout(function () {
      window.location.href = 'quiz.html';
    }, 2000);
    return;
  }

  // Quiz completed - show main site
  const progressFill = document.querySelector('.progress-fill');
  let progress = 0;

  if (progressFill) {
    const progressInterval = setInterval(function () {
      progress += 2;
      progressFill.style.width = progress + '%';

      if (progress >= 100) {
        clearInterval(progressInterval);

        // Hide loading screen and show main content
        setTimeout(function () {
          if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(function () {
              loadingScreen.style.display = 'none';
              if (mainContent) {
                mainContent.style.display = 'block';
                mainContent.style.opacity = '0';
                setTimeout(function () {
                  mainContent.style.opacity = '1';
                }, 50);
              }
            }, 500);
          }
        }, 300);
      }
    }, 30); // Speed: 30ms per 2% = ~1.5 seconds total
  }
});
