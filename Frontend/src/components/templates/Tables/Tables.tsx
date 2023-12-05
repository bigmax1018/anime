import { StyledTableCell, StyledTableRow } from ".";
import {
	Table,
	TableRow,
	TableHead,
	TableBody,
	TableContainer,
} from "@mui/material";
export default function Tables({ headData, bodyData }: any) {
	return (
		<TableContainer>
			<Table
				sx={{
					minWidth: "100%",
					borderCollapse: "separate",
					borderBottomWidth: "0px",
					borderSpacing: "0 10px",
				}}
				aria-label="customized table"
			>
				<TableHead>
					<TableRow>
						{headData.map((head: any, index: any) => (
							<StyledTableCell key={index}>{head}</StyledTableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{bodyData.map((row: any, index: any) => (
						<StyledTableRow key={index}>
							{Object.keys(row).map((item) => (
								<StyledTableCell key={index}>{row[item]}</StyledTableCell>
							))}
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
