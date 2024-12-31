import React, { lazy } from "react";
import AddRowsScreen from "./views/AddTimeSheet/AddTimesheetScreen";

import PendingApprovals from "views/managerScreen/PendingApprovals";
import TimesheetsGrid from "views/managerScreen/TimesheetsGrid";
import ReviewScreen from "views/managerScreen/ReviewScreen";

const Home = lazy(() => import("./views/home"));

const NavigationRoutes = [
  {
    path: "/",
    component: <Home />,
    key: "/",
  },
  {
    path: "/home",
    component: <Home />,
    key: "home",
  },
  {
    path: "/addRows",
    component: <AddRowsScreen />,
    key: "addRows",
  },
  {
    path: "/pendingApprovals",
    component: <PendingApprovals />,
    key: "PendingApprovals",
  },

  {
    path: "/AllTimesheet/:isManager",
    component: <TimesheetsGrid />,
    key: "AllTimesheet",
  },
  {
    path: "/Review",
    component: <ReviewScreen />,
    key: "ReviewScreen",
  },
  // {
  //   path: "/ViewersDashboard",
  //   component: <ViewersDashboard />,
  //   key: "ViewersDashboard",
  // },
];

export default NavigationRoutes;
