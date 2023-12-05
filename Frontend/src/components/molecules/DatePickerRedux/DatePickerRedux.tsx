import DatePicker from "components/atoms/DatePicker";

export default function DatePickerRedux({
	input,
	label,
	InputProps,
	handleBlur,
	handleFocus,
	DatePickerProps,
	meta: { error, touched, invalid },
	...rest
}: any) {
	const { onChange, ...inputRest } = input;

	return (
		<DatePicker
			{...DatePickerProps}
			{...rest}
			value={input.value}
			onChange={onChange}
			InputFieldProps={{
				...InputProps,
				...inputRest,
				label,
				helperText: touched && invalid && error,
				error: touched && invalid && error && true,
				onBlur: (e) => {
					handleBlur?.(e);
					e.preventDefault();
				},
				onFocus: (e) => {
					handleFocus?.(e);
					e.preventDefault();
				},
			}}
		/>
	);
}
