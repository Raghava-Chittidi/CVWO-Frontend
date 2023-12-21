import { createSlice, configureStore } from "@reduxjs/toolkit";

export type authInfo = {
    access_token: string;
    refresh_token: string;
    userData: {
        email: string;
        username: string;
    } | null;
    isLoggedIn: boolean;
};

const initialState: authInfo = {
    access_token: "",
    refresh_token: "",
    userData: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            const { tokenPair, userData } = action.payload;
            // localStorage.setItem("token", token);
            // localStorage.setItem("userData", JSON.stringify(userData));
            state.access_token = tokenPair.access_token;
            state.refresh_token = tokenPair.refresh_token;
            state.isLoggedIn = !!tokenPair.access_token;
            state.userData = userData;
        },
        logout(state) {
            // localStorage.clear();
            state.access_token = "";
            state.refresh_token = "";
            state.isLoggedIn = false;
            state.userData = null;
        },
    },
});

const threadSlice = createSlice({
    name: "thread",
    initialState: { currentThread: null },
    reducers: {
        setCurrent(state, action) {
            state.currentThread = action.payload.currentThread;
        },
    },
});

const store = configureStore({
    reducer: { auth: authSlice.reducer, thread: threadSlice.reducer },
});

export const authActions = authSlice.actions;
export const threadActions = threadSlice.actions;

export default store;
