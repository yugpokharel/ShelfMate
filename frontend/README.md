# ShelfMate - Smart Grocery Shopping Platform

A high-fidelity web application designed for busy urban professionals (ages 20–45). ShelfMate leverages AI-driven "Smart Lists" and premium delivery services to streamline the grocery shopping experience.

## 🎯 Project Overview

**ShelfMate** is a modern, full-featured e-commerce platform with a focus on grocery shopping. The application includes:

- **Smart Shopping Experience**: Browse products with filtering and sorting
- **AI-Powered Features**: Smart Lists for personalized recommendations (coming soon)
- **User Accounts**: Profile management, order history, and preferences
- **Cart Management**: Full shopping cart with quantity management
- **Checkout Flow**: Multi-step checkout with shipping and payment forms
- **Responsive Design**: Mobile-first approach that works on all devices

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui + Lucide React
- **State Management**: React hooks (ready for Redux/Zustand)
- **Data Fetching**: API client utilities (ready for SWR/TanStack Query)

## 📁 Project Structure

```
├── app/                           # Next.js App Router
│   ├── (routes)/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── shop/                 # Product browsing
│   │   │   ├── page.tsx          # Shop listing
│   │   │   └── [id]/page.tsx     # Product detail
│   │   ├── cart/page.tsx         # Shopping cart
│   │   ├── checkout/page.tsx     # Checkout flow
│   │   ├── account/page.tsx      # User dashboard
│   │   ├── smart-lists/page.tsx  # AI recommendations
│   │   ├── about/page.tsx        # About page
│   │   └── contact/page.tsx      # Contact form
│   ├── globals.css               # Global styles & design tokens
│   └── layout.tsx                # Root layout with fonts
│
├── components/                   # React components
│   ├── navigation/               # Navigation components
│   ├── sections/                 # Page sections
│   ├── products/                 # Product components
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Alert.tsx
│   │   ├── Tabs.tsx
│   │   └── LoadingSpinner.tsx
│   └── [other components]
│
├── lib/                          # Utilities & helpers
│   ├── api-client.ts             # API request utilities
│   ├── constants.ts              # App constants & config
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Helper functions
│
├── public/                       # Static assets
├── ARCHITECTURE.md               # Detailed architecture doc
└── README.md                     # This file
```

## 🎨 Design System

### Colors
- **Primary**: #1a1a1a (Dark/Black)
- **Accent**: #059669 (Green - CTAs, premium features)
- **Secondary**: #f0f0f0 (Light backgrounds)
- **Destructive**: #dc2626 (Red - warnings/errors)
- **Muted**: #e5e5e5 (Borders, disabled states)

### Typography
- **Font**: Geist (sans-serif) and Geist Mono
- **Heading**: Bold, responsive sizes (5xl down to lg)
- **Body**: 14px+ for accessibility

### Spacing
- Based on Tailwind's 4px grid
- Responsive: `px-4 md:px-8` pattern throughout

## ✨ Features

### ✅ Implemented
- Home page with hero and feature sections
- Product browsing with filters and sorting
- Product detail pages with reviews
- Full shopping cart functionality
- Multi-step checkout process (mock payment)
- User account dashboard with tabs
- Smart Lists interface
- Wishlist support
- Responsive navigation
- Search functionality
- Dark mode ready

### 🚀 Coming Soon (Feature Flags)
- Smart Lists AI recommendations
- Streamlined delivery options
- Real payment integration (Stripe)
- Order tracking with real-time updates
- Product reviews and ratings
- Social features

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and pnpm (or npm/yarn)

### Installation

```bash
# Clone and navigate to project
cd /vercel/share/v0-project

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
pnpm build
pnpm start
```

## 📖 Key Components

### Navigation (`components/navigation/Navigation.tsx`)
- Sticky header with responsive design
- Desktop menu + mobile hamburger
- Shopping cart with item count
- Links to all major sections

