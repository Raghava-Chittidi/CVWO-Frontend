import { selectorStateType } from "../types/types";
import { authActions } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const useAuthorise = () => {
    const TOKEN_EXPIRY_TIME = 15 * 60;
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: selectorStateType) => state.auth.isLoggedIn);
    const [time, setTime] = useState<number>(TOKEN_EXPIRY_TIME);
    const [loading, setLoading] = useState<boolean>(true);

    const sendRequest = async () => {
        try {
            setLoading(true);
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
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    useEffect(() => {
        if (!isLoggedIn || (isLoggedIn && time === 0)) {
            sendRequest();
        }

        // Timer to check when access token expires
        if (isLoggedIn) {
            const i = setInterval(() => {
                if (time > 0) {
                    // console.log("this issue");

                    setTime((time: number) => time - 1);
                }
            }, 1000);

            setLoading(false);
            return () => clearInterval(i);
        }
    }, [isLoggedIn, time]);

    return loading;
};

export default useAuthorise;
