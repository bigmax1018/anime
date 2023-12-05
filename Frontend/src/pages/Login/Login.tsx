// import CircleLoader from "components/atoms/CircleLoader";
// import { useAppSelector } from "redux/hooks";
import AuthService from "services/auth.service";
import LoginForm from "./LoginForm";

export default function Login() {
  // const loading = useAppSelector((state) => state.auth.loading);
  const handleSubmit = async (values: any) => {
    AuthService.login(values);
  };

  return (
    <div>
      {/* {loading && <CircleLoader />} */}
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}
