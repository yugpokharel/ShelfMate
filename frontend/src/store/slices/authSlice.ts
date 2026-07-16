import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User, Address } from '@/types'
import { apiFetch, setTokens, clearTokens } from '@/utils/api'

// Fallback mock addresses for development/UX demonstration
const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr1',
    label: 'Home',
    street: '123 Main St',
    city: 'London',
    state: 'Greater London',
    zipCode: 'SW1A 1AA',
    country: 'United Kingdom',
    isDefault: true,
  },
  {
    id: 'addr2',
    label: 'Work',
    street: '456 Business Ave',
    city: 'London',
    state: 'Greater London',
    zipCode: 'EC1A 1BB',
    country: 'United Kingdom',
    isDefault: false,
  },
]

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })
      const { user, tokens } = response.data
      setTokens(tokens.accessToken, tokens.refreshToken)
      return user
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userData: { name: string; email: string; password: string; postcode?: string; dietaryPreferences?: string[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      })
      const { user, tokens } = response.data
      setTokens(tokens.accessToken, tokens.refreshToken)
      return user
    } catch (err: any) {
      return rejectWithValue(err.message || 'Registration failed')
    }
  }
)

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiFetch('/users/profile')
      return response.data
    } catch (err: any) {
      clearTokens()
      return rejectWithValue(err.message || 'Failed to fetch user')
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' })
    } catch {
      // Ignore network error on logout and proceed with local cleanup
    } finally {
      clearTokens()
    }
  }
)

export const updateDietaryPreferences = createAsyncThunk(
  'auth/updateDietaryPreferences',
  async (dietaryPreferences: string[], { rejectWithValue }) => {
    try {
      const response = await apiFetch('/users/preferences', {
        method: 'PATCH',
        body: JSON.stringify({ dietaryPreferences }),
      })
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update preferences')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = {
        ...action.payload,
        addresses: action.payload.addresses?.length ? action.payload.addresses : DEFAULT_ADDRESSES,
      }
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      clearTokens()
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = {
        ...action.payload,
        addresses: action.payload.addresses?.length ? action.payload.addresses : DEFAULT_ADDRESSES,
      }
      state.isAuthenticated = true
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = {
        ...action.payload,
        addresses: action.payload.addresses?.length ? action.payload.addresses : DEFAULT_ADDRESSES,
      }
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })

    // registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = {
        ...action.payload,
        addresses: action.payload.addresses?.length ? action.payload.addresses : DEFAULT_ADDRESSES,
      }
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })

    // fetchCurrentUser
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = {
        ...action.payload,
        addresses: action.payload.addresses?.length ? action.payload.addresses : DEFAULT_ADDRESSES,
      }
    })
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.user = null
    })

    // logoutUser
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    })

    // updateDietaryPreferences
    builder.addCase(updateDietaryPreferences.fulfilled, (state, action) => {
      if (state.user) {
        state.user.dietaryPreferences = action.payload.dietaryPreferences
      }
    })
  },
})

export const { loginSuccess, logout, registerSuccess } = authSlice.actions
export default authSlice.reducer
