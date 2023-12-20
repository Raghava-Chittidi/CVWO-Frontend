import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MUISelect, { SelectChangeEvent } from "@mui/material/Select"; // eslint-disable-line

type SelectProps = {
    options: string[];
    option: string;
    changeHandler: (event: SelectChangeEvent) => void;
};

const Select = (props: SelectProps) => {
    return (
        <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <MUISelect value={props.option} label="Category" onChange={props.changeHandler}>
                    {props.options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </MUISelect>
            </FormControl>
        </Box>
    );
};

export default Select;
