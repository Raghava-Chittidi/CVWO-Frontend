import { ThreadType } from "../../types/types";
import LoadingSpinner from "../LoadingSpinner";
import { threadActions } from "../../store";
import { useDispatch } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import React, { useState } from "react";

type threadItemProps = {
    threadItem: ThreadType;
    setCreateThread: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThreadItem = (props: threadItemProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Box
            onClick={() => {
                setLoading(true);
                props.setCreateThread(false);
                dispatch(threadActions.setCurrent({ currentThread: props.threadItem }));
                setLoading(false);
            }}
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "3.15rem",
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
                <StarIcon sx={{ color: "lightgray", width: "0.8rem" }} />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Grid container gap={2}>
                    <Grid item xs={3}>
                        <Typography variant="caption" sx={{ color: "purple", fontWeight: 600 }}>
                            {props.threadItem.category.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="caption">{props.threadItem.user.username}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="caption">{"1w"}</Typography>
                    </Grid>
                </Grid>
                <FavoriteOutlinedIcon sx={{ color: "lightgray", width: "0.8rem" }} />
            </Box>
        </Box>
    );
};

export default ThreadItem;