### ProductCard (`components/products/ProductCard.tsx`)
- Displays product with image, price, rating
- Add to cart and wishlist buttons
- Discount badges
- Out of stock states

### Shop Page (`app/shop/page.tsx`)
- Grid of products with filtering
- Category filter
- Search functionality
- Sort options (price, rating)
- Responsive layout

### Checkout (`app/checkout/page.tsx`)
- Three-step flow: Shipping → Payment → Confirmation
- Form validation
- Order summary
- Mock payment processing

## 🔌 API Integration

The app is ready to connect to your backend. See `lib/api-client.ts`:

```typescript
import { apiGet, endpoints } from '@/lib/api-client'

// Fetch products
const response = await apiGet(endpoints.products.list())

// Create order
const result = await apiPost(endpoints.orders.create(), {
  items: cartItems,
  shippingAddress: address,
})
```

All endpoints are defined in `lib/api-client.ts` and ready to be connected to your API.

## 🧩 Component Library

### Reusable UI Components

```typescript
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Alert from '@/components/ui/Alert'
import Tabs from '@/components/ui/Tabs'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
```

### Example Usage

```typescript
<Button variant="accent" size="lg" fullWidth>
  Add to Cart
</Button>

<Input 
  label="Email" 
  type="email" 
  error="Invalid email"
  required
/>

<Alert type="success" message="Order placed successfully!" />
```

## 📱 Responsive Design

All pages follow mobile-first design:

```typescript
// Mobile first, then enhance for larger screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Content */}
</div>
```

- **Mobile**: Single column, full width
- **Tablet** (md): 2 columns
- **Desktop** (lg+): 3+ columns

## 🎯 State Management

Currently uses React hooks for local state. Ready to scale with:

```typescript
// Custom hooks (create in lib/hooks/)
export function useCart() {
  // Global cart state with SWR
}

export function useWishlist() {
  // Global wishlist state
}
```

## 🔐 Security Considerations

- API requests include auth token from localStorage
- Parameterized endpoints prevent injection
- Form validation before submission
- CORS-ready headers in API client
- Environment variables for sensitive config

## 📊 Performance Optimizations

- Next.js automatic code splitting
- Image optimization ready (use `next/image`)
- CSS purging in production (Tailwind)
- No render-blocking resources
- Optimized fonts via `next/font`

## 📝 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
```

## 🚢 Deployment

Ready to deploy to Vercel:

```bash
# Push to GitHub
git push

# Deploy to Vercel (auto-deploy from GitHub)
```

## 📚 Documentation

- **ARCHITECTURE.md**: Detailed architecture and development patterns
- **lib/types.ts**: All TypeScript interfaces
- **lib/constants.ts**: Feature flags and config

## 🤝 Contributing

When adding features:

1. Follow the folder structure
2. Use TypeScript with proper types
3. Keep components small and focused
4. Use semantic HTML and ARIA attributes
5. Test responsive design at multiple breakpoints

## 🐛 Known Limitations

- Mock data used throughout (replace with API)
- Payment processing is simulated
- Smart Lists feature is UI placeholder
- Order tracking not fully integrated
- Images are external URLs (consider Blob storage)

## 🔄 Integration Checklist

- [ ] Connect authentication API
- [ ] Integrate product fetching
- [ ] Setup cart backend sync
- [ ] Implement payment processing
- [ ] Add image optimization/CDN
- [ ] Setup error handling/logging
- [ ] Add analytics tracking
- [ ] Configure email notifications
- [ ] Setup webhooks for order updates
- [ ] Add real-time features (WebSocket)

## 📞 Support

For questions about the codebase:
- Check ARCHITECTURE.md for patterns
- Review component examples in the codebase
- Check lib/types.ts for data structures

## 📄 License

This project is part of ShelfMate platform.

---

**Last Updated**: December 2024  
**Built with**: Next.js 16, TypeScript, Tailwind CSS
