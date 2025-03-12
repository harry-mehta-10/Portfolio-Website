// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const skillBars = document.querySelectorAll('.skill-progress');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Active navigation link on scroll
function highlightNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Animate skill bars on scroll
function animateSkillBars() {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const progress = bar.getAttribute('data-progress');
        
        if (barTop < window.innerHeight - 50) {
            bar.style.width = `${progress}%`;
        }
    });
}

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filter = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const categories = card.getAttribute('data-category').split(' ');
                if (categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        try {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send data to backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObj)
            });
            
            const data = await response.json();
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = data.message || 'Your message has been sent successfully!';
            contactForm.appendChild(successMessage);
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
            
        } catch (error) {
            console.error('Error sending message:', error);
            
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Failed to send message. Please try again.';
            contactForm.appendChild(errorMessage);
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        }
    });
}

// Scroll to top button
function createScrollTopButton() {
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll animation
function revealOnScroll() {
    const elementsToReveal = document.querySelectorAll('.hidden');
    
    elementsToReveal.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < window.innerHeight - 50) {
            element.classList.add('show');
        }
    });
}

// Add .hidden class to elements for animation
function prepareAnimation() {
    const elementsToAnimate = document.querySelectorAll('.section-header, .about-text, .about-stats, .skill-category, .project-card, .timeline-item, .contact-card, .contact-form');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('hidden');
    });
}

// Page loading animation
function pageLoadAnimation() {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
            hero.style.transition = 'all 0.8s ease';
        }, 200);
    }
}

// Light/Dark mode toggle (optional feature)
function createThemeToggle() {
    const navbar = document.querySelector('.navbar .container');
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    navbar.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial calls
    highlightNavLink();
    animateSkillBars();
    createScrollTopButton();
    prepareAnimation();
    pageLoadAnimation();
    // Uncomment to enable dark mode toggle
    // createThemeToggle();
    
    // Add event listeners
    window.addEventListener('scroll', () => {
        highlightNavLink();
        animateSkillBars();
        revealOnScroll();
    });
    
    // Initial reveal for elements in view
    setTimeout(() => {
        revealOnScroll();
    }, 500);
});

// Page preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Typing animation for hero section
function setupTypingAnimation() {
    const element = document.querySelector('.hero h2');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}
