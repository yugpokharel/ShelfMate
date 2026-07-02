# ShelfMate

ShelfMate is a grocery application with a Node.js + Express backend and MongoDB datastore.

## Backend Setup

1. Go to backend:
   - `cd backend`
2. Install dependencies:
   - `npm install`
3. Create env file from example:
   - `cp .env.example .env`
4. Start dev server:
   - `npm run dev`

## Backend API Base URL

- `http://localhost:5000/api/v1`

## API Reference

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout` (protected)
- `GET /api/v1/auth/me` (protected)

### Users
- `GET /api/v1/users/profile` (protected)
- `PATCH /api/v1/users/profile` (protected)
- `PATCH /api/v1/users/preferences` (protected)

### Categories
- `GET /api/v1/categories`
- `GET /api/v1/categories/:slug`
- `POST /api/v1/categories` (admin)
- `PATCH /api/v1/categories/:id` (admin)
- `DELETE /api/v1/categories/:id` (admin)

### Products
- `GET /api/v1/products`
- `GET /api/v1/products/:id`
- `GET /api/v1/products/search?q=`
- `POST /api/v1/products` (admin)
- `PATCH /api/v1/products/:id` (admin)
- `DELETE /api/v1/products/:id` (admin)

### Cart
- `GET /api/v1/cart` (protected)
- `POST /api/v1/cart/add` (protected)
- `PATCH /api/v1/cart/item/:id` (protected)
- `DELETE /api/v1/cart/item/:id` (protected)
- `DELETE /api/v1/cart/clear` (protected)

### Orders
- `POST /api/v1/orders` (protected)
- `GET /api/v1/orders` (protected)
- `GET /api/v1/orders/:id` (protected)
- `PATCH /api/v1/orders/:id/cancel` (protected)

### Smart List
- `GET /api/v1/smartlist` (protected)
- `POST /api/v1/smartlist/add-to-cart` (protected)
