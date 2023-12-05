import NoResult from "../NoResult";
import Table from "@mui/material/Table";
import TableLoader from "../TableLoader";
import { TableLoadingWrapperProps } from ".";

export default function TableLoadingWrapper({
	length,
	loading,
	children,
	container,
	rows = 10,
	coloumns = 10,
	message = "No result found",
}: TableLoadingWrapperProps) {
	return (
		<>
			{loading && length === 0 ? (
				<>
					{container ? (
						<Table>
							<TableLoader rows={rows} coloumns={coloumns} />
						</Table>
					) : (
						<TableLoader rows={rows} coloumns={coloumns} />
					)}
				</>
			) : length === 0 ? (
				<>
					{container ? (
						<Table>
							<NoResult message={message} />
						</Table>
					) : (
						<NoResult message={message} />
					)}
				</>
			) : (
				<>{children}</>
			)}
		</>
	);
}
