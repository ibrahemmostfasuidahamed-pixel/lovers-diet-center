/**
 * LOVERS DIET CENTER
 * Main JavaScript File
 * Handles: Navigation, Animations, Products, Full Language Translation
 */

// ===== DOM ELEMENTS =====
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const langToggle = document.getElementById('langToggle');
const productsGrid = document.getElementById('productsGrid');
const contactForm = document.getElementById('contactForm');

// ===== NAVIGATION =====

// Header scroll effect
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Close mobile menu when clicking a link
function closeMobileMenu() {
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
}

// Initialize navigation
function initNavigation() {
    window.addEventListener('scroll', handleHeaderScroll);
    menuToggle.addEventListener('click', toggleMobileMenu);

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FULL LANGUAGE TRANSLATION SYSTEM =====

let currentLang = 'en';

const translations = {
    en: {
        // Navigation
        home: 'Home',
        about: 'About',
        services: 'Services',
        products: 'Products',
        testimonials: 'Testimonials',
        contact: 'Contact',
        bookNow: 'Book Now',
        langToggle: 'العربية',
        logoText: 'Lovers Diet Center',

        // Hero Section
        heroTitle: 'Your Journey to Fitness & Beauty Starts Here!',
        heroSubtitle: 'At Lovers Diet Center, we don\'t just provide meals – we design a complete healthy lifestyle for you. We provide everything your body needs to reach your ideal weight and glow with radiant skin.',
        bookConsultation: 'Book Consultation',
        startJourney: 'Start Your Journey Now',
        viewProducts: 'View Products',

        // About Section
        aboutSubtitle: 'About Us',
        aboutTitle: 'Under the Supervision of Dr. Wael Mohamed Mousa',
        aboutText1: 'Master\'s in Nutrition and Food Science. PhD Candidate in Nutrition. Providing healthy nutritional consultations based on lifestyle changes.',
        aboutText2: 'Since 2014, we have been helping our clients achieve their health goals with personalized nutrition plans and professional guidance.',
        aboutFeature1: 'Healthy Meals',
        aboutFeature2: 'Custom Diet Plans',
        aboutFeature3: 'Online Consultations',
        aboutFeature4: 'Proven Results',
        yearsExp: '10+',
        yearsExpText: 'Years Experience',

        // Services Section
        servicesSubtitle: 'Our Services',
        servicesTitle: 'What We Offer',
        servicesDesc: 'Comprehensive nutrition and lifestyle services tailored to your unique needs and goals.',
        service1Title: 'Healthy Meals',
        service1Desc: 'Delicious, balanced meals designed by nutrition experts to fuel your body and support your health goals.',
        service2Title: 'Nutrition Plans',
        service2Desc: 'Custom diet plans and dietary guidance from expert nutritionists to optimize your results.',
        service3Title: 'Online Coaching',
        service3Desc: 'Get expert guidance from anywhere with our comprehensive online consultation programs.',
        learnMore: 'Learn More →',

        // Products Section
        productsSubtitle: 'Our Store',
        productsTitle: 'Premium Products',
        productsDesc: 'High-quality supplements and health products to support your journey.',
        addToCart: 'Add to Cart',
        noProducts: 'No Products Available',
        noProductsDesc: 'Check back soon for our latest products!',

        // Testimonials Section
        testimonialsSubtitle: 'Testimonials',
        testimonialsTitle: 'What Our Clients Say',
        testimonialsDesc: 'Real stories from real people who transformed their lives with us.',
        testimonial1Text: 'The personalized nutrition plan changed my life! I\'ve lost 15kg in 3 months and feel more energetic than ever.',
        testimonial1Name: 'Sarah M.',
        testimonial1Role: 'Weight Loss Program',
        testimonial2Text: 'The online coaching program is fantastic! Despite my busy schedule, I achieved amazing results.',
        testimonial2Name: 'Ahmed K.',
        testimonial2Role: 'Online Consultation',
        testimonial3Text: 'Professional, knowledgeable, and genuinely caring. The nutrition plan was tailored perfectly to my needs.',
        testimonial3Name: 'Fatima R.',
        testimonial3Role: 'Healthy Lifestyle',

        // Contact Section
        contactSubtitle: 'Contact Us',
        contactTitle: 'Book Your Consultation',
        contactDesc: 'Ready to start your transformation? Get in touch with us today.',
        locationLabel: 'Location',
        locationText: 'UAE, Umm Al Quwain, King Faisal Street, Behind UAQ Tower, Villa 18',
        phoneLabel: 'Phone',
        phoneText: '0529033110',
        emailLabel: 'Email',
        emailText: 'info@loversdiet.com',
        hoursLabel: 'Working Hours',
        hoursText: 'Sat - Thu: 9:00 AM - 9:00 PM',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        serviceInterested: 'Service Interested In',
        selectService: 'Select a service',
        serviceHealthyMeals: 'Healthy Meals',
        serviceNutrition: 'Nutrition Plans',
        serviceOnline: 'Online Consultation',
        serviceGeneral: 'General Inquiry',
        yourMessage: 'Your Message',
        messagePlaceholder: 'Tell us about your goals...',
        sendMessage: 'Send Message',

        // Footer
        footerDesc: 'Your trusted partner in achieving optimal health and wellness. We combine science-based nutrition with personalized plans to transform lives. Since 2014.',
        quickLinks: 'Quick Links',
        servicesFooter: 'Services',
        support: 'Support',
        faqs: 'FAQs',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        refundPolicy: 'Refund Policy',
        adminLogin: 'Admin Login',
        copyright: '© 2025 Lovers Diet Center. All rights reserved.',
        corporateWellness: 'Corporate Wellness',
        groupClasses: 'Group Sessions',

        // Online Consultation Section
        onlineSubtitle: 'Online Service',
        onlineTitle: 'Online Consultation with Dr. Wael Mousa',
        onlineDesc: 'Nutrition Consultant in UAE since 2008 - Member of UAE Nutrition Association',
        weightConditions: 'Weekly Weighing Conditions',
        weight1: '⚖️ Weigh in the morning on an empty stomach',
        weight2: '🚻 After using the bathroom',
        weight3: '👕 Light clothing',
        weight4: '📌 Use same scale and same time each week',
        testsTitle: 'Required Tests',
        tests1: '🧪 Tests sheet provided',
        tests2: '📤 Send results via WhatsApp',
        tests3: '📋 Program designed based on your health condition',
        followupTitle: 'Follow-up Method',
        followup1: '📅 Weekly online via WhatsApp, Botim, or Komera',
        followup2: '📹 Video call or voice call as preferred',
        followup3: '📩 Program sent after each weekly consultation',
        pricingTitle: 'Pricing',
        priceAmount: '1000 EGP',
        pricePeriod: '/ Package',
        pricing1: '✔️ First consultation included',
        pricing2: '✔️ 4 complete weekly follow-ups',
        pricing3: '✔️ Personalized nutrition program',
        paymentTitle: 'Payment Methods',
        payment1: '🏦 Bank Transfer',
        payment2: '📱 Vodafone Cash',
        payment3: '⏱️ Appointment confirmed immediately after payment',
        payment4: '📤 Send transfer receipt to confirm booking',
        bookingTitle: 'Book Now',
        bookingDesc: 'Contact us to start your health journey today!',
        whatsappBtn: 'Chat on WhatsApp'
    },
    ar: {
        // Navigation
        home: 'الرئيسية',
        about: 'من نحن',
        services: 'خدماتنا',
        products: 'المنتجات',
        testimonials: 'آراء العملاء',
        contact: 'اتصل بنا',
        bookNow: 'احجز الآن',
        langToggle: 'English',
        logoText: 'لوفرز دايت سنتر',

        // Hero Section
        heroTitle: 'رحلتك للرشاقة والجمال تبدأ في مكان واحد! 🌟',
        heroSubtitle: 'في Lovers Diet Center، نحن لا نقدم مجرد وجبات، بل نصمم لك نمط حياة صحي متكامل. نوفر لك كل ما يحتاجه جسمك لتصل للوزن المثالي وتتألق ببشرة نضرة.',
        bookConsultation: 'احجز استشارة',
        startJourney: 'ابدأ رحلتك الآن',
        viewProducts: 'تصفح المنتجات',

        // About Section
        aboutSubtitle: 'من نحن',
        aboutTitle: 'تحت إشراف الدكتور وائل محمد موسى',
        aboutText1: 'ماجستير تغذية وعلوم أطعمة. مرشح دكتوراه تغذية. نقدم استشارات غذائية صحية تعتمد على تغيير نمط الحياة.',
        aboutText2: 'منذ عام 2014، نساعد عملائنا على تحقيق أهدافهم الصحية من خلال خطط تغذية مخصصة وإرشادات متخصصة.',
        aboutFeature1: 'وجبات صحية',
        aboutFeature2: 'خطط غذائية مخصصة',
        aboutFeature3: 'استشارات أونلاين',
        aboutFeature4: 'نتائج مضمونة',
        yearsExp: '+10',
        yearsExpText: 'سنوات خبرة',

        // Services Section
        servicesSubtitle: 'خدماتنا',
        servicesTitle: 'ماذا نقدم لك',
        servicesDesc: 'خدمات تغذية شاملة ونمط حياة مصممة خصيصاً لاحتياجاتك وأهدافك.',
        service1Title: 'وجبات صحية',
        service1Desc: 'وجبات لذيذة ومتوازنة صممها خبراء التغذية لدعم صحتك وتحقيق أهدافك.',
        service2Title: 'خطط التغذية',
        service2Desc: 'خطط غذائية مخصصة وإرشادات من أخصائيي تغذية خبراء لتحسين نتائجك.',
        service3Title: 'استشارات أونلاين',
        service3Desc: 'احصل على إرشادات متخصصة من أي مكان مع برامج الاستشارات الأونلاين الشاملة.',
        learnMore: 'اعرف المزيد ←',

        // Products Section
        productsSubtitle: 'متجرنا',
        productsTitle: 'منتجات متميزة',
        productsDesc: 'مكملات غذائية ومنتجات صحية عالية الجودة لدعم رحلتك.',
        addToCart: 'أضف للسلة',
        noProducts: 'لا توجد منتجات',
        noProductsDesc: 'تابعنا قريباً لأحدث منتجاتنا!',

        // Testimonials Section
        testimonialsSubtitle: 'آراء العملاء',
        testimonialsTitle: 'ماذا يقول عملاؤنا',
        testimonialsDesc: 'قصص حقيقية من أشخاص حقيقيين غيّروا حياتهم معنا.',
        testimonial1Text: 'خطة التغذية المخصصة غيّرت حياتي! خسرت 15 كيلو في 3 أشهر وأشعر بطاقة أكبر من أي وقت مضى.',
        testimonial1Name: 'سارة م.',
        testimonial1Role: 'برنامج إنقاص الوزن',
        testimonial2Text: 'برنامج الاستشارات الأونلاين رائع! رغم انشغالي، حققت نتائج مذهلة.',
        testimonial2Name: 'أحمد ك.',
        testimonial2Role: 'استشارات أونلاين',
        testimonial3Text: 'محترفون، ذوو خبرة، ويهتمون بصدق. خطة التغذية كانت مصممة بشكل مثالي لاحتياجاتي.',
        testimonial3Name: 'فاطمة ر.',
        testimonial3Role: 'نمط حياة صحي',

        // Contact Section
        contactSubtitle: 'تواصل معنا',
        contactTitle: 'احجز استشارتك',
        contactDesc: 'جاهز لبدء التحول؟ تواصل معنا اليوم.',
        locationLabel: 'العنوان',
        locationText: 'الإمارات العربية المتحدة، أم القيوين، شارع الملك فيصل، خلف برج أم القيوين، فيلا 18',
        phoneLabel: 'الهاتف',
        phoneText: '0529033110',
        emailLabel: 'البريد الإلكتروني',
        emailText: 'info@loversdiet.com',
        hoursLabel: 'ساعات العمل',
        hoursText: 'السبت - الخميس: 9:00 صباحاً - 9:00 مساءً',
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        serviceInterested: 'الخدمة المطلوبة',
        selectService: 'اختر خدمة',
        serviceHealthyMeals: 'وجبات صحية',
        serviceNutrition: 'خطط التغذية',
        serviceOnline: 'استشارات أونلاين',
        serviceGeneral: 'استفسار عام',
        yourMessage: 'رسالتك',
        messagePlaceholder: 'أخبرنا عن أهدافك...',
        sendMessage: 'إرسال الرسالة',

        // Footer
        footerDesc: 'شريكك الموثوق في تحقيق الصحة المثالية والعافية. نجمع بين التغذية القائمة على العلم والخطط المخصصة لتغيير الحياة. منذ 2014.',
        quickLinks: 'روابط سريعة',
        servicesFooter: 'الخدمات',
        support: 'الدعم',
        faqs: 'الأسئلة الشائعة',
        privacyPolicy: 'سياسة الخصوصية',
        termsOfService: 'شروط الخدمة',
        refundPolicy: 'سياسة الاسترداد',
        adminLogin: 'دخول المدير',
        copyright: '© 2025 لوفرز دايت سنتر. جميع الحقوق محفوظة.',
        corporateWellness: 'برامج الشركات',
        groupClasses: 'جلسات جماعية',

        // Online Consultation Section
        onlineSubtitle: 'خدمة أونلاين',
        onlineTitle: 'الكشف الأونلاين مع د/ وائل موسى',
        onlineDesc: 'استشاري التغذية بالإمارات منذ 2008 - عضو جمعية الإمارات التغذوية',
        weightConditions: 'شروط قياس الوزن الأسبوعية',
        weight1: '⚖️ الوزن صباحاً على معدة فاضية',
        weight2: '🚻 بعد دخول الحمام',
        weight3: '👕 الملابس خفيفة',
        weight4: '📌 تثبيت نفس الميزان ونفس موعد أخذ الوزن',
        testsTitle: 'التحاليل المطلوبة',
        tests1: '🧪 مرفق ورقة التحاليل المطلوبة',
        tests2: '📤 إرسال النتائج عبر الواتس',
        tests3: '📋 عمل البرنامج المناسب للحالة الصحية',
        followupTitle: 'طريقة المتابعة',
        followup1: '📅 مرة كل أسبوع أونلاين (واتس آب - بوتيم - كوميرا)',
        followup2: '📹 فيديو أو مكالمة حسب رغبة العميل',
        followup3: '📩 يتم إرسال البرنامج بعد الاستشارة الأسبوعية',
        pricingTitle: 'الرسوم',
        priceAmount: '1000 جنيه',
        pricePeriod: '/ الباقة',
        pricing1: '✔️ الكشف الأول مشمول',
        pricing2: '✔️ 4 متابعات أسبوعية كاملة',
        pricing3: '✔️ برنامج تغذية مخصص',
        paymentTitle: 'طريقة التحويل',
        payment1: '🏦 تحويل بنكي',
        payment2: '📱 فودافون كاش',
        payment3: '⏱️ بعد التحويل يتم تحديد الموعد فوراً',
        payment4: '📤 إرسال الحوالة لتأكيد الحجز',
        bookingTitle: 'احجز الآن',
        bookingDesc: 'تواصل معنا لبدء رحلتك الصحية اليوم!',
        whatsappBtn: 'تواصل عبر واتساب'
    }
};

function translatePage() {
    const t = translations[currentLang];

    // Navigation
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else if (el.tagName === 'OPTION' && key === 'selectService') {
                el.textContent = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-placeholder]').forEach(el => {
        const key = el.getAttribute('data-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });

    // Update page title
    document.title = currentLang === 'ar'
        ? 'لوفرز دايت سنتر | رحلتك للرشاقة والجمال'
        : 'Lovers Diet Center | Your Journey to Fitness & Beauty';
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    const html = document.documentElement;

    // Toggle direction
    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    // Update toggle button
    langToggle.textContent = translations[currentLang].langToggle;

    // Translate entire page
    translatePage();

    // Re-render products with new language
    renderProducts();

    // Store preference
    localStorage.setItem('preferredLang', currentLang);
}

function initLanguage() {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && savedLang !== currentLang) {
        currentLang = savedLang === 'ar' ? 'en' : 'ar';
        toggleLanguage();
    } else {
        translatePage();
    }

    langToggle.addEventListener('click', toggleLanguage);
}

// ===== SCROLL ANIMATIONS =====

function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== PRODUCTS MANAGEMENT =====

const defaultProducts = [
    {
        id: 1,
        name: 'Premium Whey Protein',
        nameAr: 'بروتين واي ممتاز',
        description: 'High-quality whey protein isolate for muscle recovery. 25g protein per serving.',
        descriptionAr: 'بروتين واي عالي الجودة لاستشفاء العضلات. 25 جرام بروتين لكل حصة.',
        price: 220,
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=300&fit=crop',
        category: 'supplements'
    },
    {
        id: 2,
        name: 'BCAA Energy Blend',
        nameAr: 'مزيج BCAA للطاقة',
        description: 'Essential amino acids with natural energy boost for enhanced workout performance.',
        descriptionAr: 'أحماض أمينية أساسية مع طاقة طبيعية لتحسين أداء التمارين.',
        price: 150,
        image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&h=300&fit=crop',
        category: 'supplements'
    },
    {
        id: 3,
        name: 'Organic Green Superfood',
        nameAr: 'سوبرفود أخضر عضوي',
        description: 'Nutrient-dense green powder with spirulina, chlorella, and wheatgrass.',
        descriptionAr: 'مسحوق أخضر غني بالعناصر الغذائية مع السبيرولينا والكلوريلا.',
        price: 180,
        image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop',
        category: 'supplements'
    },
    {
        id: 4,
        name: 'Healthy Meal Plan - Weekly',
        nameAr: 'خطة وجبات صحية - أسبوعية',
        description: 'Complete weekly meal plan with balanced nutrition designed by our experts.',
        descriptionAr: 'خطة وجبات أسبوعية كاملة بتغذية متوازنة صممها خبراؤنا.',
        price: 350,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        category: 'meals'
    },
    {
        id: 5,
        name: 'Omega-3 Fish Oil',
        nameAr: 'زيت السمك أوميغا-3',
        description: 'Pure fish oil capsules for heart health and joint support. 1000mg EPA/DHA.',
        descriptionAr: 'كبسولات زيت سمك نقية لصحة القلب والمفاصل. 1000 ملغ EPA/DHA.',
        price: 95,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
        category: 'supplements'
    },
    {
        id: 6,
        name: 'Detox Juice Pack',
        nameAr: 'باقة عصائر الديتوكس',
        description: 'Fresh cold-pressed juices for body detox and natural energy boost.',
        descriptionAr: 'عصائر طازجة معصورة على البارد لتنقية الجسم وطاقة طبيعية.',
        price: 120,
        image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop',
        category: 'drinks'
    }
];

function getProducts() {
    const stored = localStorage.getItem('fitnessClinicProducts');
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem('fitnessClinicProducts', JSON.stringify(defaultProducts));
    return defaultProducts;
}

function renderProducts() {
    const products = getProducts();
    const t = translations[currentLang];

    if (!productsGrid) return;

    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <div class="no-products-icon">📦</div>
                <h3>${t.noProducts}</h3>
                <p>${t.noProductsDesc}</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => {
        const name = currentLang === 'ar' && product.nameAr ? product.nameAr : product.name;
        const desc = currentLang === 'ar' && product.descriptionAr ? product.descriptionAr : product.description;
        const currency = currentLang === 'ar' ? 'د.إ' : 'AED';

        return `
            <div class="product-card fade-in" data-id="${product.id}">
                <img src="${product.image}" alt="${name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x300?text=Product+Image'">
                <div class="product-content">
                    <h3 class="product-name">${name}</h3>
                    <p class="product-description">${desc}</p>
                    <div class="product-price">${product.price} ${currency}</div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                        🛒 ${t.addToCart}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    initScrollAnimations();

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
}

function handleAddToCart(e) {
    const btn = e.target;
    const originalText = btn.innerHTML;
    const successText = currentLang === 'ar' ? '✓ تمت الإضافة!' : '✓ Added!';

    btn.innerHTML = successText;
    btn.style.background = 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
    }, 2000);

    const msg = currentLang === 'ar' ? 'تمت إضافة المنتج للسلة!' : 'Product added to cart!';
    showNotification(msg, 'success');
}

// ===== NOTIFICATIONS =====

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    const isRTL = currentLang === 'ar';

    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        [isRTL ? 'left' : 'right']: '20px',
        background: type === 'success' ? 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' :
            type === 'error' ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' :
                'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        zIndex: '9999',
        animation: 'fade-in-up 0.3s ease',
        direction: isRTL ? 'rtl' : 'ltr'
    });

    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fade-in-up 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== CONTACT FORM =====

function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        if (!data.firstName || !data.lastName || !data.email || !data.service) {
            const msg = currentLang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' : 'Please fill in all required fields.';
            showNotification(msg, 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            const msg = currentLang === 'ar' ? 'شكراً! تم إرسال رسالتك بنجاح.' : 'Thank you! Your message has been sent successfully.';
            showNotification(msg, 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===== INITIALIZE =====

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initLanguage();
    initScrollAnimations();
    renderProducts();
    initContactForm();
    handleHeaderScroll();

    console.log('Lovers Diet Center - Website Initialized');
});

window.addEventListener('storage', function (e) {
    if (e.key === 'fitnessClinicProducts') {
        renderProducts();
    }
});
