import { likeActions, searchActions } from "../store";
import ThreadItemList from "../components/ThreadItem/ThreadItemList";
import SearchBar from "../components/Search/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import Filter from "../components/Search/Filter";
import NavBar from "../components/NavBar";
import { ThreadType, selectorStateType } from "../types/types";
import useAuthorise from "../hooks/useAuthorise";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Layout: React.FC = () => {
    const loading = useAuthorise();
    const [categories, threads] = useLoaderData() as [string[], ThreadType[]];
    const [originalThreads, setOriginalThreads] = useState<ThreadType[]>(threads);
    const [finalThreads, setFinalThreads] = useState<ThreadType[]>(threads);
    const [placeholder, setPlaceholder] = useState<string>("All");

    const isLoggedIn = useSelector((state: selectorStateType) => state.auth.isLoggedIn);
    const username = useSelector((state: selectorStateType) => state.auth.userData?.username);
    const filter = useSelector((state: selectorStateType) => state.search.filter);
    const searchInput = useSelector((state: selectorStateType) => state.search.searchInput);

    const { threadId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setOriginalThreads(threads);
        setFinalThreads(threads);
    }, [threads]);

    useEffect(() => {
        if (originalThreads.length !== threads.length) {
            dispatch(searchActions.reset());
        }
        setFinalThreads(originalThreads);
    }, [originalThreads]);

    useEffect(() => {
        dispatch(likeActions.init({ threads: originalThreads, username }));
    }, [originalThreads, username]);

    // console.log(originalThreads);

    useEffect(() => {
        setPlaceholder(filter);
        let searchedThreads = originalThreads;
        if (searchInput !== "") {
            searchedThreads = originalThreads.filter((threadItem: ThreadType) =>
                threadItem.title.toLowerCase().includes(searchInput.toLowerCase()),
            );
        }

        if (filter === "All") {
            setFinalThreads(searchedThreads);
        } else {
            searchedThreads = searchedThreads.filter((threadItem: ThreadType) => threadItem.category.name === filter);
            setFinalThreads(searchedThreads);
        }
    }, [filter, searchInput]);

    if (loading || !originalThreads) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <NavBar />
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        sx={{
                            width: "100%",
                            backgroundColor: "purple",
                            opacity: 0.8,
                            borderRadius: 0,
                            textTransform: "none",
                            fontSize: 15,
                            ":hover": { backgroundColor: "purple", opacity: 0.9 },
                        }}
                        onClick={() => {
                            if (!isLoggedIn) {
                                navigate("/login");
                            } else {
                                navigate("/threads/create");
                            }
                        }}
                    >
                        Create Thread
                    </Button>
                    <Box sx={{ display: "flex", alignItems: "center", border: 1, borderColor: "lightgray" }}>
                        <SearchBar placeholder={placeholder} />
                        <Filter categories={["All", ...categories]} />
                    </Box>
                    <ThreadItemList selected={threadId ? +threadId : undefined} threadItems={finalThreads} />
                </Grid>

                <Grid item xs={9} sx={{ overflowY: "scroll", maxHeight: "93vh" }}>
                    <Outlet context={{ categories, setThreads: setOriginalThreads }} />
                </Grid>
            </Grid>
        </>
    );
};

export default Layout;

export const layoutLoader = async () => {
    const res1 = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}${"/categories"}`, {
        withCredentials: true,
    });
    const res2 = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}${"/threads"}`, {
        withCredentials: true,
    });
    return (await Promise.all([res1, res2])).map((res) => res.data);
};
