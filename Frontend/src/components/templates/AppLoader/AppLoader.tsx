import { useEffect } from "react";
import Loader from "components/atoms/Loader";
import { loaderActions } from "redux/slices/loader";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function AppLoader() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.loader.loading);

	useEffect(() => {
		return () => {
			dispatch(loaderActions.clearLoading());
		};
	}, [dispatch]);

	return <>{loading.length !== 0 && <Loader />}</>;
}
