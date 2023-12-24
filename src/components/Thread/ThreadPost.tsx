import ThreadHeader from "./ThreadHeader";
import { CommentType, ThreadType } from "../../types/types";
import NewComment from "../Comment/NewComment";
import CommentList from "../Comment/CommentList";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Fade } from "@mui/material";
import { purple } from "@mui/material/colors";

const ThreadPost = ({ thread }: { thread: ThreadType }) => {
    const [originalComments, setOriginalComments] = useState<CommentType[]>([]);

    useEffect(() => {
        setOriginalComments([...thread.comments].reverse());
    }, [thread.comments]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "70%",
                m: "auto",
                mt: 2,
            }}
            key={thread.ID}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                <Typography variant="h4" sx={{ maxWidth: "80%" }}>
                    {thread.title}
                </Typography>
                <Typography variant="h6" color={purple[700]}>
                    {thread.category.name}
                </Typography>
            </Box>
            <ThreadHeader username={thread.user.username} date={thread.CreatedAt} />
            {thread.imageUrl && (
                <Fade in timeout={500}>
                    <img style={{ maxWidth: "100%", marginTop: "1rem" }} src={thread.imageUrl} alt={thread.title} />
                </Fade>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", mt: 2 }}>
                {thread.content}
            </Typography>
            <NewComment threadId={thread.ID} setOriginalComments={setOriginalComments} />
            <CommentList comments={originalComments} setOriginalComments={setOriginalComments} />
        </Box>
    );
};

export default ThreadPost;
