# Codex Instructions — Editorial Podcast Website

## Project context

We are building the MVP website for the Colorado Tech People editorial podcast.

The site is the public home for the podcast. It should help visitors discover episodes, read SEO-friendly episode pages, learn about the show, submit guest/sponsor/contact inquiries, and subscribe for podcast updates.

Riverside is the source for podcast hosting and distribution. The website should not host audio or video files directly. Instead, episode pages should reference Riverside-hosted episode assets, embeds, episode URLs, podcast platform links, transcripts, and show notes when available.

The MVP should feel credible, editorial, modern, human, and Colorado-tech oriented. Avoid generic SaaS styling. Prioritize clear typography, readable episode pages, accessible forms, strong mobile layouts, and lightweight performance.

Current MVP decisions:

- Use Sanity-hosted Studio for CMS admin.
- Use manual episode entry in Sanity for MVP.
- Defer Riverside RSS import/sync to a future phase.
- Use Netlify Forms for guest inquiry, sponsor inquiry, contact, and newsletter capture.
- Do not store form submissions in Sanity for MVP.
- Use one shared notification email for all MVP forms.
- Use GA4 for website analytics.
- Transcripts are optional for MVP, but episode pages must render cleanly with or without transcript content.
- Public episode queries, pages, listings, related modules, and sitemap entries must include only episodes with `status == "published"`.

## Tech stack

- Frontend/site framework: Astro
- CMS: Sanity, with Sanity-hosted Studio
- Hosting/deployment: Netlify
- Forms: Netlify Forms
- Analytics: Google Analytics 4
- Podcast hosting/distribution: Riverside
- Runtime/package baseline: Node.js LTS and npm unless the repository has already standardized on another package manager

Expected MVP routes:

- `/`
- `/episodes`
- `/episodes/[slug]`
- `/about`
- `/suggest-a-guest`
- `/sponsor-the-show`
- `/contact`
- `/privacy`
- `/thank-you` or inline form success states

