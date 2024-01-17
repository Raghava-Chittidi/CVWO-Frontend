import { ThreadType, selectorStateType } from "../../types/types";
import { timeSincePost } from "../../util/util";
import { Box, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { useSelector } from "react-redux";

type threadItemProps = {
    threadItem: ThreadType;
    initialFavouriteBooleanValue: boolean;
    initialLikeBooleanValue: boolean;
};

const ThreadItem = (props: threadItemProps) => {
    const navigate = useNavigate();
    const id = useLocation().pathname.split("/")[2];

    const authInfo = useSelector((state: selectorStateType) => state.auth);

    return (
        <Box
            onClick={() => {
                if (props.threadItem.ID !== +id) {
                    navigate(`/threads/${props.threadItem.ID}`);
                }
            }}
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "3.5rem",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    variant="body1"
                    sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", maxWidth: "70%" }}
                >
                    {props.threadItem.title}
                </Typography>
                {authInfo.isLoggedIn && (
                    <StarIcon
                        sx={{
                            color: `${props.initialFavouriteBooleanValue ? "rgb(255, 160, 22)" : "lightgray"}`,
                            opacity: `${props.initialFavouriteBooleanValue ? 0.8 : 1}`,
                            width: "0.8rem",
                        }}
                    />
                )}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "100%" }}>
                <Grid container>
                    <Grid item xs={3} gap={1}>
                        <Typography variant="caption" sx={{ color: "#4169E1", fontWeight: 600 }}>
                            {props.threadItem.category.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: "center" }}>
                        <Typography variant="caption">{props.threadItem.user.username}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: "center" }}>
                        <Typography variant="caption">{timeSincePost(props.threadItem.CreatedAt)}</Typography>
                    </Grid>
                </Grid>
                {authInfo.isLoggedIn && (
                    <FavoriteOutlinedIcon
                        sx={{ color: `${props.initialLikeBooleanValue ? red[500] : "lightgray"}`, width: "0.8rem" }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default ThreadItem;
