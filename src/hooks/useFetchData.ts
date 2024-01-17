import { useEffect, useState } from "react";
import axios from "axios";

// Custom get request fetch hook with error and loading states
const useFetchData = (url: string) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null); // eslint-disable-line

    const sendRequest = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}${url}`, {
                withCredentials: true,
            });
            setData(res.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.response.data.error);
            console.log(err);
        }
    };

    useEffect(() => {
        sendRequest();
    }, [url]);

    return { loading, error, data, setData };
};

export default useFetchData;
