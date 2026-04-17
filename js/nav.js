/* ══════════════════════════════════
   NAV.JS — shared page utilities
   Cookie+GA consent, reveal IO,
   image fade-in, mobile menu, etc.
══════════════════════════════════ */

/* ── Google Analytics — load ONLY after consent ── */
function _loadGA() {
  if (window._gaLoaded) return;
  window._gaLoaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src   = 'https://www.googletagmanager.com/gtag/js?id=G-Y4CC6DT5ST';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-Y4CC6DT5ST', { anonymize_ip: true });
}

/* ── Cookie consent init ── */
(function () {
  const consent = localStorage.getItem('nev_cookie_consent');
  const banner  = document.getElementById('cookie-banner');
  if (consent === 'all') {
    if (banner) banner.style.display = 'none';
    _loadGA();
  } else if (consent === 'essential') {
    if (banner) banner.style.display = 'none';
  }
})();

/* ── Accept handler ── */
function acceptCookies(type) {
  const t = type || 'all';
  localStorage.setItem('nev_cookie_consent', t);
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.transition = 'opacity .35s ease, transform .35s ease';
    banner.style.opacity    = '0';
    banner.style.transform  = 'translateX(-50%) translateY(16px)';
    setTimeout(() => { banner.style.display = 'none'; }, 360);
  }
  if (t === 'all') {
    _loadGA();
  }
}

/* ── Reveal — IntersectionObserver ── */
const _revealIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('vis');
    _revealIO.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -55px 0px', threshold: 0.07 });

function _bindReveal() {
  document.querySelectorAll(
    '.reveal, .reveal-up, .reveal-left, .reveal-scale, .reveal-fade'
  ).forEach(el => _revealIO.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  _bindReveal();
  setTimeout(_bindReveal, 650);
});

/* ── Image loaded fade-in + LQIP parent ── */
function _markImgLoaded(img) {
  img.classList.add('loaded');
  const parent = img.closest('.mi, .ccard, .pcard');
  if (parent) parent.classList.add('img-loaded');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img:not([data-src])').forEach(img => {
    if (img.complete && img.naturalWidth > 0) _markImgLoaded(img);
    else {
      img.addEventListener('load',  () => _markImgLoaded(img), { once: true });
      img.addEventListener('error', () => _markImgLoaded(img), { once: true });
    }
  });
});

/* Also catch dynamically injected images (masonry, cars) */
const _imgObserver = new MutationObserver(mutations => {
  mutations.forEach(m => m.addedNodes.forEach(node => {
    if (node.nodeType !== 1) return;
    const imgs = node.matches('img') ? [node] : [...node.querySelectorAll('img')];
    imgs.forEach(img => {
      if (img.dataset.src) return; /* IntersectionObserver handles lazy */
      if (img.complete && img.naturalWidth > 0) _markImgLoaded(img);
      else {
        img.addEventListener('load',  () => _markImgLoaded(img), { once: true });
        img.addEventListener('error', () => _markImgLoaded(img), { once: true });
      }
    });
  }));
});
_imgObserver.observe(document.body, { childList: true, subtree: true });

/* ── Back to top ── */
(function () {
  const btn = document.getElementById('btt-fixed');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 340);
  }, { passive: true });
})();

/* ── Mobile menu ── */
function toggleMenu() {
  const mm  = document.getElementById('mobile-menu');
  const nav = document.getElementById('nav');
  const btn = document.querySelector('.burger');
  const open = mm.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', String(open));
  mm.classList.remove('dark', 'purple', 'aurora');
  if (nav) ['dark','purple','aurora'].forEach(t => {
    if (nav.classList.contains(t)) mm.classList.add(t);
  });
}
function closeMobileMenu() {
  const mm  = document.getElementById('mobile-menu');
  const btn = document.querySelector('.burger');
  if (mm)  mm.classList.remove('open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

/* ── Page-title word reveal ── */
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector(
    '.ph-title,.bea-title,.bf-title,.ele-title,.p911-title,.mp-hero-title,.about-name,.rora-title'
  );
  if (!title) return;
  const walk = node => {
    if (node.nodeType === 3) {
      const words = node.textContent.split(/(\s+)/);
      const frag  = document.createDocumentFragment();
      words.forEach((w, i) => {
        if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
        if (!w) return;
        const wrap  = document.createElement('span');
        wrap.className = 'ph-word';
        const inner = document.createElement('span');
        inner.className = 'pw-inner';
        inner.style.animationDelay = (i * 0.055) + 's';
        inner.textContent = w;
        wrap.appendChild(inner);
        frag.appendChild(wrap);
      });
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === 1 && node.nodeName !== 'STYLE' && node.nodeName !== 'SCRIPT') {
      Array.from(node.childNodes).forEach(walk);
    }
  };
  Array.from(title.childNodes).forEach(walk);
});

/* ── Escape key ── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (typeof lbClose === 'function') {
    const lb = document.getElementById('lb');
    if (lb && lb.classList.contains('open')) lbClose();
  }
  closeMobileMenu();
});

/* ── Page transitions — JS fallback ── */
(function () {
  /* View Transitions API is handled by CSS @view-transition.
     This JS adds a fade-out on link clicks for browsers that
     don't support the API (Firefox, older Safari). */
  if ('startViewTransition' in document) return; /* VT API handles it */

  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    /* Only internal same-origin links */
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || a.target === '_blank') return;

    e.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(function () {
      window.location.href = href;
    }, 230);
  });
})();
