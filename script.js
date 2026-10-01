(function () {
  'use strict';

  var data = window.PORTFOLIO || { projects: [], upcoming: [], phases: [] };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  function setNav(open) {
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setNav(false);
    });
  }

  // ---------- Home: work grid ----------
  var workGrid = document.getElementById('work-grid');
  if (workGrid) {
    workGrid.innerHTML = data.projects.map(function (p, i) {
      return '<a class="work-card' + (i === 0 ? ' is-feature' : '') + '" href="project.html?p=' + esc(p.slug) + '">' +
        '<div class="work-media' + (p.coverContain ? ' is-drawing' : '') + '">' +
          '<img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt) + '" loading="' + (i < 2 ? 'eager' : 'lazy') + '" />' +
        '</div>' +
        '<div class="work-info">' +
          '<span class="work-num">' + pad(i + 1) + '</span>' +
          '<div>' +
            '<h3>' + esc(p.title) + (p.subtitle ? ' <span lang="ja">' + esc(p.subtitle) + '</span>' : '') + '</h3>' +
            '<p class="work-summary">' + esc(p.summary) + '</p>' +
            '<p class="work-meta">' + esc(p.course) + ' · ' + esc(p.year) + '</p>' +
          '</div>' +
          '<span class="work-arrow" aria-hidden="true">→</span>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  // ---------- Home: in-progress ----------
  var studioGrid = document.getElementById('studio-grid');
  if (studioGrid) {
    studioGrid.innerHTML = data.upcoming.map(function (u) {
      var steps = data.phases.map(function (ph, i) {
        var state = i < u.phase ? 'is-done' : i === u.phase ? 'is-current' : '';
        return '<li class="' + state + '"' + (i === u.phase ? ' aria-current="step"' : '') + '><span>' + esc(ph) + '</span></li>';
      }).join('');
      return '<article class="studio-card">' +
        '<div class="studio-top"><span class="badge"><i></i>In progress</span><span class="eta">' + esc(u.eta) + '</span></div>' +
        '<h3>' + esc(u.title) + '</h3>' +
        '<p class="studio-org">' + esc(u.org) + '</p>' +
        '<p class="studio-note">' + esc(u.note) + '</p>' +
        '<ol class="phases" aria-label="Project phase">' + steps + '</ol>' +
      '</article>';
    }).join('') +
    '<article class="studio-card studio-more"><p>More work is on the way — check back soon, or <a href="#contact">reach out</a> to see it in progress.</p></article>';
  }

  // ---------- Case study page ----------
  var caseEl = document.querySelector('[data-case]');
  if (caseEl) renderCase();

  function renderCase() {
    var slug = new URLSearchParams(location.search).get('p');
    var idx = -1;
    data.projects.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx < 0) {
      caseEl.innerHTML = '<section class="wrap case-missing"><h1>Project not found</h1><p><a class="btn" href="index.html#work">Back to all work</a></p></section>';
      return;
    }
    var p = data.projects[idx];
    var prev = data.projects[(idx - 1 + data.projects.length) % data.projects.length];
    var next = data.projects[(idx + 1) % data.projects.length];
    document.title = p.title + ' — Sydney Vo';

    // The cover image is shown as the hero, so drop it from the gallery and reuse its caption.
    var coverItem = (p.gallery || []).filter(function (g) { return g.src === p.cover; })[0];
    var gallery = (p.gallery || []).filter(function (g) { return g.src !== p.cover; });

    var facts = [['Course', p.course], ['Year', p.year], ['Software', p.software.join(', ')]].concat(p.facts || []);

    var html = '' +
      '<section class="case-head wrap">' +
        '<a class="back" href="index.html#work">← All work</a>' +
        '<div class="rule-label"><span>Project ' + pad(idx + 1) + '</span><i></i><b>' + esc(p.kind) + '</b></div>' +
        '<h1>' + esc(p.title) + (p.subtitle ? ' <span lang="ja">' + esc(p.subtitle) + '</span>' : '') + '</h1>' +
        '<dl class="facts">' + facts.map(function (f) { return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl>' +
      '</section>' +
      '<figure class="case-hero wrap' + (p.coverContain ? ' is-drawing' : '') + '"><img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt) + '" data-zoom />' +
        (coverItem ? '<figcaption>' + esc(coverItem.caption) + '</figcaption>' : '') + '</figure>' +
      '<section class="case-intro wrap">' +
        '<h2 class="eyebrow">Project description</h2>' +
        '<div class="case-text">' + p.description.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
          (p.link ? '<p><a class="link" href="' + esc(p.link.href) + '" target="_blank" rel="noopener noreferrer">' + esc(p.link.label) + ' ↗</a></p>' : '') +
        '</div>' +
      '</section>';

    if (p.concept) {
      html += '<section class="case-concept wrap"><h2 class="eyebrow">Concept</h2><blockquote>' + esc(p.concept) + '</blockquote></section>';
    }

    if (p.drivers && p.drivers.length) {
      html += '<section class="case-drivers wrap"><h2 class="eyebrow">Research drivers</h2><ul>' +
        p.drivers.map(function (d, i) { return '<li><span>' + pad(i + 1) + '</span><strong>' + esc(d[0]) + '</strong><p>' + esc(d[1]) + '</p></li>'; }).join('') +
        '</ul></section>';
    }

    html += '<section class="case-process wrap"><h2 class="eyebrow">Process</h2><ol>' +
      p.process.map(function (s) {
        var media = (s[2] || []).map(function (m) {
          return '<figure><img src="' + esc(m[0]) + '" alt="' + esc(m[1]) + '" loading="lazy" data-zoom /><figcaption>' + esc(m[1]) + '</figcaption></figure>';
        }).join('');
        var count = (s[2] || []).length;
        return '<li><h3>' + esc(s[0]) + '</h3><p>' + esc(s[1]) + '</p>' +
          (media ? '<div class="step-media" data-count="' + count + '">' + media + '</div>' : '') + '</li>';
      }).join('') +
      '</ol></section>';

    if (gallery.length) {
      html += '<section class="case-gallery wrap"><h2 class="eyebrow">Visuals</h2><div class="gallery">' +
        gallery.map(function (g) {
          var cls = [g.wide ? 'is-wide' : '', g.tall ? 'is-tall' : '', g.contain ? 'is-drawing' : ''].join(' ').trim();
          return '<figure class="' + cls + '"><img src="' + esc(g.src) + '" alt="' + esc(g.caption) + '" loading="lazy" data-zoom /><figcaption>' + esc(g.caption) + '</figcaption></figure>';
        }).join('') + '</div></section>';
    }

    if (p.boards && p.boards.length) {
      html += '<section class="case-boards wrap"><h2 class="eyebrow">Presentation boards</h2><p class="boards-note">The full layouts from my printed portfolio. Tap any board to enlarge.</p><div class="boards">' +
        p.boards.map(function (n, i) {
          return '<figure><img src="assets/boards/board-' + pad(n) + '.webp" alt="' + esc(p.title) + ' — presentation board ' + (i + 1) + ' of ' + p.boards.length + '" loading="lazy" data-zoom /><figcaption>Board ' + (i + 1) + ' / ' + p.boards.length + '</figcaption></figure>';
        }).join('') + '</div></section>';
    }

    html += '<nav class="case-nav wrap" aria-label="More projects">' +
      '<a href="project.html?p=' + esc(prev.slug) + '"><small>← Previous</small>' + esc(prev.title) + '</a>' +
      '<a href="project.html?p=' + esc(next.slug) + '"><small>Next →</small>' + esc(next.title) + '</a>' +
    '</nav>';

    caseEl.innerHTML = html;
    initLightbox();
  }

  // ---------- Lightbox ----------
  function initLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var imgs = Array.prototype.slice.call(document.querySelectorAll('[data-zoom]'));
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('figcaption');
    var current = 0;
    var lastFocus = null;

    function show(i) {
      current = (i + imgs.length) % imgs.length;
      var src = imgs[current];
      lbImg.src = src.src;
      lbImg.alt = src.alt;
      var cap = src.closest('figure') && src.closest('figure').querySelector('figcaption');
      lbCap.textContent = cap ? cap.textContent : '';
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lb.hidden = false;
      document.body.classList.add('nav-open');
      lb.querySelector('.lb-close').focus();
    }
    function close() {
      lb.hidden = true;
      document.body.classList.remove('nav-open');
      if (lastFocus) lastFocus.focus();
    }

    imgs.forEach(function (img, i) {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.addEventListener('click', function () { open(i); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  // Reveal on scroll
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.work-card, .studio-card, .section-head, .case-gallery figure, .case-boards figure, .step-media').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }
})();
