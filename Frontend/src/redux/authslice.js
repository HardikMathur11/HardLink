import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../axios'
export const login = createAsyncThunk(
    'auth/login', async (Credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', Credentials)
            return response.data
        }
        catch (err) {
            return rejectWithValue(err.response?.data?.message || "Login failed")
        }
    }
)

export const registerUser = createAsyncThunk(
    'auth/register', async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Registration failed");
        }
    }
);

export const checkAuth = createAsyncThunk(
    'auth/checkAuth', async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (err) {
            return rejectWithValue("Session expired");
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser', async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout');
            return null;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to log out");
        }
    }
);

const initialState = {
    token: localStorage.getItem('token') || "",
    user: null,
    loading: true,
    error: null,
    successMessage: null,
    isauthenticated: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null;
            state.isauthenticated = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.userinfo;
                state.isauthenticated = true;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message || "Successfully registered! Please login.";
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.userinfo;
                state.isauthenticated = true;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isauthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
                state.isauthenticated = false;
                state.token = "";
                state.error = action.payload;
                localStorage.removeItem('token');
            });
    },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;