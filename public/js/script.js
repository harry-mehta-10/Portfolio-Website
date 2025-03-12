// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false
    });

    // Initialize Particles.js in hero section
    if (document.getElementById('hero-particles')) {
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
                    "value": "#3b82f6"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                },
                "size": {
                    "value": 3,
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#3b82f6",
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
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Navigation
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

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

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section');
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Call once on load and then on scroll
    highlightNavLink();
    window.addEventListener('scroll', highlightNavLink);

    // Skill Progress Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight - 100) {
                bar.style.width = `${progress}%`;
            }
        });
    }
    
    // Run on load and scroll
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get filter value
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects with animation
                projectCards.forEach(card => {
                    card.style.transition = 'all 0.4s ease';
                    
                    if (filter === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        const categories = card.getAttribute('data-category').split(' ');
                        
                        if (categories.includes(filter)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 100);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 400);
                        }
                    }
                });
            });
        });
    }

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialSlider && testimonialSlides.length) {
        let currentSlide = 0;
        
        // Create dots
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('data-index', index);
            dotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        const dots = document.querySelectorAll('.dot');
        
        // Next slide function
        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            goToSlide(currentSlide);
        }
        
        // Previous slide function
        function prevSlide() {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            goToSlide(currentSlide);
        }
        
        // Go to specific slide
        function goToSlide(n) {
            testimonialSlides.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * (index - n)}%)`;
                slide.style.opacity = index === n ? '1' : '0';
                dots[index].classList.toggle('active', index === n);
            });
            currentSlide = n;
        }
        
        // Initialize slide positions
        testimonialSlides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
            slide.style.opacity = index === currentSlide ? '1' : '0';
        });
        
        // Event listeners for controls
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Auto slide (optional)
        setInterval(nextSlide, 5000);
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    function runCounter() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const counterTop = counter.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (counterTop < windowHeight - 100) {
                const count = +counter.innerText;
                const increment = target / 50; // Speed of count
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(runCounter, 40);
                } else {
                    counter.innerText = target;
                }
            }
        });
    }
    
    window.addEventListener('scroll', runCounter);

    // Contact Form Success Message
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            // Add a hidden input field to track submission
            const submittedField = document.createElement('input');
            submittedField.type = 'hidden';
            submittedField.name = '_submitted';
            submittedField.value = 'true';
            contactForm.appendChild(submittedField);
            
            // Store submission in session storage
            sessionStorage.setItem('formSubmitted', 'true');
        });
        
        // Check if form was just submitted (when returning from formspree)
        if (sessionStorage.getItem('formSubmitted') === 'true') {
            // Clear the flag
            sessionStorage.removeItem('formSubmitted');
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
            contactForm.appendChild(successMessage);
            
            // Scroll to the message
            contactForm.scrollIntoView({ behavior: 'smooth' });
            
            // Remove the message after 5 seconds
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.remove();
                }
            }, 5000);
        }
    }

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Toggle theme on click
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
                
                // Update particles color for dark mode
                if (window.pJSDom && window.pJSDom[0]) {
                    window.pJSDom[0].pJS.particles.color.value = '#60a5fa';
                    window.pJSDom[0].pJS.particles.line_linked.color = '#60a5fa';
                    window.pJSDom[0].pJS.fn.particlesRefresh();
                }
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
                
                // Update particles color for light mode
                if (window.pJSDom && window.pJSDom[0]) {
                    window.pJSDom[0].pJS.particles.color.value = '#3b82f6';
                    window.pJSDom[0].pJS.particles.line_linked.color = '#3b82f6';
                    window.pJSDom[0].pJS.fn.particlesRefresh();
                }
            }
        });
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
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
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});