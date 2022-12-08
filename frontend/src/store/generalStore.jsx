import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    baseURL: 'http://localhost:4000',
    user: null,
    filterSettings: null,
    users: [],
    userLikes: [],
    userMatches: [],
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
    setUserLikes: (state, action) => {
      state.userLikes = action.payload;
    },
    setUserMatches: (state, action) => {
      state.userMatches = action.payload;
    },
  },
});

export const { setUser, setUsers, setFilterSettings, setUserLikes, setUserMatches } = generalSlice.actions;

export default generalSlice.reducer;
