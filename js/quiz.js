// Quiz Data Storage
let quizData = {
    gender: '',
    goal: '',
    additionalGoals: [],
    age: '',
    activity: '',
    name: '',
    phone: '',
    email: ''
};

let currentStep = 1;
const totalSteps = 7;

// Initialize Quiz with Splash Screen
document.addEventListener('DOMContentLoaded', function () {
    // Show splash screen for 2.5 seconds
    setTimeout(() => {
        hideSplashScreen();
    }, 2500);

    initializeMultiSelect();
});

// Hide Splash Screen and Show Quiz
function hideSplashScreen() {
    const splash = document.getElementById('splashScreen');
    const progressContainer = document.getElementById('progressContainer');
    const quizContainer = document.getElementById('quizContainer');

    // Hide splash
    splash.classList.add('hidden');

    // Show progress and quiz
    progressContainer.style.display = 'block';
    quizContainer.style.opacity = '1';
    quizContainer.style.transition = 'opacity 0.5s ease';

    // Update progress
    updateProgress();

    // Animate cards
    animateCards();
}

// Animate Cards on Load
function animateCards() {
    const cards = document.querySelectorAll('.option-card, .gender-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Go to Main Website
function goToMainSite() {
    // Mark quiz as completed so user won't be redirected again
    localStorage.setItem('quizCompleted', 'true');
    window.location.href = 'index.html';
}


// Update Progress Bar
function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = currentStep + ' / ' + totalSteps;
}

// Select Gender
function selectGender(gender) {
    quizData.gender = gender;
    setTimeout(() => {
        nextStep();
    }, 300);
}

// Select Option (Single Select)
function selectOption(element, type) {
    // Remove previous selection
    const container = element.parentElement;
    const allOptions = container.querySelectorAll('.option-card');
    allOptions.forEach(opt => opt.classList.remove('selected'));

    // Add selection to clicked option
    element.classList.add('selected');

    // Store data
    const value = element.getAttribute('data-value');
    quizData[type] = value;

    // Auto-advance after a short delay
    setTimeout(() => {
        nextStep();
    }, 400);
}

// Initialize Multi-Select
function initializeMultiSelect() {
    const multiOptions = document.querySelectorAll('.option-card.multi');
    const continueBtn = document.getElementById('multiSelectBtn');

    multiOptions.forEach(option => {
        option.addEventListener('click', function () {
            this.classList.toggle('selected');

            // Update additionalGoals array
            const value = this.getAttribute('data-value');
            if (this.classList.contains('selected')) {
                if (!quizData.additionalGoals.includes(value)) {
                    quizData.additionalGoals.push(value);
                }
            } else {
                quizData.additionalGoals = quizData.additionalGoals.filter(g => g !== value);
            }

            // Enable/disable continue button
            if (quizData.additionalGoals.length > 0) {
                continueBtn.classList.remove('disabled');
            } else {
                continueBtn.classList.add('disabled');
            }
        });
    });
}

// Next Step
function nextStep() {
    // Validation for step 4 (multi-select)
    if (currentStep === 4 && quizData.additionalGoals.length === 0) {
        return;
    }

    // Hide current step
    const currentStepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
    currentStepEl.classList.remove('active');

    // Show next step
    currentStep++;
    if (currentStep <= totalSteps + 1) {
        const nextStepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
        nextStepEl.classList.add('active');
        updateProgress();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Previous Step
function prevStep() {
    // Hide current step
    const currentStepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
    currentStepEl.classList.remove('active');

    // Show previous step
    currentStep--;
    if (currentStep >= 1) {
        const prevStepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
        prevStepEl.classList.add('active');
        updateProgress();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Submit Quiz
function submitQuiz(event) {
    event.preventDefault();

    // Get form data
    quizData.name = document.getElementById('name').value;
    quizData.phone = document.getElementById('phone').value;
    quizData.email = document.getElementById('email').value;

    // Save all quiz data to localStorage
    localStorage.setItem('quizCompleted', 'true');
    localStorage.setItem('quizData', JSON.stringify(quizData));
    localStorage.setItem('showWelcome', 'true');

    // Redirect to main site with personalized welcome
    window.location.href = 'index.html';
}

// Display Results
function displayResults() {
    // Map values to Arabic labels
    const goalLabels = {
        'weight-loss': 'خسارة وزن',
        'muscle-gain': 'بناء عضلات',
        'fitness': 'زيادة اللياقة',
        'health': 'تحسين الصحة العامة'
    };

    const activityLabels = {
        'sedentary': 'قليل جداً',
        'light': 'خفيف',
        'moderate': 'متوسط',
        'high': 'عالي'
    };

    // Update results summary
    document.getElementById('resultGoal').textContent = goalLabels[quizData.goal] || quizData.goal;
    document.getElementById('resultActivity').textContent = activityLabels[quizData.activity] || quizData.activity;

    // Generate WhatsApp message
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/971529033110?text=${encodeURIComponent(message)}`;
    document.getElementById('whatsappBtn').href = whatsappUrl;
}

// Generate WhatsApp Message
function generateWhatsAppMessage() {
    const goalLabels = {
        'weight-loss': 'خسارة وزن',
        'muscle-gain': 'بناء عضلات',
        'fitness': 'زيادة اللياقة',
        'health': 'تحسين الصحة العامة'
    };

    const activityLabels = {
        'sedentary': 'قليل جداً (جلوس معظم اليوم)',
        'light': 'خفيف (مشي يومي)',
        'moderate': 'متوسط (رياضة 3-4 أيام)',
        'high': 'عالي (رياضة يومية)'
    };

    const additionalGoalsLabels = {
        'skin': 'تحسين البشرة',
        'sleep': 'نوم أفضل',
        'stress': 'تقليل التوتر',
        'habits': 'عادات أكل صحية'
    };

    let message = `🎯 *طلب استشارة - لوفرز دايت سنتر*\n\n`;
    message += `👤 *الاسم:* ${quizData.name}\n`;
    message += `📱 *الجوال:* ${quizData.phone}\n`;

    if (quizData.email) {
        message += `📧 *الإيميل:* ${quizData.email}\n`;
    }

    message += `\n━━━━━━━━━━━━━━━━━━\n\n`;
    message += `🚻 *الجنس:* ${quizData.gender === 'male' ? 'رجل' : 'امرأة'}\n`;
    message += `🎯 *الهدف الرئيسي:* ${goalLabels[quizData.goal]}\n`;

    if (quizData.additionalGoals.length > 0) {
        message += `✨ *أهداف إضافية:*\n`;
        quizData.additionalGoals.forEach(goal => {
            message += `   • ${additionalGoalsLabels[goal]}\n`;
        });
    }

    message += `📅 *العمر:* ${quizData.age} سنة\n`;
    message += `💪 *مستوى النشاط:* ${activityLabels[quizData.activity]}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━\n\n`;
    message += `أرغب في الحصول على استشارة مجانية وبرنامج غذائي مخصص 🎁`;

    return message;
}

// Restart Quiz
function restartQuiz() {
    // Reset data
    quizData = {
        gender: '',
        goal: '',
        additionalGoals: [],
        age: '',
        activity: '',
        name: '',
        phone: '',
        email: ''
    };

    // Reset form
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';

    // Reset multi-select
    const multiOptions = document.querySelectorAll('.option-card.multi');
    multiOptions.forEach(opt => opt.classList.remove('selected'));
    document.getElementById('multiSelectBtn').classList.add('disabled');

    // Reset selections
    const allOptions = document.querySelectorAll('.option-card.selected');
    allOptions.forEach(opt => opt.classList.remove('selected'));

    // Go back to step 1
    const currentStepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
    currentStepEl.classList.remove('active');

    currentStep = 1;
    const firstStepEl = document.querySelector(`.quiz-step[data-step="1"]`);
    firstStepEl.classList.add('active');

    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
