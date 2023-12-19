import ThreadPost from "./ThreadPost";
import CommentList from "../Comment/CommentList";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const defaultTheme = createTheme();

const Thread = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <ThreadPost />
                <CommentList />
            </Container>
        </ThemeProvider>
    );
};

export default Thread;
