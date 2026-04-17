/* ══════════════════════════════════
   PEOPLE / PORTRAITS
══════════════════════════════════ */
var PORTRAIT_URLS = {
  beatrice: 'masterpieces/beatrice.html',
  bfest:    'portraits/bikerfest.html',
  eleo:     'portraits/eleonora.html',
  aurora:   'portraits/aurora.html'
};

function initPeople() {
  var g = document.getElementById('people-grid');
  g.innerHTML = '';
  PEOPLE_DATA.forEach(function(p, i) {
    var d = document.createElement('div');
    d.className = 'pcard reveal';
    d.style.transitionDelay = (i * .12) + 's';
    var mp = p.masterpiece ? '<div class="pcard-mp">&#9733; Masterpiece</div>' : '';
    var img = document.createElement('img');
    img.src     = p.folder + '/' + p.cover;
    img.alt     = 'Nev \u2014 ' + p.label + ', ' + p.sub;
    img.loading = 'lazy';
    img.width   = 600;
    img.height  = 800;
    var info = '<div class="pcard-info"><div class="pcard-name">' + p.label.toUpperCase()
      + '</div><div class="pcard-sub">' + p.sub + ' &middot; ' + p.photos.length + ' photos</div></div>';
    d.innerHTML = mp + info;
    d.insertBefore(img, d.firstChild);
    var url = PORTRAIT_URLS[p.id] || '#';
    d.onclick = function() { window.location.href = url; };
    g.appendChild(d);
  });
  setTimeout(trigReveal, 80);
}
