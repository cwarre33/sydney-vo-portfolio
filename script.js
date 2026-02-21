(function () {
  'use strict';

  // Year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('is-open');
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Project data: full descriptions and PDF slide page numbers (from portfolio PDF)
  var projectData = {
    commercial: {
      meta: 'ID 144 — Interior Design I · Hand Drafting',
      title: 'Commercial space',
      slides: [6],
      description: '<p>This commercial redesign transformed an existing space into a welcoming and functional environment tailored to a unique client profile. The concept emphasized cohesive aesthetics, spatial flow, and ADA-compliant accessibility to create an inclusive and engaging user experience.</p><p><strong>Deliverables:</strong> Programming, Elevation + Section, Furniture Plan, Space Plan.</p>'
    },
    duplex: {
      meta: 'ID 244 — Interior Design II · SketchUp, Excel, Wecora, Canva',
      title: 'Duplex home',
      slides: [7, 8],
      description: '<p>This speculative duplex explores how Universal Design, ADA principles, and Aging-in-Place strategies can shape a single-story multi-family home. The design prioritizes accessibility, long-term livability, and inclusive comfort, demonstrating how residential spaces can adapt to diverse needs over time.</p><p><strong>Phases:</strong> Schematic Design, Design Development.</p><p>Project: Duplex Home Presentation.</p>'
    },
    sears: {
      meta: 'ID 244 — Interior Design II · SketchUp, Wecora, Canva, 3D model',
      title: 'Sears modern home',
      slides: [9, 10],
      description: '<p>This project focused on revitalizing the Sears Modern Home Solace Model No. 3218, balancing historical preservation with modern functionality. Through in-depth research and the use of Wecora, SketchUp, and Canva, the design maintains the integrity of the original architecture while introducing thoughtful updates for contemporary living. The concept was further developed through a physical foam-board model to visualize spatial form and material intent.</p><p><strong>Phases:</strong> Programming, Schematic Design, Design Development.</p><p>Project: Solace Project Presentation.</p>'
    },
    hotel: {
      meta: 'ID 248 — Technology Applications I · AutoCAD, SketchUp, Material Bank',
      title: 'Hotel suite',
      slides: [11, 12],
      description: '<p>This project involved designing a hotel suite based on personal design preferences, with the floor plan and elevations developed in AutoCAD and rendered in SketchUp. Additionally, a curated composition showcased the elevations, floor plans, renderings, and design selections, effectively communicating the suite’s aesthetic and functional vision.</p><p><strong>Deliverables:</strong> Plan View — Floorplan, Elevation A, Rendered Floorplan, Rendered Elevations.</p><p>Project: Hotel Suite Presentation.</p>'
    },
    zanzibar: {
      meta: 'Furnitureland South Internship · AutoCAD, SketchUp, Material Bank, Canva',
      title: 'Zanzibar',
      slides: [13, 14],
      description: '<p>I developed a retail space design for Furnitureland South featuring Lexington’s Zanzibar collection, guiding the concept from programming through final design. The furniture plan was created in AutoCAD, with visualizations rendered in SketchUp. Additionally, a professional proposal detailed paint plans, accessory selections, and budget considerations to support approval of the simulated design.</p><p><strong>Phases:</strong> Programming, Schematic Design, Design Development.</p><p>Project: Zanzibar Proposal.</p>'
    },
    cadlab: {
      meta: 'ID 342 — Special Problems in CADD · Revit, Enscape, Canva',
      title: 'Meredith CAD lab',
      slides: [15, 16],
      description: '<p>This collaborative project involved redesigning Meredith College’s CAD Lab to enhance functionality, comfort, and collaboration. The design features grouped desks, mounted screens, and CPU stands to optimize workspace, with Revit and Enscape used to visualize a flexible, user-centered environment informed by ergonomics, materials, and spatial efficiency.</p><p><strong>Elements:</strong> Accent wall, paint, floor tile, raspberry furniture color, swivel chair, student desk, mounted screen, CPU tower. Design Development and Enscape visualizations.</p><p>Project: Meredith College CAD Lab.</p>'
    }
  };

  // Bubble modal
  var overlay = document.getElementById('project-bubble');
  var bubble = overlay && overlay.querySelector('.bubble');
  var backdrop = overlay && overlay.querySelector('.bubble-backdrop');
  var closeBtn = overlay && overlay.querySelector('.bubble-close');
  var metaEl = overlay && document.getElementById('bubble-meta');
  var titleEl = overlay && document.getElementById('bubble-title');
  var trackEl = overlay && overlay.querySelector('.bubble-slides-track');
  var dotsEl = overlay && overlay.querySelector('.bubble-dots');
  var descEl = overlay && overlay.querySelector('.bubble-description');
  var prevBtn = overlay && overlay.querySelector('.bubble-slide-prev');
  var nextBtn = overlay && overlay.querySelector('.bubble-slide-next');

  function openBubble(projectId) {
    var data = projectData[projectId];
    if (!data || !overlay) return;

    metaEl.textContent = data.meta;
    titleEl.textContent = data.title;
    descEl.innerHTML = data.description;

    // Build slides
    trackEl.innerHTML = '';
    data.slides.forEach(function (pageNum) {
      var pad = pageNum < 10 ? '0' + pageNum : '' + pageNum;
      var img = document.createElement('img');
      img.src = 'images/page-' + pad + '.png';
      img.alt = data.title + ' — slide ' + pageNum;
      trackEl.appendChild(img);
    });

    // Dots
    dotsEl.innerHTML = '';
    if (data.slides.length > 1) {
      data.slides.forEach(function (_, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        if (i === 0) btn.classList.add('is-active');
        btn.addEventListener('click', function () {
          goToSlide(trackEl, i);
          setActiveDot(dotsEl, i);
        });
        dotsEl.appendChild(btn);
      });
      if (prevBtn && nextBtn) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        prevBtn.onclick = function () {
          var idx = getCurrentSlideIndex(trackEl);
          var next = Math.max(0, idx - 1);
          goToSlide(trackEl, next);
          setActiveDot(dotsEl, next);
        };
        nextBtn.onclick = function () {
          var idx = getCurrentSlideIndex(trackEl);
          var next = Math.min(data.slides.length - 1, idx + 1);
          goToSlide(trackEl, next);
          setActiveDot(dotsEl, next);
        };
      }
    } else {
      if (prevBtn && nextBtn) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }
    }

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }

  function closeBubble() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function goToSlide(track, index) {
    if (!track || !track.children[index]) return;
    track.children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }

  function getCurrentSlideIndex(track) {
    if (!track || !track.firstElementChild) return 0;
    var scrollLeft = track.scrollLeft;
    var width = track.firstElementChild.offsetWidth;
    return Math.round(scrollLeft / width);
  }

  function setActiveDot(dots, index) {
    if (!dots) return;
    var buttons = dots.querySelectorAll('button');
    buttons.forEach(function (b, i) {
      b.classList.toggle('is-active', i === index);
    });
  }

  if (backdrop) backdrop.addEventListener('click', closeBubble);
  if (closeBtn) closeBtn.addEventListener('click', closeBubble);

  overlay && overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeBubble();
  });

  // Project cards: open bubble on click/Enter/Space
  document.querySelectorAll('.project-card[data-project-id]').forEach(function (card) {
    var id = card.getAttribute('data-project-id');
    if (!id) return;

    card.addEventListener('click', function (e) {
      e.preventDefault();
      openBubble(id);
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBubble(id);
      }
    });
  });

  // Sync dots when user scrolls slides
  if (trackEl && dotsEl) {
    trackEl.addEventListener('scroll', function () {
      var idx = getCurrentSlideIndex(trackEl);
      setActiveDot(dotsEl, idx);
    });
  }

  // Scroll-triggered fade-in
  if (typeof IntersectionObserver !== 'undefined') {
    var sections = document.querySelectorAll('.about, .project-card, .skills-grid, .contact-links');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

    sections.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      observer.observe(el);
    });

    var style = document.createElement('style');
    style.textContent = '.is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
  }
})();
