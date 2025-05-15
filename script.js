document.addEventListener('DOMContentLoaded', function() {
    // Counter Animation
    function animateCounter(id, target, duration = 2000) {
        const element = document.getElementById(id);
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // Initialize counters when scrolled to the section
    function initCounters() {
        animateCounter("weddingCounter", 350);
        animateCounter("clientCounter", 500);
        animateCounter("photoCounter", 10000);
        animateCounter("albumCounter", 250);
    }
    
    // Check if counter section is in view
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    let countersInitialized = false;
    window.addEventListener('scroll', function() {
        const counterSection = document.querySelector('.counter-section');
        if (isInViewport(counterSection) && !countersInitialized) {
            initCounters();
            countersInitialized = true;
        }
    });
    
    // Gallery Slider Functionality
    const sliderContainer = document.getElementById('sliderContainer');
    const slides = document.querySelectorAll('.slider-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Create dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        sliderDots.appendChild(dot);
    }
    
    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function goToSlide(index) {
        if (index < 0) {
            currentIndex = slideCount - 1;
        } else if (index >= slideCount) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateSlider();
    }
    
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Auto slide
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // Booking Modal Functionality
    const bookButtons = document.querySelectorAll('.book-btn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.querySelectorAll('.close-modal');
    const modalPackageTitle = document.getElementById('modalPackageTitle');
    const modalPackageDetails = document.getElementById('modalPackageDetails');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const facebookBtn = document.getElementById('facebookBtn');

    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            const packagePrice = this.getAttribute('data-price');
            const packageFeatures = this.getAttribute('data-features');
            
            modalPackageTitle.textContent = packageName;
            
            let featuresHTML = `
                <p><strong>প্যাকেজ:</strong> ${packageName}</p>
                <p><strong>দাম:</strong> ${packagePrice}</p>
                <p><strong>বৈশিষ্ট্য:</strong></p>
                <ul style="margin-left: 20px;">
            `;
            
            packageFeatures.split(',').forEach(feature => {
                featuresHTML += `<li>${feature.trim()}</li>`;
            });
            
            featuresHTML += `</ul>`;
            modalPackageDetails.innerHTML = featuresHTML;
            
            const whatsappMessage = `NB ফটোগ্রাফি - প্যাকেজ বুকিং%0A%0Aপ্যাকেজ: ${packageName}%0Aদাম: ${packagePrice}%0A%0Aবৈশিষ্ট্য:%0A• ${packageFeatures.replace(/,/g, '%0A• ')}%0A%0Aআমি এই প্যাকেজটি বুক করতে চাই। অনুগ্রহ করে আমাকে কনফার্মেশন দিন।`;
            whatsappBtn.href = `https://wa.me/8801628233346?text=${whatsappMessage}`;
            
            const facebookMessage = `NB ফটোগ্রাফি - প্যাকেজ বুকিং%0A%0Aপ্যাকেজ: ${packageName}%0Aদাম: ${packagePrice}%0A%0Aবৈশিষ্ট্য:%0A• ${packageFeatures.replace(/,/g, '%0A• ')}%0A%0Aআমি এই প্যাকেজটি বুক করতে চাই। অনুগ্রহ করে আমাকে কনফার্মেশন দিন।`;
            facebookBtn.href = `https://m.me/nbphotographybd46?text=${facebookMessage}`;
            
            bookingModal.style.display = 'flex';
        });
    });

    closeModal.forEach(btn => {
        btn.addEventListener('click', function() {
            bookingModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
    });

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            answer.classList.toggle('active');
            
            if (answer.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Live Chat Functionality
    const liveChatBtn = document.getElementById('liveChatBtn');
    
    liveChatBtn.addEventListener('click', function() {
        if (typeof Tawk_API !== 'undefined') {
            Tawk_API.toggle();
        }
    });
});
