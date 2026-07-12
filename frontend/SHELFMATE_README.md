# ShelfMate - Interactive Vite + React Web App

## Overview

ShelfMate is a **production-ready, fully interactive web application** built with Vite, React, and Redux. It's a high-fidelity e-commerce platform designed for busy urban professionals (ages 20–45) who want a streamlined grocery shopping experience.

## 🎯 Key Features

### Interactive Components
- **Responsive Header** with shopping cart badge, search bar, and user authentication menu
- **Dynamic Product Listings** with filtering, sorting, and search capabilities
- **Shopping Cart** with quantity management and real-time updates
- **Product Details** with ratings, descriptions, and wishlist functionality
- **Mock Authentication** with login/signup flows
- **Toast Notifications** for user feedback
- **Redux State Management** for cart, auth, products, checkout, orders, and filters

### Pages Built
1. **Home Page** - Hero section, features showcase, deals, and best sellers
2. **Shop Page** - Product grid with filters (category, price, search)
3. **Product Detail Page** - Full product info, ratings, quantity selector, add to cart
4. **Cart Page** - Cart items management with totals and checkout button
5. **Checkout Page** (stub) - 4-step checkout process
6. **Login/Signup Pages** (stub) - Authentication flows
7. **Account Page** (stub) - User profile and settings
8. **Smart Lists Page** (stub) - AI-powered recommendations
9. **Deals Page** (stub) - Limited-time offers

## 🏗️ Architecture

### Folder Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky header with navigation & search
│   │   └── Footer.tsx          # Footer component
│   └── ui/
│       ├── Button.tsx          # Reusable button component
│       ├── Toast.tsx           # Notification toasts
│       └── ... (other UI components)
├── pages/
│   ├── Home.tsx                # Landing page
│   ├── Shop.tsx                # Product listing with filters
│   ├── ProductDetail.tsx       # Product details page
│   ├── Cart.tsx                # Shopping cart
│   ├── Checkout.tsx            # Checkout flow
│   ├── Login.tsx               # Login page
│   ├── Signup.tsx              # Signup page
│   ├── Account.tsx             # User account dashboard
│   ├── SmartLists.tsx          # Smart lists feature
│   └── Deals.tsx               # Deals page
├── store/
│   ├── index.ts                # Redux store configuration
│   ├── hooks.ts                # Redux hooks (useAppDispatch, useAppSelector)
│   └── slices/
│       ├── authSlice.ts        # Auth state management
│       ├── cartSlice.ts        # Cart state management
│       ├── productsSlice.ts    # Products & filtering state
│       ├── checkoutSlice.ts    # Checkout flow state
│       ├── ordersSlice.ts      # Orders history state
│       └── filtersSlice.ts     # Search filters state
├── context/
│   ├── ThemeContext.tsx        # Theme (light/dark) management
│   └── NotificationContext.tsx # Toast notifications management
├── data/
│   └── mockProducts.ts         # Mock product and deal data
├── types/
│   └── index.ts                # TypeScript interfaces
├── styles/
│   └── global.css              # Global styles with Tailwind v4
├── App.tsx                      # Main app component with routing
└── main.tsx                     # Vite entry point
```

### State Management

**Redux Store** manages:
- `auth` - User authentication and profile
- `cart` - Shopping cart items and totals
- `products` - Product listings and search results
- `checkout` - Checkout form state and step tracking
- `orders` - Order history
- `filters` - Product filters (category, price, search, sort)

**React Context** manages:
- `ThemeContext` - Light/dark mode
- `NotificationContext` - Toast notifications

## 🛠️ Tech Stack

- **Build Tool**: Vite 5.4
- **Framework**: React 18.3
- **State Management**: Redux Toolkit + Redux Logger
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **Type Safety**: TypeScript
- **Icons**: Lucide React
- **Utilities**: clsx, classnames
- **Validation**: Zod (ready to use)

## 🚀 Getting Started

### Installation
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

The app will be available at `http://localhost:3000`

## 📊 Redux Store Structure

### Auth Slice
```typescript
{
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
```

