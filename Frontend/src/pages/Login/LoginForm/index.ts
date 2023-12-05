import { required } from "utils/validate.util";
import InputRedux from "components/molecules/InputRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./LoginForm";

export const fields: ReduxFormField[] = [
  {
    name: "email",
    label: "Email",
    // validate: [required],
    component: InputRedux,
    cellProps: { md: 12 },
  },
  {
    name: "password",
    label: "Password",
    // validate: [required],
    component: InputRedux,
    cellProps: { md: 12 },
    InputProps: { showIcon: true, type: "password" },
  },
];
