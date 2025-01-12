import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectData: [],
  total: null,
};

const createFormSlice = createSlice({
  name: 'CreateForm',
  initialState: {
    projectData: [],
    totals: {}, // Store totals for each row
  },
  reducers: {
    setProjectData: (state, action) => {
      state.projectData = action.payload;
    },
    deleteProjectDataById: (state, action) => {
      state.projectData = state.projectData.filter(item => item.id !== action.payload);
      // Clean up the total for deleted row
      delete state.totals[action.payload];
    },
    updateRow: (state,action) => {
      state.projectData[action.payload.rowIndex] = action.payload.rowObj;
    },
    updateRowTotal: (state, action) => {
      const { rowId, field, value } = action.payload;
      if (!state.totals[rowId]) {
        state.totals[rowId] = {
          total: 0,
          values: {}
        };
      }

      // Subtract old value if it exists
      if (state.totals[rowId].values[field]) {
        state.totals[rowId].total -= state.totals[rowId].values[field];
      }

      // Add new value
      state.totals[rowId].values[field] = value;
      state.totals[rowId].total = Object.values(state.totals[rowId].values).reduce((sum, curr) => sum + curr, 0);
    }
  }
});

export const { setProjectData, deleteProjectDataById, updateRowTotal, updateRow } = createFormSlice.actions;

export default createFormSlice.reducer;