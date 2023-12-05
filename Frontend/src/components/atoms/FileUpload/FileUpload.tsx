import Input from "../Input";
import { FileUploadOwnProps } from ".";
import ToasterService from "utils/toaster.util";

export type FileUploadProps = FileUploadOwnProps &
	React.ComponentProps<typeof Input>;

export default function FileUpload({
	value,
	accept,
	maxSize,
	onChange,
	...rest
}: FileUploadProps) {
	return (
		<Input
			{...rest}
			type="file"
			inputProps={{ accept, ...rest.inputProps }}
			InputLabelProps={{ shrink: true, ...rest.InputLabelProps }}
			onChange={(e: any) => {
				let file = e.target.files?.[0];
				if (!file) return onChange?.(file);
				if (accept) {
					let types = file.name.split(".");
					let type = types[types.length - 1].toLowerCase();
					if (!accept.includes(`.${type}`)) {
						ToasterService.showError(`${type} not allowed!`);
						let error: any = { error: `${type} not allowed!` };
						return onChange?.(error);
					}
				}
				if (maxSize) {
					let size = maxSize * 1024 * 1024;
					if (file.size > size) {
						ToasterService.showError(`Max file size is ${maxSize} MB`);
						let error: any = { error: `Max file size is ${maxSize} MB` };
						return onChange?.(error);
					}
				}
				onChange?.(file);
			}}
		/>
	);
}
