import { ThreadType, selectorStateType } from "../../types/types";
import { likeActions } from "../../store";
import FavouriteStar from "../../Lottie/Favourite.json";
import { Box } from "@mui/system";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import React, { useEffect, useRef, useState } from "react";
import { purple } from "@mui/material/colors";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import Lottie, { LottieRefCurrentProps } from "lottie-react"; // eslint-disable-line

type ThreadHeaderIconsProps = {
    thread: ThreadType;
};

const ThreadHeaderIcons = (props: ThreadHeaderIconsProps) => {
    const authInfo = useSelector((state: selectorStateType) => state.auth);
    const likeObjs = useSelector((state: selectorStateType) => state.like);
    const likeObj = likeObjs.find((likeObj) => likeObj.id === props.thread.ID)!;
    const initialFavouriteBooleanValue = likeObj.favourited;
    const [favourited, setFavourited] = useState<boolean>(initialFavouriteBooleanValue);
    const starRef = useRef<LottieRefCurrentProps | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (initialFavouriteBooleanValue === true) {
            starRef.current!.goToAndStop(45, true);
        }
    }, [initialFavouriteBooleanValue]);

    const favouriteHandler = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/favourite/thread/${props.thread.ID}`,
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

    const unfavouriteHandler = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/unfavourite/thread/${props.thread.ID}`,
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

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Box>
                {!favourited && (
                    <StarRoundedIcon
                        sx={{ cursor: "pointer", fontSize: 30, color: "gray", opacity: 0.85 }}
                        onClick={() => {
                            setFavourited(true);
                            favouriteHandler();
                            dispatch(
                                likeActions.setValue({ id: props.thread.ID, liked: likeObj.liked, favourited: true }),
                            );
                        }}
                    />
                )}
                {favourited && (
                    <Lottie
                        lottieRef={starRef}
                        animationData={FavouriteStar}
                        loop={false}
                        style={{ width: 30, margin: 0, cursor: "pointer" }}
                        onClick={() => {
                            setFavourited(false);
                            unfavouriteHandler();
                            dispatch(
                                likeActions.setValue({ id: props.thread.ID, liked: likeObj.liked, favourited: false }),
                            );
                        }}
                    />
                )}
            </Box>
            <Typography variant="body2" sx={{ color: purple[700], fontWeight: 600 }}>
                {props.thread.category.name}
            </Typography>
        </Box>
    );
};

export default ThreadHeaderIcons;
