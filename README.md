# 📖 Documentazione Completa — nev.portfolio

> Guida totale al progetto: ogni file, ogni funzione, dove mettere le foto, come aggiungere contenuti, come funziona tutto sotto il cofano.

---

## Indice

1. [Struttura del progetto](#1-struttura-del-progetto)
2. [Come funziona il sito (architettura)](#2-come-funziona-il-sito-architettura)
3. [Pagine HTML — cosa fa ognuna](#3-pagine-html--cosa-fa-ognuna)
4. [JavaScript — file per file, funzione per funzione](#4-javascript--file-per-file-funzione-per-funzione)
5. [CSS — file per file](#5-css--file-per-file)
6. [Dove salvare i dati e le foto](#6-dove-salvare-i-dati-e-le-foto)
7. [Come aggiungere contenuti](#7-come-aggiungere-contenuti)
8. [Dati salvati nel browser (localStorage)](#8-dati-salvati-nel-browser-localstorage)
9. [Temi visivi per pagina](#9-temi-visivi-per-pagina)
10. [Ordine di caricamento script](#10-ordine-di-caricamento-script)
11. [Checklist per il deploy su GitHub Pages](#11-checklist-per-il-deploy-su-github-pages)
12. [Cose da NON toccare](#12-cose-da-non-toccare)
13. [Cose da cambiare in sicurezza](#13-Cose-da-cambiare-in-sicurezza)

---

## 1. Struttura del progetto

```
portfolio_demo/
│
├── index.html                  ← Home
├── cars.html                   ← Automotive (masonry + filtri)
├── places.html                 ← Luoghi (griglia categorie)
├── portraits.html              ← Ritratti (griglia sessioni)
├── masterpieces.html           ← Masterpieces (dark + petali)
├── about.html                  ← About + contatti
│
├── places/                     ← Sottopagine luoghi
│   ├── cansiglio.html
│   ├── molveno.html
│   ├── verona.html
│   └── india.html
│
├── portraits/                  ← Sottopagine ritratti
│   ├── bikerfest.html
│   └── eleonora.html
│
├── masterpieces/               ← Sottopagine masterpiece
│   ├── beatrice.html
│   └── porsche911.html
│
├── css/                        ← Tutti gli stili, divisi per argomento
│   ├── vars.css
│   ├── animations.css
│   ├── nav.css
│   ├── home.css
│   ├── gallery.css
│   ├── masterpieces.css
│   ├── subpages.css
│   ├── pages.css
│   └── ui.css
│
├── js/                         ← Tutta la logica, divisa per argomento
│   ├── data.js                 ← ⭐ L'UNICO FILE CON I DATI
│   ├── nav.js
│   ├── lightbox.js
│   ├── masonry.js
│   ├── animations.js
│   ├── cars.js
│   ├── places.js
│   └── people.js
│
└── assets/                     ← Tutte le foto
    ├── media/
    │   ├── logo.png            ← Favicon e apple-touch-icon
    │   └── preview.jpg         ← Immagine Open Graph (anteprima link)
    ├── macchine/
    │   ├── miata_mx5_2025/
    │   ├── mustang/
    │   │   ├── Fastback/
    │   │   └── GT_V8/
    │   ├── Escort_RS/
    │   ├── Porsche/
    │   │   ├── 911_70/
    │   │   └── Details/
    │   └── toyota_celica/
    ├── luoghi/
    │   ├── cansiglio/
    │   ├── molveno/
    │   ├── verona/
    │   └── museo_india/
    ├── mie/                    ← Le tue foto personali (usate in about.html)
    └── persone/
        ├── Beatrice/
        ├── Bikerfest/
        └── Eleonora/
```

---

## 2. Come funziona il sito (architettura)

Il sito è **completamente statico**: nessun server, nessun database, nessun build tool. Funziona direttamente aprendo i file HTML in un browser o su GitHub Pages.

**Ogni pagina è un file HTML autonomo.** Non ci sono ancore `#hash` o SPA (Single Page Application). Navigare da `cars.html` a `places.html` è una normale navigazione browser — la pagina si ricarica.

**Flusso di una pagina qualsiasi:**

1. Il browser carica il file `.html`
2. Il file include i CSS dalla cartella `/css/` → applica gli stili
3. Il file include i JS dalla cartella `/js/` → esegue la logica
4. `nav.js` si esegue subito (sync): legge il filename dalla URL, evidenzia il link corretto nella navbar, applica il tema della navbar (dark/gold/purple) se la pagina lo richiede
5. Al `DOMContentLoaded`, la funzione di init specifica della pagina popola il contenuto dinamico (foto, filtri, ecc.)

**Dove vivono i dati:**

- Le foto → cartella `assets/` sul filesystem / repo
- I metadati delle foto (nomi, path, colori) → `js/data.js` (per Cars, Places, Portraits)
- I dati delle sottopagine (Beatrice, P911, ecc.) → direttamente nell'HTML di quella pagina, come array JS inline
- Le preferenze utente (cookie) → `localStorage` del browser

---

## 3. Pagine HTML — cosa fa ognuna

### `index.html` — Home

- Contiene l'**hero** con l'animazione typewriter ("NEV TOOK THAT.")
- Contiene il **bento grid** con 5 card cliccabili che portano alle sezioni
- Carica: `nav.js`, `animations.js`
- Al `DOMContentLoaded` chiama `runTypewriter()`
- **Non carica `data.js`** perché non ha bisogno dei dati delle foto
- I link delle card sono `<a href="cars.html">`, `<a href="places.html">` ecc. — link statici, niente JS

### `cars.html` — Automotive

- Contiene il **loader** (barra di caricamento animata) che appare mentre le immagini si caricano
- Contiene la **filter bar** (pill per filtrare per modello) e la **masonry** (griglia foto)
- Carica: `data.js`, `lightbox.js`, `masonry.js`, `cars.js`, `nav.js`
- Al `DOMContentLoaded` chiama `initCars()`
- `initCars()` costruisce i filtri leggendo `CARS` da `data.js` e riempie la masonry con le foto

### `places.html` — Luoghi

- Contiene una **griglia di card** (una per ogni luogo), ognuna cliccabile → porta a `places/nomeluogo.html`
- Carica: `data.js`, `places.js`, `nav.js`
- Al `DOMContentLoaded` chiama `initPlaces()`
- `initPlaces()` costruisce le card leggendo `PLACES` da `data.js`

### `places/cansiglio.html`, `molveno.html`, `verona.html`, `india.html` — Sottopagine luoghi

- Ognuna ha un **back button** → torna a `places.html`
- Contiene una **masonry** con tutte le foto del posto
- **NON carica `data.js`**: l'array delle foto è scritto direttamente nell'HTML della pagina come script inline:
  ```html
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var photos = ['../assets/luoghi/molveno/foto1.jpg', ...];
      buildMasonry(document.getElementById('pm'), photos, 'Molveno');
    });
  </script>
  ```
- Carica: `lightbox.js`, `masonry.js`, `nav.js`

### `portraits.html` — Ritratti

- Come `places.html` ma per le sessioni ritratto
- Carica: `data.js`, `people.js`, `nav.js`
- Al `DOMContentLoaded` chiama `initPeople()`
- La card di Beatrice ha il badge "★ Masterpiece" → porta a `masterpieces/beatrice.html`
- Bikerfest → `portraits/bikerfest.html`, Eleonora → `portraits/eleonora.html`

### `portraits/bikerfest.html` — Biker Fest

- Tema dark (`body class="theme-dark pg-bikerfest"`)
- Back button → `portraits.html`
- Array foto inline, costruisce la masonry
- Footer dark con link a @killingklub

### `portraits/eleonora.html` — Eleonora

- Tema purple (`body class="theme-purple pg-eleonora"`)
- Back button → `portraits.html`
- Masonry a 2 colonne (invece di 3)

### `masterpieces.html` — Masterpieces

- Tema dark gold (`body class="theme-dark pg-masterpieces"`)
- Ha il `<canvas id="mp-petals">` per i petali animati
- Carica: `animations.js`, `nav.js`
- Al `DOMContentLoaded` chiama `startPetals()` (definita in `animations.js`)
- Le due card cliccano su `masterpieces/porsche911.html` e `masterpieces/beatrice.html`

### `masterpieces/beatrice.html` — Beatrice

- Tema gold (`body class="theme-gold pg-beatrice"`)
- Ha un layout split: testo a sinistra, foto hero a destra
- Back button → `masterpieces.html`
- Gallery sotto il layout hero, costruita con `buildMasonry()`
- Footer gold con link a @beaniaka

### `masterpieces/porsche911.html` — Porsche 911

- Tema dark (`body class="theme-dark pg-porsche911"`)
- Layout **parallax a 3 colonne** (le colonne si muovono a velocità diverse sullo scroll)
- Back button → `masterpieces.html`
- Tutte le foto sono in bianco e nero (`filter: grayscale(100%) contrast(1.12)`)
- Script inline gestisce il parallax con `requestAnimationFrame`

### `about.html` — About + Contatti

- Griglia 2 colonne: bio + stats a sinistra, masonry foto personali a destra
- Sezione contatti con card per email e Instagram
- Card collab (pigeon.jfif)
- Script inline costruisce la masonry con le foto da `assets/mie/`
- Carica: `lightbox.js`, `masonry.js`, `nav.js`

---

## 4. JavaScript — file per file, funzione per funzione

### `js/data.js` ⭐ IL FILE PIÙ IMPORTANTE

**Caricato da:** `cars.html`, `places.html`, `portraits.html`

Contiene tre array globali con tutti i metadati delle foto.

---

#### Array `CARS`

Ogni oggetto rappresenta un modello di auto:

| Proprietà     | Tipo                 | Significato                                                    |
| ------------- | -------------------- | -------------------------------------------------------------- |
| `id`          | stringa              | Identificatore unico (usato internamente per il filtro)        |
| `label`       | stringa              | Nome visualizzato nella pill del filtro                        |
| `sub`         | stringa              | Sottotitolo/descrizione breve                                  |
| `accent`      | colore hex           | Colore di sfondo della pill quando attiva                      |
| `dot`         | colore hex           | Colore del pallino colorato nella pill                         |
| `folder`      | path                 | Cartella delle foto relativa alla root (`assets/macchine/...`) |
| `photos`      | array di stringhe    | Lista dei nomi file delle foto, nell'ordine in cui appaiono    |
| `masterpiece` | booleano (opzionale) | Se `true`, mostra la stella ★ nella pill                       |

**Esempio per aggiungere un nuovo modello:**

```js
{ id:'ferrari', label:'Ferrari 308', sub:'Rosso Corsa',
  accent:'#8b0000', dot:'#cc0000',
  folder:'assets/macchine/ferrari_308',
  photos:['foto1.jpg','foto2.jpg','foto3.jpg'] }
```

---

#### Array `PLACES`

Ogni oggetto rappresenta un luogo:

| Proprietà | Tipo              | Significato                                                            |
| --------- | ----------------- | ---------------------------------------------------------------------- |
| `id`      | stringa           | Identificatore — deve corrispondere al nome del file HTML in `places/` |
| `label`   | stringa           | Nome del luogo visualizzato nella card                                 |
| `sub`     | stringa           | Descrizione breve (es. "Paesaggio alpino")                             |
| `folder`  | path              | Cartella delle foto                                                    |
| `cover`   | stringa           | Nome del file usato come immagine di copertina della card              |
| `photos`  | array di stringhe | Lista dei nomi file delle foto                                         |

**Nota importante:** l'`id` deve corrispondere al file HTML in `places/`. Se aggiungi `id:'venezia'` devi anche creare `places/venezia.html`.

---

#### Array `PEOPLE_DATA`

Ogni oggetto rappresenta una sessione ritratto:

| Proprietà     | Tipo                 | Significato                                                      |
| ------------- | -------------------- | ---------------------------------------------------------------- |
| `id`          | stringa              | Identificatore interno                                           |
| `label`       | stringa              | Nome visualizzato nella card                                     |
| `sub`         | stringa              | Descrizione breve                                                |
| `folder`      | path                 | Cartella delle foto                                              |
| `cover`       | stringa              | Nome del file copertina                                          |
| `photos`      | array di stringhe    | Lista delle foto                                                 |
| `masterpiece` | booleano (opzionale) | Se `true`, mostra badge "★ Masterpiece" sulla card               |
| `view`        | stringa              | Destinazione al click: `'beatrice'`, `'bikerfest'`, `'eleonora'` |

Il campo `view` mappa verso le URL reali in `js/people.js`:

```js
var PORTRAIT_URLS = {
  beatrice: "masterpieces/beatrice.html",
  bfest: "portraits/bikerfest.html",
  eleo: "portraits/eleonora.html",
};
```

---

### `js/nav.js`

**Caricato da:** tutte le pagine

Gestisce tutto ciò che è condiviso tra le pagine: navbar, cookie, scroll, rivelazioni.

#### IIFE di inizializzazione nav (si esegue subito al caricamento)

Legge il filename dalla URL (`location.pathname.split('/').pop()`) e imposta il link attivo nella navbar tramite `data-page`. Usa `parentMap` per le sottopagine: ad esempio `cansiglio` → padre è `places`, quindi evidenzia il link "Places".

```
parentMap = {
  cansiglio → 'places',    molveno → 'places',
  verona    → 'places',    india   → 'places',
  bikerfest → 'portraits', eleonora → 'portraits',
  beatrice  → 'masterpieces', porsche911 → 'masterpieces'
}
```

Applica anche il tema alla navbar leggendo la classe `theme-dark/gold/purple` dal `<body>`.

#### `toggleMenu()`

Apre/chiude il menu mobile (`#mobile-menu`). Sincronizza il tema del menu con quello della navbar (es. se la navbar è dark, anche il menu è dark).

#### `closeMobileMenu()`

Rimuove la classe `.open` dal menu mobile. Chiamata automaticamente dai link del menu.

#### `trigReveal()`

Scorre tutti gli elementi con classe `.reveal` visibili nella viewport e aggiunge `.vis` per attivare la transizione CSS di apparizione. Chiamata allo scroll e al `DOMContentLoaded`.

#### IIFE Back-to-top

Ascolta lo scroll: se si scende oltre 300px aggiunge `.visible` al bottone `#btt-fixed`, altrimenti la toglie.

#### `acceptCookies()`

1. Salva `cookieAccepted = '1'` in `localStorage`
2. Nasconde il banner `#cookie-banner`
3. Mostra il toast di ringraziamento con animazione cuoricini per 2 secondi

#### IIFE "hide se già accettato"

Si esegue subito (non aspetta DOMContentLoaded): se `localStorage.getItem('cookieAccepted')` esiste, nasconde il banner prima ancora che si veda.

#### DOMContentLoaded — word reveal

Al caricamento della pagina, cerca il titolo principale (qualsiasi selector tra `.ph-title`, `.bea-title`, `.bf-title` ecc.) e lo anima parola per parola con un `@keyframes wordSlideUp`.

---

### `js/lightbox.js`

**Caricato da:** tutte le pagine tranne `index.html` e `masterpieces.html`

Gestisce il lightbox (visualizzatore foto a schermo intero).

#### Variabili di stato

```js
let _lbPhotos = []; // array di path delle foto dell'album corrente
let _lbIdx = 0; // indice della foto attualmente visualizzata
let _lbLbl = ""; // etichetta dell'album (es. "Beatrice")
```

#### `lbOpen(photos, idx, lbl)`

Apre il lightbox con un album di foto.

- `photos`: array di path (es. `['assets/persone/Beatrice/foto1.heic', ...]`)
- `idx`: indice della foto su cui si è cliccato
- `lbl`: nome da mostrare come etichetta
  Aggiunge `.open` a `#lb` e blocca lo scroll del body.

#### `lbClose()`

Rimuove `.open` da `#lb` e riabilita lo scroll.

#### `lbNav(direzione)`

Naviga tra le foto: `lbNav(1)` → prossima, `lbNav(-1)` → precedente. Wrap circolare.

#### `_lbRender()` (privata)

Aggiorna `src` dell'immagine, l'etichetta e il contatore "X / Y".

#### Event listeners

- Click sull'overlay (fuori dall'immagine) → chiude
- Tastiera: `Escape` → chiude, `←` → precedente, `→` → prossima

---

### `js/masonry.js`

**Caricato da:** tutte le pagine con gallerie

Contiene una sola funzione.

#### `buildMasonry(el, photos, lbl)`

Riempie un elemento DOM con la griglia masonry.

- `el`: il `<div class="masonry">` da popolare
- `photos`: array di path completi delle foto
- `lbl`: testo del badge che appare all'hover su ogni foto

Per ogni foto crea:

```html
<div class="mi">
  <img src="..." alt="..." />
  <div class="mi-ov">
    <span class="mi-badge">Beatrice</span>
  </div>
</div>
```

Aggiunge un event listener su ogni `.mi`: al click chiama `lbOpen(photos, i, lbl)` — apre il lightbox sull'immagine cliccata, passando l'intero array per la navigazione.

---

### `js/animations.js`

**Caricato da:** `index.html`, `masterpieces.html`

#### `runTypewriter()`

Anima il titolo hero della homepage lettera per lettera. Le lettere di "TOOK" sono colorate con `--pink-mid`. Una volta finita la digitazione, il cursore lampeggiante viene rimosso.

#### `animatePageTitle(viewId)`

**Non più usata** nel sito multi-pagina (era per la SPA). Rimasta per compatibilità, non crea problemi.

#### `startPetals()`

Avvia il sistema di particelle su `<canvas id="mp-petals">` nella pagina Masterpieces.

- Crea 28 petali iniziali in posizioni random
- Ogni petalo ha: posizione, velocità, rotazione, colore (rosa/oro), opacità
- Il loop `requestAnimationFrame` aggiorna la posizione di ogni petalo ogni frame
- I petali che escono dal fondo vengono rimossi e sostituiti da nuovi che entrano dall'alto
- Il canvas si ridimensiona automaticamente al resize della finestra

#### `stopPetals()`

Ferma il loop di animazione, svuota l'array dei petali, pulisce il canvas. Chiamata quando si lascia la pagina Masterpieces (non applicabile nel sito multi-pagina).

---

### `js/cars.js`

**Caricato da:** `cars.html`

#### Variabile di stato

```js
let _carFilter = "all"; // filtro attivo corrente
```

Questa variabile rimane in memoria durante la sessione: se filtri per "Miata" e poi navighi via e torni, il filtro è resettato (la variabile è reinizializzata al caricamento della pagina).

#### `initCars()`

1. Mostra il loader `#cars-loader`
2. Costruisce la filter bar `#fbar`: una pill "All Cars" + una pill per ogni auto in `CARS`
3. Determina quali auto mostrare: se `_carFilter === 'all'` → tutte, altrimenti solo quella con l'id corrispondente
4. Costruisce la masonry `#cars-masonry` con le foto filtrate
5. Attacca listener su ogni immagine: quando finisce di caricare incrementa il contatore della barra di progresso
6. Quando tutte le immagini sono caricate (o in errore), nasconde il loader con `loader.classList.add('hidden')`

#### `filterCars(id)`

Imposta `_carFilter = id` e richiama `initCars()` per ricostruire la pagina con il nuovo filtro.

---

### `js/places.js`

**Caricato da:** `places.html`

#### `initPlaces()`

Costruisce la griglia `#places-grid` leggendo l'array `PLACES` da `data.js`. Ogni card ha:

- Immagine cover
- Nome del luogo
- Numero foto · sottotitolo
- Badge "Travels"

Al click: `window.location.href = 'places/' + pl.id + '.html'` — navigazione normale verso la sottopagina.

---

### `js/people.js`

**Caricato da:** `portraits.html`

#### `PORTRAIT_URLS` (oggetto costante)

```js
var PORTRAIT_URLS = {
  beatrice: "masterpieces/beatrice.html",
  bfest: "portraits/bikerfest.html",
  eleo: "portraits/eleonora.html",
};
```

Mappa `id` → URL della pagina dedicata. Da aggiornare se aggiungi sessioni.

#### `initPeople()`

Come `initPlaces()` ma per `PEOPLE_DATA`. Le card con `masterpiece: true` mostrano il badge dorato.

---

## 5. CSS — file per file

### `css/vars.css`

**Caricato da:** tutte le pagine (sempre il primo)

Definisce tutte le **variabili CSS globali** usate in ogni altro file CSS. Se vuoi cambiare i colori del sito, questo è l'unico file da toccare.

| Variabile       | Valore default           | Descrizione                             |
| --------------- | ------------------------ | --------------------------------------- |
| `--pink`        | `#f4b8b8`                | Rosa chiaro (sfondo blob)               |
| `--pink-mid`    | `#e89898`                | Rosa medio (accenti, "TOOK")            |
| `--brown-dark`  | `#3d1f10`                | Bruno scuro (testo principale, bottoni) |
| `--brown`       | `#5c3122`                | Bruno medio (hover)                     |
| `--brown-light` | `#9a6b5a`                | Bruno chiaro (testo secondario)         |
| `--cream`       | `#faf6f3`                | Crema (sfondo body)                     |
| `--text`        | `#2d1a12`                | Colore testo principale                 |
| `--text-muted`  | `#7a5a4e`                | Colore testo secondario                 |
| `--r`           | `20px`                   | Border radius normale                   |
| `--rL`          | `28px`                   | Border radius grande                    |
| `--ease`        | `.42s cubic-bezier(...)` | Easing standard                         |
| `--spring`      | `.55s cubic-bezier(...)` | Easing con effetto molla                |
| `--fd`          | `'Bebas Neue'`           | Font display (titoli grandi)            |
| `--fb`          | `'Outfit'`               | Font body (testo normale)               |
| `--nav`         | `88px`                   | Altezza della navbar                    |

Contiene anche il reset CSS globale e `main { padding-top: var(--nav) }` per non far finire il contenuto sotto la navbar fissa.

---

### `css/animations.css`

Contiene tutti i **`@keyframes`** del sito. Nessuna classe, solo animazioni riutilizzate dagli altri CSS.

| Keyframe      | Usato da                         | Effetto                             |
| ------------- | -------------------------------- | ----------------------------------- |
| `bf`          | `.blob`                          | Movimento lento dei blob di sfondo  |
| `vIn`         | —                                | Non più usato (era per la SPA)      |
| `fsi`         | `.htag`, `.htitle`, `.hsub` ecc. | Fade+slide-in degli elementi hero   |
| `slm`         | `.sline::after`                  | Linea scorrevole animata            |
| `floatCard`   | `.ccard`                         | Fluttuazione lenta delle bento card |
| `lbin`        | `#lb.open`                       | Fade-in del lightbox                |
| `slideUp`     | `#cookie-banner`                 | Slide-up del banner cookie          |
| `twBlink`     | `.tw-cursor`                     | Lampeggio del cursore typewriter    |
| `charSlideUp` | `.char-anim .ca-inner`           | Slide-up singolo carattere          |
| `wordSlideUp` | `.ph-word .pw-inner`             | Slide-up singola parola nei titoli  |

---

### `css/nav.css`

Stili della navbar floating pill e del menu mobile.

**Classi principali:**

- `.nav-wrapper` — contenitore fixed posizionato in alto
- `nav` — la pill stessa, con glassmorphism
- `nav.dark` / `nav.gold` / `nav.purple` — varianti tema
- `.logo` — il logo "NEV."
- `.nl` — ogni link della navbar
- `.nl.active` — link della sezione corrente (evidenziato)
- `.nav-about` — il bottone About (dark pill separata)
- `.burger` — hamburgher menu (visibile solo mobile, `max-width: 820px`)
- `#mobile-menu` — overlay menu mobile
- `#mobile-menu.open` — menu aperto

---

### `css/home.css`

Stili **esclusivi di `index.html`**. Non serve sulle altre pagine.

**Classi principali:**

- `.hero` — sezione hero a tutta altezza
- `.htitle` — il titolone "NEV TOOK THAT."
- `.htag`, `.hsub`, `.hloc`, `.hcta`, `.hscroll` — elementi dell'hero
- `.btn-p` / `.btn-o` — bottoni primario e outline
- `.hcards` — il bento grid (CSS Grid 2fr 1.25fr 1fr)
- `.ccard` — singola card del bento
- `.ccard-ov`, `.ccard-c`, `.ccard-lbl`, `.ccard-title`, `.ccard-badge` — inner della card

---

### `css/gallery.css`

Stili condivisi tra tutte le pagine con gallerie (cars, places, portraits, sottopagine).

**Classi principali:**

- `.ph` — page header (area col titolone di sezione)
- `.ph-inner-glass` — il box frosted glass che contiene il titolo
- `.ph-tag`, `.ph-title`, `.ph-desc` — elementi del page header
- `.ph-word` / `.pw-inner` — wrapper per l'animazione parola per parola
- `.mwrap` — wrapper della masonry (padding)
- `.masonry` — la griglia CSS columns
- `.mi` — singola immagine nella masonry
- `.mi-ov` / `.mi-badge` — overlay e badge all'hover
- `.fbar` — filter bar (usata solo in cars.html)
- `.fpill` — singola pill del filtro
- `.fpill.act` — pill attiva
- `.fdot` — pallino colorato nella pill
- `.pgrid` — griglia pcard (places, portraits)
- `.pcard` — singola card di luoghi/persone
- `.pcard-info`, `.pcard-name`, `.pcard-sub` — testo della card
- `.pcard-mp` — badge "★ Masterpiece" (dorato)
- `.pcard-travels` — badge "Travels"
- `.back` — bottone back (← Torna a...)
- `#cars-loader` — schermata di caricamento cars
- `.cl-title`, `.cl-bar`, `.cl-count` — elementi del loader

---

### `css/masterpieces.css`

Stili per `masterpieces.html` e `masterpieces/porsche911.html`.

**Selettori principali:**

- `body.pg-masterpieces` — sfondo `#080500`, colore testo dorato
- `body.pg-masterpieces::before` — gradient radiale sottile (effetto atmosfera)
- `body.pg-masterpieces::after` — texture grain overlay (SVG inline)
- `#mp-petals` — il canvas dei petali (fixed, z-index 2)
- `.mp-content` — contenitore principale (z-index 3, sopra i petali)
- `.mp-hero`, `.mp-hero-title`, `.mp-hero-eyebrow` — sezione hero masterpieces
- `.mp-stats` — la riga "2 Series · 16 Photos · ∞ Hours"
- `.mp-grid` — griglia 2 colonne delle card
- `.mp-card` — singola card (con overlay, shine, numero gigante)
- `.mp-badge` — badge dorato "★ Masterpiece"
- `.mp-manifesto` — la citazione in fondo
- `.p911-cols`, `.p911-col` — le 3 colonne parallax della Porsche 911

---

### `css/subpages.css`

Stili specifici per le sottopagine tematiche. Usa selettori `body.pg-xxx` per applicare gli stili solo sulla pagina corrispondente.

| Selector             | Pagina                         | Tema                   |
| -------------------- | ------------------------------ | ---------------------- |
| `body.pg-beatrice`   | `masterpieces/beatrice.html`   | Sfondo crema/oro       |
| `body.pg-porsche911` | `masterpieces/porsche911.html` | Sfondo `#060606` nero  |
| `body.pg-bikerfest`  | `portraits/bikerfest.html`     | Sfondo `#08080a` nero  |
| `body.pg-eleonora`   | `portraits/eleonora.html`      | Sfondo blu notte viola |

**Classi per Beatrice:** `.bea-hero`, `.bea-txt`, `.bea-tag`, `.bea-title`, `.bea-quote`, `.bea-ig`, `.bea-num`, `.bea-img`, `.bea-grain`, `.bea-gallery-hd`

**Classi per Porsche 911:** `.p911-head`, `.p911-tag`, `.p911-title`, `.p911-ghost`, `.p911-desc`, `.p911-badge`

**Classi per Bikerfest:** `.bf-head`, `.bf-tag`, `.bf-title`, `.bf-desc`, `.bf-ig`

**Classi per Eleonora:** `.ele-head`, `.ele-tag`, `.ele-title`, `.ele-desc`, `.ele-ig`

---

### `css/pages.css`

Stili per about, contact, footer.

**Classi principali:**

- `.about-grid` — grid 2 colonne (bio + masonry)
- `.about-name` — il titolone "I'M NEV."
- `.about-bio` — il testo bio
- `.about-stats` — grid 2×2 dei numeri stat
- `.stat`, `.stat-n`, `.stat-l` — singola stat box
- `.contact-section` — sezione contatti
- `.contact-title` — "GET IN TOUCH."
- `.contact-cards` — grid delle contact card
- `.contact-card` — singola card (email, Instagram)
- `.cc-icon`, `.cc-label`, `.cc-value` — inner della contact card
- `.collab-card` — card collaborazione (pigeon.jfif)
- `footer` — footer standard
- `footer.dark`, `footer.gold`, `footer.purple` — varianti tema footer

---

### `css/ui.css`

Tutti i componenti UI floating condivisi tra le pagine.

**Componenti:**

- `.blobs`, `.blob`, `.b1/.b2/.b3` — i blob animati in background (fixed, pointer-events none)
- `.glass` — classe utility per glassmorphism (backdrop-filter)
- `.reveal` / `.reveal.vis` — sistema di rivelazione on-scroll (opacity + translateY)
- `#lb` — lightbox overlay
- `.lb-x` — bottone chiudi (✕)
- `.lb-nav`, `.lb-p`, `.lb-n` — bottoni prev/next
- `.lb-cnt`, `.lb-lbl` — contatore e etichetta album
- `#cookie-banner` — il banner cookie
- `.cookie-btn` — bottone "Got it"
- `#cookie-toast` — il toast "thanks for accepting!" con cuori
- `#btt-fixed` — il bottone "Top" floating (appare dopo 300px)
- `#git-float` — il floating button "Get in touch" (in basso a destra)
- `.git-icon`, `.git-label`, `.git-name` — inner del git-float

---

## 6. Dove salvare i dati e le foto

### Regola d'oro

**I dati delle foto vanno in `js/data.js`** (per cars, places, portraits).
**Le foto vanno in `assets/`** nelle sottocartelle appropriate.

### Per Cars

1. Crea la cartella `assets/macchine/nome_modello/`
2. Metti le foto dentro: `foto1.jpg`, `foto2.jpg`, ecc.
3. Apri `js/data.js` e aggiungi un oggetto all'array `CARS`

### Per Places (nuovo luogo)

1. Crea la cartella `assets/luoghi/nome_luogo/`
2. Metti le foto dentro
3. Aggiungi un oggetto a `PLACES` in `js/data.js`
4. Crea il file `places/nome_luogo.html` (copia da un esistente e modifica)
5. Aggiorna `parentMap` in `js/nav.js`:
   ```js
   nome_luogo: 'places',
   ```

### Per Portraits (nuova sessione)

1. Crea la cartella `assets/persone/Nome/`
2. Metti le foto dentro
3. Aggiungi un oggetto a `PEOPLE_DATA` in `js/data.js`
4. Aggiorna `PORTRAIT_URLS` in `js/people.js` con il nome del file HTML:
   ```js
   nuovoid: "portraits/nomenuovo.html";
   ```
5. Crea il file `portraits/nomenuovo.html` (copia da bikerfest o eleonora)
6. Aggiorna `parentMap` in `js/nav.js`:
   ```js
   nomenuovo: 'portraits',
   ```

### Per le foto personali (about.html)

Metti le foto in `assets/mie/`. Il file si chiama `foto1.heic`, `foto2.heic` ecc.
Per aggiungerne o cambiarne il numero, modifica lo script inline in `about.html`:

```js
var photos = [1, 2, 3, 4, 5, 6].map(function (n) {
  return "assets/mie/foto" + n + ".heic";
});
```

Cambia `6` con il numero di foto che hai.

---

## 7. Come aggiungere contenuti

### Aggiungere una foto a un'auto esistente

1. Metti il file in `assets/macchine/nome_modello/fotoN.jpg`
2. In `js/data.js`, nell'oggetto di quell'auto, aggiungi `'fotoN.jpg'` all'array `photos`

### Aggiungere una nuova auto

```js
// In js/data.js, dentro CARS:
{ id:'bmw_m3',  label:'BMW M3 E46', sub:'2001 — Classic Sport',
  accent:'#0d2e5c', dot:'#1a4a8a',
  folder:'assets/macchine/bmw_m3_e46',
  photos:['foto1.jpg','foto2.jpg','foto3.jpg'] }
```

Crea la cartella `assets/macchine/bmw_m3_e46/` e metti le foto.

### Aggiungere un nuovo luogo

1. Crea `assets/luoghi/firenze/` con le foto
2. In `data.js`, aggiungi a `PLACES`:
   ```js
   { id:'firenze', label:'Firenze', sub:'Architettura rinascimentale',
     folder:'assets/luoghi/firenze', cover:'foto1.jpg',
     photos:['foto1.jpg','foto2.jpg','foto3.jpg'] }
   ```
3. Crea `places/firenze.html` (copia `places/molveno.html`, cambia titolo, sottotitolo, foto)
4. In `js/nav.js`, nel `parentMap`:
   ```js
   firenze: 'places',
   ```

### Aggiungere una nuova sessione ritratto

1. Crea `assets/persone/Marco/` con le foto
2. In `data.js`, aggiungi a `PEOPLE_DATA`:
   ```js
   { id:'marco', label:'Marco', sub:'Portrait — Golden Hour',
     folder:'assets/persone/Marco', cover:'foto1.jpg',
     photos:['foto1.jpg','foto2.jpg','foto3.jpg'],
     view:'marco' }
   ```
3. In `people.js`, aggiungi a `PORTRAIT_URLS`:
   ```js
   marco: "portraits/marco.html";
   ```
4. Crea `portraits/marco.html` (copia `portraits/eleonora.html`, cambia contenuti)
5. In `nav.js`, nel `parentMap`:
   ```js
   marco: 'portraits',
   ```

### Cambiare le statistiche in about.html

Cerca in `about.html` la sezione `.about-stats` e modifica i valori `.stat-n` e `.stat-l`:

```html
<div class="stat">
  <div class="stat-n">8+</div>
  ← il numero grande
  <div class="stat-l">Years Shooting</div>
  ← l'etichetta sotto
</div>
```

### Cambiare i contatori nella bento grid (home)

In `index.html`, dentro ogni `.ccard`, trovi `.ccard-lbl` con testo tipo `"61 Photos · 7 Models"`. È testo statico — aggiornalo manualmente quando aggiungi foto.

---

## 8. Dati salvati nel browser (localStorage)

Il sito usa **solo `localStorage`**, niente `sessionStorage` o cookie reali.

| Chiave           | Valore | Quando viene salvata                       | Quando viene letta                     |
| ---------------- | ------ | ------------------------------------------ | -------------------------------------- |
| `cookieAccepted` | `'1'`  | Quando l'utente clicca "Got it" sul banner | All'avvio di ogni pagina (in `nav.js`) |

**Non c'è nient'altro.** Il sito non salva preferenze di tema, scroll position, filtri selezionati, o altro.

**Per resettare il cookie** (far riapparire il banner): apri la console del browser (`F12`) e digita:

```js
localStorage.removeItem("cookieAccepted");
```

Poi ricarica la pagina.

**Il localStorage è per dominio** (`nevwithahoodie.github.io`). Accettare su una pagina vale per tutto il sito.

---

## 9. Temi visivi per pagina

Ogni pagina ha un tema visivo che cambia sfondo, colore navbar e colore footer. Il tema è controllato dalle classi sul `<body>`.

| Pagina                         | Classi `<body>`              | Navbar     | Footer   |
| ------------------------------ | ---------------------------- | ---------- | -------- |
| `index.html`                   | _(nessuna)_                  | Chiara     | Standard |
| `cars.html`                    | _(nessuna)_                  | Chiara     | Standard |
| `places.html`                  | _(nessuna)_                  | Chiara     | Standard |
| `portraits.html`               | _(nessuna)_                  | Chiara     | Standard |
| `about.html`                   | _(nessuna)_                  | Chiara     | Standard |
| `masterpieces.html`            | `theme-dark pg-masterpieces` | Dark       | Dark     |
| `masterpieces/beatrice.html`   | `theme-gold pg-beatrice`     | Gold       | Gold     |
| `masterpieces/porsche911.html` | `theme-dark pg-porsche911`   | Dark       | Dark     |
| `portraits/bikerfest.html`     | `theme-dark pg-bikerfest`    | Dark       | Dark     |
| `portraits/eleonora.html`      | `theme-purple pg-eleonora`   | Dark viola | Purple   |
| `places/*.html`                | _(nessuna)_                  | Chiara     | Dark     |

**Come funziona:** `css/subpages.css` usa `body.pg-xxx` per applicare sfondo e colori specifici. `js/nav.js` legge `theme-dark/gold/purple` dal body e applica la classe corrispondente alla `<nav>` e al `#mobile-menu`.

---

## 10. Ordine di caricamento script

L'ordine degli script in ogni pagina è deliberato e importante.

### `index.html`

```
1. nav.js        → inizializzazione immediata (attivo nav, cookie check)
2. animations.js → definisce runTypewriter()
3. [inline]      → DOMContentLoaded: chiama runTypewriter()
```

### `cars.html`

```
1. data.js       → definisce CARS[]
2. lightbox.js   → definisce lbOpen/Close/Nav
3. masonry.js    → definisce buildMasonry()
4. cars.js       → definisce initCars(), filterCars()
5. nav.js        → inizializzazione immediata + trigReveal + cookie
6. [inline]      → DOMContentLoaded: chiama initCars()
```

### `places.html`

```
1. data.js
2. places.js     → definisce initPlaces()
3. nav.js
4. [inline]      → DOMContentLoaded: chiama initPlaces()
```

### `portraits.html`

```
1. data.js
2. people.js     → definisce initPeople()
3. nav.js
4. [inline]      → DOMContentLoaded: chiama initPeople()
```

### `masterpieces.html`

```
1. animations.js → definisce startPetals()
2. nav.js
3. [inline]      → DOMContentLoaded: chiama startPetals()
```

### Sottopagine (places/_, portraits/_, masterpieces/beatrice)

```
1. lightbox.js
2. masonry.js
3. nav.js
4. [inline]      → DOMContentLoaded: chiama buildMasonry()
```

### `masterpieces/porsche911.html`

```
1. lightbox.js
2. nav.js
3. [inline]      → DOMContentLoaded: costruisce colonne + parallax
```

**Regola generale:** `data.js` deve stare prima di qualsiasi JS che usa `CARS`, `PLACES` o `PEOPLE_DATA`. `nav.js` può stare dopo gli altri perché la maggior parte delle sue funzioni è chiamata su `DOMContentLoaded`.

---

## 11. Checklist per il deploy su GitHub Pages

1. **Struttura cartelle** — la cartella radice del repo deve contenere `index.html` come primo file
2. **Cartella `assets/`** — deve essere nella stessa cartella di `index.html`
3. **Cartella `css/`** e **`js/`** — stessa cosa
4. **Case sensitivity** — GitHub Pages è case-sensitive (Linux). Se il tuo file si chiama `Beatrice/foto1.heic` e nel codice hai `beatrice/foto1.heic` non funzionerà. Controlla sempre maiuscole e minuscole nei path di `data.js` e negli HTML delle sottopagine
5. **File `.heic`** — i browser Safari li leggono nativamente; Chrome/Firefox potrebbero non mostrarli. Considera di convertire in `.jpg` per compatibilità universale
6. **`assets/media/preview.jpg`** — è l'immagine usata quando qualcuno condivide il link su WhatsApp/Telegram/Twitter. Dovrebbe essere 1200×630px
7. **`assets/media/logo.png`** — usato come favicon. Ideale 512×512px
8. **Email nei footer** — già configurata come `navpreet.singh1209@gmail.com` in tutti i file

---

## 12. Cose da NON toccare

- **L'ordine degli script** negli `<head>` e prima di `</body>` — rompe tutto
- **Le classi `theme-dark/gold/purple` e `pg-xxx` sul `<body>`** — controllano il tema visivo
- **I `data-page` sui link della navbar** — usati da `nav.js` per capire quale link evidenziare
- **L'id `#lb`, `#lb-img`, `#lb-lbl`, `#lb-cnt`** — usati da `lightbox.js`
- **Gli id `#btt-fixed`, `#cookie-banner`, `#cookie-toast`, `#mobile-menu`, `#nav`** — usati da `nav.js`
- **L'id `#fbar`, `#cars-masonry`, `#cl-bar`, `#cl-count`** — usati da `cars.js`
- **Il `<canvas id="mp-petals">`** in `masterpieces.html` — usato da `animations.js`
- **I selettori CSS in `vars.css`** — ogni variabile è usata decine di volte negli altri CSS

---

## 13. Cose da cambiare in sicurezza

- **Testi** in qualsiasi HTML: titoli, bio, descrizioni, footer copy
- **Foto**: aggiungi/rimuovi aggiornando l'array `photos` in `data.js`
- **Colori** del tema: modifica le variabili in `css/vars.css`
- **Email e link social**: cercando `navpreet.singh1209` e `nev.shotz` negli HTML
- **Statistiche** in `about.html`: i numeri dentro `.stat-n`
- **Contatori** nel bento grid di `index.html`: il testo dentro `.ccard-lbl`
- **Bio** in `about.html`: il testo dentro `.about-bio`
- **Anno nel copyright**: cerca `2026` negli HTML
- **Citazione Beatrice**: il testo `.bea-quote` in `masterpieces/beatrice.html`
- **Citazione Masterpieces**: il testo `.mp-manifesto-quote` in `masterpieces.html`
- **Basato a Pordenone**: il testo `.hloc` in `index.html`
- **Font**: cambia il link Google Fonts nel `<head>` di ogni pagina e aggiorna `--fd` e `--fb` in `vars.css`
- **Numero foto "mie"** (about.html): il `6` nello script inline di `about.html`

---

_Documento generato automaticamente — ultima versione: portfolio_v2_
