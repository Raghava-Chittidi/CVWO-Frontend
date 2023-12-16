import BasicThreadList from "../components/BasicThreadList";
import { authActions, authInfo } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
    const TOKEN_EXPIRY_TIME = 15 * 60;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: { auth: authInfo }) => state.auth.isLoggedIn);
    const [time, setTime] = useState<number>(TOKEN_EXPIRY_TIME);

    useEffect(() => {
        if (!isLoggedIn || (isLoggedIn && time === 0)) {
            const sendRequest = async () => {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/refresh`, {
                        withCredentials: true,
                    });
                    const { AccessToken, RefreshToken, Email, Username } = res.data;
                    dispatch(
                        authActions.login({
                            tokenPair: { access_token: AccessToken, refresh_token: RefreshToken },
                            userData: { email: Email, username: Username },
                        }),
                    );
                    setTime(TOKEN_EXPIRY_TIME);
                } catch (err) {
                    console.log(err);
                }
            };
            sendRequest();
        }

        // Timer to check when access token expires
        if (isLoggedIn) {
            const i = setInterval(() => {
                if (time > 0) {
                    setTime((time: number) => time - 1);
                }
            }, 1000);

            return () => clearInterval(i);
        }
    }, [isLoggedIn, time]);

    const logoutHandler = async () => {
        dispatch(authActions.logout());
        try {
            await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/logout`, { withCredentials: true });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h3>
                {"Welcome to CVWO's sample react app! Here's a basic list of forum threads for you to experiment with."}
            </h3>
            <br />
            <BasicThreadList />
            <button onClick={() => navigate("/login")}>Login</button>
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </>
    );
};

export default Home;
