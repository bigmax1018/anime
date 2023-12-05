import { Grid } from "@mui/material";
import ReduxFormFields from "components/molecules/ReduxFormFields";
export default function GridFormSection({ label, fieldsArray }: any) {
	return (
		<Grid container alignItems="center">
			<Grid item md={3}>
				<p
					style={{
						margin: 0,
						whiteSpace: "nowrap",
						paddingRight: "15px",
						fontWeight: "500",
					}}
				>
					{label}
				</p>
			</Grid>
			<Grid item md={9}>
				<ReduxFormFields fields={fieldsArray} />
			</Grid>
		</Grid>
	);
}
