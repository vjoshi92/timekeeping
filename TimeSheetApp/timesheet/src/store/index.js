import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import HomeSlice from './slice/HomeSlice';
import CreateFormSlice from './slice/TimesheetSlice';


const reducer = combineReducers({
  home: HomeSlice,
  CreateForm: CreateFormSlice,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
});
export default store;
