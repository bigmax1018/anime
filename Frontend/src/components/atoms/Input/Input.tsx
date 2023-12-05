import { useState } from "react";
import { InputOwnProps } from ".";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export type InputProps = InputOwnProps & React.ComponentProps<typeof TextField>;

const CssTextField = styled(TextField)({
  // Filled Input
  "& .MuiFilledInput-root": {
    backgroundColor: "transparent",
    borderRadius: "0px",
    border: "1px solid #ffffff",
  },
  "& .MuiInputBase-input": {
    height: "1em",
    paddingTop: "20px",
    color: "white !important",
  },
  "& .MuiInputLabel-root": {
    color: "white",
    top: "-4px",
  },
  "& .MuiFilledInput-root:after, .MuiFilledInput-root:before": {
    display: "none",
  },
  "& .Mui-disabled": {
    opacity: "1",
    backgroundColor: "transparent !important",
    "-webkitTextFillColor": "white !important",
  },
  "& .Mui-focused": {
    backgroundColor: "transparent !important",
  },
  "& .MuiFilledInput-root:hover": {
    backgroundColor: "transparent !important",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(255, 255, 255, 255)",
  },
  "& .MuiSvgIcon-root": {
    fill: "white",
  },
});

export default function Input({ showIcon, type, ...rest }: InputProps) {
  const [show, setShow] = useState(false);

  return (
    <CssTextField
      fullWidth
      variant="filled"
      autoComplete="off"
      {...rest}
      type={show && showIcon && type === "password" ? "text" : type}
      InputProps={{
        endAdornment: showIcon && type === "password" && (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={() => setShow(!show)}
              onMouseDown={(e) => e.preventDefault()}
              aria-label="toggle password visibility"
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
        ...rest.InputProps,
      }}
    />
  );
}
