// Richting B · navigatie die voorbij de hero een compacte vaste balk wordt, en "naar boven".
(function () {
  var plek = document.querySelector('.header-plek');
  var header = document.querySelector('.header');
  var hero = document.querySelector('.hero-wrap');
  var naarBoven = document.querySelector('.naar-boven');
  if (!plek || !header || !hero) return;

  var vast = false;

  // De plaatshouder krijgt de hoogte van de gewone header, zodat de pagina
  // niet opschuift wanneer de header loskomt. Alleen meten in de gewone toestand.
  function meet() {
    if (!vast) plek.style.height = header.offsetHeight + 'px';
  }

  function grens() {
    // net vóór het einde van de hero
    return hero.offsetTop + hero.offsetHeight - 40;
  }

  function wordVast() {
    vast = true;
    header.classList.remove('is-weg');
    header.classList.add('is-vast');
  }

  function laatLos() {
    if (header.classList.contains('is-weg')) return;
    header.classList.add('is-weg');          // glijdt zacht weg …
  }

  header.addEventListener('animationend', function (e) {
    if (e.animationName === 'header-uit' && header.classList.contains('is-weg')) {
      header.classList.remove('is-vast', 'is-weg');   // … en wordt weer de gewone header
      vast = false;
      // niet opnieuw meten: het logo groeit nog terug, de plaatshouder houdt zijn hoogte
    }
  });

  var gepland = false;
  function update() {
    var y = window.scrollY || window.pageYOffset;
    if (y > grens()) {
      if (!vast || header.classList.contains('is-weg')) wordVast();
    } else if (vast) {
      laatLos();
    }
    if (naarBoven) naarBoven.classList.toggle('is-zichtbaar', y > window.innerHeight * 0.8);
    gepland = false;
  }

  window.addEventListener('scroll', function () {
    if (!gepland) { gepland = true; requestAnimationFrame(update); }
  }, { passive: true });
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { meet(); update(); }, 150);   // na het herschalen, als alles stil staat
  });
  window.addEventListener('load', meet);
  meet();
  update();
})();
