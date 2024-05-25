import { createSlice } from "@reduxjs/toolkit";
// import { uiThunkReducers } from './ui.thunk.js'

export const initialUIState = {
  darkMode: false,
  layout: 'page',
  language: "en",
  snackbar: { title: "", content: "", datetime: "", open: false },
  dialog: { open: false },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setSnackbar: (state, action) => {
      state.snackbar = action.payload;
    },
    setDialog: (state, action) => {
      state.dialog = action.payload;
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const {
  setLayout,
  setDarkMode,
  setLanguage,
  setSnackbar,
  setDialog,
} = uiSlice.actions;

export default uiSlice.reducer;
