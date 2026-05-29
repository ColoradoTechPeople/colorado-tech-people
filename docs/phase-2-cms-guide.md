# Phase 2 CMS Guide (Sanity Studio)

Practical reference for editors and developers working on CMS-only Phase 2.

## Run Sanity Studio Locally

1. Install dependencies:
```bash
npm install
```
2. Create local env file:
```bash
cp .env.example .env.local
```
3. Start Studio:
```bash
npm run studio:dev
```
4. Open the local Studio URL shown in terminal (typically `http://localhost:3333`).

## Required Local Environment Variables

Use `.env.local` and set:

- `PUBLIC_SANITY_PROJECT_ID` (required)
- `PUBLIC_SANITY_DATASET` (recommended: `development`)
- `PUBLIC_SANITY_API_VERSION` (recommended: `2026-01-01`)

Optional Studio-only overrides:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_API_VERSION`

Resolution behavior:

- Studio/CLI use `SANITY_STUDIO_*` first, then `PUBLIC_SANITY_*`.
- Dataset defaults to `development` when none is set.
- API version defaults to `2026-01-01` when none is set.

Do not commit secrets or private credentials.

## Dataset Expectations (Phase 2)

- Use `development` dataset for all Phase 2 modeling and content-entry testing.
- Keep production content separate in a future `production` dataset.
- Do not treat `development` content as launch content.

## Editor Workflow

### Create an Episode Draft

1. In Studio, create a new `Episode`.
2. Add at minimum: `Title` and `Slug` so the draft is identifiable.
3. Keep `Status` as `Draft` while editing.

### Required Before Publishing an Episode

When `Status = Published`, the schema requires:

- `Title`
- `Slug`
- `Status`
- `Publish Date`
- `Summary`
- `Excerpt`
- At least one listening option (see below)

## Listening Option Requirements (Published Episodes)

At least one of these fields must be filled before publish:

- `Riverside Episode URL`
- `Riverside Embed URL`
- `Riverside Embed Code`
- `Apple Podcasts URL`
- `Spotify URL`
- `YouTube URL`
- `General Episode URL`

All URL fields must be full `http://` or `https://` URLs.

## Riverside URL/Embed/Platform Link Guidance

- `Riverside Episode URL`: preferred canonical link to the Riverside episode page.
- `Riverside Embed URL` or `Riverside Embed Code`: use if you have a valid Riverside player embed.
- Platform links (`Apple`, `Spotify`, `YouTube`): add any that exist for the episode.
- `General Episode URL`: fallback when a platform-specific URL is unavailable.

This project does not host audio/video files directly.

## Transcripts and Show Notes

- `Show Notes` is optional rich text (`portableText`).
- `Transcript` is optional rich text (`portableText`).
- Leave transcript empty if unavailable; published episodes are still allowed.
- Prefer edited, readable content copied from Riverside when available.

## Topics

- Create/manage `Topic` documents in Studio (`title` + unique `slug` required).
- Add topics to episodes via the `Topics` field (reference list).
- Reuse existing topics when possible to keep naming consistent.

## Site Settings

Use the `Site Settings` singleton to manage global podcast/site metadata:

- Brand: site name, podcast name, positioning statement, logo, favicon source
- SEO defaults: default title, default description, default OG image
- Links: podcast platform links, Riverside RSS URL, social links
- Contact display email

Required fields in Site Settings are enforced by validation.

## Sample Content Needed for Phase 3 Testing

In `development`, keep a representative set ready:

- 8-10 episodes total
- At least 1 `draft` episode
- At least 1 `archived` episode
- At least 4 `published` episodes
- At least 1 published episode with transcript
- At least 1 published episode without transcript
- Mix of listening options across episodes (Riverside URL, embed, platform links)
- 5-8 reusable topics
- 1 completed Site Settings document

This supports upcoming Astro integration testing without implying production readiness.
