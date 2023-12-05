import { ModalState, OpenModalState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalState = {
	type: "",
	data: null,
	open: false,
	width: "50%",
	loading: false,
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		updateData(state, action) {
			const data = action.payload;
			state.data = state.data ? { ...state.data, ...data } : data;
		},
		openModal(state, action: PayloadAction<OpenModalState>) {
			const { type, data, width } = action.payload;

			state.data = data;
			state.type = type;
			state.open = true;
			state.width = width;
		},
		closeModal(state) {
			state.type = "";
			state.data = null;
			state.open = false;
			state.width = "50%";
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

const modalReducer = modalSlice.reducer;

export const modalActions = modalSlice.actions;
export default modalReducer;
