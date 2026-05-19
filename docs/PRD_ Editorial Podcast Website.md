# **PRD: Editorial Podcast Website**

## **1\. Product Overview**

The website is the public home for an editorial podcast. It should help visitors discover episodes, learn more about the show, submit guest/sponsorship/contact inquiries, and subscribe for podcast updates.

The podcast is hosted and distributed through Riverside. The website does not need to host podcast audio/video files directly. Instead, the website should reference Riverside-hosted episode assets, podcast platform links, RSS metadata, transcripts, and/or embed options where available.

The site should feel credible, editorial, easy to browse, and optimized for organic discovery through SEO.

## **2\. Goals**

The website should:

1. Publish and organize all released podcast episodes.  
2. Provide a dedicated SEO-friendly page for each episode.  
3. Allow podcast managers to add and edit episode pages through a lightweight admin CMS.  
4. Capture guest, sponsor, and general contact inquiries through dedicated forms.  
5. Notify podcast managers by email when a form is submitted.  
6. Allow visitors to subscribe to podcast updates by email.

## **3\. Non-Goals / Out of Scope for Initial Version**

The first version does not need to include:

* Full user accounts for public visitors.  
* Paid membership or gated content.  
* Commenting on episodes.  
* Complex marketing automation.  
* Advanced analytics dashboards.  
* In-browser podcast hosting or audio file management, unless explicitly needed later.  
* Multi-language support.  
* Full CRM functionality for inquiry management.  
* Hosting podcast audio or video files directly on the website.  
* Building custom podcast RSS feed generation, unless Riverside RSS cannot support the desired website workflow.  
* Replacing Riverside’s recording, editing, publishing, transcription, or analytics functionality.  
* Managing podcast distribution to Spotify, Apple Podcasts, YouTube, or other directories from the website.

## **4\. Target Users**

### **Public Website Visitors**

Visitors may include listeners, potential guests, potential sponsors, community members, journalists, and people discovering the podcast through search.

They need to:

* Browse released episodes.  
* Find episodes by topic, guest, or keyword.  
* Open an individual episode page.  
* Listen to or access the episode.  
* Submit relevant inquiries.  
* Subscribe for updates.

### **Podcast Managers / Admins**

Podcast managers need to:

* Add new episode pages.  
* Edit existing episode pages.  
* Publish or unpublish episode pages.  
* Manage episode metadata for SEO.  
* Receive contact form notifications.  
* Review subscription signups.

## **5\. Site Structure**

Recommended public pages:

* Home  
* Episodes listing  
* Episode detail page  
* Guest Inquiries  
* Sponsor the Show  
* Contact Us  
* Subscribe / newsletter signup, embedded globally  
* About  
* Privacy Policy, recommended if collecting emails or form submissions

## **6\. Public Website Requirements**

### **6.1 Home Page**

The home page should introduce the podcast and guide users toward recent episodes and key actions.

**Required content:**

* Podcast name and short positioning statement.  
* Featured or latest episode.  
* List or preview of recent episodes.  
* Primary CTA: listen to latest episode.  
* Secondary CTA: subscribe for updates.  
* Links to Guest Inquiries, Sponsor the Show, and Contact Us.  
* Links to external podcast platforms, if available.

**Acceptance criteria:**

* Visitors can understand what the podcast is about within a few seconds.  
* Visitors can access the latest episode from the home page.  
* Visitors can subscribe for updates from the home page.  
* Visitors can navigate to contact-related pages.

---

### **6.2 Episodes Listing Page**

The episodes listing page displays all released podcast episodes.

**Required content per episode card/list item:**

* Episode title  
* Episode number, if used  
* Publish date  
* Guest name, if applicable  
* Short description or excerpt  
* Thumbnail or cover image, if available  
* Link to episode detail page

**Recommended filtering/search:**

For the first version, a simple list is acceptable. If the number of episodes is expected to grow quickly, add:

* Search by title, guest, or topic  
* Topic/category filter  
* Pagination or “Load more”

**Acceptance criteria:**

* All published episodes are listed.  
* Unpublished or draft episodes are not visible publicly.  
* Episodes are ordered newest first by default.  
* Each episode links to its dedicated episode page.

---

### **6.3 Episode Detail Page**

