# Interactive Event Seating Map

A React + TypeScript application that renders an interactive seating map for events. Users can select up to 8 seats, view seat details, and see a live summary with pricing information.

## Architecture Choices and Trade-offs

**Technology Stack:**

- **React 19 + TypeScript**: Modern React with strict type checking for better development experience and code reliability
- **Vite**: Fast build tool and development server for optimal performance
- **SVG Rendering**: Used SVG instead of Canvas for better accessibility support and easier styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development and consistent responsive design
- **localStorage**: Simple client-side persistence for seat selection state

**Performance Optimizations:**

- **React.memo**: Memoized components to prevent unnecessary re-renders
- **useMemo/useCallback**: Optimized expensive calculations and event handlers
- **Efficient Data Structures**: Used Set for O(1) seat selection lookups
- **SVG-based Rendering**: Scalable vector graphics for smooth rendering at any zoom level

**Accessibility Features:**

- **ARIA Labels**: Comprehensive screen reader support with detailed seat information
- **Keyboard Navigation**: Full keyboard support with Enter/Space key activation
- **Focus Management**: Clear focus indicators and logical tab order
- **Semantic HTML**: Proper roles and ARIA attributes for interactive elements

## Incomplete Features / TODOs

- **Performance Testing**: While optimized for ~15,000 seats, large-scale performance testing with real data is needed
- **WebSocket Integration**: Live seat status updates not implemented (stretch goal)
- **Heat Map Toggle**: Price tier visualization not implemented (stretch goal)
- **Adjacent Seat Finder**: "Find N adjacent seats" helper not implemented (stretch goal)
- **Touch Gestures**: Pinch-zoom and pan for mobile not implemented (stretch goal)
- **Dark Mode**: Dark theme toggle not implemented (stretch goal)
- **End-to-End Tests**: Playwright/Cypress tests not included (stretch goal)

## How to Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The application will be available at `http://localhost:5173/`

## Features

- ✅ Interactive seat selection (click and keyboard)
- ✅ Seat details display on focus/click
- ✅ Maximum 8 seats selection with live summary
- ✅ Price calculation and subtotal display
- ✅ Selection persistence via localStorage
- ✅ Full accessibility support (ARIA, keyboard navigation)
- ✅ Responsive design for desktop and mobile
- ✅ Smooth performance optimized for large venues
