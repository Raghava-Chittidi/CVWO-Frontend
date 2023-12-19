import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

const LoadingSpinner = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingSpinner;
