/* ══════════════════════════════════
   COMPONENTS — shared nav & footer
   Injected into every page via:
     <div id="nav-mount"></div>
     <div id="footer-mount" data-tagline="..." data-theme="..."></div>
══════════════════════════════════ */
(function () {

  /* ── Detect path depth ── */
  const seg = location.pathname.split('/').filter(Boolean);
  /* On GitHub Pages the repo name is in the path:
     /portfolio_demo/places/cansiglio.html → depth after repo = 1 sub-folder
     We detect subfolders by checking known folder names.            */
  const SUB_FOLDERS = ['places','portraits','masterpieces'];
  const inSub = SEG_IN_SUB(seg, SUB_FOLDERS);
  const P = inSub ? '../' : '';         /* path prefix for links & assets */

  function SEG_IN_SUB(segs, folders) {
    return segs.some(s => folders.includes(s));
  }

  /* ── Detect current section for nav active state ── */
  const page = location.pathname.split('/').pop().replace('.html','') || 'index';
  const PARENT_MAP = {
    cansiglio:  'places',       molveno:    'places',
    verona:     'places',       india:      'places',
    miramare:   'places',
    bikerfest:  'portraits',    eleonora:   'portraits',
    aurora:     'portraits',
    beatrice:   'masterpieces', porsche911: 'masterpieces'
  };
  const activePage = PARENT_MAP[page] || page;

  /* ── SVGs ── */
  const IG_BIG  = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>';
  const IG_SM   = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>';
  const MAIL_SM = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>';

  /* ── Nav links config ── */
  const NAV_LINKS = [
    { id: 'index',        label: 'Home'         },
    { id: 'cars',         label: 'Cars'         },
    { id: 'places',       label: 'Places'       },
    { id: 'portraits',    label: 'Portraits'    },
    { id: 'masterpieces', label: 'Masterpieces' },
  ];

  function makeLink(item, extra = '') {
    const isActive = activePage === item.id;
    return `<a class="nl${extra}${isActive ? ' active' : ''}"
               data-page="${item.id}"
               href="${P}${item.id}.html"
               translate="no">${item.label}</a>`;
  }

  /* ── Build nav HTML ── */
  const navLinks    = NAV_LINKS.map(l => makeLink(l)).join('\n      ');
  const navAbout    = makeLink({ id: 'about', label: 'About' }, ' nav-about');
  const mobileLinks = NAV_LINKS.map(l => makeLink(l)).join('\n  ');

  const navHTML = `
<div class="nav-wrapper">
  <nav id="nav" role="navigation" aria-label="Main navigation">
    <a class="logo" href="${P}index.html" translate="no">NEV<span>.</span></a>
    <div class="nav-links">
      ${navLinks}
      ${navAbout}
    </div>
    <button class="burger" onclick="toggleMenu()" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>
</div>
<div id="mobile-menu" role="dialog" aria-label="Mobile navigation">
  ${mobileLinks}
  ${makeLink({ id: 'about', label: 'About' }, ' nav-about')}
</div>`;

  /* ── Inject nav ── */
  const navMount = document.getElementById('nav-mount');
  if (navMount) navMount.outerHTML = navHTML;

  /* ── Apply nav theme from body class ── */
  const body = document.body;
  const THEME_MAP = {
    'pg-beatrice':    'gold',
    'pg-aurora':      'aurora',
    'pg-eleonora':    'purple',
    'pg-bikerfest':   'dark',
    'pg-porsche911':  'dark',
    'pg-masterpieces':'dark'
  };
  const navEl = document.getElementById('nav');
  const mmEl  = document.getElementById('mobile-menu');
  if (navEl) {
    Object.entries(THEME_MAP).forEach(([cls, theme]) => {
      if (body.classList.contains(cls)) {
        navEl.classList.add(theme);
        if (mmEl) mmEl.classList.add(theme);
      }
    });
  }

  /* ── Build footer HTML ── */
  const footMount = document.getElementById('footer-mount');
  if (footMount) {
    const tagline = footMount.dataset.tagline || 'Photography by Nev.';
    const theme   = footMount.dataset.theme   || '';
    const cls     = theme ? ` class="${theme}"` : '';

    const footHTML = `
<footer${cls}>
  <div class="ft-inner">
    <div class="ft-brand">
      <div class="ft-logo" translate="no">NEV<span>.</span></div>
      <p>${tagline}</p>
      <div class="ft-social" style="margin-top:14px">
        <a href="https://www.instagram.com/nev.shotz/" target="_blank" rel="noopener"
           class="ft-soc-btn ig" title="@nev.shotz" aria-label="Instagram @nev.shotz">
          ${IG_BIG}
        </a>
      </div>
    </div>
    <div class="ft-links">
      <div class="ft-links-title">Contact</div>
      <a class="ft-link" href="mailto:navpreet.singh1209@gmail.com">
        ${MAIL_SM} navpreet.singh1209@gmail.com
      </a>
      <a class="ft-link" href="https://www.instagram.com/nev.shotz/"
         target="_blank" rel="noopener">
        ${IG_SM} @nev.shotz
      </a>
    </div>
  </div>
  <div class="ft-bottom">
    <div class="ft-copy">
      &copy; 2026 <a href="https://nevwithahoodie.github.io/portfolio_demo"
                     target="_blank">nevwithahoodie.github.io</a>
    </div>
  </div>
</footer>`;

    footMount.outerHTML = footHTML;
  }

})();
