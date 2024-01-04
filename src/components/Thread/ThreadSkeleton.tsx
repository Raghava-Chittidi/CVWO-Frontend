import TextArea from "../../components/TextArea";
import Select from "../../components/Select";
import { ThreadType } from "../../types/types";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select"; // eslint-disable-line
import React, { FormEvent, useState } from "react";
import { Alert } from "@mui/material";

type ThreadSkeletonProps = {
    edit?: boolean;
    thread?: ThreadType;
    error?: string | null;
    categories: string[];
    submitHandler: (category: string, title: string, content: string, imageUrl?: string) => void;
};

const defaultTheme = createTheme();

const ThreadSkeleton = (props: ThreadSkeletonProps) => {
    const allCategories = ["General", ...props.categories.filter((category: string) => category !== "General")];
    const [category, setCategory] = useState<string>(props.thread?.category.name || allCategories[0]);
    const [title, setTitle] = useState<string>(props.thread?.title || "");
    const [imageUrl, setImageUrl] = useState<string>(props.thread?.imageUrl || "");
    const [content, setContent] = useState<string>(props.thread?.content || "");

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

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        props.submitHandler(category, title, content, imageUrl);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <Box sx={{ width: "70%", m: "auto", mt: 2 }}>
                    <Typography component="h1" variant="h4">
                        {props.edit ? "Edit" : "Create"} Thread
                    </Typography>
                    {props.error && (
                        <Alert severity="error" sx={{ mt: 1 }}>
                            {props.error}
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
                            defaultValue={title}
                            onBlur={titleBlurHandler}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="imageUrl"
                            label="ImageUrl"
                            type="imageUrl"
                            id="imageUrl"
                            defaultValue={imageUrl}
                            onBlur={imageUrlBlurHandler}
                        />
                        <Box sx={{ mt: 2, fontSize: 20 }}>
                            <TextArea
                                minHeight="8rem"
                                maxHeight="15rem"
                                placeholder="Content"
                                initial={content}
                                blurHandler={contentBlurHandler}
                            />
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, textTransform: "none", fontSize: 18 }}
                        >
                            {props.edit ? "Save" : "Create"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ThreadSkeleton;
