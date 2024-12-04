import { createSlice } from '@reduxjs/toolkit';

/**
 * Home Slice of the Redux Store
 */
export const HomeSlice = createSlice({
  name: 'home',
  initialState: {
    userFilter: 'All',
    plant: '',
    selectedKpi: null,
    refresh: false,
    searchNotifList: [],
    firstSearchRecord: 0,
    userDetails: [],
    selectedCards: null,
    daterange: [] // This is where the date range should be stored
  },
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: 123,
        text: action.payload,
      };
      state.push(todo);
    },
    setUserFilter: (state, action) => {
      state.userFilter = action.payload.userFilter;
    },
    setPlant: (state, action) => {
      state.plant = action.payload;
    },
    setSelectedKpi: (state, action) => {
      state.selectedKpi = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setSelectedCards: (state, action) => {
      state.selectedCards = action.payload;
    },
    setDateRange: (state, action) => {
      // Update the correct field, which is daterange
      state.daterange = action.payload;
    },
  },
});

// This is for dispatch
export const { addTodo, setPlant, setSelectedKpi, setRefresh, setUserDetails, setSelectedCards, setDateRange } = HomeSlice.actions;

// This is for configureStore
export default HomeSlice.reducer;
