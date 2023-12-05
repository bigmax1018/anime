import { MyFormProps } from ".";
import Button from "components/atoms/Button";
import { InjectedFormProps, reduxForm } from "redux-form";
import ReduxFormFields from "components/molecules/ReduxFormFields";
import { Stack } from "@mui/material";

const MyForm = ({
  myFields,
  handleSubmit,
  onClickReset,
  onClickExport,
}: MyFormProps & InjectedFormProps<{}, MyFormProps>) => {
  return (
    <form onSubmit={handleSubmit}>
      <ReduxFormFields fields={myFields} />
      
      <Stack direction="row" justifyContent="space-between">
        <div>
          {onClickReset && (
            <Button
              type="reset"
              variant="outlined"
              onClick={onClickReset}
              sx={{ marginRight: "10px" }}
            >
              Reset
            </Button>
          )}
          <Button variant="contained" type="submit">
            Search
          </Button>
        </div>
        {onClickExport && (
          <Button
            type="button"
            color="success"
            variant="contained"
            onClick={onClickExport}
            sx={{ marginLeft: "10px" }}
          >
            Export
          </Button>
        )}
      </Stack>
    </form>
  );
};

export default reduxForm<{}, MyFormProps>({ form: "MyForm" })(MyForm);
