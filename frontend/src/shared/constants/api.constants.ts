// api.constants.ts — ShelfMate
// API endpoint path constants

export const API = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  USERS: {
    PROFILE: '/users/profile',
    PREFERENCES: '/users/preferences',
  },
  CATEGORIES: {
    ALL: '/categories',
    BY_SLUG: (slug: string) => `/categories/${slug}`,
  },
  PRODUCTS: {
    ALL: '/products',
    BY_ID: (id: string) => `/products/${id}`,
    SEARCH: '/products/search',
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: (id: string) => `/cart/item/${id}`,
    REMOVE: (id: string) => `/cart/item/${id}`,
    CLEAR: '/cart/clear',
  },
  ORDERS: {
    ALL: '/orders',
    CREATE: '/orders',
    BY_ID: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
  },
  SMARTLIST: {
    GET: '/smartlist',
    ADD_TO_CART: '/smartlist/add-to-cart',
  },
} as const;
