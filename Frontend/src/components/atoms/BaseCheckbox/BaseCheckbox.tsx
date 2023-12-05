import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface CheckBoxOwnProps {
	label?: string | number | React.ReactElement;
	FormControlLabelProps?: Omit<
		React.ComponentProps<typeof FormControlLabel>,
		"control"
	>;
}

export type CheckBoxProps = CheckBoxOwnProps &
	React.ComponentProps<typeof Checkbox>;

export default function BaseCheckbox({
	label = "",
	FormControlLabelProps,
	...rest
}: CheckBoxProps) {
	return (
		<FormControlLabel
			control={<Checkbox {...rest} />}
			{...FormControlLabelProps}
			label={label}
		/>
	);
}
