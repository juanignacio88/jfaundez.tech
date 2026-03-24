document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                
                // If it contains bars, trigger their animation
                const bars = entry.target.querySelectorAll('.bar');
                if (bars.length > 0) {
                    bars.forEach((bar, index) => {
                        bar.style.animation = `growBar 1s ease-out forwards ${index * 0.2}s`;
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service sections
    const serviceSections = document.querySelectorAll('.service-section .service-text, .service-section .service-visual, .ai-feature-card, .section-header');
    serviceSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        section.classList.add('wait-for-scroll');
        
        animateOnScroll.observe(section);
    });

    // Add a class when intersected
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.wait-for-scroll').forEach(el => {
            if (el.classList.contains('animate-fadeInUp')) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Parallax effect for hero background
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        if(heroBg && scrollPos < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollPos * 0.4}px)`;
        }
    });

    // Pulse effect for tech badges on hover
    const badges = document.querySelectorAll('.tech-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.05)';
        });
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'scale(1)';
        });
    });

    // Contact Panel Toggle
    const contactPanel = document.getElementById('contact-panel');
    const closeContactBtn = document.getElementById('close-contact-panel');
    const contactTriggers = document.querySelectorAll('.btn-contact-trigger');

    contactTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            contactPanel.classList.add('active');
        });
    });

    if (closeContactBtn) {
        closeContactBtn.addEventListener('click', () => {
            contactPanel.classList.remove('active');
        });
    }
});
