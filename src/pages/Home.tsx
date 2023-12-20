import ThreadItemList from "../components/ThreadItem/ThreadItemList";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import NewThread from "../components/Thread/NewThread";
import NavBar from "../components/NavBar";
import Thread from "../components/Thread/Thread";
import { ThreadType } from "../types/types";
import useAuthorise from "../hooks/useAuthorise";
import useFetchData from "../hooks/useFetchData";
import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";

const Home: React.FC = () => {
    const loading1 = useAuthorise();
    const { loading: loading2, data: categories } = useFetchData("/categories");
    const { loading: loading3, data: threads } = useFetchData("/threads");
    const [createThread, setCreateThread] = useState<boolean>(false);
    const [threadItems, setThreadItems] = useState<ThreadType[]>(threads);

    console.log(threads);

    useEffect(() => {
        setThreadItems(threads);
    }, [threads]);

    if (loading1 || loading2 || loading3 || !threadItems) {
        return <LoadingSpinner />;
    }

    const searchHandler = (searchInput: string) => {
        setThreadItems(
            threads.filter((threadItem: ThreadType) =>
                threadItem.title.toLowerCase().includes(searchInput.toLowerCase()),
            ),
        );
    };

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
                    <SearchBar searchHandler={searchHandler} categories={["All", ...categories]} />
                    <ThreadItemList threadItems={threadItems} setCreateThread={setCreateThread} />
                </Grid>

                <Grid item xs={9} sx={{ overflowY: "scroll", maxHeight: "93vh" }}>
                    {createThread ? (
                        <NewThread setCreateThread={setCreateThread} categories={categories} />
                    ) : (
                        <Thread />
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
