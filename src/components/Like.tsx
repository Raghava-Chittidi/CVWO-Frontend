import React, { useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { red } from "@mui/material/colors";
import { Box, Typography } from "@mui/material";

type LikeProps = {
    initialLikeBool: boolean;
    initialLikes: number;
    likeHandler: () => void;
    unlikeHandler: () => void;
};

const Like = (props: LikeProps) => {
    const [liked, setLiked] = useState<boolean>(props.initialLikeBool);
    const [likes, setLikes] = useState<number>(props.initialLikes);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // width: 50,
                pl: 1.65,
                pr: 1.65,
            }}
        >
            {!liked ? (
                <FavoriteBorderOutlinedIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        setLiked(true);
                        setLikes((prevState) => prevState + 1);
                        props.likeHandler();
                    }}
                />
            ) : (
                <FavoriteOutlinedIcon
                    sx={{ color: red[500], cursor: "pointer" }}
                    onClick={() => {
                        setLiked(false);
                        setLikes((prevState) => prevState - 1);
                        props.unlikeHandler();
                    }}
                />
            )}
            <Typography variant="body1">{likes}</Typography>
        </Box>
    );
};

export default Like;
