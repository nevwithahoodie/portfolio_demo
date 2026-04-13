/* ══════════════════════════════════
   NAV — ACTIVE STATE AUTO-DETECT
   Sets .active on the correct nav link
   based on the current page filename.
══════════════════════════════════ */
(function () {
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';

  // Sub-pages belong to a parent section
  const parentMap = {
    cansiglio:  'places',       molveno:    'places',
    verona:     'places',       india:      'places',
    miramare:   'places',
    bikerfest:  'portraits',    eleonora:   'portraits',
    aurora:     'portraits',
    beatrice:   'masterpieces', porsche911: 'masterpieces'
  };
  const active = parentMap[page] || page;

  document.querySelectorAll('.nl[data-page]').forEach(el => {
    el.classList.toggle('active', el.dataset.page === active);
  });

  // Apply nav / mobile-menu theme from body class
  const nav = document.getElementById('nav');
  const mm  = document.getElementById('mobile-menu');
  const b   = document.body;
  ['dark', 'gold', 'purple'].forEach(t => {
    if (b.classList.contains('theme-' + t)) {
      nav.classList.add(t);
      mm.classList.add(t);
    }
  });
})();

/* ══════════════════════════════════
   MOBILE MENU
══════════════════════════════════ */
function toggleMenu() {
  const mm  = document.getElementById('mobile-menu');
  const nav = document.getElementById('nav');
  mm.classList.toggle('open');
  mm.classList.remove('dark', 'purple');
  if (nav.classList.contains('dark'))   mm.classList.add('dark');
  if (nav.classList.contains('purple')) mm.classList.add('purple');
}
function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}

/* ══════════════════════════════════
   REVEAL ON SCROLL
══════════════════════════════════ */
function trigReveal() {
  document.querySelectorAll('.reveal:not(.vis)').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50)
      el.classList.add('vis');
  });
}
window.addEventListener('scroll', trigReveal, { passive: true });
document.addEventListener('DOMContentLoaded', trigReveal);

/* ══════════════════════════════════
   BACK TO TOP
══════════════════════════════════ */
(function () {
  const btn = document.getElementById('btt-fixed');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
})();

/* ══════════════════════════════════
   COOKIE
══════════════════════════════════ */
function acceptCookies() {
  localStorage.setItem('cookieAccepted', '1');
  document.getElementById('cookie-banner').style.display = 'none';
  const toast = document.getElementById('cookie-toast');
  const hEl   = toast.querySelector('.ct-hearts');
  toast.classList.add('show');
  const seqs = ['\u2661','\u2665','\u2661','\u2665','\u2661','\u2665'];
  let i = 0;
  const iv = setInterval(() => { hEl.textContent = seqs[i++ % seqs.length]; }, 260);
  setTimeout(() => {
    clearInterval(iv);
    toast.style.transition = 'opacity .4s ease, transform .4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(12px)';
    setTimeout(() => { toast.classList.remove('show'); toast.style.cssText = ''; }, 450);
  }, 2000);
}

/* ══════════════════════════════════
   PAGE TITLE WORD REVEAL (auto on load)
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  const title = document.querySelector(
    '.ph-title, .bea-title, .bf-title, .ele-title, .p911-title, .mp-hero-title, .about-name'
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
        inner.style.animationDelay = (i * 0.06) + 's';
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

/* Hide cookie banner immediately if already accepted */
if (localStorage.getItem('cookieAccepted')) {
  var b = document.getElementById('cookie-banner');
  if (b) b.style.display = 'none';
}
