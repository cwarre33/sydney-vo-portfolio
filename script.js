(function () {
  'use strict';

  var data = window.PORTFOLIO || { projects: [], upcoming: [], phases: [] };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function vtName(slug) { return 'p-' + slug; }

  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ---------- Header: solid, hides on scroll down and returns on scroll up ----------
  var header = $('[data-header]');
  var lastY = window.scrollY;
  function onScroll() {
    if (!header) return;
    var y = window.scrollY;
    var navOpen = document.body.classList.contains('nav-open');
    header.classList.toggle('is-hidden', !navOpen && y > lastY && y > 400);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav ----------
  var toggle = $('.nav-toggle');
  var nav = $('.nav');
  function setNav(open) {
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setNav(toggle.getAttribute('aria-expanded') !== 'true'); });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) setNav(false); });
  }

  // ---------- Home: editorial project features ----------
  // Each feature is a block (image with its text underneath, aligned to the
  // image's left edge). Blocks alternate width and position for rhythm.
  // Images keep their natural proportions; nothing is cropped.
  var features = $('#features');
  if (features) {
    var layouts = ['is-wide', 'is-left', 'is-right', 'is-left', 'is-right', 'is-left'];
    features.innerHTML = data.projects.map(function (p, i) {
      var layout = layouts[i % layouts.length];
      return '<article class="feature ' + layout + (p.coverContain ? ' is-drawing' : '') + '">' +
        '<div class="feature-block">' +
          '<a class="feature-media img-reveal" href="project.html?p=' + esc(p.slug) + '" data-cursor tabindex="-1" aria-hidden="true">' +
            '<img src="' + esc(p.cover) + '" alt="" loading="' + (i === 0 ? 'eager' : 'lazy') + '" style="view-transition-name:' + vtName(p.slug) + '" />' +
          '</a>' +
          '<div class="feature-text reveal">' +
            '<p class="feature-kind"><span>' + pad(i + 1) + '</span>' + esc(p.kind) + ' · ' + esc(p.year) + '</p>' +
            '<h3><a href="project.html?p=' + esc(p.slug) + '">' + esc(p.title) + (p.subtitle ? ' <span lang="ja">' + esc(p.subtitle) + '</span>' : '') + '</a></h3>' +
            '<div class="feature-aside"><p class="feature-summary">' + esc(p.summary) + '</p>' +
            '<a class="link-arrow" href="project.html?p=' + esc(p.slug) + '" aria-label="View project: ' + esc(p.title) + '">View project <span aria-hidden="true">→</span></a></div>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  // ---------- Home: index list with hover preview ----------
  var indexList = $('#index-list');
  if (indexList) {
    indexList.innerHTML = data.projects.map(function (p, i) {
      return '<li><a href="project.html?p=' + esc(p.slug) + '" data-preview="' + esc(p.cover) + '">' +
        '<span class="i-num">' + pad(i + 1) + '</span>' +
        '<span class="i-title">' + esc(p.title) + '</span>' +
        '<span class="i-kind">' + esc(p.kind) + '</span>' +
        '<span class="i-year">' + esc(p.year) + '</span>' +
        '<span class="i-arrow" aria-hidden="true">→</span>' +
      '</a></li>';
    }).join('');

    var preview = $('.index-preview');
    var previewImg = preview && $('img', preview);
    if (preview && finePointer) {
      $$('a', indexList).forEach(function (a) {
        a.addEventListener('mouseenter', function () { previewImg.src = a.getAttribute('data-preview'); preview.classList.add('is-on'); });
        a.addEventListener('mouseleave', function () { preview.classList.remove('is-on'); });
      });
      indexList.addEventListener('mousemove', function (e) {
        preview.style.transform = 'translate(' + (e.clientX + 24) + 'px,' + (e.clientY - 120) + 'px)';
      });
    }
  }

  // ---------- Home: on the boards ----------
  var otb = $('#otb-grid');
  if (otb) {
    otb.innerHTML = (data.upcoming || []).map(function (u) {
      var steps = typeof u.phase === 'number' ? '<ol class="phases" aria-label="Project phase">' + data.phases.map(function (ph, i) {
        var state = i < u.phase ? 'is-done' : i === u.phase ? 'is-current' : '';
        return '<li class="' + state + '"' + (i === u.phase ? ' aria-current="step"' : '') + '><span>' + esc(ph) + '</span></li>';
      }).join('') + '</ol>' : '';
      return '<article class="otb-card reveal">' +
        '<div class="otb-top"><span class="badge"><i></i>In progress</span>' + (u.tool ? '<span>' + esc(u.tool) + '</span>' : '') + '</div>' +
        '<h3>' + esc(u.title) + '</h3>' +
        '<p class="otb-org">' + esc(u.org) + '</p>' +
        (u.note ? '<p class="otb-note">' + esc(u.note) + '</p>' : '') +
        steps +
      '</article>';
    }).join('');
  }
  var toAdd = $('#otb-list');
  if (toAdd) {
    toAdd.innerHTML = (data.toAdd || []).map(function (t) {
      return '<li class="reveal"><span class="ta-title">' + esc(t.title) + '</span><span class="ta-course">' + esc(t.course) + '</span><span class="ta-term">' + esc(t.term) + '</span></li>';
    }).join('');
  }

  // ---------- Case study ----------
  var caseEl = $('[data-case]');
  if (caseEl) renderCase();

  function figure(src, caption, extra) {
    return '<figure class="' + (extra || '') + '"><img src="' + esc(src) + '" alt="' + esc(caption) + '" loading="lazy" data-zoom />' +
      (caption ? '<figcaption>' + esc(caption) + '</figcaption>' : '') + '</figure>';
  }

  function renderCase() {
    var slug = new URLSearchParams(location.search).get('p');
    var idx = -1;
    data.projects.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx < 0) {
      caseEl.innerHTML = '<section class="not-found wrap"><p class="eyebrow"><span>404</span>Not on the plan</p><h1>Project <em>not found.</em></h1><a class="btn" href="index.html#work">Back to the work</a></section>';
      return;
    }
    var p = data.projects[idx];
    var next = data.projects[(idx + 1) % data.projects.length];
    document.title = p.title + ' — Sydney Vo';

    var coverItem = (p.gallery || []).filter(function (g) { return g.src === p.cover; })[0];
    var gallery = (p.gallery || []).filter(function (g) { return g.src !== p.cover; });
    var facts = [['Course', p.course], ['Year', p.year], ['Type', p.kind], ['Software', p.software.join(', ')]].concat(p.facts || []);

    var h = '';
    // Title + hero
    h += '<section class="case-head wrap">' +
      '<a class="back" href="index.html#work">← All work</a>' +
      '<p class="eyebrow"><span>' + pad(idx + 1) + '</span>' + esc(p.kind) + '</p>' +
      '<h1 class="case-title">' + esc(p.title) + (p.subtitle ? ' <span lang="ja">' + esc(p.subtitle) + '</span>' : '') + '</h1>' +
      '<p class="case-summary">' + esc(p.summary) + '</p>' +
    '</section>' +
    '<figure class="case-hero' + (p.coverContain ? ' is-drawing' : '') + '">' +
      '<img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt) + '" data-zoom style="view-transition-name:' + vtName(p.slug) + '" />' +
      (coverItem ? '<figcaption class="wrap">' + esc(coverItem.caption) + '</figcaption>' : '') +
    '</figure>';

    // Facts
    h += '<section class="wrap"><dl class="facts">' + facts.map(function (f) {
      return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>';
    }).join('') + '</dl></section>';

    // Brief + description
    h += '<section class="case-intro wrap">' +
      '<div class="case-brief reveal"><p class="eyebrow"><span>—</span>The brief</p><p class="brief">' + esc(p.brief) + '</p></div>' +
      '<div class="case-text reveal"><p class="eyebrow"><span>—</span>The project</p>' + p.description.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
        (p.link ? '<p><a class="link-arrow" href="' + esc(p.link.href) + '" target="_blank" rel="noopener noreferrer">' + esc(p.link.label) + ' <span aria-hidden="true">↗</span></a></p>' : '') +
      '</div>' +
    '</section>';

    function materialsList(mats) {
      return '<ul class="materials">' + mats.map(function (m) {
        var sw = m.img ? '<span class="swatch" style="background-image:url(' + esc(m.img) + ')"></span>' : '<span class="swatch" style="background:' + esc(m.color) + '"></span>';
        return '<li class="reveal">' + sw + '<strong>' + esc(m.name) + '</strong><span>' + esc(m.use) + '</span></li>';
      }).join('') + '</ul>';
    }
    var mats = p.materials || [];
    if (p.concept) {
      h += '<section class="case-concept wrap' + (mats.length ? ' has-materials' : '') + '">' +
        '<div class="reveal"><p class="eyebrow"><span>—</span>Concept</p><blockquote>' + esc(p.concept) + '</blockquote></div>' +
        (mats.length ? '<div class="concept-materials"><p class="eyebrow"><span>—</span>Finishes &amp; palette</p>' + materialsList(mats) + '</div>' : '') +
      '</section>';
    }

    if (p.drivers && p.drivers.length) {
      h += '<section class="case-drivers wrap"><p class="eyebrow"><span>—</span>Research drivers</p><ol>' +
        p.drivers.map(function (d, i) { return '<li class="reveal"><span>' + pad(i + 1) + '</span><h3>' + esc(d[0]) + '</h3><p>' + esc(d[1]) + '</p></li>'; }).join('') +
        '</ol></section>';
    }

    // Process: sticky step label + drawings
    h += '<section class="case-process wrap"><p class="eyebrow"><span>—</span>Process</p>' +
      p.process.map(function (s, i) {
        var media = (s[2] || []);
        return '<article class="step">' +
          '<header class="step-label"><span>' + pad(i + 1) + '</span><h3>' + esc(s[0]) + '</h3></header>' +
          '<div class="step-body"><p class="reveal">' + esc(s[1]) + '</p>' +
            (media.length ? '<div class="step-media" data-count="' + media.length + '">' + media.map(function (m) { return figure(m[0], m[1], 'img-reveal'); }).join('') + '</div>' : '') +
          '</div>' +
        '</article>';
      }).join('') + '</section>';

    // Materials (on their own when there is no concept statement to sit beside)
    if (mats.length && !p.concept) {
      h += '<section class="case-materials wrap"><p class="eyebrow"><span>—</span>Finishes &amp; palette</p>' + materialsList(mats) + '</section>';
    }

    // Gallery
    if (gallery.length) {
      h += '<section class="case-gallery"><div class="wrap"><p class="eyebrow"><span>—</span>Visuals</p></div><div class="gallery">' +
        gallery.map(function (g) {
          var cls = ['img-reveal', g.wide ? 'is-wide' : '', g.tall ? 'is-tall' : '', g.contain ? 'is-drawing' : ''].join(' ');
          return figure(g.src, g.caption, cls);
        }).join('') + '</div></section>';
    }

    // Boards: horizontal strip
    if (p.boards && p.boards.length) {
      h += '<section class="case-boards">' +
        '<div class="wrap boards-head"><p class="eyebrow"><span>—</span>Presentation boards</p>' +
          (p.boards.length > 1 ? '<div class="boards-ctrl"><button type="button" data-boards="-1" aria-label="Previous board">←</button><button type="button" data-boards="1" aria-label="Next board">→</button></div>' : '') +
        '</div>' +
        '<div class="boards" tabindex="0" aria-label="Presentation boards — scroll sideways">' +
          p.boards.map(function (n, i) {
            return figure('assets/boards/board-' + pad(n) + '.webp', 'Board ' + (i + 1) + ' / ' + p.boards.length);
          }).join('') +
        '</div></section>';
    }

    // Next project
    h += '<a class="next-project" href="project.html?p=' + esc(next.slug) + '">' +
      '<img src="' + esc(next.cover) + '" alt="" loading="lazy" class="' + (next.coverContain ? 'is-drawing' : '') + '" />' +
      '<span class="next-inner wrap"><span class="eyebrow"><span>→</span>Next project</span><span class="next-title">' + esc(next.title) + '</span></span>' +
    '</a>';

    caseEl.innerHTML = h;

    var strip = $('.boards', caseEl);
    $$('[data-boards]', caseEl).forEach(function (b) {
      b.addEventListener('click', function () {
        var fig = $('figure', strip);
        strip.scrollBy({ left: (fig ? fig.offsetWidth + 24 : 600) * Number(b.getAttribute('data-boards')), behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });

    initLightbox();
  }

  // ---------- Lightbox ----------
  function initLightbox() {
    var lb = $('#lightbox');
    if (!lb) return;
    var imgs = $$('[data-zoom]');
    var lbImg = $('img', lb), lbCap = $('figcaption', lb);
    var current = 0, lastFocus = null;
    function show(i) {
      current = (i + imgs.length) % imgs.length;
      lbImg.src = imgs[current].src;
      lbImg.alt = imgs[current].alt;
      var cap = imgs[current].closest('figure') && imgs[current].closest('figure').querySelector('figcaption');
      lbCap.textContent = cap ? cap.textContent : '';
    }
    function open(i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.classList.add('nav-open'); $('.lb-close', lb).focus(); }
    function close() { lb.hidden = true; document.body.classList.remove('nav-open'); if (lastFocus) lastFocus.focus(); }
    imgs.forEach(function (img, i) {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.addEventListener('click', function () { open(i); });
      img.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
    });
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', function () { show(current - 1); });
    $('.lb-next', lb).addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  // ---------- "View" cursor over project images ----------
  var cursor = $('.cursor');
  if (cursor && finePointer && !reduceMotion) {
    document.addEventListener('mousemove', function (e) {
      cursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      var over = e.target.closest && e.target.closest('[data-cursor], [data-zoom], .next-project');
      cursor.classList.toggle('is-on', !!over);
      if (over) $('span', cursor).textContent = over.hasAttribute('data-zoom') ? 'Enlarge' : 'View';
    });
    document.addEventListener('mouseleave', function () { cursor.classList.remove('is-on'); });
  }

  // ---------- Reveal on scroll ----------
  var revealables = $$('.reveal, .img-reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    document.documentElement.classList.add('can-reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  }
})();
