# Development Errors Log
> Tracked for project report. Each entry includes the error, cause, and fix applied.

---

## Error 1 — AI Searchbar: `Cannot read properties of undefined (reading 'registerBackend')`

**Date:** 2026-04-14

**Where it occurred:** Home page search bar, below the search input

**What we were building:** AI-powered semantic search using `@xenova/transformers` (all-MiniLM-L6-v2 model) running in the browser

**Full error message:**
```
AI error: Cannot read properties of undefined (reading 'registerBackend')
```

**Root cause:**
Vite's module bundler processes and transforms the `@xenova/transformers` package during import — even when using `/* @vite-ignore */` and `optimizeDeps.exclude`. This breaks the package's internal backend registration system (`registerBackend` is called on an object that Vite has incorrectly resolved as `undefined`).

**What was tried first:**
- Added `optimizeDeps: { exclude: ['@xenova/transformers'] }` to `vite.config.js` — did not fix it
- Added `/* @vite-ignore */` comment to the dynamic import — did not fix it

**Fix applied:**
Loaded `@xenova/transformers` directly from jsDelivr CDN using a full URL in the dynamic import. Because Vite cannot process a full `https://` URL, it passes it straight to the browser's native `import()`, which correctly loads the pre-built browser bundle — bypassing the bundler entirely.

```js
// Before (broken — Vite interferes):
const { pipeline } = await import(/* @vite-ignore */ '@xenova/transformers');

// After (fixed — Vite cannot touch a full URL):
const { pipeline } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js');
```

**Lesson learned:**
When using large AI/ML packages like `@xenova/transformers` in a Vite + React project, do not bundle them via npm. Load them from a CDN URL directly so the browser's native dynamic import handles them untouched.

---
