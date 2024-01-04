import { selectorStateType } from "../types/types";
import { authActions } from "../store";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import ForumIcon from "@mui/icons-material/Forum";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { Link } from "@mui/material";
import axios from "axios";

// const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];

const NavBar = React.memo(function navBar() {
    // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const isLoggedIn = useSelector((state: selectorStateType) => state.auth.isLoggedIn);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElNav(event.currentTarget);
    // };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    const logoutHandler = async () => {
        dispatch(authActions.logout());
        try {
            await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/logout`, { withCredentials: true });
        } catch (err) {
            console.log(err);
        }
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#0471A6", boxShadow: "none" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box
                        onClick={() => navigate("/threads")}
                        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    >
                        <ForumIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                // color: "#00d5fa",
                                textDecoration: "none",
                            }}
                        >
                            ForumZone
                        </Typography>
                        {/* <Typography
                            sx={{ fontWeight: 800 }}
                            variant="body1"
                            onClick={() => {
                                if (!isLoggedIn) {
                                    navigate("/login");
                                } else {
                                    navigate("/threads/create");
                                }
                            }}
                        >
                            Create Thread
                        </Typography> */}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {isLoggedIn ? (
                            <>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography
                                                textAlign="center"
                                                onClick={setting === "Logout" ? logoutHandler : () => {}}
                                            >
                                                {setting}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                variant="h6"
                                fontWeight={700}
                                sx={{ textDecoration: "none", color: "white", fontFamily: "monospace" }}
                            >
                                Login
                            </Link>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
});
export default NavBar;