Important environment variables:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_SANITY_API_VERSION`
- `PUBLIC_SITE_URL`
- `PUBLIC_GA4_MEASUREMENT_ID`

Optional later:

- `SANITY_API_READ_TOKEN` only if authenticated draft preview is added.

## Dependency policy

Prefer the smallest stable implementation that satisfies the current task.

Before adding any dependency:

1. Check whether Astro, Sanity, Netlify, platform APIs, or existing project utilities already solve the problem.
2. Prefer lightweight, actively maintained packages with broad usage and clear documentation.
3. Avoid large UI frameworks, animation libraries, form libraries, state-management libraries, or utility packages unless the task clearly requires them.
4. Do not add dependencies for simple formatting, validation, CSS, date handling, or one-off helpers unless there is a strong reason.
5. Do not introduce a new package manager or change lockfile strategy unless explicitly asked.
6. Do not install experimental, abandoned, or pre-release packages without approval.
7. Keep client-side JavaScript minimal. Prefer Astro server/static rendering and progressive enhancement.
8. After adding or changing dependencies, update the lockfile consistently and mention why the dependency was needed in the final response.

When unsure, do not add the dependency. Implement with existing tools and explain any tradeoff.

## Best practices / implementation rules

### Scope control

- Work only on the requested task and the current delivery phase.
- Do not build future enhancements unless explicitly requested.
- Do not implement Riverside RSS import, scheduled publishing, newsletter provider integration, CRM integration, Slack notifications, full transcript search, topic landing pages, or embedded Sanity Studio routing unless asked.
- Keep changes small, reviewable, and easy to revert.
- Before coding, briefly identify the files you expect to touch.

### Architecture

- Keep public Astro site code decoupled from Sanity Studio code.
- Centralize Sanity client setup and GROQ queries.
- Centralize published episode visibility logic so draft and archived episodes are never exposed publicly by accident.
- Keep reusable UI components small and purposeful.
- Prefer semantic Astro components and plain CSS/design tokens over heavy client-side abstractions.
- Public pages must not load admin-only resources.

### Content and CMS behavior

- Episode status values are `draft`, `published`, and `archived`.
- Published episodes require title, slug, status, publish date, summary, excerpt, and at least one listening option.
- Listening options include Riverside episode URL, Riverside embed/player URL, Apple Podcasts URL, Spotify URL, YouTube URL, or a general episode URL.
- Episode slugs must be unique and human-readable.
- Episode pages must render cleanly when optional fields are missing, including guest data, episode image, show notes, and transcript.
- Transcript content, when present, should be rendered as indexable HTML and should not be hidden inside an inaccessible widget.

### Forms

- Use Netlify-compatible static form markup.
- Include required Netlify hidden fields and honeypot spam protection.
- Use accessible labels for every form control.
- Use HTML5 validation where appropriate.
- Include understandable success and error states.
- Include hidden form type/source fields where useful.
- Email fields should use `type="email"` and an appropriate `name`, usually `email`.
- Do not store guest, sponsor, contact, or newsletter submissions in Sanity for MVP.

### SEO

- Every public page should have meaningful title and description metadata.
- Episode pages should support unique SEO title, SEO description, canonical URL, Open Graph title/description/image, and clean slug URLs.
- Generate sitemap and robots.txt.
- Exclude draft and archived episodes from sitemap and public routes.
- Use semantic headings and readable page content so episode pages are useful even without playing the embedded episode.
- Add structured data for podcast/episode pages where feasible without overcomplicating the task.

### Analytics

- Use GA4 through `PUBLIC_GA4_MEASUREMENT_ID`.
- Load GA4 only in production by default unless explicitly configured otherwise.
- Track page views and key events where implemented: newsletter signup, form submit, podcast platform click, Riverside click, and episode share click.
- Do not treat GA4 as the source of truth for podcast listens/downloads; Riverside analytics own podcast listening behavior.

### Accessibility and UX

- Design mobile-first.
- Keep navigation keyboard accessible.
- Ensure forms have visible labels and understandable errors.
- Ensure focus states are visible.
- Use alt text for meaningful images.
- Maintain WCAG AA color contrast where feasible.
- Avoid UI that depends on hover only.
- Preserve the editorial feel from the wireframes and logo palette.

### Performance and resource use

- Keep public pages fast and lightweight.
- Avoid unnecessary client-side JavaScript.
- Optimize and responsively serve images.
- Avoid blocking core content rendering with embeds or third-party scripts.
- Load podcast embeds in a way that does not make the page unusable if the third-party embed fails.
- Do not add heavy scripts or libraries for minor visual polish.

### Environment and secrets

- Never commit `.env` files or secrets.
- Public Astro variables must only contain values safe to expose in the browser.
- Do not introduce server secrets unless the task requires them.
- Use separate Sanity datasets for local/development and production when configured.
- Keep local, preview, and production environment behavior explicit.

### Testing and validation

After coding, run the most relevant available checks for the changed area, such as:

- Type check
- Lint
- Build
- Unit/component tests, if present
- Manual route check where applicable

At minimum, verify that:

- The project builds.
- Public episode queries exclude draft and archived content.
- Pages render at mobile and desktop sizes.
- Netlify form markup remains detectable in built output when forms are changed.
- SEO metadata and sitemap behavior remain correct when SEO-related code changes.

If a check cannot be run, explain why and describe what should be verified manually.

## Final response format

When completing a Codex task, respond with:

1. **Files changed** — list files changed and summarize why.
2. **What changed** — concise bullet summary of implementation.
3. **Validation** — commands run and results; if not run, explain why.
4. **Notes / risks** — mention tradeoffs, assumptions, follow-up tasks, or anything the reviewer should inspect manually.

Keep final responses concise and practical. Do not paste large code blocks unless specifically requested.
