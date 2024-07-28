import React, { useState, useEffect } from "react";
import { Router } from "./routes";
import { RouterProvider } from "react-router-dom";
import "./App.css";
// import axios from 'axios';
// const axios = require('axios');
function App() {
  return (
      <RouterProvider router={Router} />
  )
}
export default App;
