import CommentBox from "./CommentBox";
import { selectorStateType } from "../../types/types";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";

const NewComment = ({ threadId }: { threadId: number }) => {
    const [comment, setComment] = useState("");
    const [newCommentState, setNewCommentState] = useState(false);
    const username = useSelector((state: selectorStateType) => state.auth.userData?.username);

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setNewCommentState(false);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/createComment`,
                {
                    comment,
                    username,
                    threadId,
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

    return <CommentBox submitHandler={submitHandler} setDisplay={setNewCommentState} setComment={setComment} />;
};

export default NewComment;
