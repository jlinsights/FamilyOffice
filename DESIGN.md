# FamilyOffice S: Brand Identity & Design System

## 🏛️ Brand Vision: "The Modern Legacy"

FamilyOffice S provides premium wealth management and corporate risk management for Korea's "Small Giants" (중소중견기업). Our design must reflect **unwavering trust**, **deep expertise**, and **forward-thinking innovation**.

### Core Brand Values
- **Trust (신뢰)**: Stable, secure, and reliable.
- **Expertise (전문성)**: Precise, data-driven, and authoritative.
- **Legacy (유산)**: Timeless, respectful of tradition, and value-oriented.
- **Innovation (혁신)**: Modern, efficient, and tech-forward.

---

## 🎨 Visual Identity

### 1. Color Palette: "Premium Depth"
Refining the classic Navy and Gold with modern depth and sophistication.

| Category | Color Name | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | **Signature Navy** | `#0A192F` | Primary brand color, headers, trust. |
| **Primary** | **Deep Slate** | `#1E293B` | Dark mode backgrounds, secondary surfaces. |
| **Accent** | **Heritage Gold** | `#D4AF37` | Primary accents, CTA highlights, prestige. |
| **Accent** | **Muted Bronze** | `#B8860B` | Secondary accents, icons, borders. |
| **Neutral** | **Serenity White** | `#F8FAFC` | Main background, clean space. |
| **Neutral** | **Slate Gray** | `#64748B` | Secondary text, descriptions. |

#### Semantic Colors (Financial)
- **Growth (Positive)**: `#10B981` (Emerald)
- **Risk (Negative)**: `#EF4444` (Rose)
- **Neutral**: `#6B7280` (Gray)

---

### 2. Typography: "Authoritative Clarity"
A mix of traditional serifs for authority and modern sans-serifs for precision.

- **Headlines (H1-H3)**: `Playfair Display`
  - *Usage*: Hero titles, section headers.
  - *Style*: SemiBold (600), tracking `-0.02em`.
- **Sub-headers & Body**: `Inter` / `Pretendard Variable`
  - *Usage*: Nav links, cards, body copy.
  - *Style*: Regular (400) to Medium (500), line-height `1.6`.
- **Financial Data**: `Inter` (with tabular numbers)
  - *Usage*: Stock prices, calculations, tables.
  - *Style*: Medium (500) or SemiBold (600).

---

### 3. Layout Principles: "Small Giant. Big Impact."
Inspired by premium editorial design (Financial Times, Monocle).

- **Generous Spacing**: Vertical rhythm using `py-24` or `py-32` for major sections.
- **Grid Stability**: Strict adherence to a 12-column grid with consistent gutters.
- **Focus Areas**: Using `glass-premium` cards to highlight critical data without overwhelming the UI.
- **Micro-interactions**: Subtle Framer Motion fades (`opacity: 0` to `1`) and slight vertical drifts (`y: 20` to `0`).

---

## 🛠️ Design Tokens (Tailwind Implementation)

### Colors
```typescript
colors: {
  brand: {
    navy: '#0A192F',
    gold: '#D4AF37',
    bronze: '#B8860B',
    slate: '#1E293B',
  },
  surface: {
    base: '#F8FAFC',
    card: '#FFFFFF',
    muted: '#F1F5F9',
  }
}
```

### Spacing
- **Standard Padding**: `p-6` (24px) for cards.
- **Section Spacing**: `py-24` (96px) to `py-32` (128px).
- **Component Gap**: `gap-8` (32px) for grid items.

---

## ✨ Visual Effects & Elements

- **Glassmorphism**: `backdrop-blur-md bg-white/70 border-white/20`.
- **Gradients**: Subtle linear gradients from `brand.navy` to `brand.slate`.
- **Shadows**: Soft, multi-layered shadows for a "lifted" card feel.
- **Icons**: Minimalist, thin-stroke icons (Lucide/Radix) in `Heritage Gold`.

---

## 📈 Component Evolution

1. **Buttons**: High-contrast, sharp corners (radius `4px` or `6px`), smooth hover scales.
2. **Cards**: Borderless with soft shadows or thin `Heritage Gold` top-border.
3. **Tables**: Clean rows, high-contrast headers, tabular numbers for all financial data.
4. **Forms**: Underlined inputs or very light border-bottom for a "consultation" feel.

---

## 🇰🇷 Korean Market Specifics
- **Font Optimization**: Ensure `Pretendard` is the primary fallback for Korean text to maintain perfect legibility across all OS.
- **Terminology**: Use bilingual terms for technical financial concepts (e.g., "Inheritance Tax (상속세)").
- **Visual Balance**: Korean characters have higher visual density; increase line-height to `1.7` for long Korean copy.

---

## 📐 Revolut Benchmark (Adapted — Modern Legacy First)

> **Source of truth remains this file.** Patterns below are borrowed from `revolut/DESIGN.md` (GetDesign) and mapped to **Signature Navy + Heritage Gold**, not Revolut cobalt/black.

### Two-Band Canvas (Storytelling ↔ Catalogue)

