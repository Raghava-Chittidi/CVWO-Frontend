import { selectorStateType, ThreadType } from "../types/types";
import LoadingSpinner from "../components/LoadingSpinner";
import ThreadSkeleton from "../components/Thread/ThreadSkeleton";
import { likeActions } from "../store";
import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type NewThreadProps = {
    setThreads: React.Dispatch<React.SetStateAction<ThreadType[]>>;
    categories: string[];
};

const NewThread = () => {
    const isLoggedIn = useSelector((state: selectorStateType) => state.auth.isLoggedIn);
    const authInfo = useSelector((state: selectorStateType) => state.auth);
    const { categories, setThreads } = useOutletContext<NewThreadProps>();
    const allCategories = ["General", ...categories.filter((category: string) => category !== "General")];
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            setLoading(false);
        }
    }, [isLoggedIn]);

    if (loading) {
        return <LoadingSpinner />;
    }

    const submitHandler = async (category: string, title: string, content: string, imageUrl?: string) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/create/thread`,
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
            setThreads((prevState) => [res.data.data, ...prevState]);
            dispatch(likeActions.insert({ id: res.data.data.ID }));
            setError(null);
            toast.success(res.data.message);
            navigate(`/threads/${res.data.data.ID}`);
        } catch (error) {
            setError(error.response.data.message);
            toast.error(error.message);
            console.log(error);
        }
    };

    return <ThreadSkeleton categories={allCategories} submitHandler={submitHandler} error={error} />;
};

export default NewThread;
