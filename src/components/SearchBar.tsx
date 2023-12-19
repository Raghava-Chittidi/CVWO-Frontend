import Filter from "./Filter";
import React, { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ searchHandler }: { searchHandler: (seachInput: string) => void }) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const searchRef = useRef<HTMLInputElement | null>(null);
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        searchHandler(event.target.value);
    };

    return (
        <Paper
            sx={{
                display: "flex",
                alignItems: "center",
                border: 1,
                width: "100%",
                borderRadius: 0,
                borderLeft: 0,
                borderColor: "lightgray",
                height: 50,
            }}
        >
            <SearchIcon sx={{ ml: 1, fontSize: 25 }} />
            <InputBase
                sx={{ ml: 1, flex: 1, fontSize: 18 }}
                placeholder="Search Threads"
                onChange={changeHandler}
                value={searchInput}
                ref={searchRef}
            />
            {searchInput.length == 0 && <Filter />}
            {searchInput.length >= 1 && (
                <ClearIcon
                    sx={{ mr: 1.5, fontSize: 25, cursor: "pointer" }}
                    onClick={() => {
                        setSearchInput("");
                        searchHandler("");
                        // searchRef.current!.focus();
                    }}
                />
            )}
        </Paper>
    );
};

export default SearchBar;
