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

  /* ---------- Galería: la pieza sale del muro y vuelve a él ---------- */
  (function gallery() {
    var dialog = document.getElementById('lightbox');
    var stage = document.getElementById('lb-stage');
    var titleEl = document.getElementById('lb-title');
    var countEl = document.getElementById('lb-count');
    var bar = dialog && dialog.querySelector('.lightbox__bar');
    var btnPrev = dialog && dialog.querySelector('.lightbox__nav--prev');
    var btnNext = dialog && dialog.querySelector('.lightbox__nav--next');
    if (!dialog || !stage || !dialog.showModal) return;

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var IN = 420, OUT = 260;
    var EASE_IN = 'cubic-bezier(.16,1,.3,1)';
    var EASE_OUT = 'cubic-bezier(.4,0,1,1)';
    var images = [];
    var index = 0;
    var trigger = null;

    function show(i) {
      index = (i + images.length) % images.length;
      var img = document.createElement('img');
      img.src = images[index];
      img.alt = titleEl.textContent + ', pieza ' + (index + 1);
      stage.replaceChildren(img);
      countEl.textContent = (index + 1) + ' de ' + images.length;
      btnPrev.hidden = images.length < 2;
      btnNext.hidden = images.length < 2;
    }

    // La placa del muro y la caja de luz comparten geometría: de ahí sale el movimiento.
    function delta(from) {
      var s = stage.getBoundingClientRect();
      if (!from || !s.width || !s.height) return null;
      return {
        sx: from.width / s.width,
        sy: from.height / s.height,
        dx: (from.left + from.width / 2) - (s.left + s.width / 2),
        dy: (from.top + from.height / 2) - (s.top + s.height / 2)
      };
    }

    function transformOf(t) {
      return 'translate(' + t.dx.toFixed(1) + 'px,' + t.dy.toFixed(1) + 'px) scale(' +
        t.sx.toFixed(4) + ',' + t.sy.toFixed(4) + ')';
    }

    // Pista de primera vez: ensena a navegar una sola vez y se va sola.
    var hintSeen = false;
    try { hintSeen = localStorage.getItem('lb-hint') === '1'; } catch (e) {}

    function showHint() {
      if (hintSeen || !bar || !countEl) return;
      hintSeen = true;
      try { localStorage.setItem('lb-hint', '1'); } catch (e) {}
      var touch = window.matchMedia('(hover: none)').matches;
      var hint = document.createElement('span');
      hint.className = 'lightbox__hint';
      hint.textContent = touch
        ? 'Desliza para cambiar de pieza'
        : 'Usa las flechas para cambiar de pieza';
      bar.insertBefore(hint, countEl.nextSibling);
      window.setTimeout(function () {
        hint.classList.add('is-gone');
        window.setTimeout(function () { hint.remove(); }, 450);
      }, 4200);
    }

    function open(button) {
      var raw = button.getAttribute('data-images') || '';
      images = raw.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      if (!images.length) return;
      trigger = button;
      var nombre = button.getAttribute('data-project') || 'Proyecto';
      var anio = button.getAttribute('data-year');
      titleEl.textContent = anio ? nombre + ' · ' + anio : nombre;
      var from = reduce ? null : button.getBoundingClientRect();
      show(0);
      dialog.showModal();
      showHint();
      if (reduce) return;

      requestAnimationFrame(function () {
        var t = delta(from);
        if (!t) return;
        stage.animate(
          [{ transform: transformOf(t), opacity: 0.3 }, { transform: 'none', opacity: 1 }],
          { duration: IN, easing: EASE_IN }
        );
        if (bar) {
          bar.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 240, delay: 140, easing: 'linear', fill: 'backwards'
          });
        }
      });
    }

    function close() {
      if (reduce || !trigger) { dialog.close(); return; }
      var t = delta(trigger.getBoundingClientRect());
      if (!t) { dialog.close(); return; }
      var out = stage.animate(
        [{ transform: 'none', opacity: 1 },
         { transform: transformOf(t), opacity: 0.25 }],
        { duration: OUT, easing: EASE_OUT }
      );
      out.onfinish = function () { dialog.close(); };
    }

    document.querySelectorAll('.tile').forEach(function (button) {
      button.addEventListener('click', function (e) { e.preventDefault(); open(button); });
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
      stage.style.transform = '';
      if (trigger) trigger.focus({ preventScroll: false });
    });

    // deslizar en pantalla táctil
    var startX = null, startY = null;
    stage.addEventListener('pointerdown', function (e) {
      startX = e.clientX;
      startY = e.clientY;
    });
    stage.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      startX = null;
      startY = null;
      // deslizar hacia abajo cierra: el pulgar no llega a la esquina
      if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) { close(); return; }
      if (Math.abs(dx) < 40) return;
      show(dx > 0 ? index - 1 : index + 1);
    });
    stage.addEventListener('pointercancel', function () { startX = null; startY = null; });
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
    stage.addEventListener('lostpointercapture', onUp);
    window.addEventListener('blur', function () {
      if (!dragging) return;
      dragging = false;
      pointerId = null;
      root.classList.remove('is-dragging');
      setIndex(index);
    });

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

  })();
