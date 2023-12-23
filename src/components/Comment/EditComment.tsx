import CommentBox from "./CommentBox";
import { CommentType } from "../../types/types";
import React, { useState } from "react";

type EditCommentProps = {
    comment: CommentType;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditComment = (props: EditCommentProps) => {
    const [editedComment, setEditedComment] = useState<string>("");

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(editedComment);
    };

    return (
        <CommentBox
            initial={props.comment.content}
            setDisplay={props.setDisplay}
            setComment={setEditedComment}
            submitHandler={submitHandler}
        />
    );
};

export default EditComment;
