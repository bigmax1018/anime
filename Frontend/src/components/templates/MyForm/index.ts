import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./MyForm";

export type MyFormProps = {
	form?: string;
	onClickReset?: () => void;
	onClickExport?: () => void;
	myFields: ReduxFormField[];
};
