import TextArea from "../TextArea";
import { selectorStateType } from "../../types/types";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { Avatar, Button, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";

const NewComment = () => {
    const [comment, setComment] = useState("");
    const [newCommentState, setNewCommentState] = useState(false);
    const username = useSelector((state: selectorStateType) => state.auth.userData?.username);
    const thread = useSelector((state: selectorStateType) => state.thread.currentThread);

    const blurHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setNewCommentState(false);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/createComment`,
                {
                    comment,
                    username,
                    threadId: thread.ID,
                },
                { withCredentials: true },
            );
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!newCommentState) {
        return (
            <Typography
                sx={{ marginTop: "1rem", cursor: "pointer", color: "gray", ":hover": { textDecoration: "underline" } }}
                onClick={() => setNewCommentState(true)}
            >
                Comment
            </Typography>
        );
    }

    return (
        <Box sx={{ width: "100%" }} component="form">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginTop: "1rem",
                }}
            >
                <Avatar sx={{ bgcolor: red[500], width: 50, height: 50, fontSize: 25, mr: 1 }}>R</Avatar>
                <TextArea minHeight="8rem" maxHeight="12rem" placeholder="Your comment" blurHandler={blurHandler} />
            </Box>
            <Box sx={{ float: "right", mt: 1 }}>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ textTransform: "none", mr: 2 }}
                    onClick={() => setNewCommentState(false)}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="outlined"
                    color="success"
                    sx={{ textTransform: "none" }}
                    onClick={submitHandler}
                >
                    Post
                </Button>
            </Box>
        </Box>
    );
};

export default NewComment;
