import ThreadItem from "./ThreadItem";
import { ThreadType, selectorStateType } from "../../types/types";
import LoadingSpinner from "../LoadingSpinner";
import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { Link, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type ThreadItemListProps = {
    threadItems: ThreadType[];
    selected?: number;
};

const ThreadItemList = (props: ThreadItemListProps) => {
    const navigate = useNavigate();
    const likeObjs = useSelector((state: selectorStateType) => state.like);

    if (likeObjs.length < props.threadItems.length) {
        return <LoadingSpinner height="100%" />;
    }

    return (
        <Box
            sx={{
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
                            display: "flex",
                            height: "80vh",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h4">No threads</Typography>
                        <Link
                            onClick={() => navigate("/threads/create")}
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
                    {props.threadItems.map((threadItem) => (
                        <Box key={threadItem.ID} sx={{ marginLeft: 0.5, marginRight: 0.5 }}>
                            <ListItemButton selected={props.selected === threadItem.ID} sx={{ borderRadius: 1 }}>
                                <ThreadItem
                                    threadItem={threadItem}
                                    initialFavouriteBooleanValue={
                                        likeObjs.find((likeObj) => likeObj.id === threadItem.ID)!.favourited
                                    }
                                    initialLikeBooleanValue={
                                        likeObjs.find((likeObj) => likeObj.id === threadItem.ID)!.liked
                                    }
                                />
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
