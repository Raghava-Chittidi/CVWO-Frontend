import ThreadHeader from "./ThreadHeader";
import { ThreadType } from "../../types/types";
import NewComment from "../Comment/NewComment";
import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { purple } from "@mui/material/colors";
import ForumIcon from "@mui/icons-material/Forum";

const ThreadPost = ({ thread }: { thread: ThreadType }) => {
    if (!thread) {
        return (
            <Box
                sx={{
                    height: "93vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ForumIcon sx={{ color: "lightgray", fontSize: 100, mr: 2 }} />
                <Typography variant="h3">Select a thread!</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "70%",
                m: "auto",
                mt: 2,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                <Typography variant="h4" sx={{ maxWidth: "80%" }}>
                    {thread.title}
                </Typography>
                <Typography variant="h6" color={purple[700]}>
                    {thread.category.name}
                </Typography>
            </Box>
            <ThreadHeader username={thread.user.username} date={thread.CreatedAt} />
            <img style={{ maxWidth: "100%" }} src={thread.imageUrl} alt={thread.title} />
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", mt: 2 }}>
                {thread.content}
            </Typography>
            <NewComment />
        </Box>
    );
};

export default ThreadPost;
