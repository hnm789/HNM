document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. PRELOADER & INITIAL REVEAL
    ========================================= */
    const preloader = document.getElementById('preloader');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    setTimeout(() => {
        if(preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
        if (heroVisual) {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'scale(1)';
        }
    }, 1200);

    /* =========================================
       2. MAGNETIC CUSTOM CURSOR (CHỈ PC)
    ========================================= */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            if(cursorDot && cursorRing) {
                cursorDot.style.left = e.clientX + 'px';
                cursorDot.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    cursorRing.style.left = e.clientX + 'px';
                    cursorRing.style.top = e.clientY + 'px';
                }, 50);
            }
        });

        const interactables = document.querySelectorAll('.interactable, .interactable-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    /* =========================================
       3. SCROLL ENGINE (NAV, PROGRESS, REVEAL)
    ========================================= */
    const nav = document.getElementById('navbar');
    const progressBar = document.getElementById("progress-bar");
    const revealTargets = document.querySelectorAll('.reveal-target');

    const handleScroll = () => {
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (progressBar) progressBar.style.width = (scrollTop / scrollHeight) * 100 + "%";

        if (nav) {
            if (scrollTop > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }

        revealTargets.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('is-visible');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    /* =========================================
       4. HERO BANNER AUTOMATIC SLIDER
    ========================================= */
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    
    if(slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3500);
    }

    /* =========================================
       5. PORTFOLIO FILTER SYSTEM
    ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.port-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                item.classList.remove('is-visible'); 
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hide');
                        setTimeout(() => item.classList.add('is-visible'), 50);
                    } else {
                        item.classList.add('hide');
                    }
                }, 300);
            });
        });
    });

});