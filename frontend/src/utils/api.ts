const BASE_URL = 'http://localhost:5000/api/v1'

export interface ApiResponse<T = any> {
  statusCode: number
  success: boolean
  data: T
  message: string
}

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb)
}

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

export const getTokens = () => {
  const accessToken = localStorage.getItem('shelfmate_access_token')
  const refreshToken = localStorage.getItem('shelfmate_refresh_token')
  return { accessToken, refreshToken }
}

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('shelfmate_access_token', accessToken)
  localStorage.setItem('shelfmate_refresh_token', refreshToken)
}

export const clearTokens = () => {
  localStorage.removeItem('shelfmate_access_token')
  localStorage.removeItem('shelfmate_refresh_token')
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${path}`

  // Default headers
  const headers = new Headers(options.headers || {})
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const { accessToken } = getTokens()
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  // Handle token refresh on 401
  if (response.status === 401 && !path.includes('/auth/refresh') && !path.includes('/auth/login')) {
    const { refreshToken } = getTokens()

    if (refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          })

          if (refreshRes.ok) {
            const result: ApiResponse<{ tokens: { accessToken: string; refreshToken: string } }> =
              await refreshRes.json()

            const { accessToken: newAccess, refreshToken: newRefresh } = result.data.tokens
            setTokens(newAccess, newRefresh)
            isRefreshing = false
            onRefreshed(newAccess)
          } else {
            isRefreshing = false
            clearTokens()
            // Dispatch a custom event to alert store to log out
            window.dispatchEvent(new Event('auth:unauthorized'))
            throw new Error('Session expired. Please log in again.')
          }
        } catch (err) {
          isRefreshing = false
          clearTokens()
          window.dispatchEvent(new Event('auth:unauthorized'))
          throw err
        }
      }

      // Wait for refresh to complete
      return new Promise<ApiResponse<T>>((resolve, reject) => {
        subscribeTokenRefresh(async (newAccess) => {
          try {
            headers.set('Authorization', `Bearer ${newAccess}`)
            const retryRes = await fetch(url, { ...options, headers })
            const retryData = await retryRes.json()
            if (!retryRes.ok) {
              reject(new Error(retryData.message || 'Request failed after refresh'))
            } else {
              resolve(retryData)
            }
          } catch (error) {
            reject(error)
          }
        })
      })
    }
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'API Request failed')
  }

  return data as ApiResponse<T>
}
