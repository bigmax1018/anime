import Backdrop from "components/atoms/Backdrop";
import CircularProgress from "components/atoms/CircularProgress";
export default function Loader() {
	return (
		<Backdrop open={true}>
			<CircularProgress />
		</Backdrop>
	);
}
