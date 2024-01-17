import { selectorStateType } from "../types/types";
import { authActions } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const useAuthorise = () => {
    const TOKEN_EXPIRY_TIME = 15 * 60 * 1000;
    const isLoggedIn = useSelector((state: selectorStateType) => state.auth.isLoggedIn);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    // Send request to get new access and refresh tokens
    const sendRequest = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/refresh`, {
                withCredentials: true,
            });
            const { AccessToken, RefreshToken, Email, Username, ID } = res.data;
            dispatch(
                authActions.login({
                    tokenPair: { access_token: AccessToken, refresh_token: RefreshToken },
                    userData: { email: Email, username: Username, id: ID },
                }),
            );
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message);
            console.log(err);
        }
    };

    useEffect(() => {
        // Auto login user if they have a valid refresh token
        if (!isLoggedIn) {
            sendRequest();
        }

        // Timer to check when access token expires
        else {
            const i = setInterval(() => {
                // Get new access token when old one expires
                sendRequest();
            }, TOKEN_EXPIRY_TIME);

            setLoading(false);
            return () => clearInterval(i);
        }
    }, [isLoggedIn]);

    return { loading, error };
};

export default useAuthorise;
