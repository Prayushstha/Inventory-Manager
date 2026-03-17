import './Styles/index.css';
import './Styles/navbar.css';
import './Styles/theme.css';

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