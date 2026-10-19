/* Panda on Wheels – language toggle + WhatsApp links (no dependencies) */
(function () {
  'use strict';

  var NUMBER = String(window.WHATSAPP_NUMBER || '').replace(/\D/g, '');
  var DISPLAY = window.WHATSAPP_DISPLAY || ('+' + NUMBER);
  var STORAGE_KEY = 'pow-lang';
  var NOTE_KEY = 'pow-lang-note';

  // Prefilled WhatsApp messages, per language and purpose
  var WA_TEXT = {
    en: {
      general: "Hi Panda on Wheels! I'd like some info about bike rentals / taxi rides.",
      rental:  "Hi Panda on Wheels! I'd like to rent a motorcycle or scooter.\nDates: \nNumber of bikes: \nCould you send me your rates? Thanks!",
      taxi:    "Hi Panda on Wheels! I'd like to book a ride.\nFrom: \nTo: \nDate & time: \nNumber of people / surfboards: \nThanks!",
      surf:    "Hi Panda on Wheels, I'd like to ask about surf photography."
    },
    es: {
      general: "¡Hola Panda on Wheels! Quisiera información sobre el alquiler de motos / el servicio de taxi.",
      rental:  "¡Hola Panda on Wheels! Quisiera alquilar una moto o scooter.\nFechas: \nCuántas motos: \n¿Me pueden pasar las tarifas? ¡Gracias!",
      taxi:    "¡Hola Panda on Wheels! Quisiera reservar un viaje.\nDesde: \nHasta: \nFecha y hora: \nCuántas personas / tablas: \n¡Gracias!",
      surf:    "¡Hola Panda on Wheels! Quisiera consultar por fotografía de surf."
    }
  };

  // Spanish copy. English lives in index.html (default, and what crawlers see).
  var ES = {
    'meta.title': 'Panda on Wheels | Alquiler de motos y taxi en Aserradores, Nicaragua',
    'meta.description': 'Alquiler de motos y scooters por día o por mes (casco incluido) y servicio de taxi local en Aserradores, Chinandega, Nicaragua. Traslados desde el aeropuerto de Managua y desde León. Reservá por WhatsApp.',
    'skip': 'Saltar al contenido',
    'lang.note': 'Read in English',
    'lang.label': 'Idioma',
    'lang.dismiss': 'Cerrar',
    'nav.rentals': 'Motos en alquiler',
    'nav.menu': 'Menú',
    'nav.taxi': 'Taxi',
    'nav.surf': 'Fotografía de surf',
    'nav.book': 'Reservar',
    'hero.eyebrow': 'Aserradores · Chinandega · Nicaragua',
    'hero.title': 'Alquiler de motos y taxi local en la costa norte de Nicaragua',
    'hero.lead': 'Explorá Aserradores y las playas del norte de Nicaragua a tu ritmo. Alquilamos motos y scooters confiables y bien mantenidos por día o por mes, con casco y portatablas incluidos. Son perfectos para chequear las olas, recorrer playas o explorar la costa. ¿Preferís que te lleven? Nuestro servicio de taxi local cubre traslados desde el aeropuerto de Managua y desde León, viajes a Chinandega y recorridos entre playas y spots de surf. Nuestros conductores locales conocen muy bien estas rutas. Escribinos por WhatsApp para reservar una moto o un viaje.',
    'hero.cta': 'Escribinos por WhatsApp',
    'hero.ctaBike': 'Alquilar moto',
    'hero.ctaTaxi': 'Pedir un viaje',
    'hero.phone': 'WhatsApp:',
    'rentals.kicker': 'Motos y scooters',
    'rentals.title': 'Alquilá una moto y movete a tu ritmo',
    'rentals.body': 'Alquilamos motos y scooters confiables y bien mantenidas, por día o por mes. Ideales para ir a ver las olas, pasear de playa en playa o conocer la costa.',
    'rentals.li1': 'Alquiler por día o por mes',
    'rentals.li2': 'Casco incluido',
    'rentals.rack': 'Portatablas en todas las motos',
    'rentals.li3': 'Motos confiables y bien mantenidas',
    'rentals.li4': 'Perfectas para chequear las olas y recorrer playas',
    'rentals.price': '$15 por día',
    'rentals.priceMonth': '$300 por mes',
    'rates': 'Escribinos y te pasamos las tarifas',
    'rentals.cta': 'Consultar por una moto en WhatsApp',
    'taxi.kicker': 'Taxi y traslados al aeropuerto',
    'taxi.title': '¿Preferís que te lleven?',
    'taxi.body': 'Con nuestro servicio de taxi local llegás a donde necesitás. Nuestros conductores son de aquí, conocen bien estos caminos y en la parrilla del techo hay espacio para tus tablas.',
    'taxi.li1': 'Recogida en el aeropuerto: desde Managua y León',
    'taxi.li2': 'Viajes a Chinandega',
    'taxi.li3': 'Traslados entre playas y puntos de surf',
    'taxi.li4': 'Espacio para tus tablas de surf',
    'taxi.cta': 'Reservar un viaje por WhatsApp',
    'host.kicker': 'Negocio local',
    'host.title': 'Conocé a tu anfitrión local',
    'host.body': 'Alquilá con Panda on Wheels y tratás directo con Elmer Flores, un orgulloso local de Aserradores que conoce la zona como nadie. Sus motos y su taxi siempre están limpios y a punto, maneja todo con seriedad y te responde rápido por WhatsApp. Agarrá una moto, andá detrás de las olas y dejá el resto en manos de Elmer.',
    'surf.title': 'Fotografía de surf',
    'surf.body': 'Sesiones privadas de fotos de surf con uno de los fotógrafos locales con más experiencia en The Boom. Metele duro y nosotros nos encargamos del resto. Escribinos por WhatsApp para reservar.',
    'surf.lead': 'Tus mejores olas merecen más que un video borroso del celular. Confiá en uno de los fotógrafos de surf locales con más experiencia en Aserradores. Cuando el swell está bombeando, está en la playa con el equipo adecuado, atento a cada serie. Cada foto se edita, así ese tubo, esa maniobra o ese bottom turn limpio quedan tan bien como se sintieron. Remá, metele duro y escribinos por WhatsApp para coordinar tu sesión privada de fotos.',
    'surf.cta': 'Escribinos por WhatsApp',
    'surf.more': 'Más información',
    'surf.ig': 'Mirá más en Instagram',
    'surf.igLink': '@filmingbyflores88 en Instagram',
    'surf.photosTitle': 'Fotos de surf',
    'surf.photosNote': 'Acá van a ir las fotos de surf.',
    'surf.credit': 'Fotos de Elmer Flores · <a href="https://www.instagram.com/filmingbyflores88/" target="_blank" rel="noopener">@filmingbyflores88</a>',
    'surf.lbClose': 'Cerrar',
    'surf.lbPrev': 'Foto anterior',
    'surf.lbNext': 'Foto siguiente',
    'surf.p01': 'Surfista metido en un tubo verde en una playa cerca de Aserradores',
    'surf.p02': 'Surfista bajando la pared de una ola cerca de Aserradores',
    'surf.p03': 'Surfista entrando en una ola empinada cerca de Aserradores',
    'surf.p04': 'Tubo vacío en el norte de Nicaragua',
    'surf.p06': 'Tubo hueco recorriendo una playa en el norte de Nicaragua',
    'surf.p07': 'Surfista adentro de un tubo en el norte de Nicaragua',
    'surf.p08': 'Surfista arriba en la pared de una ola cerca de Aserradores',
    'surf.p09': 'Surfista recorriendo una ola que rompe cerca de Aserradores',
    'surf.p10': 'Surfista entrando a un tubo cerca de Aserradores',
    'surf.hero': 'Ola verde y cristalina al atardecer cerca de Aserradores',
    'surf.p11': 'Surfista corriendo a lo largo de una ola que rompe cerca de Aserradores',
    'surf.p12': 'Surfista agachado dentro de un tubo cerca de Aserradores',
    'surf.p13': 'Surfista bien adentro de un tubo cerca de Aserradores',
    'surf.p14': 'Surfista metido en un tubo, con la mano en el agua, cerca de Aserradores',
    'surf.p15': 'Surfista saliendo de un tubo cerca de Aserradores',
    'surf.p16': 'Surfista entrando a un tubo oscuro cerca de Aserradores',
    'surf.p17': 'Surfista atravesando un tubo cerca de Aserradores',
    'meta.title.surf': 'Fotografía de surf | Panda on Wheels',
    'meta.description.surf': 'Fotografía de surf local en Aserradores. Escribinos por WhatsApp para coordinar tu sesión privada de fotos.',
    'gallery.title': 'Nuestras motos y el taxi',
    'book.title': 'Cómo reservar',
    'book.s1t': 'Escribinos por WhatsApp',
    'book.s1': 'Tocá uno de los botones de abajo y se abre WhatsApp con un mensaje listo para mandar.',
    'book.s2t': 'Contanos qué necesitás',
    'book.s2': 'Para una moto: tus fechas. Para un taxi: de dónde, a dónde, cuándo y cuántas personas.',
    'book.s3t': 'Confirmamos y listo',
    'book.s3': 'Te respondemos con tarifas y disponibilidad, y dejamos reservada tu moto o tu viaje.',
    'book.ctaBike': 'Reservar una moto',
    'book.ctaTaxi': 'Reservar un viaje',
    'footer.tagline': 'Alquiler de motos y scooters · Taxi local',
    'footer.where': 'Dónde estamos',
    'footer.map': 'Cómo llegar',
    'review.cta': 'Dejanos tu reseña',
    'float': 'Escribinos por WhatsApp',
    'floatShort': 'WhatsApp',
    'img.hero': 'Local de Panda on Wheels en Aserradores: motos alineadas a ambos lados de un carro blanco estacionado frente a la casa',
    'img.video': 'Video corto: una moto roja de alquiler estacionada frente a un árbol enorme en el monte',
    'img.taxi': 'Taxi blanco de Panda on Wheels con tablas de surf en la parrilla del techo, en un camino adoquinado bajo los árboles',
    'img.host': 'Elmer Flores, dueño de Panda on Wheels, con el taxi y las motos de alquiler',
    'img.g1': 'La casa de Panda on Wheels con el taxi al centro y motos a ambos lados',
    'img.g2': 'Vista de frente del taxi blanco con tablas de surf amarradas en la parrilla del techo',
    'img.logo': 'Logo de Panda on Wheels: un panda en moto con una tabla de surf. Motos for rent',
    'img.g3': 'Tres motos azules de alquiler estacionadas junto al taxi blanco de Panda on Wheels'
  };

  var EN = {}; // filled from the original HTML so switching back is lossless
  var metaDesc = document.querySelector('meta[name="description"]');

  function metaKeys() {
    var page = document.documentElement.getAttribute('data-page');
    if (page) return { title: 'meta.title.' + page, description: 'meta.description.' + page };
    return { title: 'meta.title', description: 'meta.description' };
  }

  function collectEnglish() {
    var keys = metaKeys();
    EN[keys.title] = document.title;
    EN[keys.description] = metaDesc ? metaDesc.getAttribute('content') : '';
    each('[data-i18n]', function (el) { EN[el.getAttribute('data-i18n')] = el.innerHTML; });
    each('[data-i18n-alt]', function (el) { EN[el.getAttribute('data-i18n-alt')] = el.getAttribute('alt'); });
    each('[data-i18n-aria]', function (el) { EN[el.getAttribute('data-i18n-aria')] = el.getAttribute('aria-label'); });
  }

  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  function waUrl(kind, lang) {
    var text = (WA_TEXT[lang] || WA_TEXT.en)[kind] || WA_TEXT[lang].general;
    return 'https://wa.me/' + NUMBER + '?text=' + encodeURIComponent(text);
  }

  function applyLang(lang) {
    if (lang !== 'es') lang = 'en';
    var dict = lang === 'es' ? ES : EN;
    document.documentElement.lang = lang === 'es' ? 'es-NI' : 'en';
    var keys = metaKeys();
    if (dict[keys.title] != null) document.title = dict[keys.title];
    if (metaDesc && dict[keys.description] != null) metaDesc.setAttribute('content', dict[keys.description]);
    each('[data-i18n]', function (el) {
      var v = dict[el.getAttribute('data-i18n')]; if (v != null) el.innerHTML = v;
    });
    each('[data-i18n-alt]', function (el) {
      var v = dict[el.getAttribute('data-i18n-alt')]; if (v != null) el.setAttribute('alt', v);
    });
    each('[data-i18n-aria]', function (el) {
      var v = dict[el.getAttribute('data-i18n-aria')]; if (v != null) el.setAttribute('aria-label', v);
    });
    each('.js-wa', function (el) { el.href = waUrl(el.getAttribute('data-wa') || 'general', lang); });
    each('.lang button', function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function dismissLangNote() {
    var note = document.getElementById('lang-note');
    if (note) note.hidden = true;
    try { localStorage.setItem(NOTE_KEY, '1'); } catch (e) {}
  }

  function initialLang() {
    var q = /[?&]lang=(en|es)\b/.exec(location.search); // handy for sharing / testing
    if (q) return q[1];
    try { var s = localStorage.getItem(STORAGE_KEY); if (s) return s; } catch (e) {}
    return 'en'; // default English
  }

  // Respect reduced-motion: show the poster instead of the looping clip
  function handleMotion() {
    var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    function update() {
      each('.js-motion-video', function (v) {
        var card = v.closest('.video-card');
        if (mq && mq.matches) {
          if (card) card.classList.add('reduced');
          try { v.pause(); } catch (e) {}
          v.removeAttribute('autoplay');
        } else {
          if (card) card.classList.remove('reduced');
          var p = v.play && v.play(); if (p && p.catch) p.catch(function () {});
        }
      });
    }
    update();
    if (mq) { mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update); }
  }

  collectEnglish();
  each('.js-wa-display', function (el) { el.textContent = DISPLAY; });
  each('.lang button', function (b) {
    b.addEventListener('click', function () {
      applyLang(b.getAttribute('data-lang'));
      dismissLangNote();
    });
  });
  var noteGo = document.querySelector('.lang-note-go');
  var noteX = document.querySelector('.lang-note-x');
  if (noteGo) noteGo.addEventListener('click', function () {
    applyLang(document.documentElement.lang === 'es-NI' ? 'en' : 'es');
    dismissLangNote();
  });
  if (noteX) noteX.addEventListener('click', dismissLangNote);
  applyLang(initialLang());
  handleMotion();

  // Floating button: hide it while the big hero WhatsApp button is on screen
  var fl = document.querySelector('.wa-float'), heroCta = document.querySelector('.hero .btn-xl') || document.querySelector('main .btn-wa.btn-xl');
  if (fl && heroCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      fl.classList.toggle('is-hidden', entries[0].isIntersecting);
    }).observe(heroCta);
  }
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-toggle');
  var siteNav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!header || !menuBtn) return;
    header.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeMenu() { setMenu(false); }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
  }
  if (siteNav) {
    siteNav.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a') : null;
      if (!link) return;
      var href = link.getAttribute('href') || '';
      if (href.charAt(0) !== '#') return;
      if (window.matchMedia('(min-width: 900px)').matches) return;
      var target = document.querySelector(href);
      e.preventDefault();
      closeMenu();
      if (target && target.scrollIntoView) {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }
      if (history.pushState) history.pushState(null, '', href);
    });
  }
  document.addEventListener('click', function (e) {
    if (!header || !header.classList.contains('is-open')) return;
    if (header.contains(e.target)) return;
    closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lbOpen()) { closeLb(); return; }
      closeMenu();
    }
    if (!lbOpen()) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); stepLb(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); stepLb(-1); }
  });
  var wideNav = window.matchMedia('(min-width: 900px)');
  function closeMenuWhenWide() { if (wideNav.matches) closeMenu(); }
  if (wideNav.addEventListener) wideNav.addEventListener('change', closeMenuWhenWide);
  else if (wideNav.addListener) wideNav.addListener(closeMenuWhenWide);

  var lb = document.getElementById('surf-lightbox');
  var lbImg = lb ? lb.querySelector('.surf-lb-img') : null;
  var shots = lb ? Array.prototype.slice.call(document.querySelectorAll('.surf-shot')) : [];
  var lbIndex = 0;
  var lbReturn = null;

  function lbOpen() { return !!(lb && !lb.hidden); }
  function showLb(i) {
    if (!shots.length) return;
    lbIndex = (i + shots.length) % shots.length;
    var shot = shots[lbIndex];
    var img = shot.querySelector('img');
    lbImg.src = shot.getAttribute('data-full');
    lbImg.alt = img ? img.alt : '';
  }
  function openLb(i, from) {
    if (!lb) return;
    closeMenu();
    lbReturn = from || null;
    lb.hidden = false;
    document.body.classList.add('surf-lb-open');
    showLb(i);
    var x = lb.querySelector('.surf-lb-x');
    if (x) x.focus();
  }
  function closeLb() {
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    lbImg.removeAttribute('src');
    document.body.classList.remove('surf-lb-open');
    if (lbReturn && lbReturn.focus) lbReturn.focus();
  }
  function stepLb(delta) { showLb(lbIndex + delta); }

  if (lb && shots.length) {
    shots.forEach(function (shot, i) {
      shot.addEventListener('click', function () { openLb(i, shot); });
    });
    lb.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.closest && t.closest('[data-lb-close]')) { closeLb(); return; }
      var dir = t && t.getAttribute && t.getAttribute('data-lb-dir');
      if (dir) stepLb(Number(dir));
    });
    var touchX = 0;
    var touchY = 0;
    lb.addEventListener('touchstart', function (e) {
      if (!e.touches || !e.touches[0]) return;
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      var t = e.changedTouches && e.changedTouches[0];
      if (!t || !lbOpen()) return;
      var dx = t.clientX - touchX;
      var dy = t.clientY - touchY;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      stepLb(dx < 0 ? 1 : -1);
    }, { passive: true });
  }
})();
