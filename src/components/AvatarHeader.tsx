import { formatDate, stringToColour } from "../util/util";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

type AvatarHeaderProps = {
    username: string;
    date: string;
};

const AvatarHeader = (props: AvatarHeaderProps) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: stringToColour(props.username), width: 50, height: 50, fontSize: 25 }}>
                {props.username[0].toUpperCase()}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", ml: 1 }}>
                <Typography>{props.username}</Typography>
                <Typography sx={{ color: "gray", fontSize: 12 }}>{formatDate(props.date)}</Typography>
            </Box>
        </Box>
    );
};

export default AvatarHeader;
