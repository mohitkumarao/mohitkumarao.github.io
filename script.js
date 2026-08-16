'use strict';

const TYPING_STRINGS = [
  'scalable backends.',
  'Spring Boot apps.',
  'clean RESTful APIs.',
  'Java applications.',
  'fast, clean code.',
];

let typeIdx    = 0;
let charIdx    = 0;
let isDeleting = false;
const TYPING_SPEED   = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER    = 2200;
const PAUSE_BEFORE   = 400;

const typingEl = document.getElementById('typing-text');

function typeLoop() {
  const current = TYPING_STRINGS[typeIdx];

  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
  } else {
    typingEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
  }

  if (!isDeleting && charIdx === current.length) {
    isDeleting = true;
    setTimeout(typeLoop, PAUSE_AFTER);
    return;
  }

  if (isDeleting && charIdx === 0) {
    isDeleting = false;
    typeIdx = (typeIdx + 1) % TYPING_STRINGS.length;
    setTimeout(typeLoop, PAUSE_BEFORE);
    return;
  }

  setTimeout(typeLoop, isDeleting ? DELETING_SPEED : TYPING_SPEED);
}

const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 48);
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

const allNavLinks = document.querySelectorAll('.nav-link');
const allSections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      allNavLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isActive);
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

allSections.forEach((sec) => sectionObserver.observe(sec));

const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.08 }
);

revealEls.forEach((el) => revealObserver.observe(el));

const scrollIndicator = document.getElementById('scroll-indicator');

function handleScrollIndicator() {
  if (!scrollIndicator) return;
  scrollIndicator.style.opacity = window.scrollY > 80 ? '0' : '1';
}

window.addEventListener('scroll', handleScrollIndicator, { passive: true });

const hamburger       = document.getElementById('hamburger');
const mobileNavLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNavLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

mobileNavLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNavLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (e) => {
  if (
    mobileNavLinks.classList.contains('open') &&
    !mobileNavLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    mobileNavLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

const mockup = document.querySelector('.project-mockup');

if (mockup) {
  const parent = mockup.parentElement;

  parent.addEventListener('mousemove', (e) => {
    const rect = parent.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
    mockup.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    mockup.style.boxShadow = `
      ${-x * 2}px ${y * 2}px 40px rgba(0,0,0,0.5),
      0 0 60px rgba(14,165,233,0.18)
    `;
  });

  parent.addEventListener('mouseleave', () => {
    mockup.style.transform = '';
    mockup.style.boxShadow = '';
  });
}

document.querySelectorAll('.skill-tag, .tech-chip').forEach((tag) => {
  tag.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      background: rgba(14,165,233,0.25);
      transform: scale(0);
      animation: ripple-anim 0.5s linear;
      pointer-events: none;
      top: ${e.offsetY - 30}px;
      left: ${e.offsetX - 30}px;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-anim {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    requestAnimationFrame(() => {
      setTimeout(() => heroContent.classList.add('revealed'), 80);
    });
  }

    setTimeout(typeLoop, 900);

    handleNavbarScroll();
  handleScrollIndicator();
});
