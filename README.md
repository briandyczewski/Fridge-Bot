# Fridge Bot — Website

Marketing website for **Fridge Bot**, a small camera that lives inside the fridge you already own. AI reads every shelf and your phone tells you what you have and what to eat first.

A static, dependency-free front end: plain HTML, CSS and a little vanilla JavaScript. Light and dark themes, responsive down to phone width, and ready for GitHub Pages.

## Pages

| Page | File | What's on it |
| --- | --- | --- |
| Home | `index.html` | Hero with the animated "camera view", the food-waste problem, comparison, how it works, app preview, waitlist |
| How it works | `how-it-works.html` | Five-step pipeline, detailed capture → recognize → track → remind walkthrough, shelf-life logic |
| The app | `app.html` | Interactive phone demo (Use first, All items with shelf filter, Recipes, Savings) and feature grid |
| Hardware | `hardware.html` | Labeled device illustration, specs, privacy, setup steps, compatibility |
| About | `about.html` | Mission, design principles, roadmap, key stats |
| FAQ | `faq.html` | Searchable, filterable questions by topic |
| Waitlist | `waitlist.html` | Full sign-up form with fridge type and interests |
| Privacy | `privacy.html` | Plain-language privacy promise |
| 404 | `404.html` | Not-found page (GitHub Pages uses it automatically) |

## Project structure

```
assets/
  css/base.css     design tokens, typography, core components
  css/site.css     multi-page nav, inner-page components, responsive rules
  js/main.js       theme toggle, mobile menu, scroll reveal, forms, FAQ search, app demo
  img/favicon.svg
src/
  partials/        shared head, header and footer
  pages/           page bodies (edit these)
build.mjs          assembles src/ into the root *.html files
serve.mjs          tiny local preview server
```

## Editing

The root `*.html` files are generated. Edit files in `src/`, then rebuild:

```bash
node build.mjs
```

Preview locally at http://localhost:4173:

```bash
node serve.mjs
```

Requires Node.js 18+ for the build and preview scripts only; the site itself has no dependencies.

## Deploying to GitHub Pages

In the repository, go to **Settings → Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.

## Before launch

- **Waitlist forms are placeholders.** They validate input and show a success state but don't save anything. Connect a sign-up service (for example Formspree, Mailchimp, ConvertKit, or a Supabase table) in `assets/js/main.js`.
- **Specs are design targets** and will change after prototype testing.
- **Privacy page** is a plain-language promise, not a legal policy. Publish a full policy before shipping devices.
- Stats are cited on the page (EPA, 2025; Bosch survey of 2,000 adults). Re-check sources before publishing widely.
