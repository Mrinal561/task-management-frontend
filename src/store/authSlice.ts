import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../api/endpoints';
import axios from '../util/axiosConfig';

interface AuthState {
  user: any;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(endpoints.auth.signup(), credentials);
      const loginResponse = await axios.post(endpoints.auth.signin(), credentials);
      localStorage.setItem('token', loginResponse.data.accessToken);
      return loginResponse.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred during signup');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const url = endpoints.auth.signin();
      console.log('Login URL:', url);
      console.log('Credentials:', credentials);
      const response = await axios.post(url, credentials);
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response || error);
      return rejectWithValue(error.response?.data?.message || 'An error occurred during login');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.error('SignUp error:', action.payload);
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.error('Login error:', action.payload);
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;