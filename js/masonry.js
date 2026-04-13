/* ══════════════════════════════════
   MASONRY BUILDER + INTERSECTION OBSERVER
   Le immagini si caricano solo quando
   entrano nel viewport (lazy real).
══════════════════════════════════ */
const _masonryIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const img = entry.target;
    if (img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
    _masonryIO.unobserve(img);
  });
}, { rootMargin: '300px 0px' }); /* inizia a caricare 300px prima */

function buildMasonry(el, photos, lbl) {
  el.innerHTML = '';
  const total = photos.length;

  photos.forEach((src, i) => {
    const d   = document.createElement('div');
    d.className = 'mi';

    const img = document.createElement('img');
    img.dataset.src = src;                      /* lazy: non src subito */
    img.alt         = lbl + ' \u2014 ' + (i + 1) + '\u00a0/\u00a0' + total;
    img.width       = 800;                      /* hint al browser */
    img.height      = 533;
    img.decoding    = 'async';

    const ov  = document.createElement('div');
    ov.className = 'mi-ov';
    const badge = document.createElement('span');
    badge.className   = 'mi-badge';
    badge.textContent = lbl;
    ov.appendChild(badge);

    d.appendChild(img);
    d.appendChild(ov);
    d.addEventListener('click', () => lbOpen(photos, i, lbl));
    el.appendChild(d);

    _masonryIO.observe(img); /* registra ogni immagine nell'observer */
  });
}
