import { LoaderState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: LoaderState = {
	loading: false,
};

export const formLoaderSlice = createSlice({
	name: "loader",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

const formLoaderReducer = formLoaderSlice.reducer;

export const formLoaderActions = formLoaderSlice.actions;
export default formLoaderReducer;
