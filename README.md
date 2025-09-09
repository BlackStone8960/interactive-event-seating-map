# Interactive Event Seating Map

A React + TypeScript application that renders an interactive seating map for events. Users can select up to 8 seats, view seat details, and see a live summary with pricing information.

## Architecture Choices and Trade-offs

This application uses React 19 with TypeScript in strict mode for type safety and modern development practices. The seating map is rendered using SVG for better accessibility support and scalable graphics, while Tailwind CSS provides responsive design and consistent styling. Performance is optimized through React.memo, useMemo, and useCallback to handle large venues with up to 15,000 seats smoothly. Seat selection state is persisted using localStorage for a seamless user experience across page reloads.

## How to Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173/`
