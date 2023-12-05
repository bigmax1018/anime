import { Grid } from "@mui/material";
import { ReduxFormFieldProps } from ".";
import ReduxFormComponent from "components/atoms/ReduxFormComponent";

export default function ReduxFormFields({
	member,
	fields,
}: ReduxFormFieldProps) {
	return (
		<Grid container spacing={2}>
			{fields.map(
				(
					{ cellProps, reduxFormComponent, ...field }: any,
					index: number
				) => (
					<Grid key={index} item xs={12} {...cellProps}>
						<ReduxFormComponent
							reduxFormComponent={reduxFormComponent}
							{...field}
							name={member ? `${member}.${field.name}` : field.name}
						/>
					</Grid>
				)
			)}
		</Grid>
	);
}
