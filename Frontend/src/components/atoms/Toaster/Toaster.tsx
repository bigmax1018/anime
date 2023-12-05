import { useSnackbar } from "notistack";
import useEffectOnce from "hooks/useEffectOnce";
import ToasterService from "utils/toaster.util";

export default function Toaster() {
	const { enqueueSnackbar } = useSnackbar();

	useEffectOnce(() => {
		const success = (msg: string) =>
			msg && enqueueSnackbar(msg, { variant: "success" });

		const error = (msg: string) =>
			msg && enqueueSnackbar(msg, { variant: "error" });

		ToasterService.subscribe(success, error);
	});

	return null;
}
