import ThreadPost from "./ThreadPost";
import { selectorStateType } from "../../types/types";
import CommentList from "../Comment/CommentList";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import React from "react";

const defaultTheme = createTheme();

const Thread = () => {
    const thread = useSelector((state: selectorStateType) => state.thread.currentThread);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <ThreadPost thread={thread} />
                {thread && thread.comments && <CommentList comments={thread.comments} />}
            </Container>
        </ThemeProvider>
    );
};

export default Thread;
