# AudioBikes Landing Site

Static waitlist landing page for **AudioBikes** — bikes with built-in speakers.  
Owner: Tyler Forrest.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page (hero, features, waitlist form, footer) |
| `styles.css` | Dark, sporty/music theme (mobile-first) |
| `README.md` | This file |

No frameworks, no build step. Visuals are CSS + inline SVG (no image assets).

## Preview locally

From this directory:

```bash
cd audiobikes-site

# Option A — Python
python3 -m http.server 8080

# Option B — Node (if installed)
npx --yes serve -p 8080
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

Or open `index.html` directly in a browser (file://). The form still needs Formspree configured to submit over the network.

## Enable GitHub Pages

1. Create a GitHub repo and push this folder as the repo root (or as the `docs/` folder / `gh-pages` branch).
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch `main` (or `gh-pages`) and folder `/` (root) or `/docs`.
5. Save. After a minute or two, the site is at:
   `https://<username>.github.io/<repo>/`

Optional: add a custom domain under **Pages → Custom domain**.

## Set up Formspree (waitlist)

The waitlist form POSTs to a Formspree endpoint:

```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

### One-liner setup

1. Sign up at [https://formspree.io](https://formspree.io), create a new form, copy the form ID.
2. In `index.html`, replace `YOUR_FORM_ID` with your real ID (e.g. `xpzgkqyw`).

That’s it — submissions go to the email you configured in Formspree.

### Contact email placeholders

- Form / footer / noscript mailto currently use: **`hello@audiobikes.com`**
- Replace that address wherever it appears (`index.html`) when you have a real inbox.
- Alternate contacts mentioned for ops: `contact@audiobikes.co` or `ribbit@froglegsmedia.com` — swap in as needed.

### Noscript fallback

If JavaScript is disabled, users see a mailto link to `hello@audiobikes.com`. Update that address when you change the placeholder.

## Customize checklist

- [ ] Replace `YOUR_FORM_ID` in `index.html` with your Formspree form ID
- [ ] Replace `hello@audiobikes.com` with your real contact email
- [ ] Push to GitHub and turn on Pages

---

© AudioBikes · Tyler Forrest