Each episode should have its own SEO-friendly page.

**Required content:**

* SEO-friendly URL slug, for example: `/episodes/founder-story-jane-smith`  
* Episode title  
* Episode number, if applicable  
* Publish date  
* Guest name and short guest bio, if applicable  
* Episode summary  
* Embedded audio player or links to podcast platforms  
* Key topics or tags  
* Show notes  
* Relevant links mentioned in the episode  
* Transcript, optional for V1 but strongly recommended for SEO and accessibility  
* Social sharing metadata

**SEO requirements:**

Each episode page should support:

* Unique page title  
* Meta description  
* Open Graph title  
* Open Graph description  
* Open Graph image  
* Canonical URL  
* Structured data for podcast episode, if supported by the implementation  
* Clean, human-readable URL slug

**Acceptance criteria:**

* Every published episode has a dedicated public URL.  
* Each episode page has unique SEO metadata.  
* Episode pages can be indexed by search engines.  
* The page is readable and useful even if the visitor does not immediately play the episode.

## **7\. Riverside Integration Requirements**

The website should integrate with Riverside as the podcast hosting and publishing platform.

**Required capabilities:**

* Store Riverside episode URL, embed URL, or platform links for each episode.  
* Display a Riverside-hosted audio/video player or link to the hosted episode, depending on available embed support.  
* Store or import Riverside-generated transcript, if available.  
* Store or import Riverside-generated show notes, if useful.  
* Link to Apple Podcasts, Spotify, YouTube, and/or other platform destinations configured through Riverside.  
* Include Riverside RSS feed URL in the site configuration for future import or sync use.

**Acceptance criteria:**

* Public episode pages can play or link to the Riverside-hosted episode.  
* The website does not require uploading audio/video files into the CMS.  
* Episode metadata entered in the CMS aligns with the corresponding Riverside episode.  
* Podcast managers can publish the episode in Riverside and then create or update the SEO page on the website.

## **8\. Admin CMS Requirements**

The website needs a lightweight admin CMS for managing episode pages.

### **8.1 Admin Access**

**Required capabilities:**

* Admin login  
* Access restricted to authorized podcast managers  
* Logout  
* Basic protection against unauthorized access

**Acceptance criteria:**

* Non-admin users cannot access the CMS.  
* Admin users can log in and manage episode content.

---

### **8.2 Episode Management**

Admins should be able to create, edit, save, publish, unpublish, and delete or archive episodes.

**Episode fields:**

* Title  
* URL slug  
* Episode number, optional  
* Publish date  
* Status: draft / published / archived  
* Guest name, optional  
* Guest title/company, optional  
* Guest bio, optional  
* Episode summary  
* Short excerpt  
* Audio embed URL or podcast platform links  
* Episode image  
* Topics/tags  
* Show notes  
* Transcript, optional  
* External links  
* SEO title  
* SEO meta description  
* Open Graph image  
* Canonical URL, optional

**Riverside fields section:**

* Riverside episode URL  
* Riverside embed code or player URL  
* Riverside RSS GUID, optional  
* Podcast platform links  
* Transcript import/copy field  
* Show notes import/copy field

**Acceptance criteria:**

* Admins can create a new episode as a draft.  
* Admins can preview or review content before publishing.  
* Published episodes appear on the public site.  
* Draft episodes do not appear publicly.  
* Admins can update published episodes.  
* Admins can control SEO fields per episode.  
* If episode status is Published, at least one listening option must be provided:  
  * Riverside embed/player  
  * Apple Podcasts URL  
  * Spotify URL  
  * YouTube URL  
  * General episode URL

---

### **8.3 Episode Publishing Workflow**

1. Podcast team records and edits the episode in Riverside.  
2. Podcast team publishes or schedules the episode through Riverside.  
3. Riverside distributes the episode through its RSS feed and configured podcast directories.  
4. Podcast manager creates the corresponding website episode page in the CMS.  
5. Podcast manager adds Riverside episode link/embed, summary, guest info, transcript, show notes, SEO title, and meta description.  
6. Website episode page is published when the Riverside episode is live or scheduled to go live.  
7. Episode page appears on the website episode listing and sitemap.

**Acceptance criteria:**

