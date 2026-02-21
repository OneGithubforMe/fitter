# Fitter

A workout app built with React + Vite.

## GitHub Pages Deployment

The app is configured for deployment to GitHub Pages at `https://<username>.github.io/fitter/`.

### Automatic deployment (recommended)

1. In your repo, go to **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**
3. Select the `gh-pages` branch and `/ (root)` folder
4. Push to `main` or `master` — the workflow will build and deploy to `gh-pages` automatically

### Manual deployment

```bash
npm run deploy
```

Then in **Settings → Pages**, set **Source** to the `gh-pages` branch.

### Local development

For local dev, the app runs at `http://localhost:5173/`. To test the production build with the correct base path:

```bash
npm run build:pages
npm run preview
```

## PWA (Progressive Web App)

The app is a PWA and can be installed on your phone or desktop:

1. Deploy the app to GitHub Pages (or run locally with HTTPS)
2. Open the app URL in Chrome (Android) or Safari (iOS)
3. **Android**: Tap the "Add to Home screen" prompt or use the browser menu → "Install app"
4. **iOS**: Tap the Share button → "Add to Home Screen"

Once installed, the app runs in standalone mode (full screen, no browser UI) and works offline for cached content.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
