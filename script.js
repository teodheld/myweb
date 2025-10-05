// script.js
const THEME_KEY = 'theme-preference';
const toggleBtn = document.getElementById('toggle');

// Setter tema og knappetekst
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    if (toggleBtn) toggleBtn.textContent = 'Bytt til lyst tema ☀️';
  } else {
    document.body.classList.remove('dark');
    if (toggleBtn) toggleBtn.textContent = 'Bytt til mørkt tema 🌙';
  }
}

// Les valgt tema fra localStorage, eller bruk systemvalg hvis ikke satt
function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// Klokke-funksjon (samme som tidligere)
function updateClock() {
  const now = new Date();
  const formatted = now.toLocaleString('no-NO', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const el = document.getElementById('clock');
  if (el) el.textContent = `📅 ${formatted}`;
}

// Init (vent til DOM er ferdig)
document.addEventListener('DOMContentLoaded', () => {
  // Sett tema ved last
  let theme = getInitialTheme();
  applyTheme(theme);

  // Koble toggle (hvis knapp finnes på siden)
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      theme = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(theme);
      localStorage.setItem(THEME_KEY, theme);
    });
  }

  // Klokke
  updateClock();
  setInterval(updateClock, 1000);
});