* Website episode pages are not published before the corresponding Riverside episode is ready, unless intentionally scheduled.  
* Admin can connect each website episode page to the correct Riverside episode.  
* Published website episode pages include playable or clickable access to the episode.

### **8.4 CMS Simplicity**

The CMS should be intentionally lightweight.

**Recommended approach:**

* Simple authenticated admin area.  
* Basic form-based editing.  
* No complex workflow or approval system required for V1.  
* Content should be stored in a database or structured CMS backend.  
* Rich text editing may be used for show notes and transcript fields.

**Acceptance criteria:**

* A podcast manager can add a new episode without developer involvement.  
* Required fields are clearly marked.  
* Admin forms provide validation for missing or invalid content.

## **9\. Contact Pages and Forms**

The site should include three dedicated contact pages. Each page has its own version of the contact form and triggers an email notification to podcast managers.

### **9.1 Guest Inquiries Page**

Purpose: allow visitors to suggest themselves or someone else as a guest.

**Recommended form fields:**

* Your name  
* Your email  
* Suggested guest name  
* Suggested guest title/company  
* Guest website or LinkedIn URL  
* Why would this guest be a good fit?  
* Suggested topic  
* Additional notes  
* Consent checkbox for being contacted

**Email notification should include:**

* Form type: Guest Inquiry  
* All submitted fields  
* Submission timestamp  
* Reply-to set to submitter’s email, if technically feasible

**Acceptance criteria:**

* Visitor can submit a guest inquiry.  
* Required fields are validated.  
* Podcast managers receive an email notification.  
* Visitor sees confirmation after submission.

---

### **9.2 Sponsor the Show Page**

Purpose: allow companies or individuals to inquire about sponsorship.

**Recommended form fields:**

* Name  
* Work email  
* Company name  
* Company website  
* Sponsorship interest  
* Budget range, optional  
* Desired timeline  
* Message  
* Consent checkbox for being contacted

**Email notification should include:**

* Form type: Sponsor Inquiry  
* All submitted fields  
* Submission timestamp  
* Reply-to set to submitter’s email, if technically feasible

**Acceptance criteria:**

* Visitor can submit a sponsorship inquiry.  
* Podcast managers receive an email notification.  
* Visitor sees confirmation after submission.

---

### **9.3 Contact Us Page**

Purpose: general inquiries.

**Recommended form fields:**

* Name  
* Email  
* Inquiry type, optional  
* Subject  
* Message  
* Consent checkbox for being contacted

**Email notification should include:**

* Form type: General Contact  
* All submitted fields  
* Submission timestamp  
* Reply-to set to submitter’s email, if technically feasible

**Acceptance criteria:**

* Visitor can submit a general contact request.  
* Podcast managers receive an email notification.  
* Visitor sees confirmation after submission.

---

### **9.4 Shared Form Requirements**

All contact forms should include:

* Required field validation  
* Email format validation  
* Spam protection, such as honeypot, rate limiting, CAPTCHA, or similar  
* Success confirmation message  
* Error handling if submission fails  
* Email notification to configured podcast manager email address  
* Optional database record of submissions, depending on privacy and operational needs

**Recommended success message:**

“Thank you — your message has been received. We’ll review it and follow up if there’s a fit.”

## **10\. Email Subscription Requirements**

Visitors should be able to subscribe to podcast updates via email.

### **10.1 Subscription Form**

The subscription form should be available in multiple places:

* Home page  
* Episodes listing page  
* Episode detail pages  
* Footer or global site section

**Required fields:**

* Email address

**Optional fields:**

* First name  
* Topic interests

**Acceptance criteria:**

* Visitor can submit an email address.  
* Email format is validated.  
* Visitor sees a confirmation message.  
* Duplicate subscriptions are handled gracefully.  
* Subscription data is stored or sent to an email marketing provider.

---

### **10.2 Subscription Confirmation**

Depending on compliance and email provider setup, the site may use either:

* Single opt-in: user is subscribed immediately.  
* Double opt-in: user receives confirmation email and must confirm subscription.

**Recommendation:**

Use double opt-in if the podcast expects a broader public audience or wants stronger compliance and list quality.

## **11\. Email Notification Requirements**

Form submissions should trigger email notifications to podcast managers.

**Notification recipients:**

