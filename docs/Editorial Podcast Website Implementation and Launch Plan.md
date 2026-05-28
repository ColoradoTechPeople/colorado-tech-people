# Editorial Podcast Website Implementation and Launch Plan

Prepared for the Colorado Tech People editorial podcast website.

Source inputs:

- `docs/PRD_ Editorial Podcast Website.md`
- `docs/podcast_site_responsive_wireframes.jsx`
- Follow-up product decisions made during planning discussion

## 1. Confirmed MVP Decisions

### CMS Admin

Use Sanity-hosted Studio for MVP.

Implications:

- The public website will be an Astro site deployed to Netlify.
- Sanity Studio will be hosted separately through Sanity.
- Sanity will handle admin authentication, user access, and CMS hosting.
- Public website deployment and CMS Studio deployment will remain decoupled.
- Embedding Studio at `/studio` can be reconsidered later, but is not part of MVP.

### Episode Entry

Episodes will be entered manually in Sanity for MVP.

Implications:

- No Riverside RSS import or sync is required for launch.
- Riverside remains the podcast hosting and distribution source.
- Sanity stores website-facing editorial metadata and links to Riverside/platform destinations.
- Riverside RSS import can be added later as a draft-generation workflow.

### Riverside RSS Import

Defer RSS import to a possible Phase 2 enhancement.

Future direction:

- Fetch the Riverside RSS feed.
- Match episodes by RSS GUID to avoid duplicates.
- Auto-create draft Sanity episode documents.
- Let editors complete SEO, summary, guest, topics, transcript, and show notes before publishing.
- Do not auto-publish imported episodes without editorial review.

### Newsletter

Use Netlify Forms only for MVP newsletter capture.

Implications:

- The site will collect subscriber interest but will not send automated campaigns at launch.
- No Mailchimp, ConvertKit, Beehiiv, Buttondown, or similar provider is required for MVP.
- No welcome email, double opt-in, unsubscribe workflow, or segmentation is required for launch.
- Subscriber data can later be exported from Netlify and migrated into an email provider.

### Guest, Sponsor, and Contact Forms

Use Netlify Forms and email notifications only for MVP.

Implications:

- Submissions will not be copied into Sanity for MVP.
- Netlify will store form submissions.
- Netlify will send email notifications.
- Slack notifications may be added later through Netlify integrations, Zapier/Make, or a custom Netlify Function/webhook.

### Transcripts

Transcripts are strongly recommended but optional for MVP.

Implications:

- Published episodes should not be blocked if the transcript field is empty.
- Episode pages must render cleanly with or without transcript content.
- When available, transcript content should be rendered as indexable HTML content.
- CMS guidance should encourage editors to paste and lightly edit Riverside-generated transcripts.

### Brand and Design

Use the provided logo and responsive wireframes as the MVP visual source of truth.

Implications:

- Build a lightweight design system during implementation.
- Use the logo's blue/orange Colorado identity as the core palette.
- Preserve the editorial feel shown in the wireframes.
- Use strong headline typography, readable body copy, polished forms, and restrained interface styling.
- A full formal design system is not required for MVP.

### Analytics

Use GA4 for MVP analytics.

Implications:

- Add GA4 through an environment variable.
- Load analytics only in production unless staging tracking is intentionally enabled.
- Track page views, form submissions, newsletter signups, and outbound podcast platform clicks.
- Riverside analytics remain the source of truth for podcast listening and download behavior.

### Launch Content Volume

Launch with approximately 10 episodes.

Post-launch cadence:

- 1 to 2 new episodes per week.

Implications:

- Manual Sanity entry is appropriate for launch and early operations.
- Search/filtering is useful but not launch-critical.
- Topic/tag structure should exist from the start so filtering can be added later.
- Riverside RSS draft import may become valuable after the library grows.

### Publishing Workflow

Use manual publish/unpublish status for MVP.

Episode status values:

- `draft`
- `published`
- `archived`

Implications:

