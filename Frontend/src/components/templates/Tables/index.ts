import { styled } from "@mui/system";
import { TableRow, TableCell, tableCellClasses } from "@mui/material";

export { default } from "./Tables";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	td: { border: 0 },
	background: "#ffffff",
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		paddingTop: "0",
		color: "#1e2731",
		fontWeight: "600",
		paddingBottom: "0",
		borderBottomWidth: "0px",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 16,
		color: "rgb(0 0 0 / 70%)",
	},
}));
