import ThreadHeader from "./ThreadHeader";
import LoadingSpinner from "../LoadingSpinner";
import Like from "../Like";
import { CommentType, ThreadType, selectorStateType } from "../../types/types";
import NewComment from "../Comment/NewComment";
import CommentList from "../Comment/CommentList";
import Modal from "../Modal";
import { likeActions } from "../../store";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Fade } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

type ThreadPostProps = {
    thread: ThreadType;
    setThreads: React.Dispatch<React.SetStateAction<ThreadType[]>>;
};

const ThreadPost = (props: ThreadPostProps) => {
    const [originalComments, setOriginalComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const authInfo = useSelector((state: selectorStateType) => state.auth);
    const likeObjs = useSelector((state: selectorStateType) => state.like);
    const likeObj = likeObjs.find((likeObj) => likeObj.id === props.thread.ID)!;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setOriginalComments([...props.thread.comments].reverse());
    }, [props.thread.comments]);

    if (loading) {
        return <LoadingSpinner />;
    }

    const initialLikeBooleanValue = likeObj.liked;
    const initialLikes = props.thread.likes.length;

    const likeThreadHandler = async () => {
        dispatch(likeActions.setValue({ id: props.thread.ID, liked: true, favourited: likeObj.favourited }));
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/like/thread/${props.thread.ID}`,
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

    const unlikeThreadHandler = async () => {
        dispatch(likeActions.setValue({ id: props.thread.ID, liked: false, favourited: likeObj.favourited }));
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/unlike/thread/${props.thread.ID}`,
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

    const deleteThreadHandler = async () => {
        setLoading(true);
        try {
            const res = await axios.delete(`${process.env.REACT_APP_DOMAIN_URL}/delete/thread/${props.thread.ID}`, {
                headers: { Authorization: `Bearer ${authInfo.access_token}` },
                withCredentials: true,
            });
            props.setThreads((prevState) => prevState.filter((t) => t.ID !== props.thread.ID));
            dispatch(likeActions.delete({ id: props.thread.ID }));
            console.log(res.data);
            setLoading(false);
            toast.success(res.data.message);
            navigate("/threads");
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <Modal
                open={modal}
                setOpen={setModal}
                handler={deleteThreadHandler}
                header="Warning!"
                content="Are you sure you want to delete this thread? This action is irreversible!"
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "70%",
                    m: "auto",
                    mt: 2,
                }}
                key={props.thread.ID}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <Typography variant="h4" sx={{ maxWidth: "80%" }}>
                        {props.thread.title}
                    </Typography>
                    {authInfo.userData!.username === props.thread.user.username && (
                        <Box sx={{ display: "flex" }}>
                            <Button
                                // variant="text"
                                // color="info"
                                sx={{ textTransform: "none" }}
                                onClick={() => navigate(`/threads/edit/${props.thread.ID}`)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="text"
                                color="error"
                                sx={{ textTransform: "none" }}
                                onClick={() => {
                                    setModal(true);
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
                    )}
                </Box>
                <ThreadHeader thread={props.thread} />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        width: "100%",
                        mt: 1,
                    }}
                >
                    <Like
                        initialLikes={initialLikes}
                        initialLikeBool={initialLikeBooleanValue}
                        likeHandler={likeThreadHandler}
                        unlikeHandler={unlikeThreadHandler}
                    />
                    <Box sx={{ width: "100%", pl: 1 }}>
                        {props.thread.imageUrl && (
                            <Fade in timeout={500}>
                                <Box sx={{ marginBottom: 2 }}>
                                    <img
                                        style={{ width: "100%", maxWidth: "100%" }}
                                        src={props.thread.imageUrl}
                                        alt={props.thread.title}
                                    />
                                </Box>
                            </Fade>
                        )}

                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: "left", marginBottom: 2 }}>
                            {props.thread.content}
                        </Typography>
                    </Box>
                </Box>
                <NewComment threadId={props.thread.ID} setOriginalComments={setOriginalComments} />
                <CommentList comments={originalComments} setOriginalComments={setOriginalComments} />
            </Box>
        </>
    );
};

export default ThreadPost;
