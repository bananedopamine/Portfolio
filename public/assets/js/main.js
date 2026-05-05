// ─── Navigation mobile ───────────────────────────────────────────────────────
const burger = document.getElementById('navBurger');
const navList = document.getElementById('navList');

if (burger && navList) {
  burger.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('nav--open');
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  // Fermer au clic sur un lien
  navList.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('nav--open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Fermer en cliquant dehors
  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('nav--open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ─── Animation barres de compétences ─────────────────────────────────────────
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-item__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { bar.style.width = width; });
        });
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  bars.forEach(bar => observer.observe(bar));
}

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.timeline__card, .card, .mission-card, .article-card, .quick-nav__card');
  if (!els.length || !window.IntersectionObserver) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${i * 40}ms`;
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Injecter les styles de reveal
  if (!document.getElementById('reveal-styles')) {
    const style = document.createElement('style');
    style.id = 'reveal-styles';
    style.textContent = `
      .timeline__card, .card, .mission-card, .article-card, .quick-nav__card {
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .reveal-in {
        opacity: 1 !important;
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  els.forEach(el => observer.observe(el));
}

// ─── Ambiance mouse parallax ──────────────────────────────────────────────────
function initAmbientParallax() {
  const ambient = document.querySelector('.ambient');
  if (!ambient) return;

  let ticking = false;
  document.addEventListener('mousemove', e => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      ambient.style.transform = `translate(${x}px, ${y}px)`;
      ticking = false;
    });
    ticking = true;
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  animateSkillBars();
  initScrollReveal();
  initAmbientParallax();
});
