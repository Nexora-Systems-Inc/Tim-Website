# Tim Website

Galerie Artistes Peintres — Sherbrooke gallery website.

## Project structure

| Path | Purpose |
|------|---------|
| **`website/`** | **Active production codebase.** All development, builds, and deployments happen here. |
| **`archive/`** | Historical snapshots only (V1, V3, V4). Do not edit or build from these folders. |

## Development

```bash
cd website
npm install
npm run dev      # local development server
npm run build    # production static export → website/out/
```

## Important

- **All future work must occur inside `website/`.**
- The `archive/` folder is read-only reference material from earlier iterations.
- Static export output lives in `website/out/` after `npm run build`.

## Repository

- **Git remote:** `https://github.com/Nexora-Systems-Inc/Tim-Website.git`
- **Production branch:** `main`
