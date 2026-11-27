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

  /* ---------- Slider de videos ---------- */
  (function videoSlider() {
    var root = document.getElementById('video-slider');
    if (!root) return;

    var stage = document.getElementById('slider-stage');
    var track = document.getElementById('slider-track');
    var slides = Array.prototype.slice.call(track.children);
    var dots = Array.prototype.slice.call(root.querySelectorAll('.slider__dot'));
    var btnPrev = root.querySelector('.slider__btn--prev');
    var btnNext = root.querySelector('.slider__btn--next');
    var count = slides.length;
    var index = 0;
    var width = 0;
    var dragging = false;
    var pointerId = null;
    var startX = 0;
    var startTime = 0;
    var dx = 0;
    var baseX = 0;
    var justDragged = false;
    var duration = reduceMotion ? 0 : 380;

    function measure() { width = stage.getBoundingClientRect().width; }

    function apply(x, animate) {
      track.style.transition = animate ? 'transform ' + duration + 'ms cubic-bezier(.32,.72,0,1)' : 'none';
      track.style.transform = 'translate3d(' + x + 'px,0,0)';
    }

    function pauseAllBut(keep) {
      slides.forEach(function (s, i) {
        if (i === keep) return;
        var v = s.querySelector('video');
        if (v && !v.paused) v.pause();
      });
    }

    function setIndex(i, animate) {
      index = Math.max(0, Math.min(count - 1, i));
      baseX = -index * width;
      apply(baseX, animate !== false);
      dots.forEach(function (d, n) {
        d.classList.toggle('is-active', n === index);
        if (n === index) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
      if (btnPrev) btnPrev.disabled = index === 0;
      if (btnNext) btnNext.disabled = index === count - 1;
      pauseAllBut(index);
    }

    /* Arrastre: 1:1 con el puntero, captura, amortiguación en los extremos */
    function onDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (pointerId !== null) return; /* un segundo dedo no mueve el carril */
      measure();
      pointerId = e.pointerId;
      dragging = true;
      justDragged = false;
      startX = e.clientX;
      startTime = performance.now();
      dx = 0;
      baseX = -index * width;
      track.style.transition = 'none';
      try { stage.setPointerCapture(pointerId); } catch (err) {}
      root.classList.add('is-dragging');
    }

    function onMove(e) {
      if (!dragging || e.pointerId !== pointerId) return;
      dx = e.clientX - startX;
      if (Math.abs(dx) > 8) justDragged = true;
      var x = baseX + dx;
      var min = -(count - 1) * width;
      if (x > 0) x *= 0.35;
      if (x < min) x = min + (x - min) * 0.35;
      track.style.transform = 'translate3d(' + x + 'px,0,0)';
      if (e.cancelable) e.preventDefault();
    }

    function onUp(e) {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = null;
      root.classList.remove('is-dragging');
      var elapsed = Math.max(1, performance.now() - startTime);
      var velocity = dx / elapsed; /* px por milisegundo */
      var threshold = width * 0.18;
      var next = index;
      if (Math.abs(dx) > threshold || Math.abs(velocity) > 0.11) {
        next = index + (dx < 0 ? 1 : -1);
      }
      setIndex(next);
    }

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove, { passive: false });
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);

    /* un arrastre no debe acabar reproduciendo el video */
    stage.addEventListener('click', function (e) {
      if (!justDragged) return;
      e.preventDefault();
      e.stopPropagation();
      justDragged = false;
    }, true);

    if (btnPrev) btnPrev.addEventListener('click', function () { setIndex(index - 1); });
    if (btnNext) btnNext.addEventListener('click', function () { setIndex(index + 1); });
    dots.forEach(function (dot, n) {
      dot.addEventListener('click', function () { setIndex(n); });
    });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); setIndex(index - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); setIndex(index + 1); }
    });

    window.addEventListener('resize', function () {
      measure();
      apply(-index * width, false);
    });

    /* Reproducción: uno a la vez */
    slides.forEach(function (slide) {
      var phone = slide.querySelector('.phone');
      var video = slide.querySelector('video');
      var play = slide.querySelector('.phone__play');
      if (!video || !play) return;

      video.muted = true;

      play.addEventListener('click', function () {
        pauseAllBut(slides.indexOf(slide));
        video.muted = false;
        var playing = video.play();
        if (playing && playing.catch) playing.catch(function () { video.muted = true; video.play(); });
      });

      video.addEventListener('click', function () {
        if (video.paused) video.play(); else video.pause();
      });
      video.addEventListener('play', function () { phone.classList.add('is-playing'); });
      video.addEventListener('pause', function () { phone.classList.remove('is-playing'); });
    });

    measure();
    setIndex(0, false);
    window.addEventListener('load', function () { measure(); apply(-index * width, false); });
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
