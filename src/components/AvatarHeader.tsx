import { formatDate } from "../util/util";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { red } from "@mui/material/colors";
import React from "react";

type AvatarHeaderProps = {
    username: string;
    date: string;
};

const AvatarHeader = (props: AvatarHeaderProps) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: red[500], width: 50, height: 50, fontSize: 25 }}>R</Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", ml: 1 }}>
                <Typography>{props.username}</Typography>
                <Typography sx={{ color: "gray", fontSize: 12 }}>{formatDate(props.date)}</Typography>
            </Box>
        </Box>
    );
};

export default AvatarHeader;
