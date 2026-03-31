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

/* =====================================================
   Hero Scroll Animation
   ===================================================== */

function updateHeroScroll() {
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const viewportHeight = getViewportHeight();
    const totalScrollable = hero.offsetHeight - viewportHeight;

    let progress = 0;
    if (totalScrollable > 0) {
        progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
    }

    root.style.setProperty('--scroll-progress', progress.toFixed(4));
    ticking = false;
}

function requestHeroUpdate() {
    if (!ticking) {
        window.requestAnimationFrame(updateHeroScroll);
        ticking = true;
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
    const vw = window.innerWidth;
    const vh = window.innerHeight;
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
    card.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotate}deg)`;
    card.style.pointerEvents = opacity > 0.2 ? 'auto' : 'none';
}

function animateProjects() {
    if (window.innerWidth <= 767) return;
    if (!projectsSection || !projectsWord || !projectsBg || !projectCards.length) return;

    const rect = projectsSection.getBoundingClientRect();
    const maxScroll = projectsSection.offsetHeight - window.innerHeight;
    const scrolled = clamp(-rect.top, 0, maxScroll);
    const p = maxScroll > 0 ? scrolled / maxScroll : 0;

    const wordT = clamp(p / 0.28, 0, 1);
    projectsWord.style.transform = `translate3d(0, ${window.innerHeight * 0.50 * easeInOut(wordT)}px, 0)`;

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

    if (window.innerWidth <= 767) {
        educationCards.forEach(card => {
            card.style.zIndex = '';
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
        return;
    }

    const rect = educationSection.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const totalScrollable = educationSection.offsetHeight - viewportH;
    const passed = clamp(-rect.top, 0, totalScrollable);
    const progress = totalScrollable > 0 ? passed / totalScrollable : 0;

    const stackOffset = window.innerWidth <= 900 ? 18 : 28;
    const baseY = window.innerWidth <= 900 ? -10 : 10;

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
    const raw = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    return clamp(raw, 0, 1);
}

function updateSkillsRows() {
    if (window.innerWidth <= 768) return;
    if (!skillsSection || !rowA || !rowB || !rowC) return;

    const p = getSkillsProgress();
    const offset = (p - 0.5) * SKILLS_MOVE * 2;

    rowA.style.transform = `translateX(${-offset}px)`;
    rowB.style.transform = `translateX(${offset}px)`;
    rowC.style.transform = `translateX(${-offset}px)`;
}

/* =====================================================
   Global Animation Hooks
   ===================================================== */

window.addEventListener('load', () => {
    requestAnimationFrame(() => {
        if (pieceEntrance) pieceEntrance.classList.add('is-visible');
        updateHeroScroll();
        animateProjects();
        updateEducationCards();
        updateSkillsRows();
    });
});

window.addEventListener('scroll', () => {
    requestHeroUpdate();
    animateProjects();
    updateEducationCards();
    updateSkillsRows();
}, { passive: true });

window.addEventListener('resize', () => {
    requestHeroUpdate();
    animateProjects();
    updateEducationCards();
    updateSkillsRows();
});

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
        requestHeroUpdate();
        animateProjects();
        updateEducationCards();
        updateSkillsRows();
    });

    window.visualViewport.addEventListener('scroll', () => {
        requestHeroUpdate();
        animateProjects();
        updateEducationCards();
        updateSkillsRows();
    });
}

/* =====================================================
   DOM Ready Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
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
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.textContent = 'Transmission Sent ✓';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = original;
                btn.disabled = false;
                form.reset();
            }, 3000);
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