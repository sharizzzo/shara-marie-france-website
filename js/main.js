document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initStages();
  initJumpBar();
});

/* Scroll-reveal: any .reveal element fades up once it crosses the
   upper-middle of the viewport. */
function initReveal() {
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
}

/* services.html, How I Work: each .stage is a card with a real <button>
   (.stage-toggle) that opens its detail panel. One stage open at a time.
   The open stage also tells the iceberg which part to highlight, through
   data-active on .how-i-work-grid. Without JavaScript every panel is just
   visible (the CSS only collapses panels under html.js). */
function initStages() {
  const stages = Array.from(document.querySelectorAll('.stage'));
  if (!stages.length) return;

  const grid = document.querySelector('.how-i-work-grid');

  const setOpen = (stage, open) => {
    stage.classList.toggle('is-open', open);
    const toggle = stage.querySelector('.stage-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  };

  const syncIceberg = () => {
    if (!grid) return;
    const openStage = stages.find((s) => s.classList.contains('is-open'));
    if (openStage) {
      grid.dataset.active = openStage.dataset.stage;
    } else {
      delete grid.dataset.active;
    }
  };

  stages.forEach((stage) => {
    const toggle = stage.querySelector('.stage-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const willOpen = !stage.classList.contains('is-open');
      stages.forEach((s) => setOpen(s, false));
      if (willOpen) setOpen(stage, true);
      syncIceberg();
    });
  });

  // The markup marks Understand as open; make aria-expanded match.
  stages.forEach((s) => setOpen(s, s.classList.contains('is-open')));
  syncIceberg();
}

/* services.html, "Jump to" bar: mark the link for the section currently in
   view with aria-current="true" (styled as a gold underline). An
   IntersectionObserver watches a thin band just below the sticky header
   (and, from 900px, the sticky Jump-to bar). Cards that sit side by side
   would both be "in view" at once; the one the visitor jumped to wins,
   otherwise the first. */
function initJumpBar() {
  const links = Array.from(document.querySelectorAll('.jump-link'));
  if (!links.length) return;

  const targets = links
    .map((link) => ({ link, el: document.getElementById(link.getAttribute('href').slice(1)) }))
    .filter((t) => t.el);
  if (!targets.length) return;

  const inBand = new Set();
  let preferred = null;
  let holdUntil = 0;

  const setActive = (link) => {
    links.forEach((l) => {
      if (l === link) {
        l.setAttribute('aria-current', 'true');
      } else {
        l.removeAttribute('aria-current');
      }
    });
  };

  const atBottom = () =>
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

  const pick = () => {
    // While a click is still scrolling the page, keep the clicked link.
    if (Date.now() < holdUntil) return;
    // At the very bottom the last section can't scroll up into the band
    // (the page just ends), so it counts as the current one.
    if (atBottom()) {
      setActive(targets[targets.length - 1].link);
      return;
    }
    const candidates = targets.filter((t) => inBand.has(t.el));
    if (candidates.length) {
      const chosen = candidates.find((t) => t.el === preferred) || candidates[0];
      setActive(chosen.link);
      return;
    }
    // Above the first section (top of the page): nothing is highlighted.
    if (targets[0].el.getBoundingClientRect().top > window.innerHeight * 0.3) {
      setActive(null);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        inBand.add(entry.target);
      } else {
        inBand.delete(entry.target);
      }
    });
    pick();
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  targets.forEach((t) => observer.observe(t.el));

  // Reaching or leaving the bottom of the page changes nothing the observer
  // can see, so check for that on scroll (throttled).
  let wasBottom = false;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.setTimeout(() => {
      ticking = false;
      if (atBottom() !== wasBottom) {
        wasBottom = atBottom();
        pick();
      }
    }, 80);
  }, { passive: true });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const t = targets.find((x) => x.link === link);
      preferred = t ? t.el : null;
      setActive(link);
      holdUntil = Date.now() + 1000;
      window.setTimeout(pick, 1050);
    });
  });

  // Arriving with a #hash (e.g. from the homepage button): honor it.
  const fromHash = targets.find((t) => '#' + t.el.id === window.location.hash);
  if (fromHash) {
    preferred = fromHash.el;
    setActive(fromHash.link);
    holdUntil = Date.now() + 1000;
    window.setTimeout(pick, 1050);
  }
}