* Configurable podcast manager email address  
* Optional additional recipients by form type

**Email subject examples:**

* `New Guest Inquiry: [Suggested Guest Name]`  
* `New Sponsor Inquiry: [Company Name]`  
* `New Contact Form Submission: [Subject]`

**Requirements:**

* Notifications should identify the form type.  
* Notifications should include all submitted fields.  
* Notifications should include timestamp.  
* Notifications should not expose sensitive implementation details.  
* Failed email delivery should be logged.

**Acceptance criteria:**

* Each form type sends a correctly labeled notification.  
* Notifications go to the correct recipient.  
* Submitted email can be used to reply to the visitor.

## **12\. SEO Requirements**

SEO is especially important for episode discovery.

### **12.1 Global SEO**

The site should support:

* Global site title  
* Global meta description  
* Search-engine-indexable public pages  
* Sitemap.xml  
* Robots.txt  
* Canonical URLs  
* Open Graph metadata  
* Responsive page structure  
* Fast page loading  
* Semantic HTML headings

### **12.2 Episode SEO**

Each episode page should support:

* Unique title tag  
* Unique meta description  
* Episode-specific URL slug  
* Guest name and topic keywords in visible content where natural  
* Transcript or show notes for indexable text  
* Internal links to related episodes, optional  
* Structured data, recommended

Riverside integration notes: 

* Riverside may provide generated show notes and transcripts, but the website episode page should contain edited, human-readable, indexable content optimized for search. Riverside metadata should not be assumed to be sufficient for website SEO.  
* Transcript content may be copied/imported from Riverside and edited in the CMS.  
* Episode pages should avoid relying only on embedded players, because embeds alone provide limited indexable content.  
* Website metadata may differ from Riverside metadata to support stronger search performance.

**Acceptance criteria:**

* Published episode pages appear in the sitemap.  
* Draft episodes do not appear in the sitemap.  
* Episode pages have unique metadata.  
* Page source includes meaningful title and description.

## **13\. Design and UX Requirements**

The website should feel editorial, polished, and human.

**Design principles:**

* Clear typography  
* Strong episode readability  
* Easy navigation  
* Mobile-first layout  
* Accessible forms  
* Minimal friction for contact and subscription  
* Avoid overly generic SaaS-style layouts

**Core navigation:**

* Episodes  
* Guest Inquiries  
* Sponsor the Show  
* Contact Us  
* Subscribe, optional depending on layout

**Accessibility requirements:**

* Forms must have labels.  
* Error messages must be understandable.  
* Color contrast should meet WCAG AA where feasible.  
* Site should be usable by keyboard navigation.  
* Images should have alt text.

## **14\. Analytics Requirements**

The site should track basic performance and engagement.

**Riverside analytics should be used for:**

* Podcast streams/downloads  
* Listening apps  
* Top episodes  
* Geographic listener data, where available  
* Episode performance inside podcast platforms

**Website analytics should be used for:**

* Episode page views  
* Traffic sources  
* Search traffic  
* Clicks to Riverside/player/platform links  
* Contact form submissions  
* Sponsor inquiry conversions  
* Guest inquiry conversions  
* Email subscriptions

**Acceptance criteria:**

* Site analytics are installed.  
* Form submission conversions can be measured.  
* Episode page performance can be reviewed.  
* Website analytics distinguish between page engagement and actual podcast listening.  
* External platform clicks are tracked where feasible.  
* Sponsor inquiry and subscription conversion rates can be measured from the website.

## **15\. Privacy and Compliance Requirements**

Because the site collects personal information through forms and email subscriptions, it should include basic privacy handling.

**Requirements:**

* Privacy Policy page  
* Consent checkbox on forms, if appropriate  
* Clear explanation that submitted information may be used to respond to inquiries  
* Email subscription unsubscribe mechanism through email provider  
* Avoid collecting unnecessary sensitive information  
* Protect admin access and submission data

## **16\. Performance Requirements**

The site should be fast and lightweight.

**Targets:**

* Mobile-friendly pages  
* Optimized images  
* Fast initial load  
* Episode listing should remain usable as the number of episodes grows  
* No unnecessary heavy scripts

**Acceptance criteria:**

