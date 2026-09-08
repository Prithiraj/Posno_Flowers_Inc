# Posno Flowers — Website Design & Implementation Plan

> Status: implemented as a heritage-first static site because current retail operations, hours, phone, products, pricing, active social accounts, and present storefront are not verified. The former 6647 Central Ave location is treated as historical only.

## 1. Evidence baseline

### Evidence safe to publish
- William and Rosaline “Rose” Posno built Posno Flowers in St. Petersburg in **1961**. Source: Rose Posno obituary.
- The obituary describes Posno Flowers as one of St. Petersburg's larger flower shops and a local fixture for more than 25 years.
- William and Rose were accomplished singers and helped found the Bel Canto Opera Company in St. Petersburg. This is used as a creative-story cue, not a commercial claim.
- A family remembrance on the obituary page recalls Posno Flowers creating flowers for a wedding and a funeral. These are labeled as **historic work**, not current services.
- POSNO FLOWERS, INC. was incorporated in Florida on **May 31, 1978**. Source: Florida Division of Corporations.
- The corporate principal address was **6647 Central Ave., St. Petersburg, FL 33710**.
- The corporation was administratively dissolved on **September 25, 2009**.
- Current local-business data marks Posno Flowers at the Central Avenue address as permanently closed.

### Deliberately excluded from active-business UI
No current phone number, email, hours, delivery radius, prices, catalog, current reviews, social accounts, ordering flow, guarantees, active team, or current storefront are represented. None were reliably verified for the St. Petersburg business.

### Identity guardrail
Search results can mix the St. Petersburg business with a separate Posno flower business in London, Ontario. No Canadian business details are used.

## 2. Audience

Primary audience for this implementation:
- former customers and St. Petersburg residents who recognize the Posno name;
- local-history and family audiences interested in the shop's heritage;
- a future owner/operator evaluating a truthful brand relaunch;
- prospective customers only after current operations are verified and commerce is added.

Customer motivations that inform the visual language: trust, local memory, meaningful occasions, craft, beauty, and human attention.

## 3. Conversion goals

Because active retail details are unverified, the current conversion path is intentionally non-transactional:
1. **Discover the story** — primary hero CTA.
2. **View the flower study** — visual engagement.
3. **Review sources** — trust/verification CTA.
4. **View historic map listing** — location history only.

For a verified relaunch, the primary conversion slot is designed to become **Order / Request Flowers**, followed by verified call, visit, and event-inquiry actions.

## 4. Creative direction

**Direction: Heritage St. Petersburg floral atelier.**

The supplied references pointed toward three useful ingredients:
- the conversion clarity of a local florist landing page;
- the product/image density of modern flower ecommerce;
- the typography, restraint, and warmth of an editorial floral studio.

This implementation emphasizes the third reference while borrowing clear CTA hierarchy from the first two.

Visual ideas:
- warm paper and ivory fields instead of stark white;
- deep botanical green for structure and credibility;
- garnet/aubergine for emotional accents;
- large high-contrast serif typography;
- arched image crops and editorial captions;
- a 1961 heritage seal;
- restrained rules, indices, and timeline motifs;
- flowers remain the dominant visual content.

## 5. Color system

| Role | Token | Value |
|---|---|---|
| Primary ink | `--ink` | `#20181D` |
| Botanical green | `--green` | `#173729` |
| Secondary green | `--green-2` | `#244C38` |
| Garnet | `--garnet` | `#7A2D3B` |
| Clay accent | `--clay` | `#BD684E` |
| Warm paper | `--paper` | `#F5F0E6` |
| Secondary paper | `--paper-2` | `#EEE5D8` |
| Ivory surface | `--ivory` | `#FFFDF8` |
| Blush | `--blush` | `#E7D0C8` |

## 6. Typography

- Display: **Cormorant Garamond** — editorial, historical, expressive, used for major headlines and dates.
- UI/body: **DM Sans** — modern, compact, legible on mobile and in navigation.
- Fallbacks are defined so the page remains usable if remote fonts fail.

## 7. Image strategy

### Production hierarchy
1. Owner/family-controlled Posno archive imagery.
2. Newly commissioned Posno photography in a real operating environment, if relaunched.
3. Clearly licensed editorial photography as a temporary visual study.

### Current implementation
The website uses real flower/florist photography from Unsplash under the Unsplash License. The images are explicitly labeled in the UI as **editorial / not Posno-specific** where context could otherwise imply they document the business.

No image from Google Maps reviews, eBay postcards, obituaries, competitor websites, or social media is copied into the production page because rights are not established.

If authentic Posno photos become available, replace the Unsplash imagery before treating the site as a documentary or active business presence.

## 8. Information architecture

Single-page static architecture:
1. Utility heritage bar
2. Header/navigation
3. Hero
4. Historical proof strip
5. Brand/value proposition
6. Historic-work cards
7. Craft / creative-direction section
8. Story + timeline
9. Flower-study gallery
10. Former location
11. Closing CTA
12. Evidence & rights sources
13. Footer

A single page keeps the heritage story coherent and performs well on GitHub Pages. It can later be split into Shop / Weddings / Story / Gallery / Contact only when those destinations have verified operational content.

## 9. Section-by-section layout