- No scheduled publishing is required at launch.
- Public queries should only return `published` episodes.
- Draft and archived episodes should be excluded from listing pages, detail pages, related episodes, home page modules, and sitemap.
- Schema and query helpers should be structured so scheduled publishing can be added later with minimal refactoring.

### Form Recipients

Use one shared notification email address for all MVP forms.

Implications:

- The final recipient email will be provided during production setup.
- All form notifications can route to the same inbox.
- Individual form names and subjects should clearly identify the form type.
- Separate recipients by form type can be added later.

## 2. Technical Architecture

### Stack

- Frontend/site framework: Astro
- CMS: Sanity, with Sanity-hosted Studio
- Hosting: Netlify
- Forms: Netlify Forms
- Analytics: GA4
- Podcast hosting/distribution: Riverside

### Responsibilities

Astro:

- Public website rendering
- Static episode pages
- Shared layouts and components
- SEO metadata
- Sitemap and robots.txt
- Netlify-compatible forms
- GA4 integration

Sanity:

- Episode content
- Episode SEO metadata
- Guest/topic data where useful
- Site settings
- Platform links
- Admin user access through Sanity Studio

Netlify:

- Production hosting
- Deploy previews
- Build pipeline
- Netlify Forms storage and notifications
- Future webhook or function support if needed

Riverside:

- Audio/video hosting
- Podcast RSS feed
- Distribution to podcast platforms
- Podcast listen/download analytics
- Source for embed links, episode URLs, transcripts, and show notes where available

## 3. Public Site Structure

MVP routes:

- `/`
- `/episodes`
- `/episodes/[slug]`
- `/about`
- `/suggest-a-guest`
- `/sponsor-the-show`
- `/contact`
- `/privacy`
- `/thank-you` or inline success states for form confirmations

Future possible routes:

- `/topics/[slug]`
- `/guests/[slug]`
- `/newsletter`
- `/media-kit`
- `/collections/[slug]`

## 4. Page Requirements

### Home Page

Purpose:

- Establish the podcast positioning quickly.
- Promote the latest or featured episode.
- Guide visitors to listen, browse, subscribe, suggest guests, sponsor, or contact.

Required sections:

- Header/navigation
- Podcast hero
- Featured/latest episode
- Recent episodes
- About/editorial positioning panel
- Subscribe band
- Links to guest inquiry, sponsor, contact, and podcast platforms
- Footer

### Episodes Listing

Purpose:

- Display all published episodes newest first.

MVP requirements:

- Episode title
- Episode number, if present
- Publish date
- Guest name, if present
- Excerpt
- Episode image or fallback art
- Detail page link
- Topic tags, if available

MVP recommendation:

- Use a simple newest-first listing/grid.
- Include search/filter UI only if implementation time allows.
- Keep topic data in CMS now to enable filtering later.

### Episode Detail

Purpose:

- Provide an SEO-friendly, useful page for each episode.

Required sections:

- Episode title
- Episode number, if present
- Publish date
- Guest information, if present
- Summary
- Riverside embed or platform links
- Topic tags
- Show notes
- Links mentioned
- Optional transcript
- Related episodes, optional for MVP
- Subscribe CTA
- Social/open graph metadata

Visibility rule:

- Generate public pages only for episodes with `status == "published"`.

### About

Purpose:

- Explain the editorial lens and credibility of the podcast.

Required content:

- Podcast mission
- Audience and editorial point of view
- Colorado technology ecosystem framing
- CTA to listen, suggest a guest, sponsor, or contact

### Guest Inquiry

Use Netlify Forms.

Recommended fields:

- Your name
- Your email
- Suggested guest name
- Suggested guest title/company
- Guest website or LinkedIn URL
- Suggested topic
- Why this guest would be a good fit
- Additional notes
- Consent checkbox

### Sponsor the Show

Use Netlify Forms.

Recommended fields:

- Name
- Work email
- Company name
- Company website
- Sponsorship interest
- Budget range, optional
- Desired timeline
- Message
- Consent checkbox

### Contact

Use Netlify Forms.

Recommended fields:

