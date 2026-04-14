/* ══════════════════════════════════
   COMPONENTS.JS
   Injects nav, footer, cookie banner
   into every page via mount divs.
══════════════════════════════════ */
(function () {

  /* ── Path depth detection ── */
  const seg        = location.pathname.split('/').filter(Boolean);
  const SUB_FOLDERS = ['places','portraits','masterpieces'];
  const inSub      = seg.some(s => SUB_FOLDERS.includes(s));
  const P          = inSub ? '../' : '';

  /* ── Active section for nav ── */
  const page       = location.pathname.split('/').pop().replace('.html','') || 'index';
  const PARENT_MAP = {
    cansiglio:'places', molveno:'places', verona:'places', india:'places', miramare:'places',
    bikerfest:'portraits', eleonora:'portraits', aurora:'portraits',
    beatrice:'masterpieces', porsche911:'masterpieces'
  };
  const activePage = PARENT_MAP[page] || page;

  /* ── SVGs ── */
  const IG_BIG  = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>';
  const IG_SM   = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>';
  const MAIL_SM = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>';

  /* ── Nav links ── */
  const NAV_LINKS = [
    { id:'index',        label:'Home'         },
    { id:'cars',         label:'Cars'         },
    { id:'places',       label:'Places'       },
    { id:'portraits',    label:'Portraits'    },
    { id:'masterpieces', label:'Masterpieces' },
  ];

  function mkLink(item, extra) {
    extra = extra || '';
    const isActive = activePage === item.id;
    return '<a class="nl' + extra + (isActive ? ' active' : '') + '"'
         + ' data-page="' + item.id + '"'
         + ' href="' + P + item.id + '.html"'
         + ' translate="no">' + item.label + '</a>';
  }

  const navLinks    = NAV_LINKS.map(function(l){ return mkLink(l); }).join('\n      ');
  const navAbout    = mkLink({ id:'about', label:'About' }, ' nav-about');
  const mobileLinks = NAV_LINKS.map(function(l){ return mkLink(l); }).join('\n  ');

  /* ── Inject nav ── */
  const navMount = document.getElementById('nav-mount');
  if (navMount) {
    navMount.outerHTML =
      '<div class="nav-wrapper">'
      + '<nav id="nav" role="navigation" aria-label="Main navigation">'
      + '<a class="logo" href="' + P + 'index.html" translate="no">NEV<span>.</span></a>'
      + '<div class="nav-links">' + navLinks + '\n      ' + navAbout + '</div>'
      + '<button class="burger" onclick="toggleMenu()" aria-label="Toggle menu" aria-expanded="false">'
        + '<span></span><span></span><span></span>'
      + '</button>'
      + '</nav></div>'
      + '<div id="mobile-menu" role="dialog" aria-label="Mobile navigation">'
      + mobileLinks + '\n  '
      + mkLink({ id:'about', label:'About' }, ' nav-about')
      + '\n</div>';
  }

  /* ── Apply nav theme from body class ── */
  const body = document.body;
  const navEl = document.getElementById('nav');
  const mmEl  = document.getElementById('mobile-menu');
  const THEME_MAP = {
    'pg-beatrice':'gold', 'pg-aurora':'aurora', 'pg-eleonora':'purple',
    'pg-bikerfest':'dark', 'pg-porsche911':'dark', 'pg-masterpieces':'dark'
  };
  if (navEl) {
    Object.keys(THEME_MAP).forEach(function(cls) {
      if (body.classList.contains(cls)) {
        var t = THEME_MAP[cls];
        navEl.classList.add(t);
        if (mmEl) mmEl.classList.add(t);
      }
    });
  }

  /* ── Inject footer ── */
  const footMount = document.getElementById('footer-mount');
  if (footMount) {
    var tagline = footMount.dataset.tagline || 'Photography by Nev.';
    var theme   = footMount.dataset.theme   || '';
    var cls     = theme ? ' class="' + theme + '"' : '';
    footMount.outerHTML =
      '<footer' + cls + '>'
      + '<div class="ft-inner">'
        + '<div class="ft-brand">'
          + '<div class="ft-logo" translate="no">NEV<span>.</span></div>'
          + '<p>' + tagline + '</p>'
          + '<div class="ft-social" style="margin-top:14px">'
            + '<a href="https://www.instagram.com/nev.shotz/" target="_blank" rel="noopener" class="ft-soc-btn ig" title="@nev.shotz">' + IG_BIG + '</a>'
          + '</div>'
        + '</div>'
        + '<div class="ft-links">'
          + '<div class="ft-links-title">Contact</div>'
          + '<a class="ft-link" href="mailto:navpreet.singh1209@gmail.com">' + MAIL_SM + ' navpreet.singh1209@gmail.com</a>'
          + '<a class="ft-link" href="https://www.instagram.com/nev.shotz/" target="_blank" rel="noopener">' + IG_SM + ' @nev.shotz</a>'
          + '<a class="ft-link" href="' + P + 'privacy.html" style="margin-top:6px;font-size:11px;opacity:.7">Privacy Policy</a>'
        + '</div>'
      + '</div>'
      + '<div class="ft-bottom">'
        + '<div class="ft-copy">&copy; 2026 <a href="https://nevwithahoodie.github.io/portfolio_demo" target="_blank">nevwithahoodie.github.io</a></div>'
        + '<div class="ft-copy"><a href="' + P + 'privacy.html" style="color:inherit;opacity:.6">Privacy &amp; Cookies</a></div>'
      + '</div>'
      + '</footer>';
  }

  /* ── Cookie banner (if not already in HTML) ── */
  if (!document.getElementById('cookie-banner')) {
    var ppLink = P + 'privacy.html';
    var div = document.createElement('div');
    div.innerHTML =
      '<div id="cookie-banner" role="dialog" aria-label="Cookie consent">'
      + '<div class="ck-top">'
        + '<div class="ck-icon">&#127850;</div>'
        + '<div class="ck-body">'
          + '<strong>We use cookies</strong>'
          + '<p>This site uses <strong>Google Analytics</strong> to understand visitor traffic. '
            + 'Analytics cookies are only set with your consent. '
            + 'Essential cookies keep the site working. '
            + '<a href="' + ppLink + '">Privacy Policy</a> &middot; '
            + '<a href="https://policies.google.com/privacy/partners" target="_blank" rel="noopener">Google&rsquo;s policy</a>'
          + '</p>'
        + '</div>'
      + '</div>'
      + '<div class="ck-actions">'
        + '<button class="ck-btn-all" onclick="acceptCookies(\'all\')">Accept all</button>'
        + '<button class="ck-btn-ess" onclick="acceptCookies(\'essential\')">Essential only</button>'
      + '</div>'
    + '</div>';
    document.body.insertBefore(div.firstChild, document.body.firstChild);
  }

})();