### Hero
Editorial two-column layout on desktop, stacked on mobile. Large serif statement, short verified origin copy, primary story CTA, explicit heritage status note, and dominant bouquet photograph. A circular `EST. 1961` seal adds brand specificity.

### Historical proof strip
Three concise evidence-backed anchors: 1961 establishment, 25+ years as a remembered local fixture, and 1978 incorporation.

### Value proposition
Large statement explaining why the brand is distinctive: local history, founders' arts background, and place-based memory.

### Historic work
Three image-led cards. Wedding and funeral/remembrance references are labeled as historical. The third is explicitly an editorial study of floral composition, not a claimed Posno service.

### Craft / creative language
Large process photo plus an explanation of how the founders' musical history informs rhythm, contrast, and restraint in the visual system.

### Story + timeline
Dark green editorial section with 1961, 1978, 2009, and present-day status. Avoids implying the historic corporation is currently operating.

### Gallery
Asymmetrical masonry-like grid using actual flower/shop photography. Clicking images opens an accessible native-dialog lightbox.

### Former location
The 6647 Central Ave address is labeled **former** in every instance. A custom SVG map-style treatment avoids presenting current occupancy as Posno's. The supplied Google Maps listing is linked with historic context.

### Evidence & rights
Visible source cards make the fact/rights boundary part of the design rather than burying it.

## 10. Three.js / animation plan

Three.js is used only as a progressive enhancement behind the hero:
- ~20 translucent petal-like geometry elements;
- slow drift only;
- no interaction required;
- never covers the real flower photography;
- dynamically imported so static content renders first;
- disabled when `prefers-reduced-motion: reduce` is active;
- the hero remains complete if CDN/WebGL/JavaScript fails.

Other motion is CSS-first: small reveal transitions and gentle image zooms.

## 11. Responsive behavior

- Mobile-first structure with one-column hero and full-width CTA.
- 44px+ navigation/menu controls.
- Product-style cards collapse to one column.
- Timeline uses narrower date columns on phones.
- Gallery becomes a two-column grid with a full-width lead image.
- Large display type scales with `clamp()`.
- No horizontal scrolling is required at 360px.

## 12. Accessibility

Target: WCAG 2.2 AA.

Included:
- skip link;
- semantic headings/landmarks;
- keyboard navigation;
- visible focus rings;
- accessible mobile-menu state;
- descriptive alt text;
- native `<dialog>` gallery lightbox with close button and focus restoration;
- reduced-motion behavior;
- all essential content visible without Three.js;
- no information conveyed solely by color.

## 13. Performance

- Static HTML/CSS/JS; no SPA framework.
- Only one optional JavaScript dependency (Three.js), dynamically imported.
- Responsive image sizing via Unsplash image parameters and `srcset` for the hero.
- Lazy loading for below-fold images.
- Explicit image dimensions to reduce layout shift.
- Remote font preconnect; robust system fallbacks.
- Static hero and full document still function if JavaScript or WebGL fails.

## 14. SEO / local discovery

Implemented:
- `<title>` and meta description based only on historical facts;
- canonical URL for GitHub Pages;
- Open Graph metadata;
- Twitter card metadata;
- conservative `Organization` Schema.org JSON-LD;
- **no active `Florist` / `LocalBusiness` schema** because a current operating location, hours, phone, and services are not verified.

If relaunched, structured data should be upgraded only after current business facts are supplied.

## 15. Rights/licensing notes

- Unsplash photography is used under the Unsplash License; photographer/source credits are documented in `CREDITS.md`.
- Unsplash images are not described as Posno-specific.
- Vintage Posno postcard/search imagery was not reproduced because commercial-use rights were not established.
- The inactive Florida corporation does not by itself establish rights to commercially relaunch the Posno Flowers name; brand/name clearance remains a separate pre-launch requirement.
- Any owner-supplied archive image should carry documented permission or provenance.

## 16. Implementation sequence

1. Verify repository and deployment target.
2. Convert the approved research into a heritage-safe content matrix.
3. Build semantic static page structure.
4. Implement design tokens, typography, responsive layout, and focus states.
5. Integrate licensed actual photography with visible editorial labels.
6. Add accessible mobile navigation and lightbox.
7. Add restrained reveal motion and reduced-motion handling.
8. Add optional Three.js petal enhancement with static fallback.
9. Add SEO, Open Graph, and conservative JSON-LD.
10. Document evidence, imagery, licensing, and replacement requirements.
11. Add GitHub Pages workflow.
12. Validate responsive rendering and publish.

## 17. Acceptance criteria

- No invented products, prices, hours, current services, reviews, phone numbers, delivery promises, policies, current social links, or active storefront claims.
- 6647 Central Ave appears only as a historic/former location.
- St. Petersburg and London, Ontario Posno businesses are not conflated.
- Site communicates specific 1961 St. Petersburg heritage without needing generic florist filler copy.
- All photography is real, licensed, and clearly identified as non-Posno-specific where appropriate.
- Owner-controlled photography is the required upgrade path for a commercial relaunch.
- Primary actions are obvious and truthful for a heritage site.
- Works at 360px and scales through desktop.
- Keyboard navigation, focus styles, alt text, and reduced motion are present.
- Static content remains complete if JavaScript, Three.js, or WebGL fails.
- Metadata and structured data do not falsely describe an active local business.
- GitHub Pages deploy workflow is included and deployment status is verified after publish.