- Name
- Email
- Inquiry type, optional
- Subject
- Message
- Consent checkbox

### Newsletter Subscribe

Use Netlify Forms.

Recommended fields:

- Email
- First name, optional
- Hidden source field, such as `home`, `footer`, `episode-detail`, or `episodes-listing`

## 5. Sanity Content Model

### Episode

Fields:

- Title, required
- Slug, required and unique
- Status, required: `draft`, `published`, `archived`
- Publish date, required for published episodes
- Episode number, optional
- Guest name, optional
- Guest title, optional
- Guest company, optional
- Guest bio, optional rich text
- Summary, required
- Excerpt, required
- Riverside episode URL, optional
- Riverside embed URL or embed code, optional
- Riverside RSS GUID, optional
- Apple Podcasts URL, optional
- Spotify URL, optional
- YouTube URL, optional
- General episode URL, optional
- Episode image, optional
- Topics/tags, optional
- Show notes, optional rich text
- Transcript, optional rich text
- SEO title, optional
- SEO description, optional
- OG image, optional
- Canonical URL, optional

Validation:

- Published episodes require title, slug, status, publish date, summary, and excerpt.
- Published episodes require at least one listening option:
  - Riverside episode URL
  - Riverside embed URL
  - Apple Podcasts URL
  - Spotify URL
  - YouTube URL
  - General episode URL
- Slug must be unique.
- SEO description should stay within a practical length range.
- Episode images should include alt text or derive sensible alt text from the title.

### Topic

Fields:

- Title
- Slug
- Description, optional

Purpose:

- Enables future filtering, topic landing pages, and related episode logic.

### Site Settings

Fields:

- Site name
- Podcast name
- Global positioning statement
- Default SEO title
- Default SEO description
- Default OG image
- Logo
- Favicon/source icon
- Podcast platform links
- Riverside RSS URL
- Contact/manager email display text, if needed
- Social links

### Optional Future Models

Guest:

- Useful if guests recur or if guest landing pages become important.

Form submission:

- Not used in MVP because submissions stay in Netlify Forms.

Subscriber:

- Not used in MVP because newsletter capture stays in Netlify Forms.

## 6. Astro Implementation Plan

### Project Foundation

Tasks:

- Initialize Astro project structure if not already present.
- Install and configure Sanity client integration.
- Configure Netlify deployment target.
- Add environment variable support.
- Add shared layout, page shell, SEO component, and global styles.
- Add static routes and dynamic episode route.

### Design System

Tasks:

- Extract practical brand colors from logo and wireframes.
- Define CSS tokens for color, spacing, typography, borders, and shadows.
- Choose production fonts.
- Create base components:
  - Header
  - Mobile navigation
  - Footer
  - Logo treatment
  - Button
  - Form field
  - Subscribe band
  - Episode card
  - Episode player/link block
  - Topic chips
  - Page hero

Design constraints:

- Maintain editorial tone.
- Avoid generic SaaS styling.
- Keep mobile layouts first-class.
- Ensure accessible contrast and keyboard navigation.

### Sanity Data Layer

Tasks:

- Create a Sanity client module.
- Centralize episode visibility query logic.
- Create queries for:
  - site settings
  - featured/latest episode
  - recent episodes
  - all published episodes
  - episode by slug
  - topics
  - related episodes, optional
- Ensure all public queries exclude drafts and archived episodes.

### SEO

Tasks:

- Add global SEO defaults.
- Add per-page title and description.
- Add per-episode SEO metadata.
- Add canonical URLs.
- Add Open Graph metadata.
- Add sitemap generation.
- Add robots.txt.
- Add structured data for podcast/episode pages where feasible.
- Ensure draft/archived episodes are excluded from sitemap.

### Forms

Tasks:

- Implement Netlify-compatible forms for:
  - guest inquiry
  - sponsor inquiry
  - contact
  - newsletter subscribe
- Include required hidden Netlify form fields.
- Add honeypot spam fields.
- Add HTML5 validation and accessible error messaging.
- Add success confirmation behavior.
- Include hidden form type/source fields.
- Ensure email fields use `name="email"` where appropriate.

