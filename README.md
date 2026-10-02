# Sydney Vo — Interior Design Portfolio

Static site (no build step), deployed to GitHub Pages from `main`.

- `index.html`: cover, statement, selected work + project index, **On the boards** (work in progress), about, experience, contact
- `project.html?p=<slug>`: case-study page (facts → brief → concept → research → process → materials → visuals → boards → next project), rendered from the project data
- `404.html`: custom not-found page (Netlify serves it automatically)
- `docs/design-research.md`: the award-site research behind the design
- `assets/projects.js`: **all project content lives here**
- `assets/img/`, `assets/process/`, `assets/materials/`, `assets/icons/`: renders, process drawings, material swatches and software icons cropped from the PDF portfolio
- `assets/boards/`: full portfolio pages (board-NN = PDF page NN)
- `reference_content/`: the PDF portfolio (linked as a download) and résumé

## Adding or updating an "On the boards" project

Edit the `upcoming` list in `assets/projects.js`:

```js
{ title: 'Senior Studio Project', org: 'Meredith College · Senior year',
  eta: 'Spring 2027', phase: 0, note: 'Short blurb…' }
```

`phase` sets the progress tracker: 0 Programming · 1 Schematic Design · 2 Design Development · 3 Rendering.

## When a project is finished

1. Add its images to `assets/img/` (WebP or JPG, ~2000px wide).
2. Move its entry from `upcoming` into `projects`, filling in `slug`, `cover`, `brief`, `description`, `process` (each step can list drawings), `materials` (an image or a hex colour per swatch), `gallery`, and so on (copy an existing project as a template).
3. Optional: export the new PDF pages to `assets/boards/board-NN.webp` and list the page numbers in `boards`.

## Running locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening the file directly also works, apart from the case-study URLs in some browsers.
