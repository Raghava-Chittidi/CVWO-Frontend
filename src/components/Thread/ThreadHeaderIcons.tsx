import { ThreadType, selectorStateType } from "../../types/types";
import { likeActions } from "../../store";
import { Box } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import React, { useState } from "react";
import { yellow, purple } from "@mui/material/colors";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

type ThreadHeaderIconsProps = {
    thread: ThreadType;
};

const ThreadHeaderIcons = (props: ThreadHeaderIconsProps) => {
    const authInfo = useSelector((state: selectorStateType) => state.auth);
    const likeobj = useSelector((state: selectorStateType) => state.like)[props.thread.ID];
    const initialFavouriteBooleanValue = likeobj.favourited;
    const [favourited, setFavourited] = useState<boolean>(initialFavouriteBooleanValue);
    const dispatch = useDispatch();

    const favouriteHandler = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/favourite/thread/${props.thread.ID}`,
                {},
                {
                    headers: { Authorization: `Bearer ${authInfo.access_token}` },
                    withCredentials: true,
                },
            );
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const unfavouriteHandler = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_DOMAIN_URL}/unfavourite/thread/${props.thread.ID}`,
                {},
                {
                    headers: { Authorization: `Bearer ${authInfo.access_token}` },
                    withCredentials: true,
                },
            );
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Box>
                {/* Added to favourites react toastify */}
                {!favourited && (
                    <StarBorderIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                            setFavourited(true);
                            favouriteHandler();
                            dispatch(
                                likeActions.setValue({ id: props.thread.ID, liked: likeobj.liked, favourited: true }),
                            );
                        }}
                    />
                )}
                {favourited && (
                    <StarIcon
                        sx={{ color: yellow[600], cursor: "pointer" }}
                        onClick={() => {
                            setFavourited(false);
                            unfavouriteHandler();
                            dispatch(
                                likeActions.setValue({ id: props.thread.ID, liked: likeobj.liked, favourited: false }),
                            );
                        }}
                    />
                )}
                {/* <Typography variant="caption">{favourited ? "Favourited" : "Favourite"}</Typography> */}
            </Box>
            <Typography variant="body2" sx={{ color: purple[700], fontWeight: 600 }}>
                {props.thread.category.name}
            </Typography>
        </Box>
    );
};

export default ThreadHeaderIcons;
