// routes.ts — ShelfMate
// All route path constants

export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  SEARCH: '/search',
  DEALS: '/deals',
  PRODUCT: '/product/:id',
  CART: '/cart',
  CHECKOUT_ADDRESS: '/checkout/address',
  CHECKOUT_DELIVERY: '/checkout/delivery',
  CHECKOUT_PAYMENT: '/checkout/payment',
  ORDER_CONFIRMATION: '/checkout/confirmation',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ACCOUNT: '/account',
  ACCOUNT_ORDERS: '/account/orders',
  ACCOUNT_ORDER_DETAIL: '/account/orders/:id',
  ACCOUNT_SMARTLIST: '/account/smartlist',
  ACCOUNT_SAVED: '/account/saved',
  ACCOUNT_ADDRESSES: '/account/addresses',
  ACCOUNT_PAYMENTS: '/account/payments',
  ACCOUNT_PREFERENCES: '/account/preferences',
  INSTORE: '/instore',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
