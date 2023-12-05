import Input from "../Input";
import { ComboBoxOwnProps } from ".";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip } from "@mui/material";

export type ComboBoxProps = ComboBoxOwnProps &
	Omit<React.ComponentProps<typeof Autocomplete>, "renderInput">;

export default function ComboBox({
	options = [],
	ChipProps,
	InputProps,
	...rest
}: ComboBoxProps) {
	return (
		<Autocomplete
			{...rest}
			options={options}
			getOptionLabel={(option: any) => option.label}
			isOptionEqualToValue={(option: any, value: any) =>
				option?.value === value?.value
			}
			renderTags={(options: any[], getTagProps) =>
				options.map(({ label }: any, index: number) => (
					<Chip
						label={label}
						variant="filled"
						size={"small"}
						{...getTagProps({ index })}
						{...ChipProps}
					/>
				))
			}
			renderInput={(params) => (
				<Input
					{...params}
					{...InputProps}
					inputProps={{
						autoComplete: "new-password",
						form: { autoComplete: "off" },
						...params.inputProps,
						...InputProps?.inputProps,
					}}
				/>
			)}
		/>
	);
}
