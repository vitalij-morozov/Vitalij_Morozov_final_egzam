import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    baseURL: 'http://localhost:4000',
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = generalSlice.actions;

export default generalSlice.reducer;
