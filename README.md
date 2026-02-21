# Sydney Vo — Interior Design Portfolio

A one-page portfolio site that matches the warm neutrals and raspberry accent from your existing portfolio. No build step — just open `index.html` in a browser or host the folder anywhere.

## Colors (from your portfolio)

- **Backgrounds:** Warm cream/stone (`#FAF8F5`, `#F2EEE8`, `#EDE9E3`)
- **Accent:** Muted raspberry (`#B76E79`) — from your Meredith CAD Lab palette
- **Secondary:** Warm terracotta/stone for gradients

You can tweak these in `styles.css` at the top in the `:root` section.

## Adding your real project images

1. Create an `images` folder next to `index.html`.
2. Add one image per project (e.g. `commercial.jpg`, `duplex.jpg`, `sears.jpg`, `hotel.jpg`, `zanzibar.jpg`, `cadlab.jpg`).
3. In `index.html`, replace each placeholder like this:

   **Before:**
   ```html
   <div class="project-media">
     <div class="project-placeholder" data-project="commercial"></div>
   </div>
   ```

   **After:**
   ```html
   <div class="project-media">
     <img src="images/commercial.jpg" alt="Commercial space redesign — elevation and floor plan" />
   </div>
   ```

Do the same for the other projects: `duplex`, `sears`, `hotel`, `zanzibar`, `cadlab`.

## Running locally

- **Option A:** Double-click `index.html` to open in your browser.
- **Option B:** From this folder run: `npx serve .` or `python3 -m http.server 8000` and visit the URL shown.

## Sections

- **Hero** — Name, tagline, CTA
- **About** — Bio and education
- **Work** — Six projects (Commercial, Duplex, Sears Modern Home, Hotel Suite, Zanzibar, Meredith CAD Lab)
- **Skills** — Technical and personal
- **Contact** — Phone, email, LinkedIn

Footer year updates automatically.
