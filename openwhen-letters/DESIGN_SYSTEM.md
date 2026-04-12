# OpenWhen Letters - Design System

## Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Dusty Rose | `#D4A59A` | Primary buttons, accents |
| Soft Blush | `#E8C4C0` | Secondary backgrounds |
| Muted Terracotta | `#B58980` | Hover states |

### Background Colors
| Name | Hex | Usage |
|------|-----|-------|
| Warm Cream | `#FDF8F6` | Main background |
| Soft Beige | `#F5EBE6` | Alternate sections |
| Pure White | `#FFFFFF` | Cards, inputs |

### Text Colors
| Name | Hex | Usage |
|------|-----|-------|
| Soft Charcoal | `#4A4A4A` | Primary text |
| Warm Gray | `#8B8B8B` | Secondary text |
| Light Taupe | `#C4B5B0` | Hints, placeholders |

### Status Colors
| Name | Hex | Usage |
|------|-----|-------|
| Muted Bronze | `#B8A99A` | Locked state |
| Soft Sage | `#A8C4A0` | Opened state |
| Muted Gold | `#D4C4A8` | Premium badge |

## Typography

### Font Sizes
- `xs`: 12px - Captions, hints
- `sm`: 14px - Labels, secondary text
- `md`: 16px - Body text
- `lg`: 20px - Subheadings
- `xl`: 28px - Headings
- `xxl`: 36px - Display text

### Font Weights
- Regular (400) - Body text
- Medium (500) - Labels, buttons
- Semibold (600) - Headings
- Bold (700) - Emphasis

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Small gaps |
| md | 16px | Standard spacing |
| lg | 24px | Section spacing |
| xl | 32px | Large gaps |
| xxl | 48px | Page margins |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 8px | Small elements |
| md | 12px | Cards, inputs |
| lg | 16px | Large cards |
| xl | 24px | Modals |
| full | 9999px | Pills, badges |

## Shadows

```javascript
// Soft shadow (cards, buttons)
shadowColor: 'rgba(180, 160, 150, 0.15)'
shadowOffset: { width: 0, height: 2 }
shadowOpacity: 1
shadowRadius: 4

// Elevated shadow (FAB, modals)
shadowColor: 'rgba(180, 160, 150, 0.25)'
shadowOffset: { width: 0, height: 4 }
shadowOpacity: 1
shadowRadius: 8
```

## Component Patterns

### Buttons
- Always use rounded corners (lg)
- Include subtle shadow for depth
- Primary: filled with shadow
- Secondary: outlined, no fill
- Ghost: text only, no background

### Cards
- White background on cream
- Left accent border (4px, primary color)
- Consistent shadow elevation
- Rounded corners (lg)

### Inputs
- White background
- Light border (1px)
- Rounded corners (md)
- Minimum height 48px

## Animations

### Entrance Fade
```javascript
Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 800,
  useNativeDriver: true,
})
```

### Slide Up
```javascript
Animated.timing(slideAnim, {
  toValue: 0,
  duration: 800,
  useNativeDriver: true,
})
```

## Accessibility

- Minimum touch target: 44x44px
- Color contrast ratio: 4.5:1 minimum
- Support Dynamic Type scaling
- Always provide accessibility labels

## Premium Feature Indicators

- Use sparkle emoji (✨) consistently
- Muted gold background
- Small badge size
- "Premium" text label
