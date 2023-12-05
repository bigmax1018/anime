import { TableLoaderProps } from ".";
import { Skeleton, TableBody } from "@mui/material";
import {
	StyledTableRow,
	StyledTableCell,
} from "components/templates/Tables";

export default function TableLoader({
	rows = 10,
	coloumns = 10,
}: TableLoaderProps) {
	return (
		<TableBody>
			{Array(rows)
				.fill(1)
				.map((_rows, index) => (
					<StyledTableRow key={index}>
						{Array(coloumns)
							.fill(1)
							.map((_coloumn, index) => (
								<StyledTableCell key={index}>
									<Skeleton animation="wave" />
								</StyledTableCell>
							))}
					</StyledTableRow>
				))}
		</TableBody>
	);
}
