/* ══════════════════════════════════
   LIGHTBOX
══════════════════════════════════ */
let _lbPhotos = [],
  _lbIdx = 0,
  _lbLbl = "";

function lbOpen(photos, idx, lbl = "") {
  _lbPhotos = photos;
  _lbIdx = idx;
  _lbLbl = lbl;
  _lbRender();
  document.getElementById("lb").classList.add("open");
  document.body.style.overflow = "hidden";
}

function lbClose() {
  document.getElementById("lb").classList.remove("open");
  document.body.style.overflow = "";
}

function lbNav(d) {
  _lbIdx = (_lbIdx + d + _lbPhotos.length) % _lbPhotos.length;
  _lbRender();
}

function _lbRender() {
  document.getElementById("lb-img").src = _lbPhotos[_lbIdx];
  document.getElementById("lb-lbl").textContent = _lbLbl;
  document.getElementById("lb-cnt").textContent =
    `${_lbIdx + 1} / ${_lbPhotos.length}`;
}

// Close on backdrop click
document.getElementById("lb").addEventListener("click", (e) => {
  if (e.target === document.getElementById("lb")) lbClose();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("lb").classList.contains("open")) return;
  if (e.key === "Escape") lbClose();
  if (e.key === "ArrowLeft") lbNav(-1);
  if (e.key === "ArrowRight") lbNav(1);
});
