import '../app.css';
import App from './components/App.svelte';
import SpotifyBody from './components/SpotifyBody.svelte';

const spotify = new SpotifyBody({
  target: document.getElementById('spotify-body')
});

const app = new App({
    target: document.getElementById('header'),
  })

const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;
const header = document.getElementById('header-div');
const leftHeader = document.getElementById('left-header');
const rightHeader = document.getElementById('right-header');
const logo = document.getElementById('logo');
const logoDark = document.getElementById('logo-dark');

if (localStorage.getItem('dark-mode') === 'true') {
  body.classList.add('dark-mode');
  header.classList.add('dark-mode');
  leftHeader.classList.add('dark-mode');
  rightHeader.classList.add('dark-mode');
  logoDark.classList.add('dark-mode');
  logo.classList.add('dark-mode');
  toggleButton.textContent = 'Light Mode';
} else {
  body.classList.remove('dark-mode');
  header.classList.remove('dark-mode');
  leftHeader.classList.remove('dark-mode');
  rightHeader.classList.remove('dark-mode');
  logoDark.classList.remove('dark-mode');
  logo.classList.remove('dark-mode');
  toggleButton.textContent = 'Dark Mode';
}

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  header.classList.toggle('dark-mode');
  leftHeader.classList.toggle('dark-mode');
  rightHeader.classList.toggle('dark-mode');
  logoDark.classList.toggle('dark-mode');
  logo.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    toggleButton.textContent = 'Light Mode';
    localStorage.setItem('dark-mode', 'true');
  } else {
    toggleButton.textContent = 'Dark Mode';
    localStorage.setItem('dark-mode', 'false');
  }
});


export default spotify;