import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Items from "./pages/Items/ItemsPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          padding: 0,
          background: "#1EA4CE",
        },
        text: {
          background: "#F2F0FD",
          color: "#1EA4CE",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#1EA4CE",
    },
    text: {
      primary: "#525252",
      secondary: "#525252",
    },
  },
  typography: {
    fontFamily: "Open-sans",
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Items />
    </ThemeProvider>
  );
}

export default App;
