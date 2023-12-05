import { RadioGroupProps } from ".";
import {
	Radio,
	FormLabel,
	FormControl,
	FormControlLabel,
	RadioGroup as BaseRadioGroup,
} from "@mui/material";

export default function RadioGroup({
	label = "",
	values = [],
	...rest
}: RadioGroupProps) {
	return (
		<FormControl>
			<FormLabel id={`radio-group-${label.toLowerCase()}`}>
				{label}
			</FormLabel>
			<BaseRadioGroup
				row
				name="radio-group"
				aria-labelledby={`radio-group-${label.toLowerCase()}`}
				{...rest}
			>
				{values.map(({ value, label }, i) => (
					<FormControlLabel
						key={i}
						value={value}
						label={label}
						control={<Radio />}
					/>
				))}
			</BaseRadioGroup>
		</FormControl>
	);
}
