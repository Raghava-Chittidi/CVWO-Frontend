import CommentItem from "./CommentItem";
import { CommentType } from "../../types/types";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

type CommentListProps = {
    comments: CommentType[];
    setOriginalComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

const CommentList = (props: CommentListProps) => {
    const [comments, setComments] = useState<CommentType[]>([]);

    useEffect(() => {
        setComments(props.comments);
    }, [props.comments]);

    return (
        <Box sx={{ mt: 3, width: "100%" }}>
            {comments.length > 0 && (
                <Typography variant="h5">{`${comments.length} Comment${comments.length > 1 ? "s" : ""}`}</Typography>
            )}
            <ul style={{ padding: 0 }}>
                {comments.map((comment) => (
                    <Box key={comment.ID}>
                        <CommentItem comment={comment} setComments={props.setOriginalComments} />
                    </Box>
                ))}
            </ul>
        </Box>
    );
};

export default CommentList;
