import { Button as BaseButton } from "@mui/material";
type ButtonProps = React.ComponentProps<typeof BaseButton>;
export default function Button(props: ButtonProps) {
  return (
    <BaseButton
      {...props}
      disableRipple
      disableElevation
      disableFocusRipple
      disableTouchRipple
      sx={{
        "&:hover": { backgroundColor: "transparent" },
        textTransform: "capitalize",
        borderRadius: "0px !important",
        ...props?.style,
        ...props?.sx,
        fontSize: "16px !important",
      }}
    />
  );
}
