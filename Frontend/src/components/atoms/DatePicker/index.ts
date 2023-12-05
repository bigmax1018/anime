import { InputProps } from "components/atoms/Input/Input";
import { DatePickerProps as BaseDatePickerProps } from "@mui/lab";

export { default } from "./DatePicker";

export interface DatePickerOwnProps {
	editable?: boolean;
	InputFieldProps: InputProps;
	value: { date: any; error: boolean };
}

export type DatePickerProps = DatePickerOwnProps &
	Omit<BaseDatePickerProps, "renderInput">;
