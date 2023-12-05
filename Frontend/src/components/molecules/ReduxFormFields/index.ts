import { Grid } from "@mui/material";
import { InputProps } from "components/atoms/Input/Input";
import { SelectProps } from "components/atoms/Select/Select";
import { RadioGroupProps } from "components/atoms/RadioGroup";
import { DatePickerProps } from "components/atoms/DatePicker";
import { TimePickerProps } from "components/atoms/TimePicker";
import { ComboBoxProps } from "components/atoms/ComboBox/ComboBox";
import { PhoneInputProps } from "components/atoms/PhoneInput/PhoneInput";
import { FileUploadProps } from "components/atoms/FileUpload/FileUpload";
import { CheckBoxProps } from "components/atoms/BaseCheckbox/BaseCheckbox";

export { default } from "./ReduxFormFields";

export type CellProps = React.ComponentProps<typeof Grid>;

type Normalizer = (
	value: any,
	previousValue?: any,
	allValues?: any,
	previousAllValues?: any
) => any;

type Validator = (
	value: any,
	allValues?: any,
	props?: any,
	name?: any
) => any;

interface CommonFieldProps {
	name: string;
	label: string;
	cellProps?: CellProps;
	component: React.ElementType;
}

type FieldProps = CommonFieldProps & {
	hideError?: boolean;

	InputProps?: InputProps;
	SelectProps?: SelectProps;
	ComboBoxProps?: ComboBoxProps;
	CheckBoxProps?: CheckBoxProps;
	RadioGroupProps?: RadioGroupProps;
	PhoneInputProps?: PhoneInputProps;
	DatePickerProps?: DatePickerProps;
	TimePickerProps?: TimePickerProps;
	FileUploadProps?: FileUploadProps;

	normalize?: Normalizer | undefined;
	validate?: Validator | Validator[] | undefined;

	fieldsArray?: never;
	reduxFormComponent?: never;
};

type CommonFormSectionFieldArrayProps = {
	validate?: never;
	normalize?: never;
	hideError?: never;

	InputProps?: never;
	SelectProps?: never;
	ComboBoxProps?: never;
	CheckBoxProps?: never;
	RadioGroupProps?: never;
	PhoneInputProps?: never;
	DatePickerProps?: never;
	TimePickerProps?: never;
	FileUploadProps?: never;

	fieldsArray: ReduxFormField[];
};

type FormSectionProps = CommonFieldProps &
	CommonFormSectionFieldArrayProps & {
		reduxFormComponent: "FormSection";
	};

type FieldArrayProps = CommonFieldProps &
	CommonFormSectionFieldArrayProps & {
		reduxFormComponent: "FieldArray";
	};

export type ReduxFormField =
	| FieldProps
	| FormSectionProps
	| FieldArrayProps;

export interface ReduxFormFieldProps {
	member?: string;
	fields: ReduxFormField[];
}
