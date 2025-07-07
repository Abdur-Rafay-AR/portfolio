document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Implementation
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    let mouseX = 0;
    let mouseY = 0;
    let trailDots = [];
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor position
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Create trail dots
        createTrailDot(mouseX, mouseY);
    });
    
    // Create trail effect
    function createTrailDot(x, y) {
        const trailDot = document.createElement('div');
        trailDot.className = 'trail-dot';
        trailDot.style.left = x + 'px';
        trailDot.style.top = y + 'px';
        cursorTrail.appendChild(trailDot);
        
        // Remove trail dot after animation
        setTimeout(() => {
            if (trailDot.parentNode) {
                trailDot.parentNode.removeChild(trailDot);
            }
        }, 800);
    }
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .skill-item, .cta-button, .btn-primary, .btn-secondary, .filter-btn, .hamburger, .logo, .theme-toggle');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
        
        element.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        
        element.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Show cursor when mouse enters window
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    // Theme toggle functionality
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(themeToggle);

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update header background immediately after theme change
        updateHeaderBackground();
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    // Enhanced smooth scrolling with easing
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 32;
                
                // Smooth scroll with custom easing
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let start = null;
                
                function smoothScroll(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeInOutCubic = percentage < 0.5 
                        ? 4 * percentage * percentage * percentage 
                        : (percentage - 1) * (2 * percentage - 2) * (2 * percentage - 2) + 1;
                    
                    window.scrollTo(0, startPosition + distance * easeInOutCubic);
                    
                    if (progress < duration) {
                        requestAnimationFrame(smoothScroll);
                    }
                }
                
                requestAnimationFrame(smoothScroll);
            }
        });
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.animated-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section becomes visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Enhanced header scroll effect with theme-aware background
    const header = document.querySelector('header');
    let lastScrollY = window.pageYOffset;
    let isScrolling = false;

    function updateHeaderBackground() {
        const currentScrollY = window.pageYOffset;
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        
        if (currentScrollY > 50) {
            header.style.background = isLight 
                ? 'rgba(248, 250, 252, 0.95)' 
                : 'rgba(15, 23, 42, 0.95)';
            header.style.backdropFilter = 'blur(20px) saturate(180%)';
        } else {
            header.style.background = isLight 
                ? 'rgba(248, 250, 252, 0.8)' 
                : 'rgba(15, 23, 42, 0.8)';
            header.style.backdropFilter = 'blur(20px)';
        }
    }

    function handleScroll() {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                updateHeaderBackground();
                lastScrollY = window.pageYOffset;
                isScrolling = false;
            });
            isScrolling = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Skill bars animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
                bar.style.setProperty('--progress-width', `${progress}%`);
                bar.classList.add('animate');
                
                // Set width directly for browsers that don't support CSS custom properties in animations
                setTimeout(() => {
                    bar.style.width = `${progress}%`;
                }, 100);
            }
        });
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Hero section text display (no typewriter effect)
    const heroText = document.querySelector('.hero-content h1');
    if (heroText) {
        // Text is already displayed with highlights from HTML
        // No additional JavaScript needed for text display
    }

    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.shape');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Mobile menu toggle (if implementing mobile menu)
    const hamburger = document.querySelector('.hamburger');
    const mobileNavLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileNavLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateScrollEffects() {
        updateHeaderBackground();
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    // Replace the existing scroll listener
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', requestTick, { passive: true });

    // Preload critical images
    const criticalImages = [
        'assets/pfp.jpg',
        'assets/python.svg',
        'assets/flask.svg',
        'assets/mysql.svg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Service Worker registration (if available)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    }
});
