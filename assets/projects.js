/*
 * Project content for the portfolio.
 *
 * PROJECTS  — finished work. Each one gets a card on the home page and a
 *             case-study page at project.html?p=<slug>.
 * UPCOMING  — work that's still in progress. Shown in the "In the studio"
 *             section with a phase tracker. When a project is finished, move
 *             it into PROJECTS (add images + boards) and delete it here.
 *
 * `boards` are page numbers from the PDF portfolio, rendered to
 * assets/boards/board-NN.webp.
 */
window.PORTFOLIO = {
  phases: ['Programming', 'Schematic Design', 'Design Development', 'Rendering'],

  projects: [
    {
      slug: 'kenko',
      title: 'Kenko',
      subtitle: 'ケンコー',
      kind: 'Commercial wellness center',
      course: 'ID 344 · Interior Design III: Commercial I',
      year: 'Spring 2026',
      software: ['AutoCAD', 'SketchUp', 'Enscape', 'Canva'],
      facts: [
        ['Size', '5,000 sq ft'],
        ['Site', '2508½ Hillsborough St, Raleigh, NC']
      ],
      cover: 'assets/img/kenko-reception.webp',
      coverAlt: 'Kenko reception with a curved wood-slat desk, a guest in a wheelchair at the lowered counter',
      summary: 'A biophilic wellness center on Raleigh’s Hillsborough Street, inspired by the traditional Japanese teahouse.',
      description: [
        'Situated along Raleigh’s high-density Hillsborough Street corridor, directly adjacent to Target, Kenko (ケンコー) is a 5,000 sq ft commercial wellness center. Grounded in biophilic principles and organic geometry, the space balances crisp, contemporary architectural forms with warm natural wood finishes, soft curvilinear millwork, and layered ambient lighting.',
        'The layout flows across dedicated zones — a welcoming reception desk, an integrated retail display, a community tea bar, a private pilates studio, and full locker and restroom facilities.'
      ],
      concept: 'Kenko integrates daylight, natural materials, and Japanese design principles — with the traditional teahouse as its primary inspiration — to cultivate a serene, cohesive environment that fosters emotional and physical balance. Light and dark green tile, light wood against darker finishes, woven wallcoverings, and custom built-in casework introduce depth, contrast, and a refined sense of craftsmanship.',
      drivers: [
        ['Natural daylight', 'Maximizes daylight to reduce stress, elevate mood, and boost productivity.'],
        ['Circadian lighting', 'Mimics natural light cycles to align biological rhythms and support focus.'],
        ['Color psychology', 'Pairs calming cool tones with targeted warm accents to balance relaxation and energy.'],
        ['Biophilic integration', 'Natural woods and greenery strengthen well-being and connection to nature.']
      ],
      process: [
        ['Programming', 'Explored multiple block-diagram iterations to refine functional zoning, room adjacencies, and circulation.'],
        ['Schematic Design', 'The footprint splits active and quiet zones: reception, retail, and tea bar face Hillsborough Street, while studios and amenities transition toward the quiet rear alley. Sections keep the original 14′-0″ floor-to-deck clearance, with dropped ceilings in select zones for human scale and acoustic comfort.'],
        ['Design Development', 'Custom millwork for the reception desk and tea bar counter uses dual counter heights, durable surfaces, and integrated storage to meet ADA standards without sacrificing style. A lighting plan sets the overall intent and ambiance.']
      ],
      gallery: [
        { src: 'assets/img/kenko-teabar.webp', caption: 'Tea bar — platform seating view. Warm wood, green tile accents, and soft pendant light create a place to gather and relax.', wide: true },
        { src: 'assets/img/kenko-teabar-2.webp', caption: 'Tea bar' },
        { src: 'assets/img/kenko-teabar-3.webp', caption: 'Tea bar seating' },
        { src: 'assets/img/kenko-reception.webp', caption: 'Reception — a curved desk with vertical wood slats and dual-height counters for full ADA accessibility.', wide: true },
        { src: 'assets/img/kenko-bath.webp', caption: 'Restroom — fluted wall tile, rich earth tones, and vessel-sink vanities under soft, indirect light.', wide: true }
      ],
      boards: [5, 6, 7, 8, 9, 10]
    },
    {
      slug: 'cad-lab',
      title: 'Meredith CAD Lab',
      kind: 'Higher-ed computer lab',
      course: 'ID 342 · Special Problems in CADD',
      year: 'Fall 2025',
      software: ['Revit', 'Enscape', 'Canva'],
      facts: [['Team', 'with Hailey Martin'], ['My role', 'Layout design & 3D development']],
      cover: 'assets/img/cadlab-presentation.webp',
      coverAlt: 'Redesigned CAD lab with rows of desks facing a raspberry accent wall and projection screen',
      summary: 'Turning an outdated computer lab into a flexible, collaborative studio for Meredith Makeover.',
      description: [
        'As part of Meredith Makeover, the CAD Lab redesign transforms an outdated higher-education computer lab into a flexible, user-centered studio. In this collaborative project I was responsible for the new layout design and 3D software development.',
        'The project replaces rigid lab constraints with an adaptable environment engineered for peer collaboration, spatial efficiency, and long-term student wellness.'
      ],
      drivers: [
        ['Circulation & power', '4-student collaborative pods aligned to interior power walls, removing bottlenecks without electrical rewiring.'],
        ['Ergonomics & comfort', 'Height-adjustable desks and mounted monitor arms relieve physical strain and encourage face-to-face teamwork.'],
        ['Acoustics & ESD safety', 'Static-control SDT tile flooring and acoustic ceiling panels protect hardware and balance room sound.']
      ],
      process: [
        ['Programming', 'Documented the existing floor plan and how students actually used the room.'],
        ['Schematic Design', 'A proposed floor plan with east and west elevations organizing desks into collaborative pods.'],
        ['Design Development', 'A palette of accent wall paint, floor tile, and a raspberry furniture color, with professor, student, and overflow desks, swivel chairs, CPU towers, and mounted screens.']
      ],
      gallery: [
        { src: 'assets/img/cadlab-presentation.webp', caption: 'Instructor & presentation zone — a focal wall with integrated AV projection, brand-aligned accent finishes, and clear sightlines from every workstation.', wide: true },
        { src: 'assets/img/cadlab-pods.webp', caption: 'Collaborative workstation pods — 4-student clusters aligned with natural light and wall-integrated power.' },
        { src: 'assets/img/cadlab-overflow.webp', caption: 'Overflow lab — an adjoining room with flexible seating for focused work and extra capacity.' }
      ],
      link: { href: 'https://www.canva.com/design/DAG3wN_GKiw/ILC7aJ-KUs14w9XyVq1EaQ/view', label: 'View the full presentation' },
      boards: [11, 12]
    },
    {
      slug: 'commercial-mural',
      title: 'Commercial Mural',
      kind: 'Exterior environmental graphic',
      course: 'MM Interior Design Group · Internship',
      year: 'Summer 2025',
      software: ['Hand sketching', 'SketchUp'],
      facts: [['Scale', '80,000 sq ft warehouse'], ['Status', 'Built']],
      cover: 'assets/img/mural-install.webp',
      coverAlt: 'A large navy letter-form mural installed on a white warehouse façade',
      summary: 'Mural concepts for an 80,000 sq ft warehouse — sketched, modeled, and installed.',
      description: [
        'Developed conceptual exterior mural options for an 80,000 sq ft commercial warehouse to strengthen the building’s presence and reflect the company’s brand identity.',
        'An on-site spatial analysis evaluated scale, viewing angles, and architectural context, translating brand values into large-scale environmental graphics through hand sketching and 3D visualization.'
      ],
      process: [
        ['Schematic Design', 'Conceptual hand sketches explored composition, scale, and brand-aligned graphic forms to test visual rhythm across the façade.'],
        ['Design Development', 'Schematic concepts moved into SketchUp to check true scale, proportion, and impact on the building envelope.'],
        ['Implementation', 'The final mural was installed on the building — the concept brought to life at full architectural scale.']
      ],
      gallery: [
        { src: 'assets/img/mural-install.webp', caption: 'Final installation on the warehouse façade.', tall: true }
      ],
      boards: [13]
    },
    {
      slug: 'zanzibar',
      title: 'Zanzibar',
      kind: 'Retail showroom vignette',
      course: 'Furnitureland South · Visual Merchandising & Design Internship',
      year: 'Summer 2025',
      software: ['AutoCAD', 'SketchUp', 'Canva'],
      facts: [['Collection', 'Lexington — Zanzibar']],
      cover: 'assets/img/zanzibar-render.webp',
      coverAlt: 'SketchUp render of a showroom vignette with a curved sofa, console, and brass wall discs',
      summary: 'A showroom for Lexington’s Zanzibar collection, from floor plan to accessory budget.',
      description: [
        'Designed a custom retail environment for Furnitureland South showcasing Lexington’s Zanzibar collection, guiding the project from initial programming through final design.',
        'Drafted furniture layouts in AutoCAD, generated 3D visualizations in SketchUp, and wrote a client proposal covering paint schemes, accessory styling, and cost estimates to secure approval.'
      ],
      process: [
        ['Programming', 'Evaluated spatial boundaries, sightlines, and display capacity for the floor directly behind the main reception desk.'],
        ['Schematic Design', 'AutoCAD layouts established flow, furniture placement, and visual hierarchy. Sherwin-Williams Pure White (SW 7005), Snowbound (SW 7004), and Sealskin (SW 7675) complement the furniture finishes.'],
        ['Design Development', 'SketchUp models tested alternative merchandising strategies within existing constraints, and itemized accessory boards laid out vendors, pricing, and a full budget breakdown.']
      ],
      gallery: [
        { src: 'assets/img/zanzibar-render.webp', caption: 'Living vignette — the Zanzibar collection re-envisioned for the reception showroom.', wide: true },
        { src: 'assets/img/zanzibar-render-2.webp', caption: 'Dining vignette' },
        { src: 'assets/img/zanzibar-render-3.webp', caption: 'Bedroom and entry vignette' }
      ],
      boards: [14, 15, 16]
    },
    {
      slug: 'sears-modern-home',
      title: 'Sears Modern Home',
      kind: 'Historic residential revitalization',
      course: 'ID 244 · Interior Design II',
      year: 'Fall 2024',
      software: ['Hand sketching', 'SketchUp', 'Wecora', 'Canva', 'Foam-board model'],
      facts: [['House', 'Solace Model No. 3218']],
      cover: 'assets/img/sears-dining.webp',
      coverAlt: 'SketchUp perspective of a dining room with wainscoting, floral wallcovering, and carved wood chairs',
      summary: 'Bringing an early-20th-century kit home into contemporary life without losing its character.',
      description: [
        'This project focuses on the historic preservation and spatial revitalization of the Sears Modern Home Solace Model No. 3218, translating an early-20th-century kit home into a functional, contemporary residential layout.',
        'The concept was developed through hand sketching, physical foam-board scale models, SketchUp modeling, Wecora material boards, and Canva.'
      ],
      process: [
        ['Programming', 'Studied the original first- and second-floor plans and mapped primary and secondary adjacencies with matrices and bubble diagrams.'],
        ['Schematic Design', 'Reworked floor plans for both levels, plus a stair section and perspective, tested in a foam-board model.'],
        ['Design Development', 'Detailed 3D elevations of the dining room with custom millwork, architectural moulding, period-inspired wallcoverings, and layered drapery.']
      ],
      gallery: [
        { src: 'assets/img/sears-dining.webp', caption: 'Dining room perspective — custom wainscoting, period wallcovering, and layered drapery.', wide: true },
        { src: 'assets/img/sears-elevation.webp', caption: 'Dining room elevation', wide: true }
      ],
      boards: [17, 18, 19]
    },
    {
      slug: 'interior-design-office',
      title: 'Interior Design Office',
      kind: 'Commercial office',
      course: 'ID 144 · Interior Design I',
      year: 'Fall 2023',
      software: ['Hand drafting'],
      facts: [],
      cover: 'assets/img/office-furniture.webp',
      coverAlt: 'Hand-drafted furniture plan of a design office',
      coverContain: true,
      summary: 'Where it started — a fully hand-drafted office plan built on space-planning fundamentals.',
      description: [
        'A foundational, hand-drafted commercial office layout designed to develop core space-planning principles and drafting fundamentals.',
        'The layout emphasizes clear spatial organization, efficient circulation, and ADA-compliant accessibility to create a functional, well-proportioned workspace.'
      ],
      process: [
        ['Schematic Design', 'Room-by-room studies and bubble plans for reception, conference, private offices, and work areas.'],
        ['Space & Furniture Plan', 'Hand-drafted space plan and furniture plan with a lighting legend.'],
        ['Elevation & Section', 'Drafted elevation and section details to finish the drawing set.']
      ],
      gallery: [
        { src: 'assets/img/office-furniture.webp', caption: 'Furniture plan', contain: true, wide: true },
        { src: 'assets/img/office-schematic.webp', caption: 'Schematic floor plan', contain: true, wide: true }
      ],
      boards: [20]
    }
  ],

  // ----- In progress -------------------------------------------------------
  // `phase` is the index into `phases` above that the project is currently in
  // (0 = Programming … 3 = Rendering). `eta` is free text.
  upcoming: [
    {
      title: 'Senior Studio Project',
      org: 'Meredith College · Senior year',
      eta: 'Spring 2027',
      phase: 0,
      note: 'Currently in programming. Research, site analysis, and first block diagrams are underway.'
    },
    {
      title: 'Lauren Ashley Design',
      org: 'Interior Design Internship · Aug–Dec 2025',
      eta: 'Coming soon',
      phase: 2,
      note: 'AutoCAD plans, SketchUp models, mood boards, and finish options from residential projects — case study in the works.'
    }
  ]
};
