# Design Document

## Design Philosophy

PDFCraft follows a clean, minimal, and professional design inspired by iLovePDF, focusing on:
- **Simplicity**: Clear, intuitive interfaces
- **Speed**: Fast interactions with immediate feedback
- **Trust**: Professional appearance that inspires confidence
- **Accessibility**: Usable by everyone

## Design References

### Inspiration: iLovePDF
We drew inspiration from iLovePDF's design while creating our own unique identity:

**What we kept:**
- Clean white background (#F7F7FB)
- Red primary color for actions
- Card-based tool selection
- Sticky header navigation
- Drag-and-drop file upload

**What we changed:**
- Custom brand name (PDFCraft vs iLovePDF)
- Simplified color palette
- Custom component library
- Tailwind CSS instead of custom CSS

## Visual Design

### Logo
Simple text-based logo using primary red color:
```
PDFCraft
Color: #E5322D
Font: Inter Bold
Size: 24px (1.5rem)
```

### Color Strategy

**Primary Red (#E5322D)**
- Used for: Primary buttons, links, logo, active states
- Psychology: Action, urgency, importance
- Accessibility: Passes WCAG AA for contrast with white

**Neutral Grays**
- Background: Light gray (#F7F7FB) - reduces eye strain
- Cards: Pure white (#FFFFFF) - emphasizes content
- Text: Dark gray (#1F2937) - readable without being harsh
- Secondary text: Medium gray (#6B7280) - hierarchy

### Typography

**Inter Font Family**
- Professional and modern
- Excellent readability at all sizes
- Wide range of weights
- Open source

**Type Scale**
```
Hero:    48px  - Landing page headlines
H1:      36px  - Page titles
H2:      24px  - Section headings
H3:      20px  - Card titles
Body:    16px  - Default text
Small:   14px  - Helper text
Tiny:    12px  - Labels
```

## Layout Patterns

### Grid System

**Home Page Tools Grid**
```
Mobile:    1 column
Tablet:    2 columns
Desktop:   3 columns
Gap:       24px
Max Width: 1200px
```

### Card Layout
```
┌─────────────────────┐
│  Icon (emoji)       │
│                     │
│  Title              │
│  Description        │
│                     │
└─────────────────────┘
```

### Page Structure
```
┌─────────────────────────┐
│ Header (sticky)         │
├─────────────────────────┤
│                         │
│ Main Content            │
│ (centered container)    │
│                         │
├─────────────────────────┤
│ Footer                  │
└─────────────────────────┘
```

## Component Design

### Buttons

**Primary Button**
- Most important actions
- Red background
- White text
- Subtle hover darkening
- Rounded corners (6px)

**Secondary Button**
- Alternative actions
- White background
- Border
- Gray text
- Light hover background

**Ghost Button**
- Tertiary actions
- Transparent background
- Hover background only

### Cards

**Tool Cards**
```
Padding:        24px
Border Radius:  8px
Shadow:         Subtle (1px 3px)
Hover Shadow:   Medium (4px 6px)
Hover Transform: -2px Y-axis
Transition:     200ms ease
```

**Interactive States**
1. Default: Subtle shadow
2. Hover: Lifted appearance
3. Active: Slightly pressed
4. Focus: Ring outline

### File Upload Zone

**Design**
```
Border:     2px dashed gray
Padding:    48px
Icon:       Large emoji (📄)
Text:       Clear instructions

Drag Active:
  Border:     2px dashed red
  Background: Light red tint
```

### Header

**Layout**
```
┌─────────────────────────────────────┐
│ Logo | Nav Links    | Sign In | Sign Up │
└─────────────────────────────────────┘
```

**Responsive**
- Desktop: Full navigation visible
- Mobile: Hamburger menu (future phase)

## User Experience

### Micro-interactions

1. **Button Hover**
   - Color darkens
   - Duration: 150ms
   - Easing: ease-in-out

2. **Card Hover**
   - Lifts up 2px
   - Shadow increases
   - Duration: 200ms

3. **File Upload**
   - Border color change on drag
   - Background tint on drag
   - Instant feedback

### Loading States

**File Upload**
```
1. Selecting files
2. Uploading (progress if needed)
3. Processing (spinner)
4. Complete (download)
```

**Button States**
```
Default:     "Merge 2 PDFs"
Loading:     "Merging..." (disabled)
Complete:    Download initiated
```

### Error Handling

**Display**
- Red background (#FEF2F2)
- Red border (#FCA5A5)
- Red text (#DC2626)
- Icon (❌ or warning symbol)
- Clear message

**Placement**
- Below form
- Above submit button
- Persistent until dismissed or corrected

## Responsive Design

### Breakpoints
```
Mobile:     < 640px
Tablet:     640px - 1024px
Desktop:    > 1024px
```

### Mobile Optimizations
- Larger touch targets (44x44px minimum)
- Simplified navigation
- Stack cards vertically
- Larger file upload zone
- Bottom-fixed action buttons

### Desktop Enhancements
- Multi-column layouts
- Hover states
- Keyboard shortcuts
- Drag and drop reordering

## Accessibility

### Color Contrast
All text meets WCAG AA standards:
- Primary text on white: 13.5:1
- Secondary text on white: 7.5:1
- Primary button text: 5.5:1

### Focus Indicators
- Visible 2px ring
- Primary color with opacity
- 2px offset from element

### Screen Readers
- Semantic HTML
- ARIA labels where needed
- Alt text for icons
- Form labels

### Keyboard Navigation
- All interactive elements focusable
- Logical tab order
- Skip to main content link

## Animation Principles

1. **Purpose**: Animations guide attention and provide feedback
2. **Performance**: Use transform and opacity only
3. **Duration**: 150ms-300ms (never longer)
4. **Easing**: ease-in-out for natural feel
5. **Reduce Motion**: Respect user preferences

## Dark Mode

Not implemented in Phase 1, but designed with dark mode in mind:
- Color variables ready for theming
- Sufficient contrast ratios
- Neutral base colors

Future dark mode palette:
```
Background:     #1F2937
Card:           #374151
Text Primary:   #F9FAFB
Text Secondary: #D1D5DB
```

## Performance Considerations

### Images
- Use WebP format
- Lazy load below fold
- Responsive images

### Fonts
- System font fallbacks
- Subset fonts (Latin only)
- Font-display: swap

### CSS
- Tailwind JIT for minimal bundle
- Purge unused styles
- Critical CSS inline

## Brand Guidelines

### Logo Usage
- Minimum size: 100px width
- Clear space: Equal to capital letter height
- Don't rotate, skew, or distort
- Don't change colors

### Voice and Tone
- Professional but friendly
- Clear and concise
- Helpful and supportive
- Avoid technical jargon

### Writing Style
- Active voice
- Short sentences
- Scannable text
- Action-oriented

## Future Design Considerations

### Phase 2
- User dashboard
- File history
- Settings page
- Progress indicators

### Phase 3
- Advanced tools UI
- Batch processing interface
- Premium feature badges
- Collaboration features

## Design Tools

- Figma (design mockups)
- Tailwind CSS (implementation)
- Radix UI (accessible components)
- Heroicons (icon system)

## Resources

- Color palette: Generated using [Coolors](https://coolors.co)
- Typography: [Inter font](https://rsms.me/inter/)
- Icons: Emoji (Phase 1), Heroicons (Phase 2)
- Reference: [iLovePDF](https://www.ilovepdf.com)
