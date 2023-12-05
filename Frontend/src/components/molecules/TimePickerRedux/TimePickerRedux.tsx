import TimePicker from "components/atoms/TimePicker";

export default function TimePickerRedux({
	input,
	label,
	InputProps,
	handleBlur,
	handleFocus,
	TimePickerProps,
	meta: { error, touched, invalid },
	...rest
}: any) {
	const { onChange, ...inputRest } = input;

	return (
		<TimePicker
			{...TimePickerProps}
			{...rest}
			value={input.value}
			onChange={onChange}
			InputFieldProps={{
				...TimePickerProps?.InputFieldProps,
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
