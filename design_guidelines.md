# Design Guidelines: Indian Financial Services Website

## Design Approach

**Selected Approach:** Hybrid - Drawing from established financial services platforms (Zerodha, Groww, PolicyBazaar) combined with Material Design principles for clarity and trust-building.

**Core Principles:**
- Professional credibility through clean, organized layouts
- Mobile-first design (70%+ Indian users access via mobile)
- Information hierarchy that guides users to services quickly
- Trust signals prominently displayed (certifications, compliance, testimonials)

## Typography System

**Font Family:** 
- Primary: Inter (via Google Fonts) - for UI elements, body text
- Headings: Manrope (via Google Fonts) - for headlines and emphasis

**Hierarchy:**
- Hero Headline: text-5xl md:text-6xl font-bold
- Section Headers: text-3xl md:text-4xl font-bold
- Subsections: text-2xl font-semibold
- Body Large: text-lg leading-relaxed
- Body Regular: text-base leading-relaxed
- Captions/Labels: text-sm font-medium
- Fine Print: text-xs

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24

**Container Strategy:**
- Page containers: max-w-7xl mx-auto px-4 md:px-8
- Content sections: py-16 md:py-24
- Component spacing: gap-6 md:gap-8 for cards/grids
- Form elements: space-y-4

**Grid Patterns:**
- Service cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Testimonials: grid-cols-1 md:grid-cols-2
- Feature highlights: grid-cols-1 lg:grid-cols-2 (text + visual pairing)

## Component Library

**Navigation:**
- Sticky header with logo, services dropdown, contact CTA
- Mobile: Hamburger menu with full-screen overlay
- Include trust badge/certification logos in header

**Hero Section:**
- Full-width with large hero image (Indian professionals/families)
- Overlay with semi-transparent backdrop (backdrop-blur-md)
- Headline + subheading + dual CTAs (primary: "Get Started", secondary: "Learn More")
- Trust indicators below fold: "Serving 10,000+ families" with stats

**Service Cards:**
- Icon (Heroicons) + title + 2-3 line description + "Learn More" link
- Hover: subtle lift effect (transform translate)
- Border treatment: border with rounded-xl

**Forms:**
- Multi-step consultation form with progress indicator
- Fields: Full Name, Phone (+91 prefix), Email, Service Interest (dropdown), Preferred Contact Time
- Inline validation with helpful error messages
- WhatsApp quick contact alternative
- Privacy assurance text below form

**Testimonials:**
- Photo + name + location + profession
- Star rating display
- Quote in quotation marks
- 2-column desktop, stacked mobile

**Trust Section:**
- Regulatory compliance badges (SEBI, IRDAI)
- "Why Choose Us" grid with numbered points
- Years of experience, clients served, AUM (if applicable)

**Footer:**
- 4-column layout: Services, Company, Resources, Contact
- Newsletter signup with compliance disclaimer
- Social media links (LinkedIn, Twitter, YouTube)
- Mandatory disclaimers and regulatory information
- Mobile: stacked single column

## Icons

**Icon Library:** Heroicons (via CDN) - for consistency and professional appearance

**Usage:**
- Service cards: outline icons at 24px
- Feature lists: solid icons at 20px
- Navigation: outline icons at 20px
- Social media: Use brand-specific SVG icons

## Images

**Hero Section:**
- Large hero image showing Indian professionals in consultation or happy families
- Suggested scenes: Financial advisor with clients, diverse Indian family, modern office setting
- Image treatment: slight overlay for text readability
- Dimensions: 1920x800px minimum, responsive scaling

**Service Section Images:**
- Three supporting images for mutual funds, insurance services
- Style: Professional photography showing security, growth, family protection
- Placement: Alternating left-right alongside service descriptions in feature sections

**About/Team Section:**
- Team photos with professional headshots
- Office photos showing modern, trustworthy environment

**Testimonial Section:**
- Real client photos (or professional stock photos of diverse Indian individuals)
- Circular avatars at 64px diameter

## Responsive Behavior

**Breakpoints:**
- Mobile: base (< 768px) - single column, stacked elements
- Tablet: md (768px+) - 2-column grids, expanded navigation
- Desktop: lg (1024px+) - 3-column grids, full layouts
- Large: xl (1280px+) - max-width containers, optimal spacing

**Mobile Priorities:**
- Tap-friendly CTAs (min-height: 44px)
- Simplified navigation with clear hierarchy
- Click-to-call phone numbers
- WhatsApp integration for instant messaging
- Compressed hero imagery optimized for mobile data

## Page Structure

**Homepage Flow:**
1. Hero with value proposition
2. Trust indicators bar (stats, certifications)
3. Core services grid (3 cards)
4. Why choose us section
5. How it works (3-step process)
6. Testimonials (6 reviews, 2-column)
7. FAQ accordion (8-10 questions)
8. Contact/Consultation CTA section
9. Footer

**Service Pages:**
- Service-specific hero with benefits
- Feature comparison table
- Process timeline/steps
- Eligibility criteria
- Document requirements checklist
- Consultation form
- Related services

## Accessibility

- Maintain ARIA labels on all interactive elements
- Form inputs with associated labels
- Keyboard navigation support
- Sufficient contrast ratios throughout
- Alt text for all images
- Focus indicators on interactive elements