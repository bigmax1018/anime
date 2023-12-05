import "./Chip.css";
import { makeStyles } from "@mui/styles";

const useStyles: any = makeStyles((theme: any) => ({
	primary: {
		color: theme.palette.primary,
	},
	success: {
		color: theme.palette.success.main,
	},
	info: {
		color: theme.palette.info.main,
	},
	warning: {
		color: theme.palette.warning.main,
	},
	error: {
		color: theme.palette.error.main,
	},
	custom: {
		color: "#42818c",
	},
}));

export default function Chip({ status, ...rest }: any) {
	const classes = useStyles();
	return (
		<span
			className={`class-badge ${
				status === "arrived" ||
				status === "active" ||
				status === "approved" ||
				status === "completed" ||
				status === "paid" ||
				status === "finished"
					? classes.success
					: status === "On the way" ||
					  status === "On hold" ||
					  status === "ongoing" ||
					  status === "started"
					? classes.info
					: status === "accepted"
					? classes.primary
					: status === "rejected" ||
					  status === "cancelled" ||
					  status === "inactive"
					? classes.error
					: status === "pending"
					? classes.custom
					: classes.warning
			}`}
			{...rest}
		>
			{status === "paused" ? "on wait" : status}.
		</span>
	);
}