| Band | Background | Text | Use |
| :--- | :--- | :--- | :--- |
| **Navy storytelling** | `brand.navy` `#0A192F` | Serenity White + `on-dark-mute` | Hero, footer, trust sections |
| **Light catalogue** | `surface.base` `#F8FAFC` | Deep Slate + `slate` muted | FAQ, forms, comparison tables |
| **Elevated on navy** | `brand.slate` `#1E293B` | White | Plan/feature cards on dark bands |

Switch bands in **full-bleed sections** (not soft gradients). Utility classes: `.band-navy`, `.band-light`.

### Typography Scale (Implementation Tokens)

| Token | Font | Size | Weight | Line-height | Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-hero` | Playfair | clamp(2.5rem, 5vw, 4.5rem) | 600 | 1.05 | Hero (1 per page) |
| `display-section` | Playfair | 2.5–3rem | 600 | 1.1 | Section openers |
| `heading-lg` | Playfair | 2rem | 600 | 1.2 | Card titles |
| `heading-md` | Inter/Pretendard | 1.5rem | 500 | 1.33 | Sub-sections |
| `body-lg` | Inter/Pretendard | 1.125rem | 400 | 1.56 | Lead copy |
| `body-md` | Inter/Pretendard | 1rem | 400 | 1.5 | Default body |
| `body-sm` | Inter/Pretendard | 0.875rem | 400 | 1.43 | Captions, footer |
| `button-md` | Inter/Pretendard | 1rem | 600 | 1.5 | Pill CTA labels |

### Spacing (4px Base)

| Token | Value | Tailwind | Use |
| :--- | :--- | :--- | :--- |
| `xxs` | 4px | `1` | Inline gaps |
| `sm` | 8px | `2` | Tight groups |
| `xl` | 24px | `6` | Card padding default |
| `xxl` | 32px | `8` | Feature card inner |
| `section` | 88px | `section-legacy` | Between major bands |
| `band` | 120px | `band-legacy` | Hero vertical padding |

### Border Radius (Dual Mode)

| Token | Value | Use |
| :--- | :--- | :--- |
| `sharp` | 6px | Editorial buttons (`.btn-brand-*`) |
| `md` | 12px | Inputs, download tiles |
| `lg` | 20px | Feature / plan cards |
| `pill` | 9999px | Marketing CTAs (Revolut-style fintech pills) |

### Elevation Without Drop Shadows

Prefer **hairline dividers** and **surface luminance** on light bands; on navy bands use `brand.slate` cards instead of heavy shadows.

| Level | Treatment |
| :--- | :--- |
| Flat | Full-bleed band (`.band-navy` / `.band-light`) |
| Card on light | White + `hairline-light` border |
| Card on navy | `brand.slate` surface, no shadow |
| Featured | Heritage Gold top border (`.card-gold-border`) or gold pill CTA |

Utilities: `.hairline-light`, `.hairline-dark`, `.surface-elevated-navy`.

### Component Recipes (Tailwind / CSS Utilities)

| Component | Class / Variant | Spec |
| :--- | :--- | :--- |
| CTA on navy | `.btn-pill-light` or `Button` `legacyCtaLight` | White pill, navy text, h-12 min, `rounded-full`, px-7 |
| CTA on light | `.btn-pill-navy` or `legacyNavy` | Navy pill, white text, h-12 |
| Accent CTA | `.btn-pill-gold` or `legacyGold` | Gold pill, navy text |
| Outline on navy | `.btn-pill-outline-dark` | Transparent + white border |
| Text input | `.input-brand` | h-14, `rounded-xl` (12px), light border |
| Badge neutral | `.badge-brand` | `rounded-full`, caption size |
| Badge featured | `.badge-brand-gold` | Gold fill, navy text |
| Touch target | `.touch-target-legacy` | min 48×48px (WCAG AAA fintech) |

### Responsive & Motion

- Hero `display-hero`: use `clamp()`; section padding collapses `120px → 88px → 64px` below tablet.
- Nav height target: **64px** on marketing pages.
- Motion: keep subtle fade/slide (`opacity`, `y: 20→0`); avoid playful bounce on financial CTAs.
- Product imagery: prefer full-bleed or large mockup bands on `.band-navy` when used.

### Do / Don't (Revolut-Informed)

**Do**
- Use **one** gold accent per viewport (featured card or single gold CTA).
- Use pill CTAs on hero/marketing; sharp-radius buttons in dense admin/forms.
- Keep financial figures in `.tabular-nums` / `.financial-value`.
- Use `on-dark-mute` (`rgba(255,255,255,0.72)`) for secondary copy on navy.

**Don't**
- Don't replace navy/gold with Revolut cobalt or pure black canvas.
- Don't use saturated accent colors (teal/pink) as button surfaces — illustrations only.
- Don't stack multiple heavy drop shadows on cards in light bands.
- Don't use Playfair for button labels or long body paragraphs.

### Reference

- Full Revolut analysis: [`revolut/DESIGN.md`](./revolut/DESIGN.md)
- Code tokens: `constants/brand.ts` → `DESIGN_TOKENS`
- Utilities: `app/globals.css` (`@layer utilities`)
- Button variants: `components/ui/button.tsx` → `legacyNavy`, `legacyGold`, `legacyCtaLight`, `legacyOutlineDark`
