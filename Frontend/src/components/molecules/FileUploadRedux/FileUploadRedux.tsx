import FileUpload from "components/atoms/FileUpload";
export default function FileUploadRedux({
	input,
	handleBlur,
	handleFocus,
	FileUploadProps,
	meta: { error, touched, invalid },
	...rest
}: any) {
	return (
		<FileUpload
			{...FileUploadProps}
			{...rest}
			{...input}
			helperText={touched && invalid && error}
			error={touched && invalid && error && true}
			onChange={(file: any) => {
				if (file) {
					if (file.error) return input.onChange(file);
					input.onChange({
						name: file.name,
						type: file.type,
						blob: URL.createObjectURL(file),
					});
				} else input.onChange("");
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
