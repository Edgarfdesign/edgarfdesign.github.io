/* ============================================================
   Edgarfdesign — índice
   Tres módulos: la previsualización del índice, la galería y el
   slider de videos. Sin dependencias.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Previsualización del índice ---------- */
  (function preview() {
    var img = document.getElementById('prev-img');
    var cap = document.getElementById('prev-cap');
    var rows = document.querySelectorAll('.row');
    if (!img || !cap || !rows.length) return;

    var swapTimer = 0;
    var fadeTimer = 0;

    function thumbOf(row) {
      var raw = (row.getAttribute('data-images') || '').split(',')[0].trim();
      if (!raw) return '';
      var base = raw.split('/').pop();
      return 'images/proyectos/t-' + base;
    }

    function show(row, i) {
      var src = thumbOf(row);
      if (!src) return;
      var label = String(i + 1).padStart(2, '0') + ' · ' +
        row.getAttribute('data-project') + ' — ' + row.getAttribute('data-year');

      clearTimeout(swapTimer);
      clearTimeout(fadeTimer);

      if (reduceMotion || img.getAttribute('src') === src) {
        img.src = src;
        cap.textContent = label;
        return;
      }

      swapTimer = setTimeout(function () {
        img.classList.add('is-swapping');
        fadeTimer = setTimeout(function () {
          img.src = src;
          cap.textContent = label;
          img.classList.remove('is-swapping');
        }, 140);
      }, 40);
    }

    rows.forEach(function (row, i) {
      row.addEventListener('pointerenter', function () { show(row, i); });
      row.addEventListener('focus', function () { show(row, i); });
    });

    // si el panel todavía no tiene imagen válida, arranca con la primera fila
    if (!img.complete || img.naturalWidth === 0) show(rows[0], 0);
  })();

  /* ---------- Galería ---------- */
  (function gallery() {
    var dialog = document.getElementById('lightbox');
    var stage = document.getElementById('lb-stage');
    var titleEl = document.getElementById('lb-title');
    var countEl = document.getElementById('lb-count');
    if (!dialog || !stage || !dialog.showModal) return;

    var btnPrev = dialog.querySelector('.lightbox__nav--prev');
    var btnNext = dialog.querySelector('.lightbox__nav--next');
    var images = [];
    var index = 0;
    var trigger = null;

    function show(i) {
      index = (i + images.length) % images.length;
      var pic = document.createElement('img');
      pic.src = images[index];
      pic.alt = titleEl.textContent + ', pieza ' + (index + 1);
      stage.replaceChildren(pic);
      countEl.textContent = (index + 1) + ' / ' + images.length;
      btnPrev.hidden = images.length < 2;
      btnNext.hidden = images.length < 2;
    }

    function open(row) {
      var raw = row.getAttribute('data-images') || '';
      images = raw.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      if (!images.length) return;
      trigger = row;
      titleEl.textContent = row.getAttribute('data-project') || 'Proyecto';
      show(0);
      dialog.showModal();
    }

    function close() {
      dialog.close();
      stage.replaceChildren();
    }

    document.querySelectorAll('.row').forEach(function (row) {
      row.addEventListener('click', function () { open(row); });
    });

    btnPrev.addEventListener('click', function () { show(index - 1); });
    btnNext.addEventListener('click', function () { show(index + 1); });

    dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
    dialog.querySelector('.lightbox__close').addEventListener('click', close);

    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    });

    dialog.addEventListener('close', function () {
      stage.replaceChildren();
      if (trigger) trigger.focus({ preventScroll: false });
    });

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
      if (pointerId !== null) return;
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
      var velocity = dx / elapsed;
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
