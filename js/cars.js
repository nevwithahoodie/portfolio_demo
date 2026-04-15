/* ══════════════════════════════════
   CARS — with 3-column parallax
══════════════════════════════════ */
let _carFilter = "all";
let _carsParallaxBound = false;

function initCars() {
  const loader = document.getElementById("cars-loader");
  const bar = document.getElementById("cl-bar");
  const countEl = document.getElementById("cl-count");
  loader.classList.remove("hidden");
  bar.style.width = "0%";
  countEl.textContent = "Loading...";

  /* ── Filter bar ── */
  const fb = document.getElementById("fbar");
  fb.innerHTML = "";

  const allPill = document.createElement("button");
  allPill.className = "fpill" + (_carFilter === "all" ? " act" : "");
  if (_carFilter === "all") allPill.style.background = "#3d1f10";
  allPill.innerHTML =
    '<span class="fdot" style="background:#9a6b5a"></span>All Cars';
  allPill.onclick = () => filterCars("all");
  fb.appendChild(allPill);

  CARS.forEach((c) => {
    const p = document.createElement("button");
    const isAct = _carFilter === c.id;
    p.className = "fpill" + (isAct ? " act" : "");
    if (isAct) p.style.background = c.accent;
    p.innerHTML =
      '<span class="fdot" style="background:' + c.dot + '"></span>' + c.label;
    if (c.masterpiece) p.innerHTML += ' <span class="fstar">&#9733;</span>';
    p.onclick = () => filterCars(c.id);
    fb.appendChild(p);
  });

  /* ── 3-column parallax grid ── */
  const wrap = document.getElementById("cars-masonry");
  wrap.innerHTML = "";

  /* Build 3 column divs */
  const colL = document.createElement("div");
  const colC = document.createElement("div");
  const colR = document.createElement("div");
  colL.className = "cars-col";
  colL.id = "cars-col-l";
  colC.className = "cars-col";
  colC.id = "cars-col-c";
  colR.className = "cars-col";
  colR.id = "cars-col-r";
  wrap.appendChild(colL);
  wrap.appendChild(colC);
  wrap.appendChild(colR);

  const cols = [colL, colC, colR];
  const show =
    _carFilter === "all" ? CARS : CARS.filter((c) => c.id === _carFilter);

  let globalIdx = 0;
  show.forEach((c) => {
    const urls = c.photos.map((f) => c.folder + "/" + f);
    c.photos.forEach((f, i) => {
      const src = c.folder + "/" + f;
      const d = document.createElement("div");
      d.className = "mi";
      /* Placeholder color based on car accent */
      d.dataset.ph =
        c.id === "p911"
          ? "car-gold"
          : c.id === "fastback" || c.id === "v8"
            ? "car-red"
            : c.id === "miata"
              ? "car-green"
              : "car";

      const img = document.createElement("img");
      img.src = src;
      img.alt = "Nev \u2014 " + c.label + ", " + c.sub + ", photo " + (i + 1);
      img.loading = "eager";
      img.decoding = "async";
      img.width = 800;
      img.height = 533;
      img.addEventListener(
        "load",
        function () {
          img.classList.add("loaded");
          d.classList.add("img-loaded");
        },
        { once: true },
      );
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add("loaded");
        d.classList.add("img-loaded");
      }

      const ov = document.createElement("div");
      ov.className = "mi-ov";
      const badge = document.createElement("span");
      badge.className = "mi-badge";
      badge.textContent = c.label;
      ov.appendChild(badge);

      d.appendChild(img);
      d.appendChild(ov);
      d.addEventListener("click", () => lbOpen(urls, i, c.label));

      cols[globalIdx % 3].appendChild(d);
      globalIdx++;
    });
  });

  /* ── Parallax scroll handler ── */
  if (!_carsParallaxBound) {
    _carsParallaxBound = true;
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const l = document.getElementById("cars-col-l");
          const c = document.getElementById("cars-col-c");
          const r = document.getElementById("cars-col-r");
          if (l && c && r) {
            const sy = window.scrollY;
            l.style.transform = "translateY(-" + sy * 0.055 + "px)";
            r.style.transform = "translateY(-" + sy * 0.055 + "px)";
            c.style.transform = "translateY(" + sy * 0.032 + "px)";
          }
          ticking = false;
        });
      },
      { passive: true },
    );
  }

  /* ── Progress tracker → hide loader ── */
  requestAnimationFrame(() => {
    const imgs = [...wrap.querySelectorAll("img")];
    const total = imgs.length;
    if (!total) {
      loader.classList.add("hidden");
      return;
    }
    let loaded = 0;

    function onLoad() {
      loaded++;
      bar.style.width = Math.round((loaded / total) * 100) + "%";
      countEl.textContent = loaded + " / " + total;
      if (loaded >= total) {
        setTimeout(() => {
          loader.classList.add("hidden");
          window.scrollTo({ top: 0, behavior: "instant" });
        }, 320);
      }
    }
    imgs.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) onLoad();
      else {
        img.addEventListener("load", onLoad, { once: true });
        img.addEventListener("error", onLoad, { once: true });
      }
    });
  });
}

function filterCars(id) {
  _carFilter = id;
  /* Reset parallax transforms on filter change */
  ["cars-col-l", "cars-col-c", "cars-col-r"].forEach((cid) => {
    const el = document.getElementById(cid);
    if (el) el.style.transform = "";
  });
  initCars();
}
