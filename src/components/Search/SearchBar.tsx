import { searchActions } from "../../store";
import { selectorStateType } from "../../types/types";
import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";

type SearchBarProps = {
    placeholder: string;
};

const SearchBar = (props: SearchBarProps) => {
    const searchInput = useSelector((state: selectorStateType) => state.search.searchInput);
    const dispatch = useDispatch();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchActions.setSearchInput({ searchInput: event.target.value }));
    };

    return (
        <Paper
            sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                borderRadius: 0,
                height: 50,
                boxShadow: 0,
            }}
        >
            <SearchIcon sx={{ ml: 1, fontSize: 25 }} />
            <InputBase
                sx={{ ml: 1, flex: 1, fontSize: 18 }}
                placeholder={`Search ${props.placeholder} Threads`}
                onChange={changeHandler}
                value={searchInput}
            />
            {searchInput.length >= 1 && (
                <ClearIcon
                    sx={{ mr: 1.5, fontSize: 25, cursor: "pointer" }}
                    onClick={() => {
                        dispatch(searchActions.setSearchInput({ searchInput: "" }));
                    }}
                />
            )}
        </Paper>
    );
};

export default SearchBar;
