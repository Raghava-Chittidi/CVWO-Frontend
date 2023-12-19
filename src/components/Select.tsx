import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MUISelect, { SelectChangeEvent } from "@mui/material/Select"; // eslint-disable-line

const Select = ({ options }: { options: string[] }) => {
    const [option, setOption] = React.useState(options[0]);

    const changeHandler = (event: SelectChangeEvent) => {
        setOption(event.target.value as string);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <MUISelect value={option} label="Category" onChange={changeHandler}>
                    {options.map((option) => (
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