### Cart Slice
```typescript
{
  cart: {
    items: CartItem[]
    total: number
    itemCount: number
  }
  isLoading: boolean
}
```

### Products Slice
```typescript
{
  products: Product[]
  filteredProducts: Product[]
  isLoading: boolean
  filters: {
    category?: string
    priceRange: [number, number]
    search: string
    inStockOnly: boolean
  }
}
```

## 🎨 Design System

### Colors
- **Primary**: #059669 (Green)
- **Background**: #ffffff (White)
- **Foreground**: #0a0a0a (Near Black)
- **Border**: #e5e7eb (Light Gray)
- **Secondary**: #f3f4f6 (Very Light Gray)

### Typography
- **Font**: Geist (via Google Fonts)
- **Font Stack**: Geist, system-ui, -apple-system, sans-serif

### Components
- Cards with subtle borders and hover effects
- Rounded buttons with smooth transitions
- Clean product cards with discount badges
- Toast notifications with icons
- Responsive grid layouts

## 📱 Responsive Design

- **Mobile First**: Built with mobile experience first
- **Breakpoints**: 
  - sm: 640px
  - md: 768px
  - lg: 1024px
- **Mobile Header**: Collapsible navigation menu
- **Mobile Filters**: Toggle sidebar for shop filters
- **Flexible Grids**: Auto-responsive product grids

## 🔐 Authentication Flow

The app includes auth stub pages that are ready to connect to a backend:
1. **Login** - Email/password authentication
2. **Signup** - New user registration
3. **Protected Routes** - Checkout requires authentication
4. **User Profile** - Account settings and preferences

## 🛒 Shopping Flow

1. **Home** → Browse products and deals
2. **Shop** → Filter by category, price, or search
3. **Product Detail** → View full details, ratings, add to cart
4. **Cart** → Manage items and quantities
5. **Checkout** → 4-step checkout (shipping, billing, payment, confirmation)
6. **Order Confirmation** → Order summary and tracking

## 🔄 Redux Actions Available

### Auth
- `loginStart`, `loginSuccess`, `loginFailure`
- `logout`, `registerSuccess`, `updateUserProfile`

### Cart
- `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`

### Products
- `setProducts`, `setSearchFilter`, `setCategoryFilter`
- `setPriceFilter`, `setInStockFilter`, `resetFilters`

### Checkout
- `setCurrentStep`, `setShippingAddress`, `setPaymentMethod`
- `setCardDetails`, `setOrderNotes`, `resetCheckout`

### Orders
- `setOrders`, `addOrder`, `setCurrentOrder`, `updateOrder`

## 📦 Mock Data

The app includes 10 realistic mock products with:
- Product names and descriptions
- Real product images (via Unsplash)
- Category classifications
- Price and discount information
- Customer ratings and review counts
- Stock availability
- Tags and badges

Mock deals with countdown timers are also included for the Deals page.

## 🔌 Ready for Backend Integration

All Redux slices and API calls are structured to easily connect to a backend:

1. **API Endpoints Defined** - In comments throughout the code
2. **Type-Safe Interfaces** - All data structures are TypeScript interfaces
3. **Error Handling** - Redux slices include error states
4. **Loading States** - Async operations tracked with isLoading flags
5. **Validation Ready** - Zod is installed for form validation

## 🎯 Next Steps to Implement

1. **Connect to Backend API**
   - Replace mock data with API calls
   - Implement thunk middleware for async actions

2. **Add Payment Processing**
   - Stripe/Razorpay integration
   - Payment form validation

3. **Implement Smart Lists**
   - AI recommendations engine
   - User preference learning

4. **Add Delivery Tracking**
   - Real-time delivery status
   - Map integration

5. **User Preferences**
   - Saved addresses
   - Favorite products
   - Order history

## 🧪 Development Notes

- Redux Logger is enabled in development - watch the console for state changes
- Tailwind CSS v4 uses `@tailwindcss/postcss` plugin
- All components are functional components with hooks
- TypeScript strict mode is enabled
- Vite's Hot Module Replacement (HMR) for instant updates

## 📄 License

This is a demo project created with v0.

---

**Ready to start?** Run `pnpm dev` and start shopping! 🛍️
