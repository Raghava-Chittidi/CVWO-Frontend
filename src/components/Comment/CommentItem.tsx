import AvatarHeader from "../AvatarHeader";
import { CommentType, selectorStateType } from "../../types/types";
import React from "react";
import { Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";

type CommentItemProps = {
    comment: CommentType;
};

// Comment can also have image

const CommentItem: React.FC<CommentItemProps> = (props: CommentItemProps) => {
    const username = useSelector((state: selectorStateType) => state.auth.userData?.username);

    const deleteCommentHandler = () => {
        // try {
        //     const res = axios.
        // } catch (error) {
        // }
    };

    return (
        <Box sx={{ mt: 2, mb: 5, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <AvatarHeader username={props.comment.user.username} date={props.comment.CreatedAt} />
                {props.comment.user.username === username && (
                    <Box sx={{ display: "flex" }}>
                        <Typography
                            sx={{
                                marginRight: "1rem",
                                cursor: "pointer",
                                color: "blue",
                                ":hover": { textDecoration: "underline" },
                            }}
                        >
                            Edit
                        </Typography>
                        <Typography
                            sx={{
                                cursor: "pointer",
                                color: "red",
                                ":hover": { textDecoration: "underline" },
                            }}
                            onClick={deleteCommentHandler}
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
                <Typography sx={{ ml: 1 }}>{props.comment.content}</Typography>
            </Box>
        </Box>
    );
};

export default CommentItem;
