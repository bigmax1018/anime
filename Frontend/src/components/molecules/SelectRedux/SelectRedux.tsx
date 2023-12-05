import Select from "components/atoms/Select";

export default function SelectRedux({
	input,
	hideError,
	handleBlur,
	handleFocus,
	SelectProps,
	handleChange,
	meta: { error, touched, invalid },
	...rest
}: any) {
	return (
		<Select
			{...SelectProps}
			{...rest}
			{...input}
			helperText={!hideError && touched && invalid && error}
			error={!hideError && touched && invalid && error && true}
			onChange={(e) => {
				input.onChange(e.target.value);
				handleChange?.(e);
			}}
			onBlur={(e) => {
				handleBlur?.(e);
				e.preventDefault();
			}}
			onFocus={(e) => {
				handleFocus?.(e);
				e.preventDefault();
			}}
		/>
	);
}
