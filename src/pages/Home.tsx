import React from "react";
import { Box, Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";

const Home: React.FC = () => {
    return (
        <Box
            sx={{
                height: "93vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ForumIcon sx={{ color: "lightgray", fontSize: 100, mr: 2 }} />
            <Typography variant="h3">Select a thread!</Typography>
        </Box>
    );
};

export default Home;
