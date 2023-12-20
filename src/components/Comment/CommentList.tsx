import CommentItem from "./CommentItem";
import { CommentType } from "../../types/types";

import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

// type Props = {
//     styled: boolean;
// };

const CommentList: React.FC = () => {
    const comments: CommentType[] = [
        {
            body: `Any fool can write code that a computer can understand 
                Good programmers write code that humans can understand ~ Martin Fowler
                Any fool can write code that a computer can understand.
                Good programmers write code that humans can understand ~ Martin Fowler`,
            author: "Benedict",
            timestamp: new Date(2022, 10, 28, 10, 33, 30),
        },
        {
            body: "Code reuse is the Holy Grail of Software Engineering.\n" + " ~ Douglas Crockford",
            author: "Casey",
            timestamp: new Date(2022, 11, 1, 11, 11, 11),
        },
        {
            body: "Nine people can't make a baby in a month.\n" + " ~ Fred Brooks",
            author: "Duuet",
            timestamp: new Date(2022, 11, 2, 10, 30, 0),
        },
    ];

    return (
        <Box style={{ width: "70%", margin: "auto", marginTop: "3rem" }}>
            <Typography variant="h5">3 Comments</Typography>
            <ul style={{ padding: 0 }}>
                {comments.map((comment, index) => (
                    <Box key={index}>
                        <CommentItem comment={comment.body} />
                    </Box>
                ))}
            </ul>
        </Box>
    );
};

export default CommentList;
