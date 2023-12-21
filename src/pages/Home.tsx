import ThreadItemList from "../components/ThreadItem/ThreadItemList";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import Filter from "../components/Filter";
import NewThread from "../components/Thread/NewThread";
import NavBar from "../components/NavBar";
import Thread from "../components/Thread/Thread";
import { ThreadType } from "../types/types";
import useAuthorise from "../hooks/useAuthorise";
import useFetchData from "../hooks/useFetchData";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";

const Home: React.FC = () => {
    const loading1 = useAuthorise();
    const { loading: loading2, data: categories } = useFetchData("/categories");
    const { loading: loading3, data: threads } = useFetchData("/threads");
    const [createThread, setCreateThread] = useState<boolean>(false);
    const [filteredItems, setFilteredItems] = useState<ThreadType[]>(threads);
    const [searchItems, setSearchItems] = useState<ThreadType[]>(filteredItems);
    const [placeholder, setPlaceholder] = useState<string>("All");

    // console.log(threads);

    useEffect(() => {
        setFilteredItems(threads);
        setSearchItems(threads);
    }, [threads]);

    if (loading1 || loading2 || loading3 || !filteredItems) {
        return <LoadingSpinner />;
    }

    const filterHandler = (filter: string) => {
        setPlaceholder(filter);
        if (filter === "All") {
            setFilteredItems(threads);
            setSearchItems(threads);
        } else {
            const finalThreads = threads.filter((threadItem: ThreadType) => threadItem.category.name === filter);
            setFilteredItems(finalThreads);
            setSearchItems(finalThreads);
        }
    };

    const searchHandler = (searchInput: string) => {
        setSearchItems(
            filteredItems.filter((threadItem: ThreadType) =>
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
                    <Box sx={{ display: "flex", alignItems: "center", border: 1, borderColor: "lightgray" }}>
                        <SearchBar searchHandler={searchHandler} placeholder={placeholder} />
                        <Filter categories={["All", ...categories]} filterHandler={filterHandler} />
                    </Box>
                    <ThreadItemList threadItems={searchItems} setCreateThread={setCreateThread} />
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
