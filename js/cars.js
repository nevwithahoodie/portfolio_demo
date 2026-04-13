/* ══════════════════════════════════
   CARS
══════════════════════════════════ */
let _carFilter = 'all';

function initCars() {
  const loader  = document.getElementById('cars-loader');
  const bar     = document.getElementById('cl-bar');
  const countEl = document.getElementById('cl-count');
  loader.classList.remove('hidden');
  bar.style.width = '0%';
  countEl.textContent = 'Loading...';

  /* ── Filter bar ── */
  const fb = document.getElementById('fbar');
  fb.innerHTML = '';

  const allPill = document.createElement('button');
  allPill.className = 'fpill' + (_carFilter === 'all' ? ' act' : '');
  if (_carFilter === 'all') allPill.style.background = '#3d1f10';
  allPill.innerHTML = '<span class="fdot" style="background:#9a6b5a"></span>All Cars';
  allPill.onclick = () => filterCars('all');
  fb.appendChild(allPill);

  CARS.forEach(c => {
    const p = document.createElement('button');
    const isAct = _carFilter === c.id;
    p.className = 'fpill' + (isAct ? ' act' : '');
    if (isAct) p.style.background = c.accent;
    p.innerHTML = '<span class="fdot" style="background:' + c.dot + '"></span>' + c.label;
    if (c.masterpiece) p.innerHTML += ' <span class="fstar">&#9733;</span>';
    p.onclick = () => filterCars(c.id);
    fb.appendChild(p);
  });

  /* ── Masonry (eager loading + progress bar) ── */
  const m = document.getElementById('cars-masonry');
  m.innerHTML = '';
  const show = _carFilter === 'all' ? CARS : CARS.filter(c => c.id === _carFilter);

  show.forEach(c => {
    const urls = c.photos.map(f => c.folder + '/' + f);
    c.photos.forEach((f, i) => {
      const src = c.folder + '/' + f;
      const d   = document.createElement('div');
      d.className = 'mi';
      /* Cars usa eager loading per il progress bar */
      const img = document.createElement('img');
      img.src     = src;
      img.alt     = 'Nev \u2014 ' + c.label + ', ' + c.sub + ', photo ' + (i + 1);
      img.loading = 'eager';
      img.decoding = 'async';
      img.width   = 800;
      img.height  = 533;
      const ov = document.createElement('div');
      ov.className = 'mi-ov';
      const badge = document.createElement('span');
      badge.className = 'mi-badge';
      badge.textContent = c.label;
      ov.appendChild(badge);
      d.appendChild(img);
      d.appendChild(ov);
      d.addEventListener('click', () => lbOpen(urls, i, c.label));
      m.appendChild(d);
    });
  });

  /* ── Progress tracker ── */
  requestAnimationFrame(() => {
    const imgs  = [...m.querySelectorAll('img')];
    const total = imgs.length;
    if (!total) { loader.classList.add('hidden'); return; }
    let loaded = 0;

    function onLoad() {
      loaded++;
      bar.style.width = Math.round(loaded / total * 100) + '%';
      countEl.textContent = loaded + ' / ' + total;
      if (loaded >= total) {
        setTimeout(() => {
          loader.classList.add('hidden');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, 320);
      }
    }
    imgs.forEach(img => {
      if (img.complete && img.naturalWidth > 0) onLoad();
      else {
        img.addEventListener('load',  onLoad, { once: true });
        img.addEventListener('error', onLoad, { once: true });
      }
    });
  });
}

function filterCars(id) {
  _carFilter = id;
  initCars();
}
