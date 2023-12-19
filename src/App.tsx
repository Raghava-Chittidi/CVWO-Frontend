import Home from "./pages/Home";
import Auth from "./pages/Auth";

import store from "./store";
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
        <div className="App" style={{ width: "100vw", maxHeight: "100vh", overflow: "hidden" }}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>
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
