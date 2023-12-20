import React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[50]};

  &:hover {
    border-color: black;
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 1px ${theme.palette.mode === "dark" ? blue[600] : blue[900]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

type TextAreaProps = {
    minHeight: string;
    maxHeight: string;
    placeholder: string;
    blurHandler?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const TextArea = (props: TextAreaProps) => {
    return (
        <TextareaAutosize
            aria-multiline
            sx={{
                resize: "vertical",
                width: "100%",
                minHeight: props.minHeight,
                maxHeight: props.maxHeight,
                fontSize: 16,
                borderRadius: 1,
            }}
            required
            placeholder={props.placeholder + " *"}
            onBlur={props.blurHandler}
        />
    );
};

export default TextArea;
