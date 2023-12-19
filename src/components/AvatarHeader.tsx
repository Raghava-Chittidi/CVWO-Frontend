import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { red } from "@mui/material/colors";
import React from "react";

const AvatarHeader = () => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: red[500], width: 50, height: 50, fontSize: 25 }}>R</Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", ml: 1 }}>
                <Typography>Anonymous</Typography>
                <Typography sx={{ color: "gray", fontSize: 12 }}>29 July 2023</Typography>
            </Box>
        </Box>
    );
};

export default AvatarHeader;
