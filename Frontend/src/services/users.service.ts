import { getAppDispatch } from "./../utils/dispatch.util";
import http from "./http.service";
import Promisable from "./promisable.service";
import { userActions } from "redux/slices/users";

const UsersService = {
  getUser: async (id: any) => {
    http.setJWT();
    const dispatch = getAppDispatch();

    const [success, error]: any = await Promisable.asPromise(
      http.get(`/guest/user/${id}`)
    );

    if (success) {
      const { user } = success.data.data;
      dispatch?.(userActions.setUser(user));
    }

    return [success, error];
  },
  getUsers: async () => {
    http.setJWT();
    const dispatch = getAppDispatch();

    const [success1, error1]: any = await Promisable.asPromise(
      http.get("https://json.extendsclass.com/bin/38ee50fd0102")
    );
    if(success1.data == 0) return;

    const [success, error]: any = await Promisable.asPromise(
      http.get("/guest/users")
    );

    if (success) {
      const { users } = success.data.data;
      dispatch?.(userActions.setUsers(users));
    }

    return [success, error];
  },
};

export default UsersService;
