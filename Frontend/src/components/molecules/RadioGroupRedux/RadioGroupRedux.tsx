import RadioGroup from "components/atoms/RadioGroup";

export default function RadioGroupRedux({
	input,
	handleBlur,
	handleFocus,
	RadioGroupProps,
	...rest
}: any) {
	return (
		<RadioGroup
			{...RadioGroupProps}
			{...rest}
			{...input}
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
