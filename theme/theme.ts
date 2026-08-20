"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(128 153 255)", // primary-600
      light: "rgb(183 197 255)", // primary-300
      dark: "rgb(74 109 255)", // primary-900
      contrastText: "#ffffff",
    },

    secondary: {
      main: "rgb(106 108 135)", // secondary-600
      light: "rgb(170 171 186)", // secondary-300
      dark: "rgb(42 45 83)", // secondary-900
      contrastText: "#ffffff",
    },

    text: {
      primary: "rgb(42 45 83)", // secondary-900
      secondary: "rgb(106 108 135)", // secondary-600
      disabled: "rgb(148 150 169)", // secondary-400
    },

    success: {
      main: "rgb(0 192 115)",
    },

    warning: {
      main: "rgb(255 153 0)",
    },

    error: {
      main: "rgb(255 71 87)",
    },

    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: "var(--font-vazir)",
  },
});

export default theme;
