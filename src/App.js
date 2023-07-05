import "./App.css";
import Router from "./comp/ROUTER/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { purple } from "@mui/material/colors";
import { Box } from "@mui/material";
import image from "./comp/ASSETS/map.jpg";
import image1 from "./comp/ASSETS/planingTravel.jpg";
import image2 from "./comp/ASSETS/planingTravel.jpg";
import image3 from "./comp/ASSETS/planingTravel1.jpg";

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
    },
    text: {
      primary: "#09195c",
    },
  },
});
function App() {
  return (
    <Provider store={store1}>
      {/* <CacheProvider value={cacheRtl}> */}
      <ThemeProvider theme={theme}>
        <Box
          //  style={{ backgroundColor: "green" }}
          // style={{ backgroundColor: "green", height: "1000px", width: "100%" }}

          style={{
            // backgroundColor: "green",
            // height: "650px",
            // width: "100%",
            // backgroundImage: `url(${image})`,
            // backgroundRepeat: "no-repeat",
            // backgroundSize: 'cover',
            // opacity: 0.6
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',

            // background: "rgba(0, 0, 0, 0.5)",
            backgroundImage: `url(${image3})`,
            // opacity: 0.5,
            height: "100vh",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",

            // opacity:0.2,
          }}
        >
          <Router />
        </Box>
      </ThemeProvider>
      {/* </CacheProvider> */}
    </Provider>
  );
}

export default App;
