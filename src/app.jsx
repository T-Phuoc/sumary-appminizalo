import React from 'react';
import { createRoot } from 'react-dom/client';
import { App, ZMPRouter, SnackbarProvider } from 'zmp-ui';
import 'zmp-ui/zaui.css';
import './css/tailwind.scss';
import './css/app.scss';
import appConfig from '../app-config.json';
import { VisaTestProvider } from './context/VisaTestContext';
import VisaTest from './pages/VisaTest';

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

const MyApp = () => {
  return (
    <App>
      <SnackbarProvider>
        <VisaTestProvider>
          <ZMPRouter>
            <VisaTest />
          </ZMPRouter>
        </VisaTestProvider>
      </SnackbarProvider>
    </App>
  );
};

const root = createRoot(document.getElementById('app'));
root.render(React.createElement(MyApp));
