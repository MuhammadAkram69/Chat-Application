import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import store from "./Store";
import Signup from "./Pages/Signup/Signup";
import Signin from "./Pages/Signin/Signin";
import ChatPage from "./Pages/ChatPage/ChatPage";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/globals.scss";


const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {},
    },
  },
});

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Router>
            <Routes>
              <Route exact path="/" element={<ChatPage />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/signin" element={<Signin />} />
            </Routes>
          </Router>
        </Layout>
        <Toaster />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
