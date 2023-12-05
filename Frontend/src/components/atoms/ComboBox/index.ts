import { SelectOption } from "../Select";
import { ChipProps } from "../ClassChip/ClassChip";
import { InputProps } from "../Input/Input";
export { default } from "./ComboBox";
export interface ComboBoxOwnProps {
	options: SelectOption[];
	ChipProps?: ChipProps;
	InputProps?: InputProps;
}
