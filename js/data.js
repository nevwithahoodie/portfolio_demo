/* ══════════════════════════════════
   DATA — CARS, PLACES, PEOPLE
   Unico file da modificare per aggiungere foto.
══════════════════════════════════ */

function _seq(prefix, count) {
  return Array.from({ length: count }, (_, i) =>
    prefix + String(i + 1).padStart(2, '0') + '.webp'
  );
}

const CARS = [
  { id:'miata',    label:'Mazda MX-5',         sub:'2025 — Nei Vigneti',  accent:'#3d5c35', dot:'#5a8a4e',
    folder:'gallery/content/cars/mazda/mx5/2025',            cover:'mazda-mx5-2025-01.webp',
    photos: _seq('mazda-mx5-2025-', 15) },
  { id:'fastback', label:'Mustang Fastback',    sub:'1967 GT 390',         accent:'#9e2518', dot:'#c0392b',
    folder:'gallery/content/cars/ford/mustang/fastback',     cover:'ford-mustang-fastback-01.webp',
    photos: _seq('ford-mustang-fastback-', 12) },
  { id:'v8',       label:'Mustang GT V8',       sub:'Ford 5.0',            accent:'#6a1818', dot:'#8b2020',
    folder:'gallery/content/cars/ford/mustang/gt-v8',        cover:'ford-mustang-gt-v8-01.webp',
    photos: _seq('ford-mustang-gt-v8-', 8) },
  { id:'escort',   label:'Escort RS Cosworth',  sub:'Ford',                accent:'#253d32', dot:'#336650',
    folder:'gallery/content/cars/ford/escort-rs',            cover:'ford-escort-rs-01.webp',
    photos: _seq('ford-escort-rs-', 5) },
  { id:'celica',   label:'Toyota Celica',       sub:'The Mural Session',   accent:'#a62808', dot:'#d43010',
    folder:'gallery/content/cars/toyota/celica',             cover:'toyota-celica-01.webp',
    photos: _seq('toyota-celica-', 10) }
];

const PLACES = [
  { id:'cansiglio', label:'Cansiglio',        sub:'Foresta illuminata',
    folder:'gallery/content/places/cansiglio',   cover:'cansiglio-01.webp',    photos: _seq('cansiglio-', 3) },
  { id:'molveno',   label:'Molveno',          sub:'Paesaggio alpino',
    folder:'gallery/content/places/molveno',     cover:'lake-molveno-01.webp', photos: _seq('lake-molveno-', 6) },
  { id:'verona',    label:'Verona',           sub:'Torre e palazzi',
    folder:'gallery/content/places/verona',      cover:'verona-01.webp',       photos: _seq('verona-', 7) },
  { id:'india',     label:'Virasat-e-Khalsa', sub:'Museo · India',
    folder:'gallery/content/places/museo-india', cover:'museo-india-01.webp',  photos: _seq('museo-india-', 7) },
  { id:'miramare',  label:'Castello di Miramare', sub:'Trieste · Adriatico',
    folder:'gallery/content/places/castello-di-miramare', cover:'castello-di-miramare-01.webp',
    photos: _seq('castello-di-miramare-', 7) }
];

const PEOPLE_DATA = [
  { id:'beatrice', label:'Beatrice',   sub:'Portrait — Museum',
    folder:'gallery/content/people/beatrice',  cover:'beatrice-02.webp',
    photos: _seq('beatrice-', 8), masterpiece:true, view:'beatrice' },
  { id:'bfest',    label:'Biker Fest', sub:'Live Music — KillingKlub',
    folder:'gallery/content/people/bikerfest', cover:'bikerfest-01.webp',
    photos: _seq('bikerfest-', 12), view:'bikerfest' },
  { id:'eleo',     label:'Eleonora',   sub:'Portrait — Dusk',
    folder:'gallery/content/people/eleonora', cover:'eleonora-01.webp',
    photos: _seq('eleonora-', 4), view:'eleonora' },
  { id:'aurora',   label:'Aurora',     sub:'Portrait — Earth & Light',
    folder:'gallery/content/people/rora', cover:'rora-01.webp',
    photos: _seq('rora-', 6), view:'aurora' }
];
