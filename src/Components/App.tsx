import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import Router from "./Router";
import GlobalStyles from "./Globalstyles";

function App() {
  return (
    <>
      <Router></Router>
      <GlobalStyles />
    </>
  );
}

export default App;
