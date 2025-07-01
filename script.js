document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Typing effect
    new Typed('.typed-text', {
        strings: ['LinkedIn Ghostwriter', 'Content Strategist', 'Brand Storyteller'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        // Random initial position
        element.style.left = Math.random() * 90 + '%';
        element.style.top = Math.random() * 90 + '%';
        
        // Random animation duration between 10-20s
        const duration = 10 + Math.random() * 10;
        element.style.animation = `float ${duration}s infinite`;
    });

    // Intersection Observer for fade effects and scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Add active class to current nav link
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Profile Card Flip
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        const isTouchDevice = window.matchMedia('(hover: none)').matches;
        
        if (isTouchDevice) {
            // For touch devices
            profileCard.addEventListener('click', function() {
                this.classList.toggle('flipped');
            });

            // Close card when clicking outside
            document.addEventListener('click', function(event) {
                if (!profileCard.contains(event.target)) {
                    profileCard.classList.remove('flipped');
                }
            });
        } else {
            // For non-touch devices (hover effect)
            profileCard.addEventListener('mouseenter', function() {
                this.classList.add('flipped');
            });
            
            profileCard.addEventListener('mouseleave', function() {
                this.classList.remove('flipped');
            });
        }
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animated background elements
const animateFloatingElements = () => {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach(element => {
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
};

// Update floating elements position periodically
setInterval(animateFloatingElements, 20000);

// Service card hover effect with ripple
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        card.appendChild(ripple);
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
        
        serviceCards.forEach(c => {
            if (c !== card) {
                c.style.transform = 'scale(0.95)';
            }
        });
        card.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        serviceCards.forEach(c => c.style.transform = 'scale(1)');
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thanks for your message! We\'ll be in touch soon.');
        this.reset();
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const writingElements = document.querySelectorAll('.writing-element');
    
    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        
        writingElements.forEach((element, index) => {
            element.style.transform = `translate(${scrolled * 0.1 * (index + 1)}px, ${scrolled * 0.05 * (index + 1)}px)`;
        });
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.primary-button, .secondary-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('button-ripple');
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});

// Intersection Observer for fade-in effect
const fadeElements = document.querySelectorAll('.overview-item, .case-study-card, .service-card');

const fadeOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const fadeOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    fadeOnScroll.observe(element);
});

// Flip Card Touch Interaction
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('click', function() {
        // Check if we're on a touch device
        if (window.matchMedia('(hover: none)').matches) {
            this.classList.toggle('flipped');
        }
    });
} 