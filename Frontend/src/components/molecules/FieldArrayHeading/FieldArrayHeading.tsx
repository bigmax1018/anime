import { FieldArrayHeadingProps } from ".";
import Button from "components/atoms/Button";

export default function FieldArrayHeading({
	index,
	onClick,
	heading,
	fieldsLength,
}: FieldArrayHeadingProps) {
	return (
		<h3
			style={{
				margin: "0",
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			{index + 1}. {heading}
			{fieldsLength > 1 && <Button onClick={onClick}>Remove</Button>}
		</h3>
	);
}
