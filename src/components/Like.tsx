import Heart from "../Lottie/Heart1.json";
import React, { useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { red } from "@mui/material/colors";
import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react"; // eslint-disable-line

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
                        setLiking(true);
                        setLiked(true);
                        setLikes((prevState) => prevState + 1);
                        props.likeHandler();
                        timer = setTimeout(() => {
                            setLiking(false);
                        }, 500);
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
