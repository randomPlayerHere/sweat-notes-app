# Design Guidelines for Calorie Prediction & Workout Generator

## Design Approach
**Utility-Focused Design System**: Since this is a productivity tool focused on delivering specific functions (prediction and generation), I'm selecting a **Material Design** approach for its clean, content-focused interface that prioritizes functionality while maintaining visual appeal.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Light mode: 219 69% 34% (deep blue)
- Dark mode: 219 69% 55% (lighter blue)

**Background Colors:**
- Light mode: 0 0% 98% (off-white)
- Dark mode: 222 84% 5% (dark gray)

**Accent Colors:**
- Success: 142 76% 36% (green for results)
- Warning: 38 92% 50% (orange for validation)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Headings**: 600 weight, sizes from text-2xl to text-4xl
- **Body Text**: 400 weight, text-base and text-sm
- **Labels**: 500 weight, text-sm

### Layout System
**Tailwind Spacing Primitives**: Consistently use 4, 6, 8, 12, and 16 units
- Tight spacing: p-4, m-4
- Standard spacing: p-6, m-6, gap-6
- Section spacing: p-8, m-8
- Large spacing: p-12, m-12

### Component Library

**Core Components:**
- **Forms**: Clean input fields with floating labels, rounded corners (rounded-lg)
- **Buttons**: Primary (filled), secondary (outline), with subtle shadows
- **Cards**: Elevated containers (shadow-md) for prediction results and workout plans
- **Navigation**: Simple header with app title and minimal branding
- **Results Display**: Structured cards with clear typography hierarchy

**Layout Structure:**
- Single-page application with two main sections
- Side-by-side forms on desktop, stacked on mobile
- Results displayed below respective forms
- Maximum width container (max-w-6xl) for optimal readability

### Visual Treatment
- **Minimal shadows**: Use shadow-sm and shadow-md sparingly
- **Rounded corners**: Consistent rounded-lg for all interactive elements
- **Loading states**: Subtle skeleton loading with animated pulse
- **Error handling**: Inline validation with clear messaging

### Responsive Design
- **Mobile-first**: Forms stack vertically on small screens
- **Desktop enhancement**: Side-by-side layout for efficient workflow
- **Breakpoints**: Focus on sm, md, and lg breakpoints

### User Experience Patterns
- **Progressive disclosure**: Show results only after successful API calls
- **Clear feedback**: Loading spinners and success/error states
- **Form validation**: Real-time validation with helpful error messages
- **Accessibility**: Proper labels, focus states, and keyboard navigation

This design approach ensures a clean, functional interface that prioritizes user efficiency while maintaining a modern, professional appearance suitable for a health and fitness utility application.