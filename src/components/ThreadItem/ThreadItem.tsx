import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import * as React from "react";

type threadItemProps = { title: string; category: string; author: string; createdAt: string };

const ThreadItem = ({ title, category, author, createdAt }: threadItemProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "3.15rem",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">{title}</Typography>
                <StarIcon sx={{ color: "lightgray", width: "0.8rem" }} />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "55%" }}>
                    <Typography variant="caption" sx={{ color: "purple", fontWeight: 600 }}>
                        {category}
                    </Typography>
                    <Typography variant="caption">{author}</Typography>
                    <Typography variant="caption">{createdAt}</Typography>
                </Box>
                <FavoriteOutlinedIcon sx={{ color: "lightgray", width: "0.8rem" }} />
            </Box>
        </Box>
    );
};

export default ThreadItem;
