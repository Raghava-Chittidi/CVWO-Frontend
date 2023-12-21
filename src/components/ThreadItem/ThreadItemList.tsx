import ThreadItem from "./ThreadItem";
import { ThreadType } from "../../types/types";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { Link, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

type ThreadItemListProps = {
    threadItems: ThreadType[];
    setCreateThread: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThreadItemList = (props: ThreadItemListProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
        setSelectedId(id);
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxHeight: "82vh",
                bgcolor: "background.paper",
                overflowY: "scroll",
                border: 1,
                borderTop: 0,
                borderColor: "lightgray",
            }}
        >
            <List component="nav" aria-label="main mailbox folders">
                {props.threadItems.length === 0 && (
                    <Box
                        sx={{
                            height: "80vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h4">No threads</Typography>
                        <Link
                            onClick={() => props.setCreateThread(true)}
                            variant="h4"
                            sx={{
                                cursor: "pointer",
                                textDecorationColor: blue[400],
                                ":hover": { textDecoration: "underline", color: blue[600] },
                            }}
                        >
                            Create one!
                        </Link>
                    </Box>
                )}
                <Box sx={{ height: "80vh" }}>
                    {props.threadItems.map((threadItem, index) => (
                        <Box key={index} sx={{ marginLeft: 0.5, marginRight: 0.5 }}>
                            <ListItemButton
                                selected={selectedId === threadItem.ID}
                                onClick={(event) => handleListItemClick(event, threadItem.ID)}
                                sx={{ borderRadius: 1 }}
                            >
                                <ThreadItem threadItem={threadItem} setCreateThread={props.setCreateThread} />
                            </ListItemButton>
                            <Divider sx={{ width: "98%", color: "lightgray", m: "auto" }} />
                        </Box>
                    ))}
                </Box>
            </List>
        </Box>
    );
};

export default ThreadItemList;
