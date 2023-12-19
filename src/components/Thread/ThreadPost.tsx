import ThreadHeader from "./ThreadHeader";
import NewComment from "../Comment/NewComment";
import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { purple } from "@mui/material/colors";

const ThreadPost = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "70%",
                m: "auto",
                mt: 2,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Typography variant="h4">Finals 23/24 q19,20</Typography>
                <Typography variant="h6" color={purple[700]}>
                    Education
                </Typography>
                {/* <Button variant="contained" sx={{ backgroundColor: "purple", maxWidth: 90 }}>
                    Education
                </Button> */}
            </Box>
            <ThreadHeader />
            <img
                style={{ maxWidth: "100%" }}
                src="https://images.unsplash.com/photo-1682685797140-c17807f8f217?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
                alt=""
            />
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", mt: 2 }}>
                This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1
                cup of frozen peas along with the mussels, if you like.
            </Typography>
            <NewComment />
        </Box>
    );
};

export default ThreadPost;
