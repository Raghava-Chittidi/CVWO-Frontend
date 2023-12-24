import EditComment from "./EditComment";
import AvatarHeader from "../AvatarHeader";
import LoadingSpinner from "../LoadingSpinner";
import { CommentType, selectorStateType } from "../../types/types";
import Modal from "../Modal";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import axios from "axios";

type CommentItemProps = {
    comment: CommentType;
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

// Comment can also have image

const CommentItem: React.FC<CommentItemProps> = (props: CommentItemProps) => {
    const username = useSelector((state: selectorStateType) => state.auth.userData?.username);
    const authInfo = useSelector((state: selectorStateType) => state.auth);
    const [comment, setComment] = useState<CommentType>(props.comment);
    const [edit, setEdit] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const deleteCommentHandler = async () => {
        setLoading(true);
        try {
            const res = await axios.delete(`${process.env.REACT_APP_DOMAIN_URL}/delete/comment/${comment.ID}`, {
                headers: { Authorization: `Bearer ${authInfo.access_token}` },
                withCredentials: true,
            });
            props.setComments((prevState) => prevState.filter((c) => c.ID !== comment.ID));
            console.log(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    if (loading) {
        return <LoadingSpinner height="9rem" />;
    }

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
                    <AvatarHeader username={comment.user.username} date={comment.UpdatedAt || comment.CreatedAt} />
                    {comment.user.username === username && (
                        <Box sx={{ display: "flex" }}>
                            <Typography
                                sx={{
                                    marginRight: "1rem",
                                    cursor: "pointer",
                                    color: "blue",
                                    ":hover": { textDecoration: "underline" },
                                }}
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </Typography>
                            <Typography
                                sx={{
                                    cursor: "pointer",
                                    color: "red",
                                    ":hover": { textDecoration: "underline" },
                                }}
                                onClick={() => setModal(true)}
                            >
                                Delete
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", mt: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: 25, ml: 1.5, mr: 1.5 }} />
                        <Typography sx={{ fontSize: 20, pl: 1, pr: 1 }}>0</Typography>
                    </Box>
                    <Typography sx={{ ml: 1 }}>{comment.content}</Typography>
                </Box>
            </Box>
        </>
    );
};

export default CommentItem;
