import CommentBox from "./CommentBox";
import LoadingSpinner from "../LoadingSpinner";
import { CommentType, selectorStateType } from "../../types/types";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

type NewCommentProps = {
    threadId: number;
    setOriginalComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

const NewComment = (props: NewCommentProps) => {
    const [comment, setComment] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [newCommentState, setNewCommentState] = useState<boolean>(false);
    const authInfo = useSelector((state: selectorStateType) => state.auth);
    const isLoggedIn = useSelector((state: selectorStateType) => state.auth.isLoggedIn);

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setNewCommentState(false);
        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/create/comment`,
                {
                    comment,
                    threadId: props.threadId,
                },
                { headers: { Authorization: `Bearer ${authInfo.access_token}` }, withCredentials: true },
            );
            toast.success(res.data.message);
            props.setOriginalComments((prevState) => [res.data.data, ...prevState]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    if (!isLoggedIn) {
        return;
    }

    if (loading) {
        return <LoadingSpinner height="100%" />;
    }

    if (!newCommentState) {
        return (
            <Typography
                sx={{
                    mb: 1,
                    ml: "3.5rem",
                    cursor: "pointer",
                    color: "#949494",
                    transition: "0.3s",
                    ":hover": { color: "#5A5A5A" },
                }}
                onClick={() => setNewCommentState(true)}
            >
                Comment
            </Typography>
        );
    }

    return <CommentBox submitHandler={submitHandler} setDisplay={setNewCommentState} setComment={setComment} />;
};

export default NewComment;
