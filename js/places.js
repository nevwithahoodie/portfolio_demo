/* ══════════════════════════════════
   PLACES
══════════════════════════════════ */
function initPlaces() {
  const g = document.getElementById("places-grid");
  g.innerHTML = "";
  PLACES.forEach(function (pl, i) {
    const d = document.createElement("div");
    d.className = "pcard reveal";
    d.style.transitionDelay = i * 0.1 + "s";
    const img = document.createElement("img");
    img.src = pl.folder + "/" + pl.cover;
    img.alt = "Nev \u2014 " + pl.label + ", " + pl.sub;
    img.loading = "lazy";
    img.width = 600;
    img.height = 800;
    const info = document.createElement("div");
    info.className = "pcard-info";
    info.innerHTML =
      '<div class="pcard-name">' +
      pl.label.toUpperCase() +
      "</div>" +
      '<div class="pcard-sub">' +
      pl.photos.length +
      " photos &middot; " +
      pl.sub +
      "</div>";
    const badge = document.createElement("div");
    badge.className = "pcard-travels";
    badge.textContent = "Travels";
    d.appendChild(img);
    d.appendChild(info);
    d.appendChild(badge);
    d.onclick = function () {
      window.location.href = "places/" + pl.id + ".html";
    };
    g.appendChild(d);
  });
  setTimeout(trigReveal, 80);
}
