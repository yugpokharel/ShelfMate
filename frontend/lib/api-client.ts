import { API_BASE_URL } from './constants'
import { ApiResponse } from './types'

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>
}

/**
 * Utility function to make API requests
 * Handles errors, token management, and response formatting
 */
export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options

  try {
    // Build URL with query parameters
    let url = `${API_BASE_URL}${endpoint}`
    if (params) {
      const queryString = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      ).toString()
      url += `?${queryString}`
    }

    // Add default headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    }

    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    // Make request
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    })

    // Parse response
    const data = await response.json()

    // Handle errors
    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP ${response.status}`,
        message: data.message,
      }
    }

    return {
      success: true,
      data: data.data || data,
    }
  } catch (error) {
    console.error('[API Client Error]', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * GET request
 */
export function apiGet<T>(endpoint: string, options?: FetchOptions) {
  return apiClient<T>(endpoint, { ...options, method: 'GET' })
}

/**
 * POST request
 */
export function apiPost<T>(endpoint: string, body?: unknown, options?: FetchOptions) {
  return apiClient<T>(endpoint, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  })
}

/**
 * PUT request
 */
export function apiPut<T>(endpoint: string, body?: unknown, options?: FetchOptions) {
  return apiClient<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  })
}

/**
 * PATCH request
 */
export function apiPatch<T>(endpoint: string, body?: unknown, options?: FetchOptions) {
  return apiClient<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  })
}

/**
 * DELETE request
 */
export function apiDelete<T>(endpoint: string, options?: FetchOptions) {
  return apiClient<T>(endpoint, { ...options, method: 'DELETE' })
}

// API Endpoints
export const endpoints = {
  // Products
  products: {
    list: () => '/products',
    get: (id: string) => `/products/${id}`,
    search: () => '/products/search',
    trending: () => '/products/trending',
  },
  // Cart
  cart: {
    get: () => '/cart',
    add: () => '/cart/items',
    update: (id: string) => `/cart/items/${id}`,
    remove: (id: string) => `/cart/items/${id}`,
    checkout: () => '/cart/checkout',
  },
  // Orders
  orders: {
    list: () => '/orders',
    get: (id: string) => `/orders/${id}`,
    create: () => '/orders',
    cancel: (id: string) => `/orders/${id}/cancel`,
    track: (id: string) => `/orders/${id}/track`,
  },
  // User
  user: {
    profile: () => '/user/profile',
    update: () => '/user/profile',
    addresses: () => '/user/addresses',
    preferences: () => '/user/preferences',
  },
  // Smart Lists
  smartLists: {
    list: () => '/smart-lists',
    get: (id: string) => `/smart-lists/${id}`,
    create: () => '/smart-lists',
    update: (id: string) => `/smart-lists/${id}`,
    delete: (id: string) => `/smart-lists/${id}`,
    suggestions: (id: string) => `/smart-lists/${id}/suggestions`,
  },
  // Wishlist
  wishlist: {
    get: () => '/wishlist',
    add: () => '/wishlist/items',
    remove: (id: string) => `/wishlist/items/${id}`,
  },
  // Auth
  auth: {
    login: () => '/auth/login',
    register: () => '/auth/register',
    logout: () => '/auth/logout',
    refresh: () => '/auth/refresh',
    verify: () => '/auth/verify',
  },
  // Reviews
  reviews: {
    list: (productId: string) => `/products/${productId}/reviews`,
    create: (productId: string) => `/products/${productId}/reviews`,
    update: (id: string) => `/reviews/${id}`,
    delete: (id: string) => `/reviews/${id}`,
  },
}
