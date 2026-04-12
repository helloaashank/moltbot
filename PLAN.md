# OpenWhen Letters — Execution Plan

## Project Overview

Build a digital "Open When" letters web application where senders can create date-locked letters and share them via permanent links.

---

## Technical Architecture

### Stack Decision

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | React + Vite | Fast, modern, easy to maintain |
| **Styling** | Tailwind CSS | Rapid UI development, beautiful defaults |
| **Hosting** | Vercel | Free tier, automatic HTTPS, global CDN |
| **Storage** | URL-based (Base64) + Optional Supabase | Zero-cost MVP, scalable upgrade path |
| **Date Picker** | React Datepicker | Lightweight, customizable, mobile-friendly |

### Data Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Sender    │────▶│  Create Page │────▶│  Base64     │
│   Writes    │     │  + Date Pick │     │  Encode     │
└─────────────┘     └──────────────┘     └─────────────┘
                                                │
                                                ▼
                                        ┌─────────────┐
                                        │  Generate   │
                                        │  URL        │
                                        └─────────────┘
                                                │
                                                ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Receiver  │◀────│  View Page   │◀────│  Share Link │
│   Reads     │     │  Check Date  │     │  (SMS/Text) │
└─────────────┘     └──────────────┘     └─────────────┘
```

### URL Structure

```
Format: /view/:letterId

