# SIV Cleaning - Next.js Re-Platforming

A modern, high-performance **Next.js 14 App Router** website for [sivcleaning.com.au](https://sivcleaning.com.au/).

All content is server-rendered and driven entirely by structured server-side JSON files, with a highly modular, decoupled component architecture.

---

## 🏗️ Architecture Overview

- **Framework**: Next.js 14 (App Router, Server Components & Client Components)
- **Language**: TypeScript (Strict typing for all JSON data models)
- **Styling**: Tailwind CSS with custom design tokens matching SIV Cleaning (`#083863` deep navy, `#00acea` cyan, `#00efd1` teal, `#fedb41` gold)
- **Data Source**: Server-side JSON files located in `src/data/`
- **Data Access Layer**: `src/lib/api.ts` providing async typed getter functions
- **Total Static Routes**: **79 pre-rendered routes** covering all site pages, services, categories, and suburbs

---

## 📁 Project Structure

```
comfy-cleaning/
├── src/
│   ├── app/
│   │   ├── [suburbSlug]/           # All 58 Suburb Landing Pages (SSG)
│   │   ├── about-us/               # About Us Page
│   │   ├── api/quote/route.ts      # API endpoint for Quote & Appointment bookings
│   │   ├── contact-us/             # Contact Us Page with Maps and Cards
│   │   ├── service/[slug]/         # Individual Service Pages (SSG)
│   │   ├── service_category/[slug]/# Category Archive Pages (SSG)
│   │   ├── services/               # Services Overview Catalog
│   │   ├── sitemap/                # Visual HTML Sitemap
│   │   ├── sitemap.ts              # Dynamic XML Sitemap (sitemap.xml)
│   │   ├── thank-you/              # Quote confirmation & next steps page
│   │   ├── globals.css             # Tailwind base & custom design tokens
│   │   ├── layout.tsx              # Root Layout (Header, Footer, Meta)
│   │   └── page.tsx                # Homepage (Composed of modular blocks)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # TopBar (24/7, phone, email) + Sticky Nav + Dropdowns + Mobile Drawer
│   │   │   └── Footer.tsx          # Multi-column footer (Bio, Services, Suburbs, Accreditations)
│   │   ├── home/
│   │   │   ├── HeroSlider.tsx      # Hero section with trust badges, CTAs, and image frame
│   │   │   ├── AboutPreview.tsx    # "Experience the difference" intro + stats counter
│   │   │   ├── ServicesGrid.tsx    # Grid of commercial cleaning specialties
│   │   │   ├── WhyChooseUs.tsx     # 9 key pillars (WWCC, police checks, $20M insurance, etc.)
│   │   │   ├── StatsCounter.tsx    # Successful cleanings, happy clients, satisfaction metrics
│   │   │   ├── TestimonialsSection.tsx # Verified customer feedback cards
│   │   │   └── SuburbsDirectory.tsx# Tabbed interactive directory of all 58 suburb landing pages
│   │   ├── services/
│   │   │   └── ServiceDetailView.tsx# Service page layout with sidebar, scope checklist, FAQs
│   │   ├── suburbs/
│   │   │   └── SuburbLandingView.tsx# Local suburb cleaning layout with customized copy & quote form
│   │   ├── about/
│   │   │   └── MissionVision.tsx   # Mission, Vision, and 4 Core Values cards
│   │   ├── contact/
│   │   │   └── ContactInfoCards.tsx# Quick cards for phone, email, hours, and coverage
│   │   └── common/
│   │       ├── AppointmentForm.tsx # Interactive quote / appointment request form
│   │       ├── Breadcrumbs.tsx     # Semantic breadcrumbs navigation
│   │       ├── FaqAccordion.tsx    # Interactive accordion for questions & answers
│   │       ├── PageHeader.tsx      # Reusable inner page hero banner
│   │       └── TrustPills.tsx      # Badges for Police Check, WWCC, $20M Insurance, GST
│   │
│   ├── data/
│   │   ├── site-config.json        # Global metadata, contact details, navigation, footer links
│   │   ├── home.json               # Homepage hero, intro, features, stats, appointment section
│   │   ├── about.json              # About page history, mission, vision, core values
│   │   ├── services.json           # All 5 specialized cleaning services with checklists & FAQs
│   │   ├── service-categories.json # 5 service categories mapping
│   │   ├── suburbs.json            # Full data for all 58 suburban landing pages
│   │   ├── testimonials.json       # Customer reviews and testimonials
│   │   ├── faqs.json               # Global commercial cleaning FAQs
│   │   └── contact.json            # Contact page content, hours, and map settings
│   │
│   ├── lib/
│   │   └── api.ts                  # Server-side data fetching methods
│   └── types/
│       └── index.ts                # TypeScript interfaces for all data structures
│
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

---

## 🌐 Included Pages & URLs

### 1. Core Pages
- `/` - Homepage
- `/about-us` - About Us
- `/services` - All Services
- `/contact-us` - Contact Us
- `/thank-you` - Booking Confirmation
- `/sitemap` - HTML Sitemap
- `/sitemap.xml` - XML Sitemap for search engines

### 2. Service Pages (`/service/[slug]`)
1. `/service/commercial-cleaning-in-melbourne` - Commercial & Office Cleaning
2. `/service/child-care-and-kindergarten-cleaning` - Child Care & Kindergarten Cleaning
3. `/service/medical-centre-cleaning` - Medical Centre & Clinic Cleaning
4. `/service/aged-care-cleaning-services` - Aged Care Facility Cleaning
5. `/service/end-of-lease-cleaning-services` - Commercial End of Lease Cleaning

### 3. Service Categories (`/service_category/[slug]`)
1. `/service_category/office-cleaning`
2. `/service_category/child-care-and-kindergarten-cleaning`
3. `/service_category/medical-centre-cleaning`
4. `/service_category/aged-care-cleaning`
5. `/service_category/end-of-lease-cleaning`

### 4. Suburb Landing Pages (58 Total Pre-Rendered Pages)
Preserves the exact URL slugs from the original site for 100% SEO continuity:
- **Office Cleaning Suburbs (20)**: `office-cleaning-cranbourne`, `office-cleaning-berwick`, `office-cleaning-beaconsfield`, `office-cleaning-officer`, `office-cleaning-hallam`, `office-cleaning-notting-hill`, `office-cleaning-knoxfield`, `office-cleaning-glen-waverley`, `office-cleaning-springvale`, `office-cleaning-noble-park`, `office-cleaning-cheltenham`, `office-cleaning-moorabbin`, `office-cleaning-narre-warren`, `office-cleaning-rowville`, `office-cleaning-clayton`, `office-cleaning-mulgrave`, `office-cleaning-dandenong`, `office-cleaning-clyde`, `office-cleaning-pakenham`, `office-cleaning-doveton`.
- **Kindergarten Cleaning Suburbs (19)**: `kindergarten-cleaning-beaconsfield`, `kindergarten-cleaning-notting-hill`, `kindergarten-cleaning-berwick`, `kindergarten-cleaning-pakenham`, `kindergarten-cleaning-springvale`, `kindergarten-cleaning-rowville`, `kindergarten-cleaning-officer`, `kindergarten-cleaning-noble-park`, `kindergarten-cleaning-narre-warren`, `kindergarten-cleaning-mulgrave`, `kindergarten-cleaning-moorabbin`, `kindergarten-cleaning-knoxfield`, `kindergarten-cleaning-hallam`, `kindergarten-cleaning-glen-waverley`, `kindergarten-cleaning-dandenong`, `kindergarten-cleaning-cranbourne`, `kindergarten-cleaning-clyde`, `kindergarten-cleaning-clayton`, `kindergarten-cleaning-cheltenham`.
- **Medical Centre Cleaning Suburbs (19)**: `medical-centre-cleaning-notting-hill`, `medical-centre-cleaning-knoxfield`, `medical-centre-cleaning-glen-waverley`, `medical-centre-cleaning-cheltenham`, `medical-centre-cleaning-noble-park`, `medical-centre-cleaning-moorabbin`, `medical-centre-cleaning-dandenong`, `medical-centre-cleaning-narre-warren`, `medical-centre-cleaning-clyde`, `medical-centre-cleaning-clayton`, `medical-centre-cleaning-cranbourne`, `medical-centre-cleaning-mulgrave`, `medical-centre-cleaning-berwick`, `medical-centre-cleaning-rowville`, `medical-centre-cleaning-hallam`, `medical-centre-cleaning-beaconsfield`, `medical-centre-cleaning-springvale`, `medical-centre-cleaning-pakenham`, `medical-centre-cleaning-officer`.

---

## 🚀 Running the Project

### Development Server
```bash
cd C:\Users\bisha\.gemini\antigravity\scratch\comfy-cleaning
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```