### Analytics

Tasks:

- Add GA4 measurement ID via environment variable.
- Load GA4 only in production by default.
- Track page views.
- Track key events:
  - `newsletter_signup`
  - `form_submit`
  - `podcast_platform_click`
  - `riverside_click`
  - `episode_share_click`, if sharing controls are implemented

Suggested event parameters:

- `form_type`
- `source`
- `episode_slug`
- `platform`

## 7. Local Environment Setup

### Prerequisites

Install locally:

- Node.js LTS
- npm, unless the project standardizes on another package manager
- Sanity CLI
- Netlify CLI

### Local Environment Variables

Create local environment configuration for Astro:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET=development`
- `PUBLIC_SANITY_API_VERSION`
- `PUBLIC_SITE_URL=http://localhost:4321`
- `PUBLIC_GA4_MEASUREMENT_ID`, optional locally and usually empty

Optional later:

- `SANITY_API_READ_TOKEN`, only if authenticated draft preview is added

### Local Sanity Setup

Tasks:

- Create or connect Sanity project.
- Create `development` dataset.
- Configure Studio schemas.
- Add sample content:
  - 10 representative episodes
  - at least 1 draft episode
  - at least 1 archived episode
  - at least 1 episode with transcript
  - at least 1 episode without transcript
  - topic tags
  - site settings

### Local Development Workflow

Tasks:

- Run Astro dev server.
- Run or access Sanity Studio.
- Verify Sanity content appears on local pages.
- Verify draft/archived content is hidden publicly.
- Verify Netlify Forms markup is present in built output.
- Test responsive layouts at mobile, tablet, and desktop sizes.

## 8. Production Setup

### Sanity Production

Tasks:

- Create `production` dataset.
- Deploy Sanity-hosted Studio.
- Add podcast manager users.
- Configure CORS for:
  - local development URL
  - Netlify deploy preview URLs
  - production domain
- Add production content:
  - site settings
  - logo and fallback images
  - initial 10 episodes
  - privacy content

### Netlify Production

Tasks:

- Create Netlify site connected to the Git repository.
- Configure build command:
  - `npm run build`
- Configure publish directory:
  - `dist`
- Add production environment variables:
  - `PUBLIC_SANITY_PROJECT_ID`
  - `PUBLIC_SANITY_DATASET=production`
  - `PUBLIC_SANITY_API_VERSION`
  - `PUBLIC_SITE_URL=https://production-domain`
  - `PUBLIC_GA4_MEASUREMENT_ID`
- Enable deploy previews.
- Confirm Netlify Forms detection.
- Add shared form notification recipient email when available.
- Configure custom domain and HTTPS.

### Forms Production

Tasks:

- Submit production test entries for:
  - guest inquiry
  - sponsor inquiry
  - contact
  - newsletter signup
- Confirm submissions appear in Netlify Forms.
- Confirm email notifications arrive.
- Confirm notification subjects clearly identify form type.
- Confirm reply-to behavior where feasible.
- Confirm success messages appear.

### Analytics Production

Tasks:

- Verify GA4 receives page views.
- Verify event tracking for:
  - form submissions
  - newsletter signup
  - podcast platform clicks
  - Riverside clicks
- Exclude internal traffic if desired.
- Document Riverside analytics as the source of listening data.

## 9. QA Plan

### Content QA

Checklist:

- Home page shows correct podcast positioning.
- Latest or featured episode appears.
- Episodes listing shows published episodes newest first.
- Draft episodes do not appear.
- Archived episodes do not appear.
- Episode detail pages render all available content.
- Episodes without transcripts render cleanly.
- External podcast platform links work.
- Riverside links or embeds work.

### CMS QA

Checklist:

- Admin can log in to Sanity Studio.
- Admin can create draft episode.
- Admin can edit episode.
- Admin can publish episode.
- Admin can archive episode.
- Required field validation works.
- Published episode requires at least one listening option.
- Slug uniqueness works.
- Editor previews are understandable.

