/* =====================================================
   DOM References
   ===================================================== */

const root = document.documentElement;
const hero = document.getElementById('hero');
const pieceEntrance = document.getElementById('pieceEntrance');

const projectsSection = document.querySelector('.depth-projects');
const projectCards = Array.from(document.querySelectorAll('.depth-project'));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

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

let layoutCache = new Map();

function getLayout(el) {
    if (!layoutCache.has(el)) {
        layoutCache.set(el, {
            rect: el.getBoundingClientRect(),
            height: el.offsetHeight
        });
    }
    return layoutCache.get(el);
}

/* =====================================================
   State and Constants
   ===================================================== */

let ticking = false;

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

    const { rect, height } = getLayout(hero);
    const totalScrollable = height - viewportHeight;

    let progress = 0;
    if (totalScrollable > 0) {
        progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
    }

    root.style.setProperty('--scroll-progress', progress.toFixed(4));
}

function isNearViewport(el, extra = 300) {
    if (!el) return false;
    const { rect } = getLayout(el);
    return rect.bottom >= -extra && rect.top <= viewportHeight + extra;
}

function runFrameUpdates() {
    layoutCache.clear();

    if (hero && isNearViewport(hero, 200)) {
        if (viewportWidth > 767) {       
            updateHeroScroll();
        }
    }

    if (projectsSection && isNearViewport(projectsSection, 300)) {
        animateProjects();
    }

    // Only desktop heavy animations
    if (viewportWidth > 767) {

        if (educationSection && isNearViewport(educationSection, 300)) {
            updateEducationCards();
        }

        if (skillsSection && isNearViewport(skillsSection, 250)) {
            updateSkillsRows();
        }
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

const projectList = projectsSection?.querySelector('.depth-list');
let projectRunway;
let projectNavigation;
let projectPinned = false;

if (projectList && projectCards.length) {
    projectRunway = document.createElement('div');
    projectRunway.className = 'depth-runway';
    projectRunway.style.setProperty('--project-count', projectCards.length);
    projectList.before(projectRunway);
    projectRunway.append(projectList);
    projectNavigation = document.createElement('nav');
    projectNavigation.className = 'depth-navigation';
    projectNavigation.setAttribute('aria-label', 'Choose a project');
    projectCards.forEach((card, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = String(index + 1).padStart(2, '0');
        button.setAttribute('aria-label', card.querySelector('h3').textContent);
        button.addEventListener('click', () => {
            const top = window.scrollY + projectRunway.getBoundingClientRect().top;
            const step = (projectRunway.offsetHeight - projectList.offsetHeight) / projectCards.length;
            window.scrollTo({ top: top + (index + .2) * step, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
        });
        projectNavigation.append(button);
    });
    projectList.append(projectNavigation);
}

function animateProjects() {
    if (!projectRunway) return;
    const pin = !reducedMotion.matches && viewportWidth > 900 && viewportHeight >= 650;
    if (pin !== projectPinned) {
        projectPinned = pin;
        projectsSection.classList.toggle('depth-pinned', pin);
        layoutCache.clear();
    }
    if (pin) {
        const { rect, height } = getLayout(projectRunway);
        const distance = Math.max(1, height - projectList.offsetHeight);
        const progress = clamp(-rect.top / distance, 0, 1) * projectCards.length;
        // Each project rests for 55% of its chapter before the next enters.
        const chapter = Math.floor(progress);
        const transition = easeInOut(clamp((progress - chapter - .55) / .45, 0, 1));
        const position = Math.min(projectCards.length - 1, chapter + transition);
        const active = Math.round(position);
        projectCards.forEach((card, index) => {
            const delta = index - position;
            const visibility = Math.max(0, 1 - Math.abs(delta));
            card.style.opacity = visibility.toFixed(3);
            card.style.visibility = visibility > 0 ? 'visible' : 'hidden';
            card.style.transform = `perspective(1500px) translate3d(${delta * 70}px, ${delta * viewportHeight * .62}px, ${-Math.abs(delta) * 420}px) rotateX(${delta * -12}deg)`;
            card.style.setProperty('--depth-scroll', (delta * 28).toFixed(2) + 'px');
            card.style.zIndex = index === active ? '2' : '1';
            card.inert = index !== active;
            const button = projectNavigation.children[index];
            button.setAttribute('aria-current', String(index === active));
        });
    } else {
        projectCards.forEach(card => {
            card.inert = false;
            card.style.visibility = '';
            card.style.zIndex = '';
            const { rect } = getLayout(card);
            const reveal = reducedMotion.matches ? 1 : easeOutCubic(clamp((viewportHeight - rect.top) / (viewportHeight * .45), 0, 1));
            // Never conceal the focused link during keyboard navigation.
            const visible = card.contains(document.activeElement) ? 1 : reveal;
            card.style.opacity = (.15 + visible * .85).toFixed(3);
            card.style.transform = `translateY(${(1 - visible) * 65}px) scale(${.96 + visible * .04})`;
            card.style.setProperty('--depth-scroll', '0px');
        });
    }
}

projectCards.forEach(card => {
    let pointerFrame = 0;
    card.addEventListener('pointermove', event => {
        if (reducedMotion.matches || !finePointer.matches || viewportWidth <= 900) return;
        cancelAnimationFrame(pointerFrame);
        pointerFrame = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--tilt-y', ((event.clientX - rect.left) / rect.width * 6 - 3).toFixed(2) + 'deg');
            card.style.setProperty('--tilt-x', (3 - (event.clientY - rect.top) / rect.height * 6).toFixed(2) + 'deg');
        });
    });
    card.addEventListener('pointerleave', () => {
        cancelAnimationFrame(pointerFrame);
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
    });
});
reducedMotion.addEventListener('change', scheduleFrameUpdate);
projectsSection?.addEventListener('focusin', scheduleFrameUpdate);

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

    const { rect, height } = getLayout(educationSection);
    const viewportH = viewportHeight;
    const totalScrollable = height - viewportH;
    const passed = clamp(-rect.top, 0, totalScrollable);
    const progress = totalScrollable > 0 ? passed / totalScrollable : 0;

    const stackOffset = viewportWidth <= 900 ? 18 : 28;
    const baseY = viewportWidth <= 900 ? -10 : 10;
    // Center-based transforms need a height correction to align the top edges.
    // Read all heights before writing transforms, including after a resize.
    const cardHeights = educationCards.map(card => card.offsetHeight);
    const anchorHeight = cardHeights[0];

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
        const targetY = baseY + index * stackOffset + (cardHeights[index] - anchorHeight) / 2;
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

    const { rect, height } = getLayout(skillsSection);
    const raw = (viewportHeight - rect.top) / (viewportHeight + height);
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
    document.querySelector('.hero-sticky')?.classList.add('bg-loaded');
    updateViewportMetrics();
    
    requestAnimationFrame(() => {
        if (pieceEntrance) pieceEntrance.classList.add('is-visible');
        runFrameUpdates();
    });
});

window.addEventListener('scroll', scheduleFrameUpdate, { passive: true });

window.addEventListener('resize', () => {
    updateViewportMetrics();
    scheduleFrameUpdate();
});

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
        updateViewportMetrics();
        scheduleFrameUpdate();
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

e.preventDefault();

            const top = window.scrollY + targetEl.getBoundingClientRect().top - getNavbarOffset();

            window.scrollTo({
                top,
                behavior: 'smooth'
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


});
