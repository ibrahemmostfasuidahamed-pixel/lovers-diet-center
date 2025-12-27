// ===================================
// LOVER SDC - Gamified Fitness Website
// JavaScript Logic & Interactivity
// ===================================

// User Data State
const userData = {
  gender: null,
  height: null,
  weight: null,
  age: null,
  targetWeight: null,
  lifestyle: null,
  lifestyleOther: null,
  discomfort: null,
  meals: 3,
  workout: null,
  sleep: 7,
  water: 2,
  foodPreferences: [],
  foodNotes: null,
  hasEvent: false,
  eventName: null,
  eventDate: null,
  bmi: null,
  bodyType: null,
  language: 'ar',
  theme: 'light'
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
  // Load saved data
  loadUserData();

  // Start loading animation
  startLoadingSequence();

  // Initialize event listeners
  initializeEventListeners();

  // Apply saved theme and language
  applyTheme(userData.theme);
  applyLanguage(userData.language);
});

// ===================================
// LOADING SEQUENCE
// ===================================
function startLoadingSequence() {
  setTimeout(() => {
    navigateToScreen('screen-gender');
  }, 3000);
}

// ===================================
// NAVIGATION
// ===================================
function navigateToScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Show target screen with animation
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    setTimeout(() => {
      targetScreen.classList.add('active');

      // Screen-specific initialization
      initializeScreen(screenId);
    }, 100);
  }

  // Save progress
  saveUserData();
}

function initializeScreen(screenId) {
  switch (screenId) {
    case 'screen-target':
      updateWeightGraph();
      break;
    case 'screen-habits':
      initializeSliders();
      break;
    case 'screen-results':
      generateResults();
      break;
  }
}

// ===================================
// EVENT LISTENERS
// ===================================
function initializeEventListeners() {
  // Language Toggle
  document.getElementById('langToggle').addEventListener('click', toggleLanguage);

  // Theme Toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // Gender Selection
  document.querySelectorAll('.gender-card').forEach(card => {
    card.addEventListener('click', function () {
      selectGender(this.dataset.gender);
    });
  });

  // Motivational Continue Button
  document.querySelector('#screen-motivation .continue-btn').addEventListener('click', function () {
    navigateToScreen('screen-height');
  });

  // Lifestyle Selection
  document.querySelectorAll('.lifestyle-card').forEach(card => {
    card.addEventListener('click', function () {
      selectLifestyle(this.dataset.lifestyle);
    });
  });

  // Lifestyle Other Input
  document.getElementById('lifestyleOther').addEventListener('input', function (e) {
    if (e.target.value) {
      userData.lifestyleOther = e.target.value;
      document.querySelectorAll('.lifestyle-card').forEach(c => c.classList.remove('selected'));
      setTimeout(() => navigateToScreen('screen-discomfort'), 1000);
    }
  });

  // Discomfort Selection
  document.querySelectorAll('[data-discomfort]').forEach(card => {
    card.addEventListener('click', function () {
      selectDiscomfort(this.dataset.discomfort);
    });
  });

  // Workout Toggle
  document.querySelectorAll('[data-workout]').forEach(btn => {
    btn.addEventListener('click', function () {
      selectWorkout(this.dataset.workout);
    });
  });

  // Food Preferences
  document.querySelectorAll('.food-card').forEach(card => {
    card.addEventListener('click', function () {
      toggleFoodPreference(this.dataset.food, this);
    });
  });

  // Food Notes
  document.getElementById('foodNotes').addEventListener('input', function (e) {
    userData.foodNotes = e.target.value;
  });

  // Event Selection
  document.querySelectorAll('[data-event]').forEach(card => {
    card.addEventListener('click', function () {
      selectEvent(this.dataset.event);
    });
  });

  // Event Details
  document.getElementById('eventName').addEventListener('input', function (e) {
    userData.eventName = e.target.value;
  });

  document.getElementById('eventDate').addEventListener('input', function (e) {
    userData.eventDate = e.target.value;
  });

  // Target Weight Input - Real-time Graph Update
  document.getElementById('targetWeight').addEventListener('input', updateWeightGraph);
}

// ===================================
// SELECTION HANDLERS
// ===================================
function selectGender(gender) {
  userData.gender = gender;

  // Visual feedback
  document.querySelectorAll('.gender-card').forEach(card => {
    card.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');

  // Update motivational screen
  if (gender === 'male') {
    document.querySelector('.male-image').classList.add('active');
    document.querySelector('.female-image').classList.remove('active');
    document.querySelector('.male-quote').classList.add('active');
    document.querySelector('.female-quote').classList.remove('active');
  } else {
    document.querySelector('.female-image').classList.add('active');
    document.querySelector('.male-image').classList.remove('active');
    document.querySelector('.female-quote').classList.add('active');
    document.querySelector('.male-quote').classList.remove('active');
  }

  setTimeout(() => navigateToScreen('screen-motivation'), 500);
}

function selectLifestyle(lifestyle) {
  userData.lifestyle = lifestyle;

  // Visual feedback
  document.querySelectorAll('.lifestyle-card').forEach(card => {
    card.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');

  setTimeout(() => navigateToScreen('screen-discomfort'), 800);
}

function selectDiscomfort(answer) {
  userData.discomfort = answer;

  // Visual feedback
  document.querySelectorAll('[data-discomfort]').forEach(card => {
    card.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');

  setTimeout(() => navigateToScreen('screen-habits'), 800);
}

function selectWorkout(answer) {
  userData.workout = answer;

  // Visual feedback
  document.querySelectorAll('[data-workout]').forEach(btn => {
    btn.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');
}

function toggleFoodPreference(food, element) {
  const index = userData.foodPreferences.indexOf(food);

  if (index > -1) {
    userData.foodPreferences.splice(index, 1);
    element.classList.remove('selected');
  } else {
    userData.foodPreferences.push(food);
    element.classList.add('selected');
  }
}

function selectEvent(answer) {
  userData.hasEvent = answer === 'yes';

  // Visual feedback
  document.querySelectorAll('[data-event]').forEach(card => {
    card.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');

  // Show/hide event details
  const eventDetails = document.getElementById('eventDetails');
  if (userData.hasEvent) {
    eventDetails.classList.remove('hidden');
  } else {
    eventDetails.classList.add('hidden');
  }
}

// ===================================
// INPUT HANDLERS
// ===================================
function saveAndNext(field, nextScreen) {
  const input = document.getElementById(field);
  const value = parseFloat(input.value);

  // Validation
  if (!value || isNaN(value)) {
    alert(userData.language === 'ar' ? 'الرجاء إدخال قيمة صحيحة' : 'Please enter a valid value');
    input.focus();
    return;
  }

  // Range validation
  if (field === 'height' && (value < 100 || value > 250)) {
    alert(userData.language === 'ar' ? 'الطول يجب أن يكون بين 100-250 سم' : 'Height must be between 100-250 cm');
    return;
  }

  if ((field === 'weight' || field === 'targetWeight') && (value < 30 || value > 300)) {
    alert(userData.language === 'ar' ? 'الوزن يجب أن يكون بين 30-300 كجم' : 'Weight must be between 30-300 kg');
    return;
  }

  if (field === 'age' && (value < 10 || value > 100)) {
    alert(userData.language === 'ar' ? 'العمر يجب أن يكون بين 10-100 سنة' : 'Age must be between 10-100 years');
    return;
  }

  // Save value
  userData[field] = value;

  // Navigate
  navigateToScreen(nextScreen);
}

function initializeSliders() {
  // Meals slider
  const mealsSlider = document.getElementById('meals');
  const mealsValue = document.getElementById('mealsValue');
  mealsSlider.value = userData.meals;
  mealsValue.textContent = userData.meals;

  mealsSlider.addEventListener('input', function () {
    userData.meals = parseInt(this.value);
    mealsValue.textContent = this.value;
  });

  // Sleep slider
  const sleepSlider = document.getElementById('sleep');
  const sleepValue = document.getElementById('sleepValue');
  sleepSlider.value = userData.sleep;
  sleepValue.textContent = userData.sleep;

  sleepSlider.addEventListener('input', function () {
    userData.sleep = parseFloat(this.value);
    sleepValue.textContent = this.value;
  });

  // Water slider
  const waterSlider = document.getElementById('water');
  const waterValue = document.getElementById('waterValue');
  waterSlider.value = userData.water;
  waterValue.textContent = userData.water;

  waterSlider.addEventListener('input', function () {
    userData.water = parseFloat(this.value);
    waterValue.textContent = this.value;
  });
}

// ===================================
// WEIGHT GRAPH
// ===================================
function updateWeightGraph() {
  const currentWeight = userData.weight;
  const targetWeight = parseFloat(document.getElementById('targetWeight').value) || 0;

  if (!currentWeight || !targetWeight) return;

  const difference = Math.abs(currentWeight - targetWeight);
  const weeks = Math.ceil(difference / 0.75); // 0.5-1kg per week average
  const months = Math.ceil(weeks / 4);

  // Update display
  document.getElementById('currentWeightDisplay').textContent = currentWeight + ' kg';
  document.getElementById('targetWeightDisplay').textContent = targetWeight + ' kg';
  document.getElementById('differencDisplay').textContent = difference.toFixed(1) + ' kg';

  let durationText;
  if (userData.language === 'ar') {
    durationText = months === 1 ? 'شهر واحد' : `${months} أشهر`;
  } else {
    durationText = months === 1 ? '1 month' : `${months} months`;
  }
  document.getElementById('durationDisplay').textContent = durationText;

  // Simple canvas graph
  drawWeightGraph(currentWeight, targetWeight);
}

function drawWeightGraph(current, target) {
  const canvas = document.getElementById('weightChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = 200;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Calculate points
  const maxWeight = Math.max(current, target) + 10;
  const minWeight = Math.min(current, target) - 10;
  const range = maxWeight - minWeight;

  const currentY = height - ((current - minWeight) / range) * height;
  const targetY = height - ((target - minWeight) / range) * height;

  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(102, 126, 234, 0.2)');
  gradient.addColorStop(1, 'rgba(118, 75, 162, 0.2)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Draw line
  ctx.beginPath();
  ctx.moveTo(50, currentY);
  ctx.lineTo(width - 50, targetY);
  ctx.strokeStyle = '#667eea';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw points
  // Current weight
  ctx.beginPath();
  ctx.arc(50, currentY, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#f56565';
  ctx.fill();

  // Target weight
  ctx.beginPath();
  ctx.arc(width - 50, targetY, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#48bb78';
  ctx.fill();

  // Labels
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '14px Cairo';
  ctx.textAlign = 'center';
  ctx.fillText(userData.language === 'ar' ? 'الآن' : 'Now', 50, currentY - 15);
  ctx.fillText(userData.language === 'ar' ? 'الهدف' : 'Goal', width - 50, targetY - 15);
}

// ===================================
// BMI CALCULATION
// ===================================
function calculateBMI() {
  if (!userData.height || !userData.weight) return null;

  const heightInMeters = userData.height / 100;
  const bmi = userData.weight / (heightInMeters * heightInMeters);

  userData.bmi = parseFloat(bmi.toFixed(1));
  return userData.bmi;
}

function getBMICategory(bmi) {
  if (!bmi) return null;

  if (bmi < 18.5) return userData.language === 'ar' ? 'نحيف' : 'Underweight';
  if (bmi < 25) return userData.language === 'ar' ? 'طبيعي' : 'Normal';
  if (bmi < 30) return userData.language === 'ar' ? 'زيادة وزن' : 'Overweight';
  return userData.language === 'ar' ? 'سمنة' : 'Obese';
}

function determineBodyType(bmi, gender) {
  if (!bmi || !gender) return 'normal';

  if (bmi < 18.5) return 'slim';
  if (bmi < 25) return 'fit';
  if (bmi < 30) return 'average';
  return 'heavy';
}

function getAvatarEmoji(bodyType, gender) {
  const avatars = {
    male: {
      slim: '🧍‍♂️',
      fit: '💪',
      average: '🧔',
      heavy: '👨'
    },
    female: {
      slim: '🧍‍♀️',
      fit: '🏃‍♀️',
      average: '👩',
      heavy: '👩‍🦰'
    }
  };

  return avatars[gender]?.[bodyType] || '🧍';
}

// ===================================
// RESULTS GENERATION
// ===================================
function generateResults() {
  // Calculate BMI
  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);
  const bodyType = determineBodyType(bmi, userData.gender);

  userData.bodyType = bodyType;

  // Display BMI
  document.getElementById('bmiValue').textContent = bmi || '--';
  document.getElementById('bmiCategory').textContent = bmiCategory || '--';

  // Display Avatar
  const avatarEmoji = getAvatarEmoji(bodyType, userData.gender);
  document.getElementById('bodyAvatar').textContent = avatarEmoji;

  // Populate Floating Bubbles (Desktop only)
  const bubbleHeight = document.getElementById('bubbleHeight');
  const bubbleAge = document.getElementById('bubbleAge');
  const bubbleWeight = document.getElementById('bubbleWeight');
  const bubbleTarget = document.getElementById('bubbleTarget');
  const bubbleDuration = document.getElementById('bubbleDuration');

  if (bubbleHeight) bubbleHeight.textContent = userData.height + ' cm';
  if (bubbleAge) bubbleAge.textContent = userData.age + (userData.language === 'ar' ? ' سنة' : ' yrs');
  if (bubbleWeight) bubbleWeight.textContent = userData.weight + ' kg';
  if (bubbleTarget) bubbleTarget.textContent = userData.targetWeight + ' kg';

  const bubbleDiff = Math.abs(userData.weight - userData.targetWeight);
  const bubbleWeeks = Math.ceil(bubbleDiff / 0.75);
  const bubbleMonths = Math.ceil(bubbleWeeks / 4);
  let bubbleDurationText = bubbleMonths + (userData.language === 'ar' ? ' شهر' : ' mo');
  if (bubbleDuration) bubbleDuration.textContent = bubbleDurationText;

  // Summary
  document.getElementById('summaryGender').textContent =
    userData.language === 'ar'
      ? (userData.gender === 'male' ? 'ذكر' : 'أنثى')
      : (userData.gender === 'male' ? 'Male' : 'Female');
  document.getElementById('summaryAge').textContent = userData.age + (userData.language === 'ar' ? ' سنة' : ' years');
  document.getElementById('summaryHeight').textContent = userData.height + ' cm';
  document.getElementById('summaryWeight').textContent = userData.weight + ' kg';
  document.getElementById('summaryTarget').textContent = userData.targetWeight + ' kg';

  const toLose = Math.abs(userData.weight - userData.targetWeight).toFixed(1);
  document.getElementById('summaryToLose').textContent = toLose + ' kg';

  // Identify Issues
  const issues = identifyIssues();
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  issues.forEach(issue => {
    const li = document.createElement('li');
    li.textContent = issue;
    issuesList.appendChild(li);
  });

  // Generate Recommendations
  const recommendations = generateRecommendations();
  document.getElementById('recommendations').innerHTML = recommendations;

  // Timeline
  const difference = Math.abs(userData.weight - userData.targetWeight);
  const weeks = Math.ceil(difference / 0.75);
  const months = Math.ceil(weeks / 4);

  let durationText;
  if (userData.language === 'ar') {
    durationText = `حوالي ${months} ${months === 1 ? 'شهر' : 'أشهر'} للوصول لهدفك بشكل صحي`;
  } else {
    durationText = `Approximately ${months} ${months === 1 ? 'month' : 'months'} to reach your goal safely`;
  }
  document.getElementById('timelineDuration').textContent = durationText;

  // Event Timeline
  if (userData.hasEvent && userData.eventName && userData.eventDate) {
    const eventTimeline = document.getElementById('eventTimeline');
    eventTimeline.classList.remove('hidden');

    const eventDate = new Date(userData.eventDate);
    const today = new Date();
    const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

    let eventText;
    if (userData.language === 'ar') {
      eventText = `${userData.eventName} - باقي ${daysUntil} يوم`;
    } else {
      eventText = `${userData.eventName} - ${daysUntil} days remaining`;
    }
    document.getElementById('eventTimelineText').textContent = eventText;
  }

  // Animate counters
  animateCounter(document.getElementById('bmiValue'), bmi);
}

function identifyIssues() {
  const issues = [];

  if (userData.language === 'ar') {
    if (userData.meals < 3) issues.push('⚠️ عدد الوجبات قليل جداً - يُنصح بـ 3-5 وجبات يومياً');
    if (userData.meals > 5) issues.push('⚠️ عدد الوجبات كثير - قد تحتاج لتقليل الكميات');
    if (userData.sleep < 6) issues.push('😴 النوم غير كافٍ - النوم الجيد ضروري للتخسيس');
    if (userData.sleep > 9) issues.push('😴 النوم الزائد قد يكون علامة على مشكلة صحية');
    if (userData.water < 2) issues.push('💧 كمية الماء قليلة - اشرب على الأقل 2-3 لتر يومياً');
    if (userData.workout === 'no') issues.push('🏃 لا يوجد نشاط رياضي - الرياضة مهمة جداً للصحة');
    if (userData.lifestyle === 'sedentary') issues.push('🪑 نمط حياة خامل - حاول زيادة الحركة اليومية');
    if (userData.bmi >= 30) issues.push('⚖️ مؤشر كتلة الجسم مرتفع - يُنصح باستشارة طبيب');
  } else {
    if (userData.meals < 3) issues.push('⚠️ Too few meals - 3-5 meals daily recommended');
    if (userData.meals > 5) issues.push('⚠️ Too many meals - consider portion control');
    if (userData.sleep < 6) issues.push('😴 Insufficient sleep - good sleep is essential for weight loss');
    if (userData.sleep > 9) issues.push('😴 Excessive sleep may indicate health issues');
    if (userData.water < 2) issues.push('💧 Low water intake - drink at least 2-3 liters daily');
    if (userData.workout === 'no') issues.push('🏃 No exercise - physical activity is crucial for health');
    if (userData.lifestyle === 'sedentary') issues.push('🪑 Sedentary lifestyle - try to increase daily movement');
    if (userData.bmi >= 30) issues.push('⚖️ High BMI - medical consultation recommended');
  }

  return issues;
}

function generateRecommendations() {
  let html = '<p>';

  if (userData.language === 'ar') {
    html += '<strong>🎯 خطة مخصصة لك:</strong><br><br>';

    // Calorie deficit
    html += '📊 <strong>السعرات الحرارية:</strong> قلل 500-750 سعرة يومياً لخسارة آمنة<br>';

    // Exercise
    if (userData.workout === 'no' || userData.workout === 'sometimes') {
      html += '💪 <strong>التمارين:</strong> ابدأ بـ 30 دقيقة مشي يومياً، ثم زد تدريجياً<br>';
    }

    // Water
    if (userData.water < 2.5) {
      html += '💧 <strong>الماء:</strong> زد استهلاك الماء إلى 2.5-3 لتر يومياً<br>';
    }

    // Sleep
    if (userData.sleep < 7 || userData.sleep > 9) {
      html += '😴 <strong>النوم:</strong> استهدف 7-8 ساعات نوم جيد<br>';
    }

    // Food preferences
    if (userData.foodPreferences.includes('vegetables') && userData.foodPreferences.includes('fruits')) {
      html += '🥗 <strong>التغذية:</strong> ممتاز! استمر في تناول الخضار والفواكه<br>';
    } else {
      html += '🥗 <strong>التغذية:</strong> أضف المزيد من الخضار والفواكه لنظامك<br>';
    }

    html += '<br>💚 <strong>نحن معك في كل خطوة!</strong> فريقنا جاهز لدعمك ومتابعتك حتى تحقق هدفك.';
  } else {
    html += '<strong>🎯 Your Personalized Plan:</strong><br><br>';

    html += '📊 <strong>Calories:</strong> Reduce 500-750 calories daily for safe weight loss<br>';

    if (userData.workout === 'no' || userData.workout === 'sometimes') {
      html += '💪 <strong>Exercise:</strong> Start with 30 minutes daily walking, then increase gradually<br>';
    }

    if (userData.water < 2.5) {
      html += '💧 <strong>Water:</strong> Increase water intake to 2.5-3 liters daily<br>';
    }

    if (userData.sleep < 7 || userData.sleep > 9) {
      html += '😴 <strong>Sleep:</strong> Aim for 7-8 hours of quality sleep<br>';
    }

    if (userData.foodPreferences.includes('vegetables') && userData.foodPreferences.includes('fruits')) {
      html += '🥗 <strong>Nutrition:</strong> Excellent! Keep eating vegetables and fruits<br>';
    } else {
      html += '🥗 <strong>Nutrition:</strong> Add more vegetables and fruits to your diet<br>';
    }

    html += '<br>💚 <strong>We\'re with you every step!</strong> Our team is ready to support and follow up with you until you achieve your goal.';
  }

  html += '</p>';
  return html;
}

function animateCounter(element, endValue) {
  if (!element || !endValue) return;

  const duration = 1500;
  const startValue = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const currentValue = startValue + (endValue - startValue) * easeOutQuad(progress);
    element.textContent = currentValue.toFixed(1);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function easeOutQuad(t) {
  return t * (2 - t);
}

// ===================================
// LANGUAGE SWITCHING
// ===================================
function toggleLanguage() {
  userData.language = userData.language === 'ar' ? 'en' : 'ar';
  applyLanguage(userData.language);
  saveUserData();
}

function applyLanguage(lang) {
  // Update all elements with data-en and data-ar attributes
  document.querySelectorAll('[data-en][data-ar]').forEach(element => {
    element.textContent = element.getAttribute(`data-${lang}`);
  });

  // Update HTML attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update toggle button
  const langToggle = document.getElementById('langToggle');
  langToggle.querySelector('.en-text').style.display = lang === 'ar' ? 'inline' : 'none';
  langToggle.querySelector('.ar-text').style.display = lang === 'en' ? 'inline' : 'none';

  // Re-render dynamic content if on results screen
  if (document.getElementById('screen-results').classList.contains('active')) {
    generateResults();
  }
}

// ===================================
// THEME SWITCHING
// ===================================
function toggleTheme() {
  userData.theme = userData.theme === 'dark' ? 'light' : 'dark';
  applyTheme(userData.theme);
  saveUserData();
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('.theme-icon').textContent = '🌙';
  } else {
    document.body.classList.remove('dark-mode');
    document.querySelector('.theme-icon').textContent = '☀️';
  }
}

// Set default theme to light on init
if (!userData.theme || userData.theme === 'dark') {
  userData.theme = 'light';
  applyTheme('light');
}

// ===================================
// DATA PERSISTENCE
// ===================================
function saveUserData() {
  try {
    localStorage.setItem('loverSDC_userData', JSON.stringify(userData));
  } catch (e) {
    console.error('Error saving data:', e);
  }
}

function loadUserData() {
  try {
    const saved = localStorage.getItem('loverSDC_userData');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(userData, parsed);
    }
  } catch (e) {
    console.error('Error loading data:', e);
  }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function getHealthyWeightRange(height) {
  const heightInMeters = height / 100;
  const minBMI = 18.5;
  const maxBMI = 24.9;

  const minWeight = minBMI * heightInMeters * heightInMeters;
  const maxWeight = maxBMI * heightInMeters * heightInMeters;

  return {
    min: Math.round(minWeight),
    max: Math.round(maxWeight)
  };
}

// ===================================
// DEBUG (Remove in production)
// ===================================
window.userData = userData;
window.navigateToScreen = navigateToScreen;

console.log('🎯 LOVER SDC - Website Initialized');
console.log('💡 Tip: Access userData object via window.userData for debugging');
