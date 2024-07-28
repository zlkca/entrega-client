import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/store";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="178048135284-8arqadts267j6qs9bm15jaab8p6m6do6.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
