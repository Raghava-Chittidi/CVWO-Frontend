import CommentBox from "./CommentBox";
import { CommentType, selectorStateType } from "../../types/types";
import LoadingSpinner from "../LoadingSpinner";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

type EditCommentProps = {
    comment: CommentType;
    setComment: React.Dispatch<React.SetStateAction<CommentType>>;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditComment = (props: EditCommentProps) => {
    const [editedComment, setEditedComment] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const authInfo = useSelector((state: selectorStateType) => state.auth);

    const editCommentHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await axios.patch(
                `${process.env.REACT_APP_DOMAIN_URL}/edit/comment/${props.comment.ID}`,
                {
                    content: editedComment,
                },
                { headers: { Authorization: `Bearer ${authInfo.access_token}` }, withCredentials: true },
            );
            props.setComment({ ...props.comment, content: editedComment });
            setLoading(false);
            props.setDisplay(false);
            toast.success(res.data.message);
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.message);
        }
    };

    if (loading) {
        return (
            <Box sx={{ height: "9rem" }}>
                <LoadingSpinner height="100%" />
            </Box>
        );
    }

    return (
        <CommentBox
            initial={props.comment.content}
            setDisplay={props.setDisplay}
            setComment={setEditedComment}
            submitHandler={editCommentHandler}
        />
    );
};

export default EditComment;
