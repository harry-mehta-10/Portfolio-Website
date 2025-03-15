/**
 * Advanced Portfolio JavaScript
 * Author: Harry Mehta
 * Version: 2.0
 */

// Wait for DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {
    // Performance optimization - Cache DOM elements
    const DOM = {
        preloader: document.querySelector('.preloader'),
        navbar: document.querySelector('.navbar'),
        menuToggle: document.getElementById('menu-toggle'),
        navMenu: document.getElementById('nav-menu'),
        navLinks: document.querySelectorAll('.nav-link'),
        sections: document.querySelectorAll('section'),
        skillBars: document.querySelectorAll('.skill-progress'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        projectCards: document.querySelectorAll('.project-card'),
        testimonialSlider: document.querySelector('.testimonial-slider'),
        testimonialSlides: document.querySelectorAll('.testimonial-slide'),
        dotsContainer: document.querySelector('.testimonial-dots'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        counters: document.querySelectorAll('.counter'),
        contactForm: document.getElementById('contact-form'),
        themeToggle: document.getElementById('theme-toggle'),
        scrollTopBtn: document.getElementById('scroll-top'),
        heroParticles: document.getElementById('hero-particles')
    };
    
    // Config options for animations and effects
    const CONFIG = {
        scrollOffset: 100,
        animationSpeed: 800,
        counterSpeed: 50,
        autoSlideInterval: 5000
    };
    
    // State management
    const STATE = {
        isMenuOpen: false,
        currentSlide: 0,
        isScrolling: false,
        lastScrollTop: 0,
        skillsAnimated: false,
        countersAnimated: false
    };

    // Initialize site components
    initPreloader();
    initAOS();
    initParticles();
    initNavigation();
    initScrollEffects();
    initSkillBars();
    initProjectFilter();
    initTestimonialSlider();
    initContactForm();
    initThemeToggle();
    initTypewriter();
    initCustomCursor();
    initScrollToTop();
    initSmoothScrolling();
    
    // ======= Component Initializers =======
    
    // Preloader with optimized display handling
    function initPreloader() {
        if (!DOM.preloader) return;
        
        window.addEventListener('load', () => {
            // Start hiding the preloader after page loads
            setTimeout(() => {
                DOM.preloader.style.opacity = '0';
                document.body.classList.add('loaded');
                
                // Remove preloader from DOM after transition
                setTimeout(() => {
                    DOM.preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }
    
    // Initialize AOS (Animate on Scroll) with optimized settings
    function initAOS() {
        AOS.init({
            duration: CONFIG.animationSpeed,
            easing: 'ease-out',
            once: true,
            mirror: false,
            offset: 50,
            disable: window.innerWidth < 768 ? 'phone' : false
        });
        
        // Refresh AOS on window resize
        window.addEventListener('resize', debounce(() => {
            AOS.refresh();
        }, 200));
    }
    
    // Initialize Particles.js with enhanced configuration
    function initParticles() {
        if (!DOM.heroParticles) return;
        
        const isDark = document.body.classList.contains('dark-mode');
        const particleColor = isDark ? '#60a5fa' : '#3b82f6';
        
        particlesJS('hero-particles', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": particleColor
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 3,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": particleColor,
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Enhanced navigation with improved UX
    function initNavigation() {
        // Mobile menu toggle with animation
        if (DOM.menuToggle) {
            DOM.menuToggle.addEventListener('click', () => {
                DOM.menuToggle.classList.toggle('active');
                DOM.navMenu.classList.toggle('active');
                STATE.isMenuOpen = !STATE.isMenuOpen;
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = STATE.isMenuOpen ? 'hidden' : '';
            });
        }
        
        // Close mobile menu when clicking a link
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                DOM.navMenu.classList.remove('active');
                DOM.menuToggle.classList.remove('active');
                STATE.isMenuOpen = false;
                document.body.style.overflow = '';
            });
        });
        
        // Enhanced Navbar scroll effect with direction detection
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            // Add scrolled class based on scroll position
            if (currentScroll > 50) {
                DOM.navbar.classList.add('scrolled');
            } else {
                DOM.navbar.classList.remove('scrolled');
            }
            
            // Add show/hide class based on scroll direction
            if (currentScroll > lastScroll && currentScroll > 300) {
                DOM.navbar.classList.add('nav-hidden');
            } else {
                DOM.navbar.classList.remove('nav-hidden');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Smart scroll effects for active navigation and section animations
    function initScrollEffects() {
        // Throttle scroll events for performance
        window.addEventListener('scroll', throttle(() => {
            if (STATE.isScrolling) return;
            STATE.isScrolling = true;
            
            requestAnimationFrame(() => {
                highlightNavLink();
                animateOnScroll();
                STATE.isScrolling = false;
            });
        }, 50));
        
        // Initial check for elements in viewport
        setTimeout(() => {
            highlightNavLink();
            animateOnScroll();
        }, 100);
    }
    
    // Highlight active nav link based on scroll position
    function highlightNavLink() {
        const scrollPosition = window.scrollY + CONFIG.scrollOffset;
        
        // Find the current section in view
        DOM.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                DOM.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Animate elements when scrolled into view
    function animateOnScroll() {
        // Animate skill bars when Skills section is in view
        if (!STATE.skillsAnimated) {
            const skillsSection = document.getElementById('skills');
            if (skillsSection && isElementInViewport(skillsSection)) {
                animateSkillBars();
                STATE.skillsAnimated = true;
            }
        }
        
        // Animate counters when About section is in view
        if (!STATE.countersAnimated) {
            const aboutSection = document.getElementById('about');
            if (aboutSection && isElementInViewport(aboutSection)) {
                runCounters();
                STATE.countersAnimated = true;
            }
        }
    }
    
    // Initialize skill progress bars
    function initSkillBars() {
        if (DOM.skillBars.length === 0) return;
        
        // Set data attributes for percentage display
        DOM.skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            const container = bar.closest('.skill-item');
            if (container) {
                const span = container.querySelector('span');
                if (span) {
                    span.setAttribute('data-percentage', `${progress}%`);
                }
            }
        });
    }
    
    // Animate skill bars with improved animation
    function animateSkillBars() {
        DOM.skillBars.forEach((bar, index) => {
            const progress = bar.getAttribute('data-progress');
            
            // Stagger animation for better visual effect
            setTimeout(() => {
                bar.style.width = `${progress}%`;
            }, index * 100);
        });
    }
    
    // Project filtering with smooth transitions
    function initProjectFilter() {
        if (DOM.filterBtns.length === 0 || DOM.projectCards.length === 0) return;
        
        DOM.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                DOM.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects with staggered animation
                DOM.projectCards.forEach((card, index) => {
                    const categories = card.getAttribute('data-category').split(' ');
                    const shouldShow = filter === 'all' || categories.includes(filter);
                    
                    // Reset transition for consistent animation
                    card.style.transition = 'all 0.4s ease';
                    
                    setTimeout(() => {
                        if (shouldShow) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 400);
                        }
                    }, index * 50); // Stagger effect
                });
            });
        });
    }
    
    // Enhanced testimonial slider with improved UX
    function initTestimonialSlider() {
        if (!DOM.testimonialSlider || DOM.testimonialSlides.length === 0) return;
        
        const slideCount = DOM.testimonialSlides.length;
        let autoSlideInterval;
        
        // Create dots for slider navigation
        if (DOM.dotsContainer) {
            DOM.testimonialSlides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('data-index', index);
                
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetAutoSlide();
                });
                
                DOM.dotsContainer.appendChild(dot);
            });
        }
        
        const dots = document.querySelectorAll('.dot');
        
        // Main slide functions
        function nextSlide() {
            STATE.currentSlide = (STATE.currentSlide + 1) % slideCount;
            goToSlide(STATE.currentSlide);
        }
        
        function prevSlide() {
            STATE.currentSlide = (STATE.currentSlide - 1 + slideCount) % slideCount;
            goToSlide(STATE.currentSlide);
        }
        
        function goToSlide(index) {
            DOM.testimonialSlides.forEach((slide, i) => {
                // Enhanced slide transition with depth effect
                slide.style.transform = `translateX(${100 * (i - index)}%) scale(${i === index ? 1 : 0.9})`;
                slide.style.opacity = i === index ? '1' : '0';
                slide.style.zIndex = i === index ? '2' : '1';
                
                // Update active dot
                if (dots[i]) {
                    dots[i].classList.toggle('active', i === index);
                }
            });
            
            STATE.currentSlide = index;
        }
        
        // Initialize slide positions
        DOM.testimonialSlides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - STATE.currentSlide)}%)`;
            slide.style.opacity = index === STATE.currentSlide ? '1' : '0';
        });
        
        // Add event listeners for controls
        if (DOM.prevBtn && DOM.nextBtn) {
            DOM.prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
            
            DOM.nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }
        
        // Touch swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        DOM.testimonialSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        DOM.testimonialSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resetAutoSlide();
        }, { passive: true });
        
        function handleSwipe() {
            const difference = touchStartX - touchEndX;
            if (Math.abs(difference) < 30) return; // Minimum swipe distance
            
            if (difference > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
        
        // Automatic slide transition
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, CONFIG.autoSlideInterval);
        }
        
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
        
        // Start auto-slide
        startAutoSlide();
        
        // Pause auto-slide when user interacts with slider
        DOM.testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        DOM.testimonialSlider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Animated counters with improved animation
    function runCounters() {
        DOM.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // ms
            const stepTime = Math.abs(Math.floor(duration / target));
            
            let current = 0;
            const increment = target / (duration / CONFIG.counterSpeed);
            
            const timer = setInterval(() => {
                current += increment;
                counter.innerText = Math.round(current);
                
                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                }
            }, CONFIG.counterSpeed);
        });
    }
    
    // Enhanced contact form with improved UX
    function initContactForm() {
        if (!DOM.contactForm) return;
        
        // Form input animation
        const formInputs = DOM.contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            // Add active class to input when focused or has value
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    input.parentElement.classList.remove('input-focused');
                }
            });
            
            // Check initial state
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('input-focused');
            }
        });
        
        // Form submission handling
        DOM.contactForm.addEventListener('submit', function(e) {
            // Add loading state to submit button
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
                submitBtn.disabled = true;
            }
            
            // Add a hidden input field to track submission for formspree
            const submittedField = document.createElement('input');
            submittedField.type = 'hidden';
            submittedField.name = '_submitted';
            submittedField.value = 'true';
            this.appendChild(submittedField);
            
            // Store submission in session storage
            sessionStorage.setItem('formSubmitted', 'true');
        });
        
        // Check if form was just submitted (when returning from formspree)
        if (sessionStorage.getItem('formSubmitted') === 'true') {
            // Clear the flag
            sessionStorage.removeItem('formSubmitted');
            
            // Create success message with animation
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
            DOM.contactForm.appendChild(successMessage);
            
            // Scroll to the message
            DOM.contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset form
            DOM.contactForm.reset();
            
            // Remove the message after 5 seconds
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }
            }, 5000);
        }
    }
    
    // Enhanced theme toggle with improved transitions
    function initThemeToggle() {
        if (!DOM.themeToggle) return;
        
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            DOM.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            updateThemeColors(true);
        }
        
        // Toggle theme on click
        DOM.themeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            
            if (isDarkMode) {
                DOM.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                DOM.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
            
            // Update colors for particles and other elements
            updateThemeColors(isDarkMode);
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (localStorage.getItem('theme')) return; // User has manual preference
            
            const isDarkMode = e.matches;
            document.body.classList.toggle('dark-mode', isDarkMode);
            DOM.themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            updateThemeColors(isDarkMode);
        });
    }
    
    // Update colors for various components when theme changes
    function updateThemeColors(isDarkMode) {
        // Update particles color for current mode
        if (window.pJSDom && window.pJSDom[0]) {
            const particleColor = isDarkMode ? '#60a5fa' : '#3b82f6';
            window.pJSDom[0].pJS.particles.color.value = particleColor;
            window.pJSDom[0].pJS.particles.line_linked.color = particleColor;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
        
        // Add animation class to body for theme transition
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 1000);
    }
    
    // Typewriter effect for hero subtitle
    function initTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;
        
        const text = typewriterElement.textContent;
        if (!text) return;
        
        typewriterElement.textContent = '';
        typewriterElement.style.opacity = '1';
        
        let i = 0;
        const speed = 100; // typing speed
        
        function type() {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Start cursor blinking after typing completes
                typewriterElement.classList.add('typing-done');
            }
        }
        
        setTimeout(() => {
            type();
        }, 1000);
    }
    
    // Custom cursor effect for desktop
    function initCustomCursor() {
        // Only initialize on devices with hover capability
        if (window.matchMedia('(hover: hover)').matches && window.innerWidth > 768) {
            const cursor = document.createElement('div');
            cursor.classList.add('custom-cursor');
            document.body.appendChild(cursor);
            
            const cursorSmall = document.createElement('div');
            cursorSmall.classList.add('custom-cursor-follower');
            document.body.appendChild(cursorSmall);
            
            document.addEventListener('mousemove', e => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                // Delayed follower for trail effect
                setTimeout(() => {
                    cursorSmall.style.left = e.clientX + 'px';
                    cursorSmall.style.top = e.clientY + 'px';
                }, 50);
            });
            
            // Add active state for interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .project-card, .filter-btn');
            
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('active');
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('active');
                });
            });
        }
    }
    
    // Scroll to top button
    function initScrollToTop() {
        if (!DOM.scrollTopBtn) return;
        
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 300) {
                DOM.scrollTopBtn.classList.add('active');
            } else {
                DOM.scrollTopBtn.classList.remove('active');
            }
        }, 200));
        
        DOM.scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (STATE.isMenuOpen) {
                        DOM.navMenu.classList.remove('active');
                        DOM.menuToggle.classList.remove('active');
                        STATE.isMenuOpen = false;
                        document.body.style.overflow = '';
                    }
                    
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ======= Utility Functions =======
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Debounce function to limit function calls
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Throttle function to limit function calls
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const context = this;
            const args = arguments;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Progressive image loading
    function loadProgressiveImages() {
        const imgDefer = document.querySelectorAll('img[data-src]');
        
        if (!imgDefer.length) return;
        
        const loadImage = (entry) => {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            observer.unobserve(img);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry);
                }
            });
        }, {
            rootMargin: '100px',
            threshold: 0.1
        });
        
        imgDefer.forEach(img => {
            observer.observe(img);
        });
    }
    
    // Call progressive image loading after DOM is loaded
    loadProgressiveImages();
    
    // Handle resize events
    window.addEventListener('resize', debounce(() => {
        // Recalculate dynamic elements
        if (DOM.testimonialSlides.length) {
            const currentSlide = STATE.currentSlide;
            DOM.testimonialSlides.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
            });
        }
    }, 200));
});