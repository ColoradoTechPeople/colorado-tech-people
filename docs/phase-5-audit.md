# Phase 5 SEO and Analytics Audit

Audit date: 2026-06-22

## Scope

This audit records the repository state before Phase 5 implementation. It does not change public behavior, forms, routes, or CMS schemas.

## What already exists

### Metadata foundation

- `src/layouts/BaseLayout.astro` owns the shared document `<head>`, renders a page `<title>`, and delegates description, canonical, and Open Graph tags to `src/components/SEO.astro`.
- `src/components/SEO.astro` emits a meta description and basic `og:type`, `og:title`, `og:description`, and `og:image` tags. It emits canonical and `og:url` only when a canonical value is passed.
- All current public pages use `BaseLayout`. Home, team, privacy, contact, guest inquiry, sponsor inquiry, thank-you, and episode detail pages pass page-specific titles and descriptions. The episode archive passes a title but uses the layout's generic fallback description.
- Episode detail pages use `seoTitle` and `seoDescription` when present, then fall back to episode title/excerpt/summary. They pass the CMS canonical override and use the CMS OG image, then episode artwork, before the global image fallback.
- `PUBLIC_SITE_URL` is declared in `src/env.d.ts`, documented in `.env.example`, and used by `SEO.astro` to resolve canonical/image URLs. When absent, it falls back to `http://localhost:4321`.

### CMS and published episode controls

- The episode schema already has `seoTitle`, `seoDescription`, `canonicalUrl`, and `ogImage` fields in `studio/schemaTypes/documents/episode.ts`.
- Site settings already define `defaultSeoTitle`, `defaultSeoDescription`, and `defaultOgImage` in `studio/schemaTypes/documents/siteSettings.ts`.
- `episodeBySlugQuery` fetches all episode SEO fields and image URLs.
- `PUBLISHED_EPISODE_FILTER` centralizes `status == "published"`. The home, archive, episode static paths, detail lookup, and related episodes all use queries composed from that filter.
- Episode transcripts and show notes render as HTML, providing indexable page content when present.

### Forms and outbound links

- Netlify forms post to `/thank-you` through `src/components/forms/Form.astro`; form names and hidden `form_type`/`source` values provide stable event context.
- Podcast-platform links are rendered in `EpisodeCard.astro`, `EpisodePlayerOrLinks.astro`, the home subscription band, and `Footer.astro`. Links mentioned are rendered directly in the episode detail route.
- No existing link or form markup includes analytics data attributes, and no analytics listener or event dispatch exists.

### Configuration

- `PUBLIC_GA4_MEASUREMENT_ID` is declared in `src/env.d.ts` and documented as empty in `.env.example`.
- Astro is configured for static output in `astro.config.mjs`.

## Requirement gaps

| Phase 5 requirement | Current state | Exact gap |
| --- | --- | --- |
| Global and page-level title/description | Partial | Shared defaults and most page-specific values exist. `/episodes` has no specific description. CMS site-setting SEO defaults are neither queried nor consumed. |
| Canonical URLs | Partial | Canonical support exists, but tags are emitted only for an explicitly supplied episode CMS override. Ordinary pages and episodes without overrides have no self-referencing canonical. `Astro.url.pathname` is not used to derive one. |
| Open Graph metadata | Partial | Basic website OG tags exist globally. Episode pages still emit `og:type=website`; there is no episode-specific type or podcast/article metadata. No locale/site-name tags or image alt metadata exist. The fallback `/assets/logo.png` is a literal public URL, but there is no `public/assets/logo.png`, so it may produce a missing asset. |
| Episode SEO metadata | Partial | CMS overrides and fallbacks are wired. Canonical fallback is missing, and the default site-settings SEO values are unused. OG image handling does not expose image alt text. |
| Sitemap | Missing | No `@astrojs/sitemap` dependency/integration, endpoint, or static sitemap exists. A future implementation must include static routes and only slugs returned by the shared published filter. |
| `robots.txt` | Missing | No `public/robots.txt` or Astro endpoint exists. It therefore cannot advertise the sitemap or express crawl policy. |
| Structured data | Missing | No JSON-LD or other schema.org markup exists for the podcast, site, organization, or episodes. |
| GA4 page views | Missing | The measurement-ID environment variable is only typed/documented. No production guard, Google tag loader, `dataLayer`, `gtag`, config call, or page-view dispatch exists. |
| Analytics events | Missing | No form-submit, newsletter-signup, podcast-platform, Riverside, or episode-share events exist. There is currently no newsletter form or episode-share control to instrument. |
| Riverside outbound tracking | Blocked by current UI coverage | Riverside/general episode URLs are queried, but `EpisodePlayerOrLinks.astro` currently renders only Apple, Spotify, and YouTube links. Phase 5 should not invent a Riverside control while tracking; it can instrument only links that are actually rendered unless a separate scoped UI decision is made. |
| Episode share tracking | Blocked by current UI coverage | No share link/button exists, so there is no current interaction to instrument without adding product behavior beyond an analytics-only change. |

