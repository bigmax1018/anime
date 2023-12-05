import AuthService from "services/auth.service";
import RecoveryForm from "./RecoveryForm";

export default function Recovery() {
  const handleSubmit = async (values: any) => {
    AuthService.recovery(values);
  };

  return <RecoveryForm onSubmit={handleSubmit} />;
}
