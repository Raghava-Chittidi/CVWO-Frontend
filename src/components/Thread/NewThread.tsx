import TextArea from "../TextArea";
import Select from "../Select";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const defaultTheme = createTheme();

const categories = ["General", "Movies", "Education", "Music", "Environment"];

const NewThread = ({ setCreateThread }: { setCreateThread: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setCreateThread(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <Box sx={{ width: "70%", m: "auto", mt: 2 }}>
                    <Typography component="h1" variant="h4">
                        Create Thread
                    </Typography>
                    {/* {error && (
                        <Alert severity="error" sx={{ mt: 1 }}>
                            {error}
                        </Alert>
                    )} */}
                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                        <Select options={categories} />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="off"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="imageUrl"
                            label="ImageUrl"
                            type="imageUrl"
                            id="imageUrl"
                        />
                        <Box sx={{ mt: 2, fontSize: 20 }}>
                            <TextArea minHeight="8rem" maxHeight="15rem" placeholder="Description" />
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, textTransform: "none", fontSize: 18 }}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default NewThread;
