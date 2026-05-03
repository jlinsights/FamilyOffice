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
