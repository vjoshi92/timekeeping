import React, { lazy } from "react";
import AddRowsScreen from "./views/AddTimeSheet/AddTimesheetScreen";

import PendingApprovals from "views/managerScreen/PendingApprovals";
import TimesheetsGrid from "views/managerScreen/TimesheetsGrid";
import ReviewScreen from "views/managerScreen/ReviewScreen";
import Refresh from "components/Refresh";
import PageInProgress from "components/PageInprogress";
import MessagePage from "views/common/MessagePage";

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
    path: "/Review/:isReviewer/:pernr?/:start?/:stop?/:week?/:type?",
    component: <ReviewScreen />,
    key: "ReviewScreen",
  },
  {
    path: "/refresh",
    component: <Refresh />,
    key: "Refresh",
  },
  {
    path: "/pageInprogress",
    component: <PageInProgress />,
    key: "pageInprogress",
  },
  {
    path: "/messagePage/:code?",
    component: <MessagePage />,
    key: "MessagePage",
  },
];

export default NavigationRoutes;
