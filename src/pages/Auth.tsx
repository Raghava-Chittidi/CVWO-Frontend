import { selectorStateType } from "../types/types";
import useAuthorise from "../hooks/useAuthorise";
import NavBar from "../components/NavBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { authActions } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Link } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const Auth: React.FC = () => {
    const isLoggedIn = useSelector((state: selectorStateType) => state.auth.isLoggedIn);
    const [isLoginState, setIsLoginState] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const { loading: loading1 } = useAuthorise();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/threads", { replace: true });
        } else if (!isLoggedIn && !loading1) {
            setLoading(false);
        }
    }, [isLoggedIn, loading1]);

    // Switch between login and signup state
    const switchAuthStateHandler = () => {
        setIsLoginState((prevState) => !prevState);
        setError("");
    };

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        try {
            let res;
            if (isLoginState) {
                res = await axios.post(
                    `${process.env.REACT_APP_DOMAIN_URL}/login`,
                    {
                        email: event.currentTarget.email.value,
                        password: event.currentTarget.password.value,
                    },
                    { withCredentials: true },
                );
            } else {
                res = await axios.post(
                    `${process.env.REACT_APP_DOMAIN_URL}/signup`,
                    {
                        username: event.currentTarget.username.value,
                        email: event.currentTarget.email.value,
                        password: event.currentTarget.password.value,
                    },
                    { withCredentials: true },
                );
            }

            const { AccessToken, RefreshToken, Email, Username } = res.data;
            dispatch(
                authActions.login({
                    tokenPair: { access_token: AccessToken, refresh_token: RefreshToken },
                    userData: { email: Email, username: Username },
                }),
            );
            setLoading(true);
            navigate("/threads", { replace: true });
        } catch (err) {
            setError(err.response.data.message as string);
        }
    };

    if (loading || loading1) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <NavBar />
            <ThemeProvider theme={defaultTheme}>
                <Container component="main">
                    <CssBaseline />
                    <Box
                        maxWidth={475}
                        sx={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translateX(-50%) translateY(-50%)",
                        }}
                    >
                        <Typography component="h1" variant="h4" sx={{ textAlign: "center" }}>
                            {isLoginState ? "Login" : "Sign Up"}
                        </Typography>
                        {error && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {error}
                            </Alert>
                        )}
                        <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                            {!isLoginState && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="off"
                                    autoFocus
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Email Address"
                                type="email"
                                id="email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    textTransform: "none",
                                    fontSize: 18,
                                    backgroundColor: "#4169E1",
                                    ":hover": { backgroundColor: "#0F52BA" },
                                }}
                            >
                                {isLoginState ? "Login" : "Sign Up"}
                            </Button>
                            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                                <Grid item>
                                    <Link onClick={switchAuthStateHandler} sx={{ cursor: "pointer" }}>
                                        {isLoginState
                                            ? "Don't have an account? Sign Up"
                                            : "Already have an account? Login here"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default Auth;
