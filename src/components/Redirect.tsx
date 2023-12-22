import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const Redirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/threads");
    }, []);

    return <LoadingSpinner height="100vh" />;
};

export default Redirect;
