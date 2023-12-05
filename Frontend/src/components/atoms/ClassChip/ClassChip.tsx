import { useClassChipStyles } from ".";
import { Chip as BaseChip } from "@mui/material";

export type ChipProps = React.ComponentProps<typeof BaseChip>;

export default function ClassChip(props: ChipProps) {
	const classes = useClassChipStyles();

	return (
		<BaseChip
			{...props}
			className={
				props.label === "Business"
					? classes.business
					: props.label === "First"
					? classes.first
					: props.label === "Van"
					? classes.van
					: props.label === "Bus"
					? classes.bus
					: classes.info
			}
			style={{
				fontSize: "12px",
				textTransform: "capitalize",
				paddingLeft: "10px",
				paddingRight: "10px",
			}}
		/>
	);
}
