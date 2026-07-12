# ShelfMate Frontend Architecture

## Overview

ShelfMate is a high-fidelity web application designed for busy urban professionals (ages 20–45). This document outlines the frontend architecture, folder structure, and development patterns.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React hooks + Context API (ready for Redux/Zustand)
- **Data Fetching**: SWR-ready (implement as needed)

## Folder Structure

```
/app
  ├── (routes)
  │   ├── page.tsx                 # Home page
  │   ├── layout.tsx               # Root layout
  │   ├── globals.css              # Global styles
  │   ├── shop/
  │   │   ├── page.tsx             # Shop listing
  │   │   └── [id]/page.tsx        # Product detail
  │   ├── cart/page.tsx            # Shopping cart
  │   ├── checkout/page.tsx        # Checkout flow
  │   ├── account/page.tsx         # User account
  │   ├── smart-lists/page.tsx     # Smart lists (AI feature)
  │   ├── wishlist/page.tsx        # Wishlist (coming soon)
  │   ├── orders/page.tsx          # Order history
  │   └── preferences/page.tsx     # User preferences
  │
  /components
  ├── /navigation                  # Navigation components
  │   ├── Navigation.tsx           # Main nav with mobile support
  │   └── Sidebar.tsx              # Sidebar (optional)
  │
  ├── /sections                    # Page sections
  │   ├── Hero.tsx                 # Hero sections
  │   ├── Footer.tsx               # Footer
  │   └── Featured*.tsx            # Section components
  │
  ├── /products                    # Product components
  │   ├── ProductCard.tsx          # Card component
  │   ├── ProductGrid.tsx          # Grid layout
  │   └── ProductFilter.tsx        # Filter controls
  │
  ├── /cart                        # Cart components
  │   ├── CartSummary.tsx
  │   └── CartItem.tsx
  │
  ├── /checkout                    # Checkout flow
  │   ├── ShippingForm.tsx
  │   └── PaymentForm.tsx
  │
  ├── /account                     # Account components
  │   ├── ProfileForm.tsx
  │   └── OrderHistory.tsx
  │
  ├── /ui                          # Reusable UI components
  │   ├── Button.tsx
  │   ├── Input.tsx
  │   ├── Modal.tsx
  │   ├── Tabs.tsx
  │   └── ...
  │
  /lib
  ├── api-client.ts               # API utility functions
  ├── constants.ts                # App constants & config
  ├── types.ts                    # TypeScript types
  ├── utils.ts                    # Helper functions
  └── hooks/                      # Custom React hooks
      ├── useCart.ts
      ├── useWishlist.ts
      └── useAuth.ts
```

## Key Features & Implementation Status

### ✅ Implemented
- Home page with hero and features
- Shop page with filtering and sorting
- Product detail pages
- Cart management
- Checkout flow (mock payment)
- User account dashboard
- Smart lists interface
- Navigation and footer

### 🚀 Coming Soon (Feature Flags in `lib/constants.ts`)
- Smart Lists AI recommendations
- Streamlined delivery options
- Real payment integration
- Order tracking
- Product reviews

## Design System

### Colors
- **Primary**: #1a1a1a (Black)
- **Accent**: #059669 (Green - Premium delivery, CTAs)
- **Secondary**: #f0f0f0 (Light gray - Backgrounds)
- **Destructive**: #dc2626 (Red - Warnings, errors)
- **Muted**: #e5e5e5 (Light border)

### Typography
- **Fonts**: Geist (sans-serif), Geist Mono
- **Headings**: Bold, 5xl-2xl
- **Body**: Regular, 14px+ (Accessibility)

### Spacing
- Uses Tailwind spacing scale (4px base)
- Responsive: `px-4 md:px-8` pattern

## State Management

### Current Approach
- Local component state with `useState`
- Props drilling for shared state
- Browser localStorage for persistence

### Recommended Next Steps
```typescript
// lib/hooks/useCart.ts
export function useCart() {
  // Manage cart state globally
  // Cache with SWR or similar
}

// lib/hooks/useWishlist.ts
export function useWishlist() {
  // Manage wishlist state
}
```

## API Integration Points

All API endpoints are defined in `lib/api-client.ts`:

```typescript
// Usage example
import { apiGet, endpoints } from '@/lib/api-client'

const { data, error } = await apiGet(endpoints.products.list())
```

### Available Endpoints
- `/products` - Product listing
- `/cart` - Cart operations
- `/orders` - Order management
- `/user/profile` - User data
- `/smart-lists` - Smart list operations
- `/auth` - Authentication

## Component Patterns

### Functional Components with TypeScript

```typescript
interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return <div>...</div>
}
```

### Using Lucide Icons

```typescript
import { ShoppingBag, Heart, Search } from 'lucide-react'

export function Example() {
  return <ShoppingBag className="w-5 h-5 text-accent" />
}
```

### Responsive Design

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Mobile: 1 column, Tablet: 2, Desktop: 3 */}
</div>
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
```

## Common Tasks

### Adding a New Page

1. Create route folder: `/app/new-page/page.tsx`
2. Import Navigation and Footer
3. Follow existing page patterns

### Adding a Component

1. Create file: `/components/section/MyComponent.tsx`
2. Define TypeScript interface for props
3. Export default component
4. Use in pages with proper imports

### Adding API Integration

1. Add endpoint to `lib/api-client.ts`
2. Create custom hook in `lib/hooks/`
3. Use hook in component with loading/error handling

### Styling

- Use Tailwind classes: `className="bg-accent text-accent-foreground"`
- Avoid inline styles
- Reference design tokens via CSS variables

## Performance Optimization

- Next.js Image optimization ready (use `next/image`)
- Code splitting by route (automatic)
- CSS purging in production (Tailwind)
- No external fonts loading (Geist via next/font)

## Accessibility

- Semantic HTML: `<main>`, `<nav>`, `<section>`
- ARIA labels on interactive elements
- Color contrast meets WCAG AA
- Keyboard navigation support
- Screen reader friendly

## Development Workflow

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Future Enhancements

1. **State Management**: Migrate to Redux or Zustand for complex state
2. **Real-time Updates**: WebSocket integration for order tracking
3. **Offline Support**: Service workers for offline browsing
4. **Progressive Enhancement**: Add PWA capabilities
5. **Analytics**: Integrate Vercel Analytics
6. **Testing**: Jest + React Testing Library
7. **E2E Testing**: Playwright or Cypress

## Backend Integration Checklist

- [ ] Connect authentication endpoints
- [ ] Implement product fetching
- [ ] Setup cart synchronization
- [ ] Add order placement flow
- [ ] Integrate payment processing
- [ ] Add image optimization CDN
- [ ] Setup error handling
- [ ] Add loading states with skeletons

## Notes

- This is a client-side focused implementation
- Backend integration ready (see `lib/api-client.ts`)
- Mock data used throughout for demo purposes
- Feature flags in place for "coming soon" items
- Clean separation of concerns via component organization
