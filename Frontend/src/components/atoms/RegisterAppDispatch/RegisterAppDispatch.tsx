import { useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { setAppDispatch } from "utils/dispatch.util";

export default function RegisterAppDispatch() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		setAppDispatch(dispatch);
	}, [dispatch]);

	return null;
}
