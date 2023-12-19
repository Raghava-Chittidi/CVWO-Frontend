import ThreadHeaderIcons from "./ThreadHeaderIcons";
import AvatarHeader from "../AvatarHeader";
import { Box } from "@mui/system";
import React from "react";

const ThreadHeader = () => {
    return (
        <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 2, width: "100%" }}
        >
            <AvatarHeader />
            <ThreadHeaderIcons />
        </Box>
    );
};

export default ThreadHeader;
