import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Items from "./pages/Items/ItemsPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    fontFamily: "Open-sans",
    fontSize: 14,
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
