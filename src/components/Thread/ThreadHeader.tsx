import ThreadHeaderIcons from "./ThreadHeaderIcons";
import AvatarHeader from "../AvatarHeader";
import { Box } from "@mui/system";
import React from "react";

type ThreadHeaderProps = {
    username: string;
    date: string;
};

const ThreadHeader = (props: ThreadHeaderProps) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, width: "100%" }}>
            <AvatarHeader {...props} />
            <ThreadHeaderIcons />
        </Box>
    );
};

export default ThreadHeader;