Twitter/X card tags are also absent. They are not explicitly named in the Phase 5 requirements, but should be decided when social metadata is implemented.

## Requirement-to-file map

| Requirement | Likely files to modify or add |
| --- | --- |
| Shared title, description, canonical, OG, and optional structured-data interface | `src/components/SEO.astro`, `src/layouts/BaseLayout.astro` |
| Route-specific metadata | `src/pages/index.astro`, `src/pages/episodes/index.astro`, `src/pages/episodes/[slug].astro`, `src/pages/team.astro`, `src/pages/privacy.astro`, `src/pages/contact.astro`, `src/pages/suggest-a-guest.astro`, `src/pages/sponsor-the-show.astro`, `src/pages/thank-you.astro` |
| CMS global SEO defaults | `src/lib/sanity/queries.ts`, `src/layouts/BaseLayout.astro`; existing definitions in `studio/schemaTypes/documents/siteSettings.ts` likely need no schema change |
| Episode SEO projection/types | `src/lib/sanity/queries.ts`, `src/lib/episodes.ts`, `src/pages/episodes/[slug].astro`; existing episode schema fields likely need no schema change |
| Sitemap | `astro.config.mjs` and `package.json`/`package-lock.json` if the Astro integration is selected, or a new `src/pages/sitemap.xml.ts` if implemented without a dependency |
| Robots | new `public/robots.txt` or `src/pages/robots.txt.ts`; `PUBLIC_SITE_URL` for the absolute sitemap URL |
| Podcast/episode JSON-LD | `src/components/SEO.astro` or a focused new SEO component, `src/layouts/BaseLayout.astro`, `src/pages/episodes/[slug].astro`, and possibly `src/pages/index.astro` |
| GA4 loader and production-only page views | `src/layouts/BaseLayout.astro` or a focused new analytics component; `src/env.d.ts` and `.env.example` already contain the variable |
| Form submission events | `src/components/forms/Form.astro`, using existing form names and hidden context; `/thank-you` may support conversion confirmation if the tracking design chooses that model |
| Podcast-platform/Riverside click events | `src/components/EpisodeCard.astro`, `src/components/EpisodePlayerOrLinks.astro`, `src/pages/index.astro`, and `src/components/Footer.astro` |
| Links-mentioned tracking, if included | `src/pages/episodes/[slug].astro` |
| Episode-share event | No file until a share control is explicitly approved; likely the episode detail route or a new focused component |

## Assumptions and risks

- `PUBLIC_SITE_URL` must be a valid production origin. The current localhost fallback is useful for development but would create incorrect absolute OG/canonical URLs if production is misconfigured.
- `new URL(PUBLIC_SITE_URL)` runs during rendering and will fail the build if the value is malformed; there is no explicit environment validation for site or GA4 values.
- `BaseLayout` fetches site settings separately for every generated page and silently falls back on failure. Extending that query for SEO defaults preserves the current architecture but keeps metadata dependent on build-time Sanity availability.
- The site-settings schema contains default SEO fields, but `siteSettingsQuery` currently omits them. Existing CMS content for those fields was not inspected by this code audit.
- The thank-you page is indexable unless a later Phase 5 decision adds robots metadata; whether it should be `noindex` is unresolved.
- The expected route list in `AGENTS.md` names `/about`, while the current repository exposes `/team`. This audit maps the route that actually exists and does not propose a route change.
- Static builds catch Sanity fetch failures and can succeed with no generated episode pages. Validation should distinguish a successful build from proof that live published episodes were fetched and included.
- GA4 should load only in production and only when a non-empty measurement ID is configured. Event code should fail harmlessly when GA4 is absent or blocked.
- Riverside remains the source of truth for listens/downloads; website events can measure outbound clicks, not confirmed playback.

## Recommended Phase 5 sequence

1. Establish validated site URL handling, self-referencing canonicals, CMS defaults, complete OG output, and page-level metadata coverage.
2. Add sitemap and robots output, reusing `PUBLISHED_EPISODE_FILTER` for episode URLs.
3. Add focused podcast/episode JSON-LD using already available content and omit unknown optional properties.
4. Add a production-gated GA4 loader and page-view configuration.
5. Add delegated event tracking with stable data attributes for existing forms and outbound listening links; document share/newsletter/Riverside UI gaps rather than fabricating interactions.
