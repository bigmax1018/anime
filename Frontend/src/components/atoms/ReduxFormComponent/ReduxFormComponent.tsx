import { ReduxFormComponentOwnProps } from ".";
import { Field, FieldArray, FormSection } from "redux-form";
type ReduxFormComponentProps = ReduxFormComponentOwnProps & any;
export default function ReduxFormComponent({
	reduxFormComponent: type,
	...rest
}: ReduxFormComponentProps) {
	return (
		<>
			{type === "FieldArray" ? (
				<FieldArray {...rest} />
			) : type === "FormSection" ? (
				<FormSection {...rest} />
			) : (
				<Field id={rest.name} {...rest} />
			)}
		</>
	);
}
