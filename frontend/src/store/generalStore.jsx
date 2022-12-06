import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    baseURL: 'http://localhost:4000',
    user: null,
    filterSettings: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFilterSettings: (state, action) => {
      state.filterSettings = action.payload;
    },
  },
});

export const { setUser, setFilterSettings } = generalSlice.actions;

export default generalSlice.reducer;
