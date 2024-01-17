import ThreadPost from "../components/Thread/ThreadPost";
import useFetchData from "../hooks/useFetchData";
import LoadingSpinner from "../components/LoadingSpinner";
import { ThreadType } from "../types/types";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

const Thread = () => {
    const { threadId } = useParams();
    const { setThreads } = useOutletContext<{ setThreads: React.Dispatch<React.SetStateAction<ThreadType[]>> }>();
    const { error, loading, data: thread } = useFetchData(`/threads/${threadId}`);
    const navigate = useNavigate();

    useEffect(() => {
        // If Thread ID doesnt exist
        if (error) {
            navigate("/threads");
            toast.error("Thread not found!");
        }
    }, [error]);

    if (loading || !thread) {
        return <LoadingSpinner height="100%" />;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <ThreadPost thread={thread} setThreads={setThreads} />
            </Container>
        </ThemeProvider>
    );
};

export default Thread;
