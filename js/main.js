/* Fahim Ahmad Portfolio v2 — main.js */

/* ── Navbar scroll state ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Hamburger / mobile nav ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ── CV dropdown (all instances) ── */
function setupDropdown(triggerId, dropdownId) {
  const trigger  = document.getElementById(triggerId);
  const dropdown = document.getElementById(dropdownId);
  if (!trigger || !dropdown) return;

  const wrap = trigger.closest('.cv-dropdown-wrap');

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const open = wrap.classList.toggle('open');
    trigger.setAttribute('aria-expanded', open);
  });

  dropdown.addEventListener('click', e => e.stopPropagation());
}

setupDropdown('cv-trigger',      'cv-dropdown');
setupDropdown('hero-cv-trigger', 'hero-cv-dropdown');

document.addEventListener('click', () => {
  document.querySelectorAll('.cv-dropdown-wrap.open').forEach(wrap => {
    wrap.classList.remove('open');
    const btn = wrap.querySelector('[aria-expanded]');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.cv-dropdown-wrap.open').forEach(wrap => {
      wrap.classList.remove('open');
      const btn = wrap.querySelector('[aria-expanded]');
      if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
  }
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll(
  '.glass-card, .stat-tile, .project-card, .timeline-card, .cert-card, .award-item, .skill-group, .js-metric, .pub-card, .edu-card'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
  revealObserver.observe(el);
});

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
