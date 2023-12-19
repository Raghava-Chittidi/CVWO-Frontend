import ThreadItemList from "../components/ThreadItem/ThreadItemList";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import NewThread from "../components/Thread/NewThread";
import NavBar from "../components/NavBar";
import Thread from "../components/Thread/Thread";
import useAuthorise from "../hooks/useAuthorise";
import React, { useState } from "react";
import { Button, Grid } from "@mui/material";

const threadTitles = [
    "Inbox",
    "Drafts",
    "Trash",
    "Spam",
    "Inbox",
    "Drafts",
    "Trash",
    "Spam",
    "Inbox",
    "Drafts",
    "Trash",
    "Spam",
    "Inbox",
    "Drafts",
    "Trash",
];

const Home: React.FC = () => {
    const [threads, setThreads] = useState<string[]>(threadTitles);
    const [createThread, setCreateThread] = useState<boolean>(false);
    const loading = useAuthorise();

    const searchHandler = (searchInput: string) => {
        setThreads(threadTitles.filter((thread) => thread.toLowerCase().includes(searchInput.toLowerCase())));
    };

    if (loading) {
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
                        onClick={() => setCreateThread(true)}
                    >
                        Create Thread
                    </Button>
                    <SearchBar searchHandler={searchHandler} />
                    <ThreadItemList threadTitles={threads} />
                </Grid>

                <Grid item xs={9} sx={{ overflowY: "scroll", maxHeight: "93vh" }}>
                    {createThread ? <NewThread setCreateThread={setCreateThread} /> : <Thread />}
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
