document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    // Trigger each element as it crosses roughly the upper-middle of the
    // viewport, instead of requiring a centered band — works for both
    // single paragraphs and full-width card grids without tall spacers.
    rootMargin: '0px 0px -30% 0px',
    threshold: 0
  });

  revealEls.forEach((el) => observer.observe(el));
});
