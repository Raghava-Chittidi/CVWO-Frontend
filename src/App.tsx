import Home from "./pages/Home";
import BasicThreadView from "./pages/BasicThreadView";
import StyledThreadView from "./pages/StyledThreadView";
import Auth from "./pages/Auth";

import "./App.css";
import store from "./store";
import ResponsiveAppBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";
import { Provider } from "react-redux";
import React from "react";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const App: React.FC = () => {
    return (
        <div className="App">
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <ResponsiveAppBar />
                        <Routes>
                            <Route path="/thread/1" element={<BasicThreadView />} />
                            <Route path="/thread/1/styled" element={<StyledThreadView />} />
                            <Route path="/login" element={<Auth />} />
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </Provider>
        </div>
    );
};

export default App;
