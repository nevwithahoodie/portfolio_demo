/* ══════════════════════════════════
   MASONRY BUILDER
   + Intersection Observer lazy load
   + LQIP placeholder fade-up
══════════════════════════════════ */

const _masonryIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const img = entry.target;
    if (img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
      img.addEventListener('load',  () => {
        img.classList.add('loaded');
        const p = img.closest('.mi,.ccard,.pcard');
        if (p) p.classList.add('img-loaded');
      }, { once: true });
      img.addEventListener('error', () => {
        img.classList.add('loaded');
        const p = img.closest('.mi,.ccard,.pcard');
        if (p) p.classList.add('img-loaded');
      }, { once: true });
    }
    _masonryIO.unobserve(img);
  });
}, { rootMargin: '400px 0px' }); /* start loading 400px before visible */

/* Map of label → placeholder color key */
const _PH_MAP = {
  'Beatrice'  : 'portrait',
  'Biker Fest': 'dark',
  'Eleonora'  : 'night',
  'Aurora'    : 'earth',
  'Navpreet Singh': 'portrait',
  'Cansiglio' : 'forest',
  'Molveno'   : 'lake',
  'Verona'    : 'urban',
  'Virasat-e-Khalsa': 'warm',
  'Castello di Miramare': 'warm',
};

function buildMasonry(el, photos, lbl) {
  el.innerHTML = '';
  const ph    = _PH_MAP[lbl] || 'portrait';
  const total = photos.length;

  photos.forEach((src, i) => {
    const d = document.createElement('div');
    d.className = 'mi';
    d.dataset.ph = ph; /* sets --img-ph CSS var for placeholder color */

    const img = document.createElement('img');
    img.dataset.src = src;  /* lazy — real src set by IntersectionObserver */
    img.alt         = lbl + ' \u2014 ' + (i + 1) + '\u00a0/\u00a0' + total;
    img.width       = 800;
    img.height      = 533;
    img.decoding    = 'async';

    const ov    = document.createElement('div');
    ov.className = 'mi-ov';
    const badge = document.createElement('span');
    badge.className   = 'mi-badge';
    badge.textContent = lbl;
    ov.appendChild(badge);

    d.appendChild(img);
    d.appendChild(ov);
    d.addEventListener('click', () => lbOpen(photos, i, lbl));
    el.appendChild(d);

    _masonryIO.observe(img);
  });
}
