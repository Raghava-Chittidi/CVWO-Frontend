import TextArea from "../TextArea";
import { stringToColour } from "../../util/util";
import { selectorStateType } from "../../types/types";
import { Avatar, Box, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

type CommentBoxProps = {
    initial?: string;
    submitHandler: (event: React.FormEvent) => Promise<void>;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setComment: React.Dispatch<React.SetStateAction<string>>;
};

const CommentBox = (props: CommentBoxProps) => {
    const username = useSelector((state: selectorStateType) => state.auth.userData?.username)!;

    const blurHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        props.setComment(event.target.value);
    };

    return (
        <Box sx={{ width: "100%" }} component="form">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginTop: "1rem",
                }}
            >
                <Avatar sx={{ bgcolor: stringToColour(username), width: 50, height: 50, fontSize: 25, mr: 1 }}>
                    {username[0].toUpperCase()}
                </Avatar>
                <TextArea
                    initial={props.initial}
                    minHeight="8rem"
                    maxHeight="12rem"
                    placeholder="Your comment"
                    blurHandler={blurHandler}
                />
            </Box>
            <Box sx={{ display: "flex", mt: 1, justifyContent: "flex-end" }}>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ textTransform: "none", mr: 2 }}
                    onClick={() => props.setDisplay(false)}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="outlined"
                    color="success"
                    sx={{ textTransform: "none" }}
                    onClick={props.submitHandler}
                >
                    Post
                </Button>
            </Box>
        </Box>
    );
};

export default CommentBox;
