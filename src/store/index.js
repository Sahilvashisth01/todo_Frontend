import { createSlice, configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: '', isLoggedIn: false },
  reducers: {
    login(state, action) {
      state.user = action.payload.user; // Store username or email
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = ''; // Clear user data
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
