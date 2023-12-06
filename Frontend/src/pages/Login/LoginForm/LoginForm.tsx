import { fields } from ".";
import { reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";
function LoginForm({ handleSubmit }: any) {
  return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <div style={{ overflowY: "auto", paddingRight: "5px" }}>
          <ReduxFormFields fields={fields} />
          <Button
            variant="text"
            type="submit"
            disableElevation
            style={{
              minWidth: "auto",
              marginTop: "16px",
              paddingLeft: 0,
              borderColor: "#ffffff",
            }}
          >
            Login
          </Button>
        </div>
      </form>
  );
}
export default reduxForm({ form: "LoginForm" })(LoginForm);
