import EditComment from "./EditComment";
import AvatarHeader from "../AvatarHeader";
import LoadingSpinner from "../LoadingSpinner";
import Like from "../Like";
import { CommentType, selectorStateType } from "../../types/types";
import Modal from "../Modal";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

type CommentItemProps = {
    comment: CommentType;
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

const CommentItem: React.FC<CommentItemProps> = (props: CommentItemProps) => {
    const username = useSelector((state: selectorStateType) => state.auth.userData?.username);
    const authInfo = useSelector((state: selectorStateType) => state.auth);
    const [comment, setComment] = useState<CommentType>(props.comment);
    const [edit, setEdit] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const initialLikeBooleanValue =
        props.comment.likes.findIndex((like) => like.user.username === authInfo.userData?.username) !== -1;
    const initialLikes = props.comment.likes.length;

    const deleteCommentHandler = async () => {
        setLoading(true);
        try {
            const res = await axios.delete(`${process.env.REACT_APP_DOMAIN_URL}/delete/comment/${comment.ID}`, {
                headers: { Authorization: `Bearer ${authInfo.access_token}` },
                withCredentials: true,
            });
            props.setComments((prevState) => prevState.filter((c) => c.ID !== comment.ID));
            toast.success(res.data.message);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.message);
        }
    };

    const likeCommentHandler = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/like/comment/${props.comment.ID}`,
                {},
                {
                    headers: { Authorization: `Bearer ${authInfo.access_token}` },
                    withCredentials: true,
                },
            );
            console.log(res.data);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const unlikeCommentHandler = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/unlike/comment/${props.comment.ID}`,
                {},
                {
                    headers: { Authorization: `Bearer ${authInfo.access_token}` },
                    withCredentials: true,
                },
            );
            console.log(res.data);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    if (loading) {
        return <LoadingSpinner height="9rem" />;
    }

    // If in edit mode
    if (edit) {
        return <EditComment comment={comment} setComment={setComment} setDisplay={setEdit} />;
    }

    return (
        <>
            <Modal
                open={modal}
                setOpen={setModal}
                handler={deleteCommentHandler}
                header="Warning!"
                content="Are you sure you want to delete this comment? This action is irreversible!"
            />
            <Box sx={{ mt: 2, mb: 5, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <AvatarHeader username={comment.user.username} date={comment.CreatedAt} />
                    {comment.user.username === username && (
                        <Box>
                            <Button sx={{ textTransform: "none" }} onClick={() => setEdit(true)}>
                                Edit
                            </Button>
                            <Button
                                variant="text"
                                color="error"
                                sx={{ textTransform: "none" }}
                                onClick={() => setModal(true)}
                            >
                                Delete
                            </Button>
                        </Box>
                    )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", mt: 2 }}>
                    <Like
                        initialLikes={initialLikes}
                        initialLikeBool={initialLikeBooleanValue}
                        likeHandler={likeCommentHandler}
                        unlikeHandler={unlikeCommentHandler}
                    />
                    <Typography sx={{ ml: 1 }}>{comment.content}</Typography>
                </Box>
            </Box>
        </>
    );
};

export default CommentItem;
