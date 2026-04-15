/* ══════════════════════════════════
   TYPEWRITER — HOME TITLE
══════════════════════════════════ */
function runTypewriter() {
  const el = document.querySelector(".htitle");
  if (!el) return;
  el.classList.add("tw-done");
  el.style.opacity = "1";

  const lines = [
    ["N", "E", "V"],
    ["T", "O", "O", "K"],
    ["T", "H", "A", "T", "."],
  ];
  el.innerHTML = "";

  const cursor = document.createElement("span");
  cursor.className = "tw-cursor";
  el.appendChild(cursor);

  let li = 0,
    ci = 0;
  const delay = 62;

  function type() {
    if (li >= lines.length) {
      cursor.remove();
      return;
    }
    if (ci === 0 && li > 0)
      el.insertBefore(document.createTextNode("\n"), cursor);
    const ch = lines[li][ci];
    const span = document.createElement("span");
    if (li === 1) span.style.color = "var(--pink-mid)"; // "TOOK" in pink
    span.textContent = ch;
    el.insertBefore(span, cursor);
    ci++;
    if (ci >= lines[li].length) {
      li++;
      ci = 0;
      setTimeout(type, delay * 1.8);
    } else {
      setTimeout(type, delay);
    }
  }
  setTimeout(type, 380);
}

/* ══════════════════════════════════
   PAGE TITLE WORD REVEAL
══════════════════════════════════ */
function animatePageTitle(viewId) {
  const view = document.getElementById("view-" + viewId);
  if (!view) return;

  const title = view.querySelector(
    ".ph-title, .bea-title, .bf-title, .ele-title, .p911-title, .mp-hero-title, .about-name",
  );
  if (!title || title.dataset.animated) return;
  title.dataset.animated = "1";

  const walk = (node) => {
    if (node.nodeType === 3) {
      const words = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      words.forEach((w, i) => {
        if (/^\s+$/.test(w)) {
          frag.appendChild(document.createTextNode(w));
          return;
        }
        if (!w) return;
        const wrap = document.createElement("span");
        wrap.className = "ph-word";
        const inner = document.createElement("span");
        inner.className = "pw-inner";
        inner.style.animationDelay = i * 0.06 + "s";
        inner.textContent = w;
        wrap.appendChild(inner);
        frag.appendChild(wrap);
      });
      node.parentNode.replaceChild(frag, node);
    } else if (
      node.nodeType === 1 &&
      node.nodeName !== "STYLE" &&
      node.nodeName !== "SCRIPT"
    ) {
      Array.from(node.childNodes).forEach(walk);
    }
  };
  Array.from(title.childNodes).forEach(walk);
}

/* ══════════════════════════════════
   PETAL PARTICLE SYSTEM
══════════════════════════════════ */
let _petalRAF = null,
  _petalActive = false;
const _petals = [];

function startPetals() {
  const canvas = document.getElementById("mp-petals");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  _petalActive = true;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const COLORS = [
    "rgba(244,184,184,0.55)",
    "rgba(240,160,160,0.45)",
    "rgba(201,162,39,0.25)",
    "rgba(250,200,180,0.4)",
    "rgba(232,152,152,0.5)",
  ];

  for (let i = 0; i < 28; i++) spawnPetal(true);

  function spawnPetal(randomY) {
    _petals.push({
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : -20,
      size: 5 + Math.random() * 9,
      speedY: 0.6 + Math.random() * 1.1,
      speedX: (Math.random() - 0.5) * 0.7,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      drift: Math.sin(Math.random() * Math.PI * 2),
      driftT: Math.random() * 100,
      opacity: 0.3 + Math.random() * 0.6,
    });
  }

  function draw() {
    if (!_petalActive) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    _petals.forEach((p, i) => {
      p.y += p.speedY;
      p.driftT += 0.012;
      p.x += p.speedX + Math.sin(p.driftT) * 0.4;
      p.rot += p.rotSpeed;
      if (p.y > canvas.height + 30) {
        _petals[i] = null;
        spawnPetal(false);
      }
    });
    for (let i = _petals.length - 1; i >= 0; i--)
      if (_petals[i] === null) _petals.splice(i, 1);

    _petals.forEach((p) => {
      if (!p) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.48, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = p.opacity * 0.4;
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.beginPath();
      ctx.ellipse(
        -p.size * 0.2,
        -p.size * 0.1,
        p.size * 0.35,
        p.size * 0.18,
        p.rot * 0.5,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.restore();
    });

    _petalRAF = requestAnimationFrame(draw);
  }

  if (_petalRAF) cancelAnimationFrame(_petalRAF);
  draw();
}

function stopPetals() {
  _petalActive = false;
  if (_petalRAF) {
    cancelAnimationFrame(_petalRAF);
    _petalRAF = null;
  }
  _petals.length = 0;
  _petals.splice(0);
  const canvas = document.getElementById("mp-petals");
  if (canvas) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }
}