### Forms QA

Checklist:

- Required field validation works.
- Email validation works.
- Consent checkbox behavior is correct.
- Honeypot field does not interfere with real users.
- Netlify stores submissions.
- Notification email is sent.
- Success confirmation displays.
- Error state is accessible and understandable.

### SEO QA

Checklist:

- Each public page has a meaningful title and description.
- Episode pages have unique metadata.
- Canonical URLs are correct.
- Open Graph metadata works.
- Sitemap exists.
- Robots.txt exists and references sitemap.
- Sitemap excludes draft/archived episodes.
- Structured data validates where implemented.

### Accessibility QA

Checklist:

- Forms have visible labels.
- Error messages are understandable.
- Keyboard navigation works.
- Focus states are visible.
- Images have alt text.
- Color contrast meets WCAG AA where feasible.
- Mobile menu is keyboard accessible.

### Performance QA

Checklist:

- Images are optimized and responsive.
- Public pages do not load CMS admin resources.
- No unnecessary heavy client scripts.
- Lighthouse mobile score is acceptable.
- Riverside embeds do not block core content rendering.

### Responsive QA

Checklist:

- Home page works on mobile, tablet, desktop.
- Episode listing works on mobile, tablet, desktop.
- Episode detail works on mobile, tablet, desktop.
- Forms work on mobile, tablet, desktop.
- Header and footer navigation remain usable at all breakpoints.

## 10. Launch Checklist

The site is ready to launch when:

- Production domain and HTTPS are active.
- Production Sanity dataset is connected.
- Sanity-hosted Studio is deployed.
- Podcast managers have Studio access.
- Initial 10 episodes are entered and reviewed.
- Published episodes appear publicly.
- Draft and archived episodes are hidden.
- Each episode has a working listening option.
- Forms submit successfully in production.
- Shared form notification email is configured.
- Newsletter signup works.
- Privacy Policy is published.
- GA4 is installed and receiving data.
- Sitemap and robots.txt are live.
- Core pages have final SEO metadata.
- Open Graph previews are checked.
- Mobile layouts are tested.
- Desktop layouts are tested.
- 404 page is available.
- Final smoke test is complete after DNS cutover.

## 11. Suggested Delivery Phases

### Phase 1: Foundation

Deliverables:

- Astro project setup
- Netlify-ready build setup
- Sanity client setup
- Shared layout and routing
- Basic global styles and design tokens

### Phase 2: CMS

Deliverables:

- Sanity project/datasets
- Sanity Studio schemas
- Episode validation
- Site settings
- Sample content

### Phase 3: Public Pages

Deliverables:

- Home page
- Episodes listing
- Episode detail pages
- About page
- Privacy page
- Header/footer/navigation

### Phase 4: Forms

Deliverables:

- Guest inquiry form
- Sponsor inquiry form
- Contact form
- Newsletter signup form
- Netlify Forms configuration
- Success/error states

### Phase 5: SEO and Analytics

Deliverables:

- Global and page-level metadata
- Episode SEO metadata
- Sitemap
- Robots.txt
- Structured data where feasible
- GA4 page views and event tracking

### Phase 6: QA and Content Load

Deliverables:

- Initial 10 launch episodes entered
- Responsive QA
- Accessibility QA
- SEO QA
- Form notification QA
- Performance QA

### Phase 7: Production Launch

Deliverables:

- Production Sanity dataset
- Sanity-hosted Studio deployed
- Netlify production environment configured
- Domain and HTTPS configured
- Final smoke test
- Launch approval

## 12. Future Enhancements

Recommended future backlog:

- Riverside RSS draft import
- Scheduled publishing
- Topic filtering/search on episode listing
- Full transcript search
- Related episode algorithm
- Guest profile pages
- Sponsor media kit page or download
- Slack notifications for form submissions
- Email marketing provider integration
- Double opt-in newsletter flow
- CRM integration for sponsor inquiries
- Social sharing image generation per episode
- Video episode support
- Editorial collections or playlists

