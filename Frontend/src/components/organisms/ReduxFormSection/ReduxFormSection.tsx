import ReduxFormFields from "components/molecules/ReduxFormFields";
export default function ReduxFormSection({ label, fieldsArray }: any) {
	return (
		<>
			<h3>{label}</h3>
			<ReduxFormFields fields={fieldsArray} />
		</>
	);
}
