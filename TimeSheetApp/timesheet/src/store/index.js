import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import HomeSlice from './slice/HomeSlice';
import CreateFormSlice from './slice/TimesheetSlice';
import { TimesheetApi } from 'api/timesheetApi';
import { TimesheetDashboardApi } from 'api/timesheetDashboardApi';


const reducer = combineReducers({
  home: HomeSlice,
  CreateForm: CreateFormSlice,
  [TimesheetApi.reducerPath]: TimesheetApi.reducer,
  [TimesheetDashboardApi.reducerPath]: TimesheetDashboardApi.reducer
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(TimesheetApi.middleware)
      .concat(TimesheetDashboardApi.middleware)
});
export default store;
