import Input from "../Input";
import { useState } from "react";
import { TimePickerProps } from ".";
import { default as BaseTimePicker } from "@mui/lab/TimePicker";

export default function TimePicker({
	onChange,
	editable,
	InputFieldProps,
	value: { date: value = "" },
	...rest
}: TimePickerProps) {
	const [open, setOpen] = useState(false);
	const InputProps = {
		autoComplete: "off",
		InputLabelProps: { shrink: true },
		...InputFieldProps,
		onClick: () => setOpen(true),
		onKeyDown: (e: any) => {
			if (!editable) e.preventDefault();
		},
		error: InputFieldProps?.helperText ? InputFieldProps?.error : false,
	};

	return (
		<BaseTimePicker
			open={open}
			ampm={false}
			value={value}
			showTodayButton
			ampmInClock={false}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			onChange={(date) =>
				onChange?.({ date: date ? `${date}` : "", error: false })
			}
			onAccept={(date) =>
				onChange?.({ date: date ? `${date}` : "", error: false })
			}
			onError={(reason, date) => {
				if (!reason) return;
				onChange?.({ date: date ? `${date}` : "", error: true });
			}}
			{...rest}
			renderInput={(params) => <Input {...params} {...InputProps} />}
			PopperProps={{ placement: "bottom-start", ...rest.PopperProps }}
		/>
	);
}
