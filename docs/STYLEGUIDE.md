# PDFCraft Style Guide

This document defines the visual design standards for the PDFCraft application, inspired by iLovePDF's clean and professional interface.

## Color Palette

### Primary Colors
```
Primary Red:       #E5322D  (Main brand color, buttons, links)
Primary Dark:      #C62A26  (Hover states)
Primary Light:     #FF5A52  (Accents)
```

### Neutral Colors
```
Background:        #F7F7FB  (Page background)
Card Background:   #FFFFFF  (Card/component background)
Text Primary:      #1F2937  (Headings, important text)
Text Secondary:    #6B7280  (Body text, descriptions)
Border:            #E5E7EB  (Borders, dividers)
```

### Status Colors
```
Success:           #10B981  (Success messages)
Warning:           #F59E0B  (Warnings)
Error:             #EF4444  (Errors, validation)
Info:              #3B82F6  (Information)
```

## Typography

### Font Family
- Primary: Inter (system-ui fallback)
- Monospace: 'Courier New' (for code)

### Font Sizes
```
Display:    3rem (48px)    - Hero headings
H1:         2.25rem (36px) - Page titles
H2:         1.5rem (24px)  - Section headings
H3:         1.25rem (20px) - Card titles
Body:       1rem (16px)    - Body text
Small:      0.875rem (14px)- Helper text
Tiny:       0.75rem (12px) - Labels
```

### Font Weights
```
Regular:    400
Medium:     500
Semibold:   600
Bold:       700
```

## Spacing

Using Tailwind's spacing scale (1 unit = 0.25rem = 4px):

```
xs:   0.25rem (4px)
sm:   0.5rem (8px)
md:   1rem (16px)
lg:   1.5rem (24px)
xl:   2rem (32px)
2xl:  3rem (48px)
3xl:  4rem (64px)
```

## Components

### Buttons

#### Primary Button
```
Background: #E5322D
Text: White
Padding: 0.5rem 1rem (8px 16px)
Border Radius: 0.375rem (6px)
Font Weight: 500

Hover:
  Background: #C62A26

Disabled:
  Opacity: 0.5
  Cursor: not-allowed
```

#### Secondary Button
```
Background: White
Text: #1F2937
Border: 1px solid #E5E7EB
Padding: 0.5rem 1rem

Hover:
  Background: #F9FAFB
```

#### Ghost Button
```
Background: Transparent
Text: #1F2937

Hover:
  Background: #F3F4F6
```

### Cards

```
Background: White
Border: 1px solid #E5E7EB
Border Radius: 0.5rem (8px)
Padding: 1.5rem (24px)
Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

Hover:
  Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
  Transform: translateY(-2px)
  Transition: all 0.2s ease
```

### Header

```
Height: 4rem (64px)
Background: White
Border Bottom: 1px solid #E5E7EB
Shadow: 0 1px 2px rgba(0, 0, 0, 0.05)
Position: Sticky top
Z-index: 50

Logo:
  Font Size: 1.5rem (24px)
  Color: #E5322D
  Font Weight: 700

Navigation:
  Font Size: 0.875rem (14px)
  Color: #6B7280
  Hover Color: #1F2937
```

### Forms

#### Input Fields
```
Border: 1px solid #E5E7EB
Border Radius: 0.375rem (6px)
Padding: 0.5rem 0.75rem
Background: White

Focus:
  Border Color: #E5322D
  Ring: 2px #E5322D with opacity 0.2

Error:
  Border Color: #EF4444
  Ring: 2px #EF4444 with opacity 0.2
```

#### File Upload Zone
```
Border: 2px dashed #E5E7EB
Border Radius: 0.5rem (8px)
Padding: 3rem (48px)
Background: White

Hover/Drag Active:
  Border Color: #E5322D
  Background: #E5322D with opacity 0.05
```

## Layout

### Containers
```
Max Width: 1280px
Padding: 1rem (mobile), 2rem (desktop)
Margin: 0 auto
```

### Grid
```
Columns: 12
Gap: 1.5rem (24px)

Breakpoints:
  sm:  640px
  md:  768px
  lg:  1024px
  xl:  1280px
  2xl: 1536px
```

### Responsive Design
- Mobile First approach
- Touch targets minimum 44x44px
- Readable line length: 60-80 characters

## Icons

- Use emoji for quick prototyping
- Use SVG icons for production (Heroicons, Lucide)
- Icon size: 1rem to 1.5rem (16px to 24px)
- Icon color matches text color

## Shadows

```
Small:  0 1px 2px rgba(0, 0, 0, 0.05)
Base:   0 1px 3px rgba(0, 0, 0, 0.1)
Medium: 0 4px 6px rgba(0, 0, 0, 0.1)
Large:  0 10px 15px rgba(0, 0, 0, 0.1)
```

## Animations

### Transitions
```
Duration: 150ms - 300ms
Easing: ease-in-out

Common Transitions:
- Button hover: 150ms
- Card hover: 200ms
- Page transitions: 300ms
```

### Loading States
```
Spinner: Rotating border animation
Skeleton: Pulse animation
Progress: Linear progress bar
```

## Accessibility

### Contrast Ratios
- Normal text: Minimum 4.5:1
- Large text: Minimum 3:1
- Interactive elements: Minimum 3:1

### Focus States
- Visible focus ring on all interactive elements
- Color: Primary with opacity
- Width: 2px
- Offset: 2px

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Logical tab order
- Skip links for main content

## Best Practices

1. **Consistency**: Use predefined components and styles
2. **Simplicity**: Keep interfaces clean and uncluttered
3. **Feedback**: Provide clear feedback for user actions
4. **Performance**: Optimize images and assets
5. **Responsive**: Design mobile-first, enhance for desktop

## Examples

### Page Header
```tsx
<header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
  <div className="container mx-auto flex h-16 items-center justify-between px-4">
    <div className="text-2xl font-bold text-primary">PDFCraft</div>
  </div>
</header>
```

### Card Component
```tsx
<div className="rounded-lg border bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow">
  <h3 className="text-xl font-semibold">Title</h3>
  <p className="text-sm text-text-secondary">Description</p>
</div>
```

### Primary Button
```tsx
<button className="rounded-md bg-primary px-4 py-2 text-white font-medium hover:bg-primary-dark transition-colors">
  Click Me
</button>
```
