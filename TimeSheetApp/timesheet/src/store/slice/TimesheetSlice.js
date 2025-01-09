import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectData: []
};

const createFormSlice = createSlice({
  name: 'CreateForm',
  initialState,
  reducers: {
    setProjectData: (state, action) => {
      state.projectData = action.payload;
    },
    deleteProjectDataById: (state, action) => {
      state.projectData = state.projectData.filter(item => item.id !== action.payload);
    },
  }
});

export const { setProjectData, deleteProjectDataById } = createFormSlice.actions;
export default createFormSlice.reducer;