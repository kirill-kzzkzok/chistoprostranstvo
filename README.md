# ЧистоПространство

Responsive cleaning-service landing page with a price calculator, before/after comparisons and client-side forms. Built with vanilla JavaScript, HTML and CSS.

## Task

Help visitors explore cleaning types and get a price estimate based on property type, area, cleaning type and selected options.

## Technical solution

Calculator rates and service descriptions are plain JavaScript data. Input controls update the estimate in the browser; before/after sliders use pointer and keyboard interactions. Vite builds the static page and its assets.

## Implementation

- Dynamic estimate updates from property, area, cleaning type and extra-service controls.
- Before/after comparison sliders and responsive navigation.
- Client-side input checks with accessible status messages.
- Static legal pages are served from the public directory.
- The forms are demonstrations. They do not submit requests or send personal data.

## Stack

Vanilla JavaScript · HTML · CSS · Vite

## Run locally

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`.

## Live demo

[https://chistoprostranstvo.vercel.app](https://chistoprostranstvo.vercel.app)
