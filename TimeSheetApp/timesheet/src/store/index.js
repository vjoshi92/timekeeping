import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import HomeSlice from './slice/HomeSlice';
import CreateFormSlice from './slice/TimesheetSlice';
import { TimesheetApi } from 'api/timesheetApi';

const reducer = combineReducers({
  home: HomeSlice,
  CreateForm: CreateFormSlice,
  [TimesheetApi.reducerPath] : TimesheetApi.reducer
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
    .concat(TimesheetApi.middleware)
});
export default store;
