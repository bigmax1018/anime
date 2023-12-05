import { FieldErrorProps } from ".";

export default function FieldError({ error }: FieldErrorProps) {
	return (
		<div
			style={{
				marginTop: "3px",
				fontSize: "16px",
				color: "rgb(183, 33, 54)",
			}}
		>
			* {error}
		</div>
	);
}
