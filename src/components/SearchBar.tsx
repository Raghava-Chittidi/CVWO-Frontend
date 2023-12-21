import React, { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

type SearchBarProps = {
    placeholder: string;
    searchHandler: (seachInput: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
    const [searchInput, setSearchInput] = useState<string>("");
    // const [filter, setFilter] = useState<string>("All");
    const searchRef = useRef<HTMLInputElement | null>(null);
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        props.searchHandler(event.target.value);
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
                ref={searchRef}
            />
            {/* {searchInput.length == 0 && <Filter categories={props.categories} setFilter={setFilter} />} */}
            {searchInput.length >= 1 && (
                <ClearIcon
                    sx={{ mr: 1.5, fontSize: 25, cursor: "pointer" }}
                    onClick={() => {
                        setSearchInput("");
                        props.searchHandler("");
                        // searchRef.current!.focus();
                    }}
                />
            )}
        </Paper>
    );
};

export default SearchBar;
