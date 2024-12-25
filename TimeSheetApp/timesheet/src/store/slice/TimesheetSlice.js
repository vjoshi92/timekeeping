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
  }
});

export const { setProjectData } = createFormSlice.actions;
export default createFormSlice.reducer;