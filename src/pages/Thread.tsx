import ThreadPost from "../components/Thread/ThreadPost";
import useFetchData from "../hooks/useFetchData";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const defaultTheme = createTheme();

const Thread = () => {
    // const { threads } = useOutletContext<{ threads: ThreadType[] }>();
    const { threadId } = useParams();
    // const thread = threads.find((t) => t.ID === parseInt(threadId!))!;
    const { loading, data: thread } = useFetchData(`/threads/${threadId}`);

    if (loading || !thread) {
        return <LoadingSpinner height="100%" />;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <ThreadPost thread={thread} />
            </Container>
        </ThemeProvider>
    );
};

export default Thread;
