// middleware/inactivityMiddleware.js

import { logout, showIdleLogoutDialog } from "./slice/authSlice";
const FIRST_WARNING_TIME = 20000; //24 * 60 * 1000;
const FINAL_LOGOUT_DELAY = 10000; //1 * 60 * 1000;

let warningTimer;
let logoutTimer;
let dispatchRef;

const resetInactivityTimer = () => {
  if (dispatchRef) {
    clearTimeout(warningTimer);
    clearTimeout(logoutTimer);

    warningTimer = setTimeout(() => {
      dispatchRef(showIdleLogoutDialog());

      logoutTimer = setTimeout(() => {
        dispatchRef(logout());
      }, FINAL_LOGOUT_DELAY);
    }, FIRST_WARNING_TIME);
  }
};

const inactivityMiddleware = (storeAPI) => (next) => (action) => {
  dispatchRef = storeAPI.dispatch;

  const isApiCall =
    action.type.endsWith('/pending') ||
    action.type.endsWith('/fulfilled') ||
    action.type.endsWith('/rejected');

  if (isApiCall) {
    resetInactivityTimer();
  }

  return next(action);
};

export { resetInactivityTimer };
export default inactivityMiddleware;
