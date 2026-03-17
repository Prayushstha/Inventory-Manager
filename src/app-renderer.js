import './Styles/index.css';
import './Styles/navbar.css';
import './Styles/theme.css';
import './Styles/homepage.css';

import { renderHome, initHome } from './pages/home';
import { renderDashboard } from './pages/dashboard';

const appContent = document.getElementById('app-content');

function navigateTo(page) {
  switch (page) {
    case 'home':
      appContent.innerHTML = renderHome();
      initHome();
      break;
    case 'dashboard':
      appContent.innerHTML = renderDashboard();
      break;
    default:
      appContent.innerHTML = renderHome();
      initHome();
  }

  document.querySelectorAll('.navbar__links a[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
}

document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-page]');
  if (target) {
    e.preventDefault();
    navigateTo(target.dataset.page);
  }
});

navigateTo('home');

const logo = document.querySelector('.navbar__logo');
if (logo) {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    const landingUrl = window.location.href.replace('app_window', 'main_window');
    window.location.href = landingUrl;
  });
}