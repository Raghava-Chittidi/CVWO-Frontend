import TextArea from "../TextArea";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { Avatar, Button, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const NewComment = () => {
    const [newComment, setNewComment] = useState(false);

    if (!newComment) {
        return (
            <Typography
                sx={{ marginTop: "1rem", cursor: "pointer", color: "gray", ":hover": { textDecoration: "underline" } }}
                onClick={() => setNewComment(true)}
            >
                Comment
            </Typography>
        );
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginTop: "1rem",
                }}
            >
                <Avatar sx={{ bgcolor: red[500], width: 50, height: 50, fontSize: 25, mr: 1 }}>R</Avatar>
                <TextArea minHeight="8rem" maxHeight="12rem" placeholder="Your comment" />
            </Box>
            <Box sx={{ float: "right", mt: 1 }}>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ textTransform: "none", mr: 2 }}
                    onClick={() => setNewComment(false)}
                >
                    Cancel
                </Button>
                <Button variant="outlined" color="success" sx={{ textTransform: "none" }}>
                    Post
                </Button>
            </Box>
        </Box>
    );
};

export default NewComment;
