import { ThreadType } from "../../types/types";
import { timeSincePost } from "../../util/util";
import { Box, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type threadItemProps = {
    threadItem: ThreadType;
};

const ThreadItem = (props: threadItemProps) => {
    const navigate = useNavigate();
    const id = useLocation().pathname.split("/")[2];

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
                <StarIcon sx={{ color: "lightgray", width: "0.8rem" }} />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "100%" }}>
                <Grid container>
                    <Grid item xs={3} gap={1}>
                        <Typography variant="caption" sx={{ color: "purple", fontWeight: 600 }}>
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
                <FavoriteOutlinedIcon sx={{ color: "lightgray", width: "0.8rem" }} />
            </Box>
        </Box>
    );
};

export default ThreadItem;
