import Heart from "../lottie/Heart.json";
import { selectorStateType } from "../types/types";
import React, { useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { red } from "@mui/material/colors";
import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react"; // eslint-disable-line
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type LikeProps = {
    initialLikeBool: boolean;
    initialLikes: number;
    likeHandler: () => void;
    unlikeHandler: () => void;
};

const Like = (props: LikeProps) => {
    const [liked, setLiked] = useState<boolean>(props.initialLikeBool);
    const [likes, setLikes] = useState<number>(props.initialLikes);
    const [liking, setLiking] = useState<boolean>(false);
    const isLoggedIn = useSelector((state: selectorStateType) => state.auth.isLoggedIn);
    let timer: NodeJS.Timeout | null = null;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                pl: 1.65,
                pr: 1.65,
                position: "relative",
            }}
        >
            {!liked && (
                <FavoriteBorderRoundedIcon
                    sx={{ cursor: "pointer", marginBottom: "1.7rem" }}
                    onClick={() => {
                        if (isLoggedIn) {
                            setLiking(true);
                            setLiked(true);
                            setLikes((prevState) => prevState + 1);
                            props.likeHandler();
                            timer = setTimeout(() => {
                                setLiking(false);
                            }, 500);
                        } else {
                            toast.info("You need to be logged in!");
                        }
                    }}
                />
            )}
            {liked && !liking && (
                <FavoriteRoundedIcon
                    sx={{ color: red[500], cursor: "pointer", marginBottom: "1.7rem" }}
                    onClick={() => {
                        setLiked(false);
                        setLikes((prevState) => prevState - 1);
                        props.unlikeHandler();
                    }}
                />
            )}
            {liking && (
                <Lottie
                    animationData={JSON.parse(JSON.stringify(Heart))}
                    loop={false}
                    style={{
                        width: 60,
                        marginBottom: "1.7rem",
                        cursor: "pointer",
                    }}
                    onBlur={() => {
                        if (timer) {
                            clearTimeout(timer);
                        }
                    }}
                />
            )}
            <Typography style={{ position: "absolute", marginTop: "1rem" }} variant="body1">
                {likes}
            </Typography>
        </Box>
    );
};

export default Like;
