import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select"; // eslint-disable-line
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const categories = [
    "All",
    "Education",
    "Finance",
    "Healthcare",
    "Politics",
    "Environment",
    "General",
    "Music",
    "Movies",
];

const Filter = () => {
    const [category, setCategory] = React.useState<string>(categories[0]);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: React.MouseEvent) => {
        setCategory(event.currentTarget.id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <FilterAltOutlinedIcon
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
                    defaultValue={categories[0]}
                    sx={{ visibility: "hidden", position: "absolute", bottom: 0, left: "1.5rem", fontSize: 0 }}
                >
                    {categories.map((category) => (
                        <MenuItem key={category} value={category} id={category} onClick={handleChange}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default Filter;
