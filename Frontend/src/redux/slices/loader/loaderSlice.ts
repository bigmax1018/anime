import { LoaderState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: LoaderState = {
	loading: [],
};

export const loaderSlice = createSlice({
	name: "loader",
	initialState,
	reducers: {
		clearLoading: (state) => {
			state.loading = [];
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			if (action.payload) state.loading.push(true);
			else state.loading.pop();
		},
	},
});

const loaderReducer = loaderSlice.reducer;

export const loaderActions = loaderSlice.actions;
export default loaderReducer;
