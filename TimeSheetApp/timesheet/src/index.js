import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import BusyLoader from './components/BusyLoader';
import NavigationRoutes from './NavigationRoutes';
import store from './store';
import Header from './views/common/Header';
import Theme from './theme/Theme';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<BusyLoader open={true} />}>
      <Provider store={store}>
        {/* <I18nextProvider i18n={i18nInstance}> */}
        <ThemeProvider theme={Theme}>
          <Router>
            <Routes>
              {NavigationRoutes.map((r) => (
                <Route
                  key={r.key}
                  path={r.path}
                  element={
                    <>
                      <Header key={r.key} />
                      {r.component}
                    </>
                  }
                />
              ))}
            </Routes>
            {/* <IdleTimerComponent /> */}
          </Router>
        </ThemeProvider>
        {/* </I18nextProvider> */}
      </Provider>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
