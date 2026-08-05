# HSK Flash

Spaced-repetition flashcards for HSK 1-4 Chinese vocabulary (1,193 words).

Live: https://justusweaver6.github.io/HSKCARD/

## Contents

| File | Purpose |
| --- | --- |
| `index.html` | The entire app - styles, fonts, framework and all 1,193 vocabulary entries are inlined. No other files are required to run it. |
| `manifest.json` | Web app manifest (name, icons, standalone display) - required by PWABuilder. |
| `sw.js` | Service worker. Network-first, so a deploy is picked up immediately and the app still opens offline. |
| `icon-192.png`, `icon-512.png` | App icons. |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages. |

## Deploying

1. Upload every file above to the repository root.
2. Settings > Pages > Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Wait for the green deployment, then load the Pages URL.

## Packaging for Android

Point PWABuilder at the Pages URL and package. Keep the generated signing key private - never commit it to this repository.
