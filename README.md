# Plāns B — Indie Rock no Liepājas

Official website for **Plāns B**, a Latvian indie rock band from Liepāja.

## Live Site

Deployed on Netlify — [plansb.netlify.app](https://plansb.netlify.app) *(update with your actual URL)*

## Tech Stack

- **Pure HTML / CSS / JS** — no frameworks, no build step
- **GSAP + ScrollTrigger** — scroll-driven animations, parallax, section reveals
- **Modern CSS (2026)** — `@layer`, `clamp()`, `:has()`, container queries, `color-mix()`
- **Netlify** — static hosting with security headers, edge CDN

## Features

- Single-page landing with smooth scroll navigation
- Film grain + scan line overlay for analog aesthetic
- Responsive — mobile-first with hamburger menu
- Gallery lightbox with high-res zoom
- Newsletter signup form
- `prefers-reduced-motion` respected
- AVIF/WebP images with `<picture>` fallbacks
- Subresource Integrity (SRI) on CDN scripts
- Content Security Policy (CSP) + full security header suite

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | Hero | Band name, tagline, CTAs, concert photo with parallax |
| 2 | Par Mums | Band bio + backstage photo |
| 3 | Mūzika | Featured EP with tracklist + streaming links |
| 4 | Koncerti | Upcoming shows with ticket links |
| 5 | Galerija | Photo grid — B&W to color on hover |
| 6 | Kontakti | Contact info + newsletter signup |

## Project Structure

```
├── index.html       # Full page markup
├── styles.css       # Styles with @layer organization
├── script.js        # GSAP animations + interactions
├── netlify.toml     # Netlify deploy config + security headers
├── _headers         # Fallback headers file
└── .gitignore
```

## Deploy

Push to GitHub → connect repo in [Netlify](https://app.netlify.com/) → auto-deploys. No build command needed.

## Customization

- Replace Unsplash stock photos with real band images
- Update social media links in footer and mobile menu
- Update streaming platform URLs in the music section
- Connect newsletter form to Mailchimp / Buttondown / your backend
- Replace `info@plansb.lv` / `booking@plansb.lv` with real emails
- Update tour dates in the Koncerti section

## License

All rights reserved © 2026 Plāns B
