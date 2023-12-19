import AvatarHeader from "../AvatarHeader";
import React from "react";
import { Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box } from "@mui/system";

type Props = {
    comment: string;
};

// Comment can also have image

const CommentItem: React.FC<Props> = ({ comment }) => {
    return (
        <Box sx={{ mt: 2, mb: 5, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <AvatarHeader />
            <Box sx={{ display: "flex", alignItems: "flex-start", mt: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 25, ml: 1.5, mr: 1.5 }} />
                    <Typography sx={{ fontSize: 20, pl: 1, pr: 1 }}>0</Typography>
                </Box>
                <Typography sx={{ ml: 1 }}>{comment}</Typography>
            </Box>
        </Box>
    );
};

export default CommentItem;
