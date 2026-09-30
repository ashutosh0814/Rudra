/**
 * RUDRA PACKERS & MANUFACTURERS
 * Premium Interactive JavaScript
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSmoothScroll();
    initScrollReveal();
    init3DTilt();
    initMagneticButtons();
    initCounterAnimation();
    initMobileMenu();
    initParallax();
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ============================================
// 3D TILT EFFECT
// ============================================

function init3DTilt() {
    // Only enable on non-touch devices
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', handleTilt);
            element.addEventListener('mouseleave', resetTilt);
        });
    }
}

function handleTilt(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / rect.height) * -15;
    const rotateY = (mouseX / rect.width) * 15;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetTilt(e) {
    const element = e.currentTarget;
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
}

// ============================================
// MAGNETIC BUTTONS
// ============================================

function initMagneticButtons() {
    // Only enable on non-touch devices
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const magneticButtons = document.querySelectorAll('.magnetic-btn');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', handleMagneticMove);
            button.addEventListener('mouseleave', handleMagneticLeave);
        });
    }
}

function handleMagneticMove(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    
    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

function handleMagneticLeave(e) {
    const button = e.currentTarget;
    button.style.transform = 'translate(0, 0)';
}

// ============================================
// COUNTER ANIMATION
// ============================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// ============================================
// PARALLAX EFFECT
// ============================================

function initParallax() {
    // Only enable on larger screens
    if (window.innerWidth > 768) {
        const parallaxElements = document.querySelectorAll('.gradient-orb');
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    
                    parallaxElements.forEach((element, index) => {
                        const speed = 0.3 + (index * 0.1);
                        const yPos = -(scrolled * speed);
                        element.style.transform = `translateY(${yPos}px)`;
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
}

// ============================================
// MOUSE GLOW EFFECT ON CARDS
// ============================================

// Only enable on non-touch devices
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(79, 70, 229, 0.4), transparent 50%)`;
            }
        });
    });
}

// ============================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// ============================================

function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', debounce(setVH, 100));

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Any heavy scroll operations can go here
}, 10));

// ============================================
// PREFERS REDUCED MOTION
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.body.style.setProperty('--transition-fast', '0s');
    document.body.style.setProperty('--transition-base', '0s');
    document.body.style.setProperty('--transition-slow', '0s');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Get element position
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
        width: rect.width,
        height: rect.height
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// LOADING STATE
// ============================================

window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});

// Add loading class initially
document.body.classList.add('loading');

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cRUDRA PACKERS & MANUFACTURERS', 'color: #4f46e5; font-size: 24px; font-weight: bold;');
console.log('%cPremium Packaging Solutions', 'color: #a3a3b8; font-size: 14px;');
console.log('%cWebsite built with vanilla JS, CSS, and HTML', 'color: #6b6b7f; font-size: 12px;');
