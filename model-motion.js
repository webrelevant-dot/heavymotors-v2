(() => {
  const cards = Array.from(document.querySelectorAll('.model-card'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!cards.length || !('IntersectionObserver' in window) || reducedMotion.matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('motion-pending');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -24px 0px' });

  cards.forEach((card, index) => {
    card.style.setProperty('--reveal-delay', `${Math.min(index * 90, 180)}ms`);
    card.classList.add('motion-pending');
    observer.observe(card);
  });

  const showAll = (event) => {
    if (!event.matches) return;
    observer.disconnect();
    cards.forEach((card) => card.classList.remove('motion-pending'));
  };
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', showAll);
  else if (reducedMotion.addListener) reducedMotion.addListener(showAll);
})();
