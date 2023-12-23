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

const initialAuthState: authInfo = {
    access_token: "",
    refresh_token: "",
    userData: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
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

export type threadSearch = {
    filter: string;
    searchInput: string;
};

const initialSearchState: threadSearch = {
    filter: "All",
    searchInput: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState: initialSearchState,
    reducers: {
        setFilter(state, action) {
            return { ...state, filter: action.payload.filter };
        },
        setSearchInput(state, action) {
            return { ...state, searchInput: action.payload.searchInput };
        },
        reset() {
            return initialSearchState;
        },
    },
});

const store = configureStore({
    reducer: { auth: authSlice.reducer, search: searchSlice.reducer },
});

export const authActions = authSlice.actions;
export const searchActions = searchSlice.actions;
// export const threadActions = threadSlice.actions;

export default store;
