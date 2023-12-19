import ThreadItem from "./ThreadItem";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

const Threads = ({ threadTitles }: { threadTitles: string[] }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxHeight: "83vh",
                bgcolor: "background.paper",
                overflowY: "scroll",
                border: 1,
                borderTop: 0,
                borderColor: "lightgray",
            }}
        >
            <List component="nav" aria-label="main mailbox folders">
                {threadTitles.map((title, index) => (
                    <Box key={index} sx={{ marginLeft: 0.5, marginRight: 0.5 }}>
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}
                            sx={{ borderRadius: 1 }}
                        >
                            <ThreadItem title={title} author="Anonymous" category="Education" createdAt="1w" />
                        </ListItemButton>
                        <Divider sx={{ width: "98%", color: "lightgray", m: "auto" }} />
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default Threads;
