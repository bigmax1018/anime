import FormGroup from "@mui/material/FormGroup";
import { Android12Switch, SwitchProps } from ".";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function SwitchButton({
	label = "",
	...rest
}: SwitchProps) {
	return (
		<FormGroup>
			<FormControlLabel
				label={label}
				color="success"
				control={<Android12Switch color="success" {...rest} />}
			/>
			{/* <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Off</Typography>
        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>On</Typography>
      </Stack> */}
		</FormGroup>
	);
}
