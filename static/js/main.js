/* =====================================================
   DOM References
   ===================================================== */

const root = document.documentElement;
const hero = document.getElementById('hero');
const pieceEntrance = document.getElementById('pieceEntrance');

const projectsSection = document.querySelector('.projects-scroll');
const projectsWord = document.querySelector('.projects-word');
const projectsBg = document.querySelector('.projects-bg');
const projectCards = Array.from(document.querySelectorAll('.project-card'));

const skillsSection = document.getElementById('skills');
const rowA = document.getElementById('rowA');
const rowB = document.getElementById('rowB');
const rowC = document.getElementById('rowC');

const mobileNavToggle = document.getElementById('mobileNavToggle');
const mobileNavPanel = document.getElementById('mobileNavPanel');
const mobileNavLinks = mobileNavPanel
    ? Array.from(mobileNavPanel.querySelectorAll('.mobile-nav-link'))
    : [];

const educationSection = document.getElementById('education');
const educationCards = Array.from(document.querySelectorAll('.education-card'));

const mobileChipsWrap = document.getElementById('mobileChips');
const mobileChips = mobileChipsWrap
    ? Array.from(mobileChipsWrap.querySelectorAll('.tech-chip'))
    : [];

/* =====================================================
   State and Constants
   ===================================================== */

let ticking = false;

const CARDS_START = 0.18;
const CARDS_END = 0.80;
const SKILLS_MOVE = 180;

let viewportWidth = window.innerWidth;
let viewportHeight = getViewportHeight();

/* =====================================================
   Utility Functions
   ===================================================== */

function getViewportHeight() {
    return window.visualViewport ? window.visualViewport.height : window.innerHeight;
}

function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function updateViewportMetrics() {
    viewportWidth = window.innerWidth;
    viewportHeight = getViewportHeight();
}

/* =====================================================
   Hero Scroll Animation
   ===================================================== */

function updateHeroScroll() {
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const totalScrollable = hero.offsetHeight - viewportHeight;

    let progress = 0;
    if (totalScrollable > 0) {
        progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
    }

    root.style.setProperty('--scroll-progress', progress.toFixed(4));
}

function isNearViewport(el, extra = 300) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.bottom >= -extra && rect.top <= viewportHeight + extra;
}

function runFrameUpdates() {
    updateViewportMetrics();

    if (isNearViewport(hero, 200)) {
        updateHeroScroll();
    }

    if (isNearViewport(projectsSection, 300)) {
        animateProjects();
    }

    if (isNearViewport(educationSection, 300)) {
        updateEducationCards();
    }

    if (isNearViewport(skillsSection, 250)) {
        updateSkillsRows();
    }

    ticking = false;
}

function scheduleFrameUpdate() {
    if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(runFrameUpdates);
    }
}

/* =====================================================
   Projects Scroll Animation
   ===================================================== */

function cardT(p, i) {
    const totalWindow = CARDS_END - CARDS_START;
    const step = totalWindow / (projectCards.length + 1.8);
    const dur = step * 3.6;
    const start = CARDS_START + i * step;
    return clamp((p - start) / dur, 0, 1);
}

function positionCard(card, t) {
    const vw = viewportWidth;
    const vh = viewportHeight;
    const et = easeInOut(t);

    const startX = vw * 0.52;
    const endX = -vw * 0.52;
    const x = lerp(startX, endX, et);

    const bottomOffset = vh * 0.28;
    const arc = 1 - 4 * Math.pow(t - 0.5, 2);
    const y = bottomOffset * (1 - arc) - vh * 0.24;

    const rotate = lerp(22, -22, et);

    let opacity = 1;
    if (t < 0.12) opacity = t / 0.12;
    if (t > 0.88) opacity = (1 - t) / 0.12;
    opacity = clamp(opacity, 0, 1);

    card.style.opacity = opacity;
    card.style.transform = `translate3d(calc(-50% + ${Math.round(x)}px), calc(-50% + ${Math.round(y)}px), 0) rotate(${rotate}deg)`;
    card.style.pointerEvents = opacity > 0.2 ? 'auto' : 'none';
}

