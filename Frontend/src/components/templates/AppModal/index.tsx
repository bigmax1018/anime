import { lazy } from "react";
import { MODAL } from "redux/slices/modal";

const ConfirmationForm = lazy(() => import("./ConfirmationForm"));
const ConfirmationModal = lazy(() => import("./ConfirmationModal"));

export { default } from "./AppModal";

export type ModalMapper = {
	[key in MODAL]: "" | JSX.Element;
};

export const modalMapper: ModalMapper = {
	CONFIRMATION_FORM: <ConfirmationForm />,
	CONFIRMATION_MODAL: <ConfirmationModal />,
};
