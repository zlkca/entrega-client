import React from "react";
import { RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import { Router } from "./routes";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={Router} />
    </LocalizationProvider>
  );
}
export default App;