function animateProjects() {
    if (viewportWidth <= 767) return;
    if (!projectsSection || !projectsWord || !projectsBg || !projectCards.length) return;

    const rect = projectsSection.getBoundingClientRect();
    const maxScroll = projectsSection.offsetHeight - viewportHeight;
    const scrolled = clamp(-rect.top, 0, maxScroll);
    const p = maxScroll > 0 ? scrolled / maxScroll : 0;

    const wordT = clamp(p / 0.28, 0, 1);
    projectsWord.style.transform = `translate3d(0, ${viewportHeight * 0.50 * easeInOut(wordT)}px, 0)`;

    projectCards.forEach((card, i) => positionCard(card, cardT(p, i)));

    const endP = clamp((p - CARDS_END) / (1 - CARDS_END), 0, 1);
    projectsBg.style.opacity = 1;
    projectsBg.style.transform = `scale(${1.08 - endP * 0.08})`;
    projectsWord.style.opacity = 1;
}

/* =====================================================
   Education Stack Animation
   ===================================================== */

function updateEducationCards() {
    if (!educationSection || !educationCards.length) return;

    if (viewportWidth <= 767) {
        educationCards.forEach(card => {
            card.style.zIndex = '';
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
        return;
    }

    const rect = educationSection.getBoundingClientRect();
    const viewportH = viewportHeight;
    const totalScrollable = educationSection.offsetHeight - viewportH;
    const passed = clamp(-rect.top, 0, totalScrollable);
    const progress = totalScrollable > 0 ? passed / totalScrollable : 0;

    const stackOffset = viewportWidth <= 900 ? 18 : 28;
    const baseY = viewportWidth <= 900 ? -10 : 10;

    educationCards.forEach((card, index) => {
        const startSegment = index / educationCards.length;
        const endSegment = (index + 1) / educationCards.length;

        let local = 0;

        if (index === 0) {
            local = 1;
        } else {
            local = clamp((progress - startSegment) / (endSegment - startSegment), 0, 1);
            local = easeOutCubic(local);
        }

        const startY = viewportH * 0.95 + index * 40;
        const targetY = baseY + index * stackOffset;
        const currentY = index === 0 ? targetY : lerp(startY, targetY, local);

        const scale = index === 0 ? 1 : lerp(0.96, 1, local);
        const rotate = index === 0 ? 0 : lerp(5, 0, local);
        const opacity = index === 0 ? 1 : lerp(0.35, 1, local);

        card.style.zIndex = 10 + index;
        card.style.opacity = opacity;
        card.style.transform = `translate(-50%, calc(-50% + ${currentY}px)) scale(${scale}) rotate(${rotate}deg)`;
    });
}

/* =====================================================
   Skills Row Animation
   ===================================================== */

function getSkillsProgress() {
    if (!skillsSection) return 0;

    const rect = skillsSection.getBoundingClientRect();
    const raw = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    return clamp(raw, 0, 1);
}

function updateSkillsRows() {
    if (viewportWidth <= 768) return;
    if (!skillsSection || !rowA || !rowB || !rowC) return;

    const p = getSkillsProgress();
    const offset = (p - 0.5) * SKILLS_MOVE * 2;

    rowA.style.transform = `translate3d(${Math.round(-offset)}px, 0, 0)`;
    rowB.style.transform = `translate3d(${Math.round(offset)}px, 0, 0)`;
    rowC.style.transform = `translate3d(${Math.round(-offset)}px, 0, 0)`;
}

/* =====================================================
   Global Animation Hooks
   ===================================================== */

window.addEventListener('load', () => {
    requestAnimationFrame(() => {
        if (pieceEntrance) pieceEntrance.classList.add('is-visible');
        runFrameUpdates();
    });
});

window.addEventListener('scroll', () => {
    scheduleFrameUpdate();
}, { passive: true });

window.addEventListener('resize', () => {
    scheduleFrameUpdate();
});

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
        scheduleFrameUpdate();
    });

    window.visualViewport.addEventListener('scroll', () => {
        scheduleFrameUpdate();
    });
}

