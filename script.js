document.addEventListener('DOMContentLoaded', () => {
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
                ? 'rgba(248, 250, 252, 0.9)' 
                : 'rgba(15, 23, 42, 0.9)';
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
});
