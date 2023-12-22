import { selectorStateType } from "../types/types";
import TextArea from "../components/TextArea";
import LoadingSpinner from "../components/LoadingSpinner";
import Select from "../components/Select";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select"; // eslint-disable-line
import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

type NewThreadProps = {
    setCreateThread: React.Dispatch<React.SetStateAction<boolean>>;
    categories: string[];
};

const defaultTheme = createTheme();

const NewThread = () => {
    const username = useSelector((state: selectorStateType) => state.auth.userData?.username);
    const isLoggedIn = useSelector((state: selectorStateType) => state.auth.isLoggedIn);
    const { categories } = useOutletContext<NewThreadProps>();
    const allCategories = ["General", ...categories.filter((category: string) => category !== "General")];
    const [category, setCategory] = useState<string>(categories[0]);
    const [title, setTitle] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            setLoading(false);
        }
    }, [isLoggedIn]);

    if (loading) {
        return <LoadingSpinner />;
    }

    const changeHandler = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    const titleBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const imageUrlBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        setImageUrl(event.target.value);
    };

    const contentBlurHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/createThread`,
                {
                    title,
                    content,
                    category,
                    imageUrl,
                    username,
                },
                { withCredentials: true },
            );

            // Add success notif
            setCategory(allCategories[0]);
            setTitle("");
            setContent("");
            setImageUrl("");
            setError(null);
            navigate(`/threads/${res.data.id}`);
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <Box sx={{ width: "70%", m: "auto", mt: 2 }}>
                    <Typography component="h1" variant="h4">
                        Create Thread
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mt: 1 }}>
                            {error}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                        <Select option={category} options={allCategories} changeHandler={changeHandler} />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="off"
                            onBlur={titleBlurHandler}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="imageUrl"
                            label="ImageUrl"
                            type="imageUrl"
                            id="imageUrl"
                            onBlur={imageUrlBlurHandler}
                        />
                        <Box sx={{ mt: 2, fontSize: 20 }}>
                            <TextArea
                                minHeight="8rem"
                                maxHeight="15rem"
                                placeholder="Content"
                                blurHandler={contentBlurHandler}
                            />
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
