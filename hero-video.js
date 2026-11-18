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
    if (!video.getAttribute('src')) video.src = 'assets/escalade-fast.mp4';
    video.play().then(() => {
      const reveal = () => {
        if (!preference.matches && !video.paused && video.readyState >= 2) {
          video.classList.add('is-ready');
        }
      };
      // Keep the still visible until a real video frame can be displayed.
      if ('requestVideoFrameCallback' in video) video.requestVideoFrameCallback(reveal);
      else requestAnimationFrame(reveal);
    }).catch(() => video.classList.remove('is-ready'));
  };
  video.addEventListener('error', () => video.classList.remove('is-ready'));
  if (preference.addEventListener) preference.addEventListener('change', start);
  else if (preference.addListener) preference.addListener(start);
  start();
})();
