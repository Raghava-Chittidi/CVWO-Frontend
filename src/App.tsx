import Home from "./pages/Home";
import Layout, { layoutLoader } from "./pages/Layout";
import NewThread from "./pages/NewThread";
import Thread from "./pages/Thread";
import EditThread from "./pages/EditThread";
import Auth from "./pages/Auth";
import Redirect from "./components/Redirect";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Auth />,
    },
    {
        path: "/threads",
        element: <Layout />,
        loader: layoutLoader,
        children: [
            {
                path: "/threads",
                element: <Home />,
            },
            {
                path: "/threads/create",
                element: <NewThread />,
            },
            {
                path: "/threads/:threadId",
                element: <Thread />,
            },
            {
                path: "/threads/edit/:threadId",
                element: <EditThread />,
            },
        ],
    },
    {
        path: "*",
        element: <Redirect />,
    },
]);

{
    /* <BrowserRouter>
    <Routes>
        <Route path="/">
            <Route path="/login" element={<Auth />} />
            <Route path="/threads" loader={useFetchData("/categories").data} element={<Layout />}>
                <Route path="/threads" element={<Home />} />
                <Route path="/threads/create" element={<NewThread />} />
                <Route path="/threads/:threadId" element={<Thread />} />
            </Route>
            <Route path="*" element={<Redirect />} />
        </Route>
    </Routes>
</BrowserRouter>; */
}

const App: React.FC = () => {
    return (
        <div className="App" style={{ width: "100vw", maxHeight: "100vh", overflow: "hidden" }}>
            <Provider store={store}>
                <ThemeProvider theme={theme} />
                <RouterProvider router={router} />
            </Provider>
        </div>
    );
};

export default App;
