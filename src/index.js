import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import { I18nextProvider } from "react-i18next";
import i18n from "./localization/i18n";

import store from "./redux/store"
import App from './App'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google"
import { googleClientId } from './config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)