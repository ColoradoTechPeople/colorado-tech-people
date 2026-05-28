# colorado-tech-people

## Phase 1 developer setup

### Project stack
- Astro (site framework)
- Sanity client (`@sanity/client`) for CMS connectivity foundations
- Netlify-ready static build output (deployment is a later phase)
- TypeScript for type checking

### Local prerequisites
- Node.js LTS (18+ recommended)
- npm (bundled with Node.js)

### Install dependencies
```bash
npm install
```

### Run local development server
```bash
npm run dev
```

### Build for production output (local verification)
```bash
npm run build
```

### Environment variables (`.env.example`)
1. Copy `.env.example` to `.env.local`.
2. Fill placeholder values for:
   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET`
   - `PUBLIC_SANITY_API_VERSION`
   - `PUBLIC_SITE_URL`
3. Keep `PUBLIC_GA4_MEASUREMENT_ID` empty in local Phase 1 unless explicitly testing analytics wiring later.

Notes:
- Never commit real secrets or private IDs.
- `SANITY_API_READ_TOKEN` is intentionally not used in Phase 1.

### Phase 1 scope
Phase 1 covers foundation only: Astro project setup, Netlify-compatible build setup, Sanity client setup, shared layout/routing foundations, and baseline global styles/design tokens.

### Intentionally out of scope (later phases)
The following are not implemented in Phase 1: Sanity CMS schemas/content modeling, public episode/content pages, form workflows, SEO/analytics implementation, full QA hardening, and production launch/deployment execution.
