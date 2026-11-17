(() => {
  const video = document.querySelector('.hero-video');
  if (!video) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const start = () => {
    if (preference.matches) {
      video.pause();
      video.classList.remove('is-ready');
      video.removeAttribute('src');
      video.load();
      return;
    }
    if (!video.getAttribute('src')) video.src = 'assets/escalade-optimized.m4v';
    video.play().then(() => video.classList.add('is-ready')).catch(() => video.classList.remove('is-ready'));
  };
  video.addEventListener('error', () => video.classList.remove('is-ready'));
  if (preference.addEventListener) preference.addEventListener('change', start);
  else if (preference.addListener) preference.addListener(start);
  start();
})();
