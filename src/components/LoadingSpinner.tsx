import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

const LoadingSpinner = ({ height, width }: { height?: string; width?: string }) => {
    return (
        <Box
            sx={{
                display: "flex",
                width: width || "100%",
                height: height || "100vh",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingSpinner;
