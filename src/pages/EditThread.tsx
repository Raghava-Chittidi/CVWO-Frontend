import { ThreadType, selectorStateType } from "../types/types";
import LoadingSpinner from "../components/LoadingSpinner";
import ThreadSkeleton from "../components/Thread/ThreadSkeleton";
import useFetchData from "../hooks/useFetchData";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type EditThreadProps = {
    setThreads: React.Dispatch<React.SetStateAction<ThreadType[]>>;
    categories: string[];
};

const EditThread = () => {
    const isLoggedIn = useSelector((state: selectorStateType) => state.auth.isLoggedIn);
    const authInfo = useSelector((state: selectorStateType) => state.auth);
    const { threadId } = useParams();
    const { error: err, data: thread } = useFetchData(`/threads/${threadId}`);
    const { categories, setThreads } = useOutletContext<EditThreadProps>();
    const allCategories = ["General", ...categories.filter((category: string) => category !== "General")];
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/threads");
        } else {
            setLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (err) {
            navigate("/threads");
            toast.error("Thread not found!");
        }
    }, [err]);

    if (loading || !thread || thread.user.username !== authInfo.userData?.username) {
        if (thread && thread.user.username !== authInfo.userData?.username) {
            navigate("/threads");
        }
        return <LoadingSpinner height="100%" />;
    }

    const submitHandler = async (category: string, title: string, content: string, imageUrl?: string) => {
        try {
            setLoading(true);
            const res = await axios.patch(
                `${process.env.REACT_APP_DOMAIN_URL}/edit/thread/${thread.ID}`,
                {
                    title,
                    content,
                    category,
                    imageUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authInfo.access_token}`,
                    },
                    withCredentials: true,
                },
            );

            console.log(res.data);
            setThreads((prevState: ThreadType[]) => {
                const curThreadIndex = prevState.findIndex((originalThread) => thread.ID === originalThread.ID);
                prevState[curThreadIndex] = res.data.data;
                return prevState;
            });
            setLoading(false);
            setError(null);
            toast.success(res.data.message);
            navigate(`/threads/${res.data.data.ID}`);
        } catch (err) {
            setLoading(false);
            // toast.error(err.message);
            setError(err.response.data.message);
            console.log(error);
        }
    };

    return (
        <ThreadSkeleton edit thread={thread} categories={allCategories} submitHandler={submitHandler} error={error} />
    );
};

export default EditThread;
