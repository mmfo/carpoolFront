import "./App.css";
import Router from "./comp/ROUTER/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import { Provider } from "react-redux";

import createCache from "@emotion/cache";
import store1 from "./comp/REDUX/store";
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#09195c",
      mainLight: "#09195c14",
    },
    secondary: {
      main: "#5876EE",
    },
    case: {
      yellow: "#f9dd00",
      purple: "#af4fa4",
      green: "#81c853",
      orange: "#fd6308",
    },
  },
});
function App() {
  return (
    <Provider store={store1}>
      {/* <CacheProvider value={cacheRtl}> */}
        <ThemeProvider theme={theme}>
          <div className="App">
            <Router></Router>
          </div>
        </ThemeProvider>
      {/* </CacheProvider> */}
    </Provider>
  );
}

export default App;
