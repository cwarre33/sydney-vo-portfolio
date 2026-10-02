# Design research: award-winning interior design portfolio sites

Research done before the second redesign (October 2026). The aim was to find
what award juries and hiring firms reward in interior design sites, and turn
that into design decisions for Sydney's portfolio.

## Sources

**Award winners (Awwwards jury and community scores)**
- [Studio X](https://www.awwwards.com/sites/studio-x): Site of the Day, Apr 2026. Commercial interiors in Hong Kong and Singapore. Warm off-white `#F2F0E6` with a single accent, a compressed serif display face over a grotesk ("Saans"), a project grid, an *interactive process section*, smooth page transitions, a custom 404 and a designed footer. Usability 7.48 and Content 7.56 scored above Design 7.3.
- [Elite Interior Design](https://www.awwwards.com/sites/elite-interior-design): Site of the Day, 2022. Two colours only (`#000` / `#fff`), storytelling through project galleries and detail views, parallax, minimal layout. Hosted on Netlify.
- [BAMO](https://www.awwwards.com/sites/bamo-interior-design): Honorable Mention, Nov 2025. Big background imagery, a portfolio gallery and a storytelling structure, luxury typography.
- [8848 architectural studio](https://www.awwwards.com/sites/8848-architectural-studio): Honorable Mention, Jan 2025. One page, "bold typography, smooth scrolling, subtle interactions". Design and Creativity scored highest.
- Other Honorable Mentions: [Tecnoarreda](https://www.awwwards.com/sites/tecnoarreda-interior-design), [Yurdaer Architecture](https://www.awwwards.com/sites/yurdaer-architecture), [Clifton Interiors](https://www.awwwards.com/sites/clifton-interiors).
- Studios often cited as the industry's best web presences: Yabu Pushelberg (a "Recent Work" strip plus a journal), Vincent Van Duysen (refined simplicity, contemplative full-bleed photography) and Hart Howerton (full-bleed imagery, a strong footer). Via [Freshy Sites](https://freshysites.com/web-design-development/best-interior-designer-websites/) and [Siiimple](https://siiimple.com/vincent-van-duysen/).

**Hiring firms and student juries**
- [Interiors & Sources: What interior design students need in a strong portfolio](https://www.iands.design/design-innovation/design/article/55375575/what-interior-design-students-need-in-a-strong-portfolio): "What sets a strong portfolio apart is a clear concept and how you got there, why decisions were made, and what problem you solved." Show sketches, plans, sections, details and **material development**, not renders alone. Show restraint: the portfolio shouldn't compete with the work.
- [ASID Student Portfolio Competition](https://www.asid.org/resources/awards/student-portfolio-competition): judged on **Concept** (thought process and philosophy), **Content** (skills), **Context** (who the student is) and how well the work is communicated.
- [Archifolio](https://blog.archifol.io/interior-design-portfolio) and [Pearl Academy](https://www.pearlacademy.com/blog/interiors/how-to-build-interior-designer-portfolio): reviewers give a portfolio under two minutes. Each project should state area, status and software. Frame it as Brief → Concept → Solution. Include an About section, a résumé and hand work.

**Type trends**: refined editorial serifs for display paired with quiet sans-serifs for text ([Envato](https://elements.envato.com/learn/font-trends), [Creative Market](https://creativemarket.com/blog/luxury-fonts)).

## What the winners have in common

1. **The work is the hero.** Full-bleed photography, few colours, generous white space. The interface recedes.
2. **Typographic contrast.** One expressive display serif at large sizes against one neutral sans. Nothing decorative at small sizes.
3. **Project-first homepage.** Work appears within one scroll, with large, varied image sizes rather than a uniform grid.
4. **Storytelling case studies.** Facts first, then concept, process, details, images, and a large "next project" link to keep people moving.
5. **Crafted motion, used sparingly.** Image reveals, page transitions and a process section that responds to scrolling. Juries score usability and content as highly as visuals.
6. **Finished details.** A custom 404, a designed footer, and a menu that hides when scrolling down.

## How it maps to Sydney's site

| Finding | Decision |
| --- | --- |
| Work is the hero; restraint | Monochrome system taken from her logo (ink, warm white, the logo's grey band). Colour comes only from her renders and material palettes. |
| Type contrast | *Instrument Serif* for display and *Instrument Sans* for text and UI: a designed pair, readable at every size (fixes the earlier hairline-serif complaint). |
| Project-first home | A full-bleed hero (Kenko), then an editorial project list with alternating large and small images, then an index list with hover previews on desktop. |
| Concept → process → solution (hiring, ASID) | Case studies follow Facts → Brief → Concept → Research drivers → Process (sticky step labels, with plans and sections in each step) → **Materials** → Renders → Boards → Next project. |
| Material development (jurors' noted gap) | A new materials section per project, using her real swatches (Kenko woods and tile, CAD Lab palette, Zanzibar paints and fabrics). |
| Under-two-minute review | The facts strip at the top of each case study (course, year, size, software, role), plus résumé and PDF downloads in the footer of every page. |
| Crafted motion | Clip-path image reveals, cross-page View Transitions, a hide-on-scroll header and a "View" cursor on project images. All turned off under `prefers-reduced-motion`. |
| Finished details | A custom 404 and a large contact footer with her signature. |
| Kept from the first redesign | Her real logo, the "Upcoming" section (renamed **On the Boards**, the studio term for work in progress), software icons, process drawings and presentation boards. |
