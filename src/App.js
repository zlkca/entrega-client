import React, { useState, useEffect } from 'react';
import { Router } from './routes';
import { RouterProvider } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import "./App.css"
import { LANGUAGE_COOKIE } from './const';
import Cookies from 'js-cookie';
// import axios from 'axios';
// const axios = require('axios');

function App() {
    const langCookie = Cookies.get(LANGUAGE_COOKIE);
    const { i18n } = useTranslation();

    useEffect(() => {
      if (langCookie) {
        i18n.changeLanguage(langCookie);
      }
    }, [langCookie]);
  
    return (
      
        <RouterProvider router={Router} />

    );
}
export default App;