Letter data encoded in URL params or stored in lightweight JSON:
{
  "id": "abc123",
  "title": "Open when you're smiling",
  "message": "Hey love, I wrote this because...",
  "senderName": "Sarah",
  "unlockDate": "2026-12-25T00:00:00Z",  // Optional
  "createdAt": "2026-04-11T10:30:00Z"
}
```

---

## Phase 1: Foundation (Days 1-2)

### Task 1.1: Project Setup
- [ ] Initialize React + Vite project
- [ ] Configure Tailwind CSS
- [ ] Set up project structure:
  ```
  /src
    /components
      Header.jsx
      LetterCard.jsx
      DatePicker.jsx
      UnlockOverlay.jsx
    /pages
      Create.jsx
      View.jsx
      Home.jsx
    /utils
      encoding.js
      dateUtils.js
    App.jsx
    main.jsx
  ```
- [ ] Set up Vercel deployment

### Task 1.2: Core Utilities
- [ ] Create `encoding.js`:
  - `encodeLetter(data)` → Base64 string
  - `decodeLetter(encoded)` → Parsed JSON
- [ ] Create `dateUtils.js`:
  - `isLocked(unlockDate)` → boolean
  - `formatDate(date)` → "October 25, 2026"
  - `getCountdown(date)` → "5 days, 3 hours"

---

## Phase 2: Create Letter Flow (Days 3-4)

### Task 2.1: Home Page
- [ ] Hero section with value proposition
- [ ] "Create Letter" CTA button
- [ ] How it works section (3 steps)
- [ ] Footer with branding

### Task 2.2: Create Page — Form
- [ ] Title input: "Open when..."
- [ ] Message textarea (rich text optional)
- [ ] Sender name input
- [ ] **Date picker toggle:**
  - [ ] Checkbox: "Lock this letter until a specific date?"
  - [ ] React Datepicker component (if checked)
  - [ ] Visual feedback for selected date

### Task 2.3: Create Page — Submission
- [ ] Validate form (title + message required)
- [ ] Generate unique letter ID (nanoid or uuid)
- [ ] Encode letter data to Base64
- [ ] Generate shareable URL
- [ ] Display success state with:
  - [ ] Copy link button
  - [ ] QR code (optional)
  - [ ] Share buttons (WhatsApp, SMS, etc.)

---

## Phase 3: View Letter Flow (Days 5-6)

### Task 3.1: View Page — Date Check
- [ ] Parse URL for letter data
- [ ] Decode Base64 data
- [ ] Check if `unlockDate` exists
- [ ] Compare with current date

### Task 3.2: View Page — Locked State
- [ ] Display lock screen:
  - [ ] Lock icon
  - [ ] "This letter is locked 🔒"
  - [ ] "Come back on [formatted date]"
  - [ ] Countdown timer (optional)
  - [ ] Sender name: "From [Name]"
- [ ] Prevent message viewing until unlocked

### Task 3.3: View Page — Unlocked State
- [ ] Display letter with beautiful styling:
  - [ ] Animated envelope opening (CSS animation)
  - [ ] Letter paper texture/background
  - [ ] Title prominently displayed
  - [ ] Message content
  - [ ] Sender attribution
  - [ ] "Created on [date]" timestamp
- [ ] Share button (forward to others)
- [ ] Save/bookmark option

---

## Phase 4: Design & Polish (Days 7-8)

### Task 4.1: Visual Design System
- [ ] Define color palette:
  - Primary: Soft rose/pink (#E8B4B8)
  - Secondary: Warm cream (#FDF6F0)
  - Accent: Muted gold (#D4AF37)
  - Text: Charcoal (#3D3D3D)
- [ ] Typography:
  - Headings: Playfair Display (serif, emotional)
  - Body: Inter (sans-serif, readable)
- [ ] Border radius: 16px (rounded, soft)
- [ ] Shadows: Subtle, layered

### Task 4.2: Animations
- [ ] Page transitions (Framer Motion or CSS)
- [ ] Button hover states
- [ ] Envelope open animation
- [ ] Countdown timer tick
- [ ] Confetti on unlock (optional celebration)

### Task 4.3: Mobile Responsiveness
- [ ] Test on iPhone, Android viewports
- [ ] Touch-friendly tap targets
- [ ] Mobile-optimized date picker
- [ ] Responsive text sizing

---

## Phase 5: Advanced Features (Days 9-12)

### Task 5.1: Optional Backend (Supabase)
- [ ] Set up Supabase project
- [ ] Create `letters` table:
  ```sql
  id (uuid, primary key)
  title (text)
  message (text)
  sender_name (text)
  unlock_date (timestamptz, nullable)
  created_at (timestamptz)
  ```
- [ ] Create API endpoint to store letters
- [ ] Update Create flow to save to DB
- [ ] Update View flow to fetch from DB
- [ ] Handle 404 for invalid letter IDs

### Task 5.2: Premium Features (Optional)
- [ ] Photo attachments (stored in Supabase Storage)
- [ ] Voice note recording + playback
- [ ] Custom themes/templates
- [ ] Scheduled email delivery (cron job)

### Task 5.3: Analytics
- [ ] Google Analytics 4 setup
- [ ] Track: letter created, letter viewed, lock bypass attempts
- [ ] Conversion funnel tracking

---

## Phase 6: Testing & Launch (Days 13-14)

### Task 6.1: Testing
- [ ] Test date locking edge cases:
  - [ ] Midnight boundary (different timezones)
  - [ ] Past dates (should unlock immediately)
  - [ ] Far future dates (10+ years)
- [ ] Test URL sharing:
  - [ ] Long URLs (Base64 can get long)
- [ ] Test on multiple browsers (Chrome, Safari, Firefox)
- [ ] Load testing (100 concurrent users)

### Task 6.2: Launch Prep
- [ ] Buy domain (openwhenletters.com or similar)
- [ ] Set up SSL certificate
- [ ] Create social media accounts
- [ ] Write launch blog post
- [ ] Prepare Product Hunt launch

### Task 6.3: Launch
- [ ] Deploy to production (Vercel)
- [ ] Submit to Product Hunt
- [ ] Post on Reddit (r/InternetIsBeautiful, r/SideProject)
- [ ] Share on Twitter/LinkedIn

---

## Success Metrics

| Metric | Target (30 days post-launch) |
|--------|------------------------------|
| Letters created | 1,000 |
| Unique visitors | 5,000 |
| Bounce rate | < 40% |
| Share rate | > 25% |
| Date-lock usage | > 60% of letters |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| URL length limits | Use URL shortener or backend storage |
| Timezone confusion | Store dates in UTC, display in user's local time |
| Data loss (URL-only) | Offer optional backend save |
| Abuse (spam letters) | Rate limiting, report button |
| Server costs | Start with URL-only, upgrade to Supabase when needed |

---

## Future Roadmap (Post-MVP)

### Quarter 2
- [ ] User accounts (optional)
- [ ] Letter inbox/dashboard
- [ ] Email notifications on unlock date
- [ ] Photo attachments

### Quarter 3
- [ ] Voice/video letters
- [ ] AI writing assistant ("Help me write...")
- [ ] Recurring letters ("Open every birthday")
- [ ] Memorial letters (legacy planning)

### Quarter 4
- [ ] Mobile app (React Native)
- [ ] Physical letter printing + mailing
- [ ] API for third-party integration
- [ ] White-label for enterprises

---

## File Checklist

- [ ] `index.html`
- [ ] `package.json`
- [ ] `vite.config.js`
- [ ] `tailwind.config.js`
- [ ] `src/main.jsx`
- [ ] `src/App.jsx`
- [ ] `src/components/Header.jsx`
- [ ] `src/components/LetterCard.jsx`
- [ ] `src/components/DatePicker.jsx`
- [ ] `src/components/UnlockOverlay.jsx`
- [ ] `src/pages/Home.jsx`
- [ ] `src/pages/Create.jsx`
- [ ] `src/pages/View.jsx`
- [ ] `src/utils/encoding.js`
- [ ] `src/utils/dateUtils.js`
- [ ] `src/styles/globals.css`
- [ ] `README.md`
- [ ] `VERCEL.md` (deployment guide)

---

*Last updated: 2026-04-11*
