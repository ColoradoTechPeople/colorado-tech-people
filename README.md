# colorado-tech-people

## Local setup

### Project stack
- Astro (public site)
- Sanity client (`@sanity/client`) for frontend CMS reads
- Sanity Studio (`sanity`) for CMS authoring in Phase 2+
- TypeScript for type checking

### Local prerequisites
- Node.js LTS (18+ recommended)
- npm (bundled with Node.js)

### Install dependencies
```bash
npm install
```

### Environment variables (`.env.example`)
1. Copy `.env.example` to `.env.local`.
2. Fill values for:
   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET`
   - `PUBLIC_SANITY_API_VERSION`
   - `PUBLIC_SITE_URL`
3. Keep `PUBLIC_GA4_MEASUREMENT_ID` empty unless explicitly testing analytics later.
4. Optional Studio overrides:
   - `SANITY_STUDIO_PROJECT_ID`
   - `SANITY_STUDIO_DATASET`
   - `SANITY_STUDIO_API_VERSION`

Notes:
- Studio and Sanity CLI read `SANITY_STUDIO_*` first, then fall back to `PUBLIC_SANITY_*`.
- Studio dataset defaults to `development` when no dataset env var is set.
- Studio API version resolves from `SANITY_STUDIO_API_VERSION`, then `PUBLIC_SANITY_API_VERSION`, then `2026-01-01`.
- Never commit real secrets or private IDs.
- `SANITY_API_READ_TOKEN` is intentionally not used in this MVP phase.

### Run the Astro site locally
```bash
npm run dev
```

### Run Sanity Studio locally
```bash
npm run studio:dev
```

### Build checks
```bash
npm run typecheck
npm run build
npm run studio:build
```

## Scope notes
- Studio is intentionally separate from public Astro routes for MVP. Studio config files live at repo root; schemas live under `studio/`.
- Episode schemas/content modeling are Phase 2 tasks and will be added under `studio/schemaTypes`.

## CMS docs
- Phase 2 Sanity Studio guide (editors + developers): `docs/phase-2-cms-guide.md`
