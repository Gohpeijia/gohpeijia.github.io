document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  let saved;
  try { saved = localStorage.getItem('theme'); } catch {}
  const setTheme = theme => {
    root.dataset.theme = theme;
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  };
  setTheme(saved === 'dark' ? 'dark' : 'light');
  toggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('theme', theme); } catch {}
  });
  const buttons = document.querySelectorAll('.term-btn');
  buttons.forEach(button => {
    button.setAttribute('aria-controls', button.dataset.target);
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', () => {
      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
        document.getElementById(item.dataset.target).classList.toggle('hidden', !active);
      });
    });
  });
});
