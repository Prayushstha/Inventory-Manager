import './Styles/theme.css';
import './Styles/index.css';
import './Styles/navbar.css';
import './Styles/homepage.css'; 
import './Styles/landing-navbar.css'

import { renderDashboard, initDashboard } from './pages/dashboard';
import { renderProducts, initProducts } from './pages/products';
import { renderSales, initSales } from './pages/sales';
import { renderCustomers, initCustomers } from './pages/customers';
import { renderSuppliers, initSuppliers } from './pages/suppliers';
import { renderReports, initReports } from './pages/reports';
import { store } from './store.js';

const appContent = document.getElementById('app-content');
const pageTitle = document.getElementById('page-title');

function navigateTo(page) {
  // Clear any existing content or event listeners if necessary
  appContent.classList.remove('page-enter');
  appContent.innerHTML = '';
  // Trigger reflow so the animation replays
  void appContent.offsetWidth;
  appContent.classList.add('page-enter');

  switch (page) {
    case 'dashboard':
      pageTitle.textContent = 'Dashboard';
      appContent.innerHTML = renderDashboard();
      if(initDashboard) initDashboard();
      break;
    case 'products':
      pageTitle.textContent = 'Products';
      appContent.innerHTML = renderProducts();
      if(initProducts) initProducts();
      break;
    case 'sales':
      pageTitle.textContent = 'Sales';
      appContent.innerHTML = renderSales();
      if(initSales) initSales();
      break;
    case 'customers':
      pageTitle.textContent = 'Customers';
      appContent.innerHTML = renderCustomers();
      if(initCustomers) initCustomers();
      break;
    case 'suppliers':
      pageTitle.textContent = 'Suppliers';
      appContent.innerHTML = renderSuppliers();
      if(initSuppliers) initSuppliers();
      break;
    case 'reports':
      pageTitle.textContent = 'Reports';
      appContent.innerHTML = renderReports();
      if(initReports) initReports();
      break;
    default:
      pageTitle.textContent = 'Dashboard';
      appContent.innerHTML = renderDashboard();
      if(initDashboard) initDashboard();
      page = 'dashboard';
  }

  // Update active state in sidebar
  document.querySelectorAll('.sidebar__nav .sidebar__link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
}

// Global click delegation for navigation
document.addEventListener('click', (e) => {
  const target = e.target.closest('a[data-page]');
  if (target) {
    e.preventDefault();
    navigateTo(target.dataset.page);
  }
});

// Initialize data and routing
store.init();
navigateTo('dashboard');

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

  // On load: read persisted preference
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