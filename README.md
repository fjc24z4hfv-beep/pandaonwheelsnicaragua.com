# Panda on Wheels – static site

Plain HTML/CSS/JS, no build step. Deploy the folder as-is to GitHub Pages or Netlify
(publish directory = this folder). Planned domain: pandaonwheelsnicaragua.com.

Live for now on GitHub Pages (branch `main`, folder `/`, no `CNAME`):

https://fjc24z4hfv-beep.github.io/pandaonwheelsnicaragua.com/

Canonical, `og:url`, `og:image`, and the JSON-LD `url` / `logo` / `image` point at
that Pages URL so link previews work before the domain is registered. Asset paths
are relative (`images/...`, `video/...`, `favicon-32.png`), so they work under the
`/pandaonwheelsnicaragua.com/` subpath. When the domain is registered, replace every
`https://fjc24z4hfv-beep.github.io/pandaonwheelsnicaragua.com` in `index.html` with
`https://pandaonwheelsnicaragua.com` — the comment above the canonical link marks
that one-string swap. Do not add a `CNAME` file until the domain is ready.

- `index.html` – page (English is the default/static copy; canonical/OG URLs currently use the GitHub Pages URL above)
- `main.js` – EN/ES toggle (saved in localStorage, `?lang=es` also works), Spanish copy, WhatsApp prefilled messages
- `config.js` – **WhatsApp number lives here** (`WHATSAPP_NUMBER`, `WHATSAPP_DISPLAY`).
  Also update `"telephone"` in the JSON-LD block in `index.html` if it ever changes.
- Logo files: `images/logo-original.png` (owner's file), `logo-white*.png/webp` (white art, transparent bg, alpha = luminance),
  `logo-dark*.png/webp` (near-black art on transparent, for light backgrounds; not currently used on the page),
  `logo-square-512.png` (black square icon, JSON-LD logo), `logo-badge-*.png` (header), `og-image.jpg` (1200×630, logo on black),
  `favicon-32.png`, `favicon.ico`, `apple-touch-icon.png` (180)
- Palette: black & white sections alternating; WhatsApp green (#117a45) is the only accent color
- `images/` – compressed web images (`images/originals/` = source storefront photo, not used by the page)
- `video/` – 5.5 s muted loop (watermark cropped out, no audio) + poster
- `preview/` – QA screenshots (not needed for hosting)

Preview locally: `python3 -m http.server 8000` then open http://localhost:8000

## TODO / needed from the owner
- Rates (site says "Message us for rates")
- Opening hours, exact address / Google Maps pin (footer uses a Maps search link)
- Optional: photos of scooters, beaches, helmets; Google reviews link; Instagram/Facebook links
- Register the domain, then swap the GitHub Pages URL in `index.html` back to `https://pandaonwheelsnicaragua.com` (see the comment above the canonical link)
