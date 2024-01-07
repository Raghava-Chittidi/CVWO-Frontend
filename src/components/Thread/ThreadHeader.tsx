import ThreadHeaderIcons from "./ThreadHeaderIcons";
import AvatarHeader from "../AvatarHeader";
import { ThreadType } from "../../types/types";
import { Box } from "@mui/system";
import React from "react";

type ThreadHeaderProps = {
    thread: ThreadType;
};

const ThreadHeader = (props: ThreadHeaderProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                mt: 1,
                width: "100%",
            }}
        >
            <AvatarHeader username={props.thread.user.username} date={props.thread.CreatedAt} />
            <ThreadHeaderIcons thread={props.thread} />
        </Box>
    );
};

export default ThreadHeader;
