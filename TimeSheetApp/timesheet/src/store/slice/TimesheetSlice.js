import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectData: [],
  total: {},
  approvalCount: 0,
  notes: [
    {
      id: 1,
      content: "Discuss project deadlines and deliverables.",
      date: "10 Jan 2025",
      time: "05:30:00",
      username: "Jon doe",
    },
    {
      id: 2,
      content: "Complete the UI design for the dashboard.",
      date: "10 Jan 2025",
      time: "10:12:00",
      username: "Paul heyman",
    },
  ],
  status: "New",
};

const createFormSlice = createSlice({
  name: "CreateForm",
  initialState: initialState,
  reducers: {
    setProjectData: (state, action) => {
      state.projectData = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    deleteProjectDataById: (state, action) => {
      state.projectData = state.projectData.filter(
        (item) => item.id !== action.payload
      );
      // Clean up the total for deleted row
      delete state.totals[action.payload];
    },
    updateRow: (state, action) => {
      state.projectData[action.payload.rowIndex] = action.payload.rowObj;
    },
    updateRowTotal: (state, action) => {
      const { rowId, field, value } = action.payload;
      if (!state.totals[rowId]) {
        state.totals[rowId] = {
          total: 0,
          values: {},
        };
      }

      // Subtract old value if it exists
      if (state.totals[rowId].values[field]) {
        state.totals[rowId].total -= state.totals[rowId].values[field];
      }

      // Add new value
      state.totals[rowId].values[field] = value;
      state.totals[rowId].total = Object.values(
        state.totals[rowId].values
      ).reduce((sum, curr) => sum + curr, 0);
    },
    addNotes: (state, action) => {
      state.notes.push(action.payload);
    },
    setApprovalCount: (state, action) => {
      state.approvalCount = action.payload;
    }
  },
});

export const {
  setProjectData,
  deleteProjectDataById,
  updateRowTotal,
  updateRow,
  addNotes,
  setStatus,
  setApprovalCount
} = createFormSlice.actions;

export default createFormSlice.reducer;
