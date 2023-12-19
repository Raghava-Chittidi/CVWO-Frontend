import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import React from "react";

const ThreadHeaderIcons = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <StarIcon sx={{ color: "gray" }} />
                <Typography variant="caption">Star</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", ml: 2 }}>
                <FavoriteBorderOutlinedIcon />
                <Typography variant="caption">20 Likes</Typography>
            </Box>
        </Box>
    );
};

export default ThreadHeaderIcons;
