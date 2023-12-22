import CommentItem from "./CommentItem";
import { CommentType } from "../../types/types";
import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

type CommentListProps = {
    comments: CommentType[];
};

const CommentList = (props: CommentListProps) => {
    return (
        <Box style={{ marginTop: "3rem", width: "100%" }}>
            {props.comments.length > 0 && (
                <Typography variant="h5">{`${props.comments.length} Comment${
                    props.comments.length > 1 ? "s" : ""
                }`}</Typography>
            )}
            <ul style={{ padding: 0 }}>
                {props.comments.map((comment) => (
                    <Box key={comment.ID}>
                        <CommentItem comment={comment} />
                    </Box>
                ))}
            </ul>
        </Box>
    );
};

export default CommentList;
