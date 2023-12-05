import { default as BaseCircularProgress } from "@mui/material/CircularProgress";
type BaseCircularProgressProps = React.ComponentProps<
	typeof BaseCircularProgress
>;
export default function CircularProgress(
	props: BaseCircularProgressProps
) {
	return <BaseCircularProgress color="inherit" {...props} />;
}
