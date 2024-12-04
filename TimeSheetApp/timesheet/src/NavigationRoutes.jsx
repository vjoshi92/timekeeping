import React, { lazy } from "react";
import CustomDataTable from "./components/CustomDataTable";
import AddRowsScreen from "./views/AddRows/AddRowsScreen";
import ApproverDashboard from "views/Approver/ApproverDashboard";
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
    path: "/approver",
    component: <ApproverDashboard />,
    key: "createform",
  },
  {
    path: "/pendingApprovals",
    component: <PendingApprovals />,
    key: "pendingApprovals",
  },

  {
    path: "/AllTimesheet",
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
