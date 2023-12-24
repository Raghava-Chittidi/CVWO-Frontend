import { selectorStateType } from "../../types/types";
import { searchActions } from "../../store";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TuneIcon from "@mui/icons-material/Tune";
import { useDispatch, useSelector } from "react-redux";

type FilterProps = {
    categories: string[];
};

const Filter = React.memo(function filter(props: FilterProps) {
    const category = useSelector((state: selectorStateType) => state.search.filter);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: React.MouseEvent) => {
        dispatch(searchActions.setFilter({ filter: event.currentTarget.id }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <TuneIcon
                sx={{
                    fontSize: 25,
                    cursor: "pointer",
                    mr: 1.5,
                }}
                onClick={handleOpen}
            />
            <FormControl>
                <Select
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={category}
                    defaultValue={props.categories[0]}
                    sx={{ visibility: "hidden", position: "absolute", bottom: 0, left: "1.5rem", fontSize: 0 }}
                >
                    {props.categories.map((category: string) => (
                        <MenuItem key={category} value={category} id={category} onClick={handleChange}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
});

export default Filter;
