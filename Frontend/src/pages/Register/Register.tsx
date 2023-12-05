import CircleLoader from "components/atoms/CircleLoader";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { getAppDispatch } from "./../../utils/dispatch.util";
import AuthService from "services/auth.service";
import RegisterForm from "./RegisterForm";
import { userActions } from "redux/slices/users";

export default function Register() {
  const dispatch = getAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const { user } = useAppSelector((state) => state.auth);
  const loading = useAppSelector((state) => state.auth.loading);
  const handleSubmit = async (values: any) => {
    delete values.partner;
    values.dob = values?.dob?.date;
    if (user) {
      const result = await AuthService.updateUser(values);

      let tempusers = [];
      if (result[0]) {
        const currentUser = result[0].data.data.user;
        for (let i = 0; i < users.length; i++) {
          if (users[i]._id === currentUser._id) {
            tempusers.push({
              ...currentUser,
              friends: currentUser.friends.length === 0 ? [] : currentUser.friends.map((each: any) => { return each._id }),
              partner: currentUser.partner?._id,
            });
          } else {
            tempusers.push(users[i])
          }
        }
        dispatch?.(userActions.setUsers(tempusers));
      }
    } else {
      AuthService.signup(values);
    }
  };

  return (
    <div>
      {loading && <CircleLoader />}
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}
