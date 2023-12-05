export { default, modalActions, modalSlice } from "./modalSlice";

export enum MODAL {
	CONFIRMATION_FORM = "CONFIRMATION_FORM",
	CONFIRMATION_MODAL = "CONFIRMATION_MODAL",
}

export type ModalType = "" | keyof typeof MODAL;

export interface OpenModalState {
	data: any;
	width: any;
	type: ModalType;
	loading?: boolean;
}

export type ModalState = OpenModalState & {
	open: boolean;
};
