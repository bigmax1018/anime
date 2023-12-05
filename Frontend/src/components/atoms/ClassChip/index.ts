import { makeStyles } from "@mui/styles";

export { default } from "./ClassChip";

export const useClassChipStyles: any = makeStyles((theme: any) => ({
	business: {
		backgroundColor: "#EBE4FE",
		color: "#A783FF",
	},
	first: {
		backgroundColor: "#EBF9FF",
		color: "#00C3FF",
	},
	van: {
		backgroundColor: "#F8FFFA",
		color: "#2FDE9E",
	},
	bus: {
		backgroundColor: "#E6E9F4",
		color: "#2C3559",
	},
	info: {
		backgroundColor: "#FFF5DA",
		color: "#FFC020",
	},
}));
