import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"

import store from "./redux/store"
import App from './App'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='212110353632-utk6ev42j4ae9odkpmur4otl9kk4hk58.apps.googleusercontent.com'>
    <React.StrictMode>
    <Provider store={store}>
      <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)