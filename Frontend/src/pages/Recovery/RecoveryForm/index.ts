import { email, required } from "utils/validate.util";
import InputRedux from "components/molecules/InputRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./RecoveryForm";

export const fields: ReduxFormField[] = [
  {
    name: "email",
    label: "Email",
    // validate: [required, email],
    component: InputRedux,
    cellProps: { md: 12 },
    InputProps: { type: "email" },
  },
];
