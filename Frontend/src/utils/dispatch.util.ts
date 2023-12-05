import { AppDispatch } from "redux/store";

let dispatchFunction: AppDispatch | undefined;

export const getAppDispatch = () => dispatchFunction;
export const setAppDispatch = (dispatch: AppDispatch) =>
	(dispatchFunction = dispatch);
