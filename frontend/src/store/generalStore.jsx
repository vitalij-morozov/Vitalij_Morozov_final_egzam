import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    baseURL: 'http://localhost:4000',
    user: null,
    filterSettings: null,
    users: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setFilterSettings: (state, action) => {
      state.filterSettings = action.payload;
    },
  },
});

export const { setUser, setUsers, setFilterSettings } = generalSlice.actions;

export default generalSlice.reducer;