/* =====================================================
   DOM Ready Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    let recaptchaScriptLoaded = false;

    function loadRecaptchaScript() {
        if (recaptchaScriptLoaded) return;

        recaptchaScriptLoaded = true;

        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }

    const contactSectionEl = document.getElementById('contact');
    if (contactSectionEl) {
        const recaptchaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadRecaptchaScript();
                    recaptchaObserver.disconnect();
                }
            });
        }, {
            rootMargin: '300px 0px'
        });

        recaptchaObserver.observe(contactSectionEl);
    }    
    /* Logo link scroll-to-top */

    const logoLink = document.querySelector('nav > a[href="#hero"]');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* Desktop navigation active state */

    const sections = Array.from(document.querySelectorAll('#hero, #projects, #studies, #skills, #education'));
    const navLinks = Array.from(document.querySelectorAll('nav div a[href^="#"]'));
    const mobileMenuSectionLinks = Array.from(document.querySelectorAll('.mobile-nav-link[href^="#"]'));
    const smoothScrollLinks = [...navLinks, ...mobileMenuSectionLinks];

    function getNavbarOffset() {
        const nav = document.querySelector('nav');
        return nav ? nav.offsetHeight + 24 : 100;
    }

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetEl = document.querySelector(targetId);

            if (!targetEl) return;

            // Άφησε το ειδικό mobile logic για το Projects να συνεχίσει να δουλεύει
            if (window.innerWidth <= 767 && targetId === '#projects') {
                return;
            }

            e.preventDefault();

            const top = window.scrollY + targetEl.getBoundingClientRect().top - getNavbarOffset();

            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetEl = document.querySelector(targetId);

            if (!targetEl) return;

            e.preventDefault();
            targetEl.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    function setActiveNav(id) {
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;

            link.classList.toggle('text-[#00e5ff]', isActive);
            link.classList.toggle('font-bold', isActive);
            link.classList.toggle('border-b', isActive);
            link.classList.toggle('border-[#00e5ff]/50', isActive);

            link.classList.toggle('text-[#e5e2e1]/70', !isActive);
        });
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveNav(entry.target.id);
                }
            });
        },
        {
            threshold: 0,
            rootMargin: '-45% 0px -45% 0px'
        }
    );

    sections.forEach(section => observer.observe(section));

    /* Contact form feedback */

    const form = document.querySelector('#contact form');
    if (form) {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                form.reportValidity();
                return;
            }

            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<span>Sending...</span><span class="contact-button-icon">↗</span>';
            }
        });
    }

    /* Mobile skills chips */

    if (mobileChipsWrap && mobileChips.length) {
        const chipObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mobileChips.forEach((chip, i) => {
                        setTimeout(() => chip.classList.add('chip-visible'), i * 55);
                    });
                    chipObserver.disconnect();
                }
            });
        }, { threshold: 0.2 });

        chipObserver.observe(mobileChipsWrap);

        mobileChips.forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('chip-active');
            });
        });
    }

    /* Mobile navigation */

    if (mobileNavToggle && mobileNavPanel) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = mobileNavPanel.classList.toggle('is-open');
            mobileNavToggle.classList.toggle('is-open', isOpen);
            mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavPanel.classList.remove('is-open');
                mobileNavToggle.classList.remove('is-open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                mobileNavPanel.classList.remove('is-open');
                mobileNavToggle.classList.remove('is-open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* Mobile projects anchor override */

    const allProjectsLinks = Array.from(document.querySelectorAll('a[href="#projects"]'));
    const mobileProjectsSection = document.getElementById('projects-mobile');

    allProjectsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 767 && mobileProjectsSection) {
                e.preventDefault();
                mobileProjectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});