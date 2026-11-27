/* ============================================================
   Edgarfdesign — interacciones
   Sin dependencias. Todo lo esencial funciona sin este archivo
   salvo abrir la galería y reproducir los videos.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menú móvil ---------- */
  (function menu() {
    var toggle = document.querySelector('.nav__toggle');
    var sheet = document.getElementById('menu');
    if (!toggle || !sheet) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      sheet.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    sheet.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  })();

  /* ---------- Galería ---------- */
  (function gallery() {
    var dialog = document.getElementById('lightbox');
    var stage = document.getElementById('lb-stage');
    var titleEl = document.getElementById('lb-title');
    var countEl = document.getElementById('lb-count');
    var btnPrev = dialog && dialog.querySelector('.lightbox__nav--prev');
    var btnNext = dialog && dialog.querySelector('.lightbox__nav--next');
    if (!dialog || !stage || !dialog.showModal) return;

    var images = [];
    var index = 0;
    var trigger = null;

    function show(i) {
      index = (i + images.length) % images.length;
      var img = document.createElement('img');
      img.src = images[index];
      img.alt = titleEl.textContent + ', pieza ' + (index + 1);
      stage.replaceChildren(img);
      countEl.textContent = (index + 1) + ' / ' + images.length;
      btnPrev.hidden = images.length < 2;
      btnNext.hidden = images.length < 2;
    }

    function open(button) {
      var raw = button.getAttribute('data-images') || '';
      images = raw.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      if (!images.length) return;
      trigger = button;
      titleEl.textContent = button.getAttribute('data-project') || 'Proyecto';
      show(0);
      dialog.showModal();
    }

    function close() {
      dialog.close();
      stage.replaceChildren();
    }

    document.querySelectorAll('.tile').forEach(function (button) {
      button.addEventListener('click', function () { open(button); });
    });

    btnPrev.addEventListener('click', function () { show(index - 1); });
    btnNext.addEventListener('click', function () { show(index + 1); });

    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) close();
    });
    dialog.querySelector('.lightbox__close').addEventListener('click', close);

    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    });

    dialog.addEventListener('close', function () {
      stage.replaceChildren();
      if (trigger) trigger.focus({ preventScroll: false });
    });

    // deslizar en pantalla táctil
    var startX = null;
    stage.addEventListener('pointerdown', function (e) { startX = e.clientX; });
    stage.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) < 40) return;
      show(dx > 0 ? index - 1 : index + 1);
    });
    stage.addEventListener('pointercancel', function () { startX = null; });
  })();

  /* ---------- Videos verticales ---------- */
  (function videos() {
    var phones = document.querySelectorAll('.phone');
    if (!phones.length) return;

    phones.forEach(function (phone) {
      var video = phone.querySelector('video');
      var play = phone.querySelector('.phone__play');
      if (!video || !play) return;

      video.muted = true;

      play.addEventListener('click', function () {
        phones.forEach(function (other) {
          if (other === phone) return;
          var v = other.querySelector('video');
          if (v && !v.paused) { v.pause(); other.classList.remove('is-playing'); }
        });

        video.muted = false;
        var playing = video.play();
        if (playing && playing.catch) playing.catch(function () { video.muted = true; video.play(); });
        phone.classList.add('is-playing');
      });

      video.addEventListener('click', function () {
        if (video.paused) { video.play(); phone.classList.add('is-playing'); }
        else { video.pause(); phone.classList.remove('is-playing'); }
      });

      video.addEventListener('pause', function () { phone.classList.remove('is-playing'); });
      video.addEventListener('play', function () { phone.classList.add('is-playing'); });
    });
  })();

  /* ---------- Muro: el trabajo se revela al entrar ---------- */
  (function develop() {
    var wall = document.getElementById('wall');
    if (!wall || reduceMotion) return;

    var tiles = Array.prototype.slice.call(wall.querySelectorAll('.tile'));
    if (!tiles.length) return;

    var done = false;
    var io = new IntersectionObserver(function (entries) {
      if (done) return;
      var visible = entries.some(function (e) { return e.isIntersecting; });
      if (!visible) return;

      done = true;
      io.disconnect();

      // la onda baja en diagonal según las columnas reales de la retícula
      var cols = (getComputedStyle(wall).gridTemplateColumns || '').split(' ').length || 4;

      tiles.forEach(function (tile, n) {
        var img = tile.querySelector('img');
        if (!img || typeof img.animate !== 'function') return;
        var delay = (n % cols) * 70 + Math.floor(n / cols) * 110;
        img.animate(
          [
            { filter: 'grayscale(1) blur(12px)', opacity: 0.15 },
            { filter: 'none', opacity: 1 }
          ],
          { duration: 800, delay: delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }
        );
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    io.observe(wall);
  })();

  /* ---------- Cierre: el titular se enciende con el scroll ---------- */
  (function highlight() {
    var h2 = document.querySelector('.closing__cta h2');
    if (!h2 || reduceMotion) return;

    var words = h2.textContent.trim().split(/\s+/);
    if (words.length < 2) return;

    h2.textContent = '';
    var spans = words.map(function (word, i) {
      var span = document.createElement('span');
      span.className = 'w';
      span.textContent = word;
      h2.appendChild(span);
      if (i < words.length - 1) h2.appendChild(document.createTextNode(' '));
      return span;
    });

    var frame = 0;
    function paint() {
      frame = 0;
      var vh = window.innerHeight;
      var box = h2.getBoundingClientRect();
      if (box.top > vh + 240) return;          // todavía lejos: no gastamos nada

      var start = vh * 0.88;
      var end = vh * 0.34;

      spans.forEach(function (span, i) {
        var top = span.getBoundingClientRect().top;
        var t = (start - top) / (start - end);
        // pequeño desfase por palabra: la frase se enciende de izquierda a derecha
        t = t * 1.35 - (i / (spans.length - 1)) * 0.35;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        span.style.setProperty('--lit', t.toFixed(3));
      });
    }
    function queue() { if (!frame) frame = requestAnimationFrame(paint); }

    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    paint();
  })();
})();
