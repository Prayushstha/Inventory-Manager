import './Styles/landing-index.css';
import './Styles/landing-navbar.css';
import './Styles/landing-theme.css';

const devPhoto = require('./images/Prayush-Shrestha.jpg');
const devPhotoEl = document.getElementById('dev-photo');
if (devPhotoEl) devPhotoEl.src = devPhoto;

const triggers = ['btn-get-started', 'btn-view-dashboard', 'btn-login', 'nav-home', 'nav-dashboard'];

// Derive app_window URL from current main_window URL
// main_window runs at: http://localhost:3000/main_window
// app_window runs at:  http://localhost:3000/app_window
const appUrl = window.location.href.replace('main_window', 'app_window');

triggers.forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = appUrl;
    });
  }
});

// Theme toggle
(function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const sun = document.getElementById('icon-sun');
  const moon = document.getElementById('icon-moon');
  if (!toggle) return;

  function applyIcons() {
    const isLight = document.body.classList.contains('light-theme');
    sun.style.display = isLight ? 'block' : 'none';
    moon.style.display = isLight ? 'none' : 'block';
  }

  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
  }
  applyIcons();

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    applyIcons();
  });
})();

// Scroll-reveal animations for landing page sections
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.feature-card, .doc-block, .dev-card, .cta__inner');
  if (!revealElements.length) return;

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.children).filter(c => revealElements.length === 0 || c.style.opacity === '0');
        const idx = siblings.indexOf(entry.target);
        const delay = Math.max(0, idx) * 80;

        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
})();