* Site performs well on mobile.  
* Images are compressed and served responsively.  
* Public pages load without relying on admin-only resources.

## **17\. Suggested Content Model**

### **Episode**

| Field | Type | Required |
| ----- | ----- | ----- |
| ID | System-generated | Yes |
| Title | Text | Yes |
| Slug | Text | Yes |
| Status | Draft / Published / Archived | Yes |
| Publish Date | Date | Yes |
| Episode Number | Number/Text | No |
| Guest Name | Text | No |
| Guest Title | Text | No |
| Guest Company | Text | No |
| Guest Bio | Rich text | No |
| Summary | Rich text | Yes |
| Excerpt | Text | Yes |
| Audio Embed URL | URL | No |
| Apple Podcasts URL | URL | No |
| Spotify URL | URL | No |
| YouTube URL | URL | No |
| Image | Media | No |
| Topics/Tags | List | No |
| Show Notes | Rich text | No |
| Transcript | Rich text | No |
| SEO Title | Text | No |
| SEO Description | Text | No |
| OG Image | Media | No |
| Created At | DateTime | System |
| Updated At | DateTime | System |

### **Contact Submission**

| Field | Type | Required |
| ----- | ----- | ----- |
| ID | System-generated | Yes |
| Form Type | Guest / Sponsor / Contact | Yes |
| Name | Text | Yes |
| Email | Email | Yes |
| Subject/Context | Text | Depends on form |
| Message | Text | Depends on form |
| Metadata | JSON | No |
| Created At | DateTime | System |

### **Email Subscriber**

| Field | Type | Required |
| ----- | ----- | ----- |
| ID | System-generated | Yes |
| Email | Email | Yes |
| First Name | Text | No |
| Status | Subscribed / Pending / Unsubscribed | Yes |
| Source | Text | No |
| Created At | DateTime | System |

## **18\. MVP Scope**

The MVP should include:

1. Public home page.  
2. Episodes listing page.  
3. SEO-friendly episode detail pages.  
4. Lightweight admin login.  
5. Admin ability to create, edit, publish, and unpublish episode pages.  
6. Guest Inquiries form with email notification.  
7. Sponsor the Show form with email notification.  
8. Contact Us form with email notification.  
9. Email subscription form.  
10. Basic SEO metadata and sitemap.  
11. Basic analytics.  
12. Privacy Policy page.

## **19\. Future Enhancements**

Possible later additions:

* Related episodes  
* Search and filtering by topic or guest  
* Full transcript search  
* Admin dashboard for form submissions  
* Sponsor media kit download  
* Guest application workflow  
* Newsletter archive  
* Automated episode import from Riverside RSS feed  
* Auto-create draft episode pages from Riverside RSS feed.  
* Sync publish date, title, description, episode image, and enclosure/media URL from Riverside.  
* Detect new Riverside episodes and notify admins to complete SEO content.  
* Use RSS GUID to avoid duplicate episode imports.  
* Integration with Mailchimp, ConvertKit, Beehiiv, or similar  
* Integration with CRM  
* Social sharing image generation per episode  
* Video episode support  
* Featured collections or editorial playlists

## **20\. Open Questions**

1. Should episode data be manually entered, imported from an RSS feed, or both?  
2. Which email provider should be used for subscription management?  
3. Should contact form submissions be stored in the CMS/database, or only sent by email?  
4. Who should receive notifications for each form type?  
5. Does the website need a public About page?  
6. Do episode pages need full transcripts at launch?  
7. Should the admin CMS support multiple admin users?  
8. Is there a brand style guide, logo, color palette, and typography direction already defined?

## **21\. Launch Acceptance Criteria**

The website is ready to launch when:

* All public pages are accessible and mobile-friendly.  
* Published episodes appear on the Episodes page.  
* Each published episode has a unique SEO-friendly detail page.  
* Admin can create and edit episode pages without developer help.  
* Draft episodes are hidden from the public site.  
* Guest, sponsor, and general contact forms submit successfully.  
* Podcast managers receive email notifications for form submissions.  
* Email subscription form works.  
* Basic SEO metadata is implemented.  
* Sitemap and robots.txt are available.  
* Analytics are installed.  
* Privacy Policy is published.  
* Core flows have been tested on desktop and mobile.

