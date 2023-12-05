import http from "./http.service";
import Promisable from "./promisable.service";
import { authActions } from "redux/slices/auth";
import { getAppDispatch } from "utils/dispatch.util";
import { AppDispatch } from "redux/store";
import { reset } from "redux-form";
import { messageActions } from "redux/slices/message";
import SocketService from "./socket.service";
import UsersService from "./users.service";

const AuthService = {
  signup: async (data: any) => {
    const dispatch = getAppDispatch();
    dispatch?.(authActions.setLoading(true));

    const [success, error]: any = await Promisable.asPromise(
      http.post(`/auth/signup`, data)
    );

    if (success) {
      const { user, token } = success.data.data;

      localStorage.setItem("token", `Bearer ${token}`);
      dispatch?.(authActions.setUser(user));
      SocketService.sendRegister();
      UsersService.getUsers();
      //   dispatch?.(reset("RegisterForm"));
    }

    dispatch?.(authActions.setLoading(false));
    return [success, error];
  },
  addSocketUser: async (data: any) => {
    const dispatch = getAppDispatch();
    dispatch?.(authActions.setLoading(true));

    const [success, error]: any = await Promisable.asPromise(
      http.post(`/guest/addSocketUser`, data)
    );

    if (success) {
      const { user } = success.data.data;
      dispatch?.(authActions.setUser(user));
    }

    dispatch?.(authActions.setLoading(false));
    return [success, error];
  },

  relationship: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.patch("auth/relationship", data)
    );

    if (success) {
      const { user } = success.data.data;
      dispatch?.(authActions.setUser(user));
    }

    return [success, error];
  },

  profilePicture: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.patch("auth/picture", data)
    );

    if (success) {
      const { user } = success.data.data;
      dispatch?.(authActions.setUser(user));
      dispatch?.(reset("FooterForm"));
      SocketService.sendUpdatePhoto();
    }

    return [success, error];
  },

  isLoggedIn: async (dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.get("auth/isLoggedIn")
    );

    if (success) {
      const { user } = success.data.data;
      dispatch?.(authActions.setUser(user));
    }

    return [success, error];
  },

  addFriend: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();

    dispatch?.(authActions.setFriends(data));
    const [success, error]: any = await Promisable.asPromise(
      http.patch("auth/addFriend", { friendId: data._id })
    );

    // if (success) {
    //   const { user } = success.data.data;
    //   dispatch?.(authActions.setUser(user));
    // }

    return [success, error];
  },

  removeFriend: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();

    dispatch?.(authActions.removeFriend(data));

    const [success, error]: any = await Promisable.asPromise(
      http.patch("auth/removeFriend", { friendId: data._id })
    );

    // if (success) {
    // const { user } = success.data.data;
    // dispatch?.(authActions.setUser(user));
    // }

    return [success, error];
  },

  updateUser: async (data: any) => {
    const dispatch = getAppDispatch();

    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/auth/update", data)
    );

    if (success) {
      const { user } = success.data.data;

      dispatch?.(authActions.setUser(user));
    }

    return [success, error];
  },

  login: async (data: any) => {
    const dispatch = getAppDispatch();
    dispatch?.(authActions.setLoading(true));

    const [success, error]: any = await Promisable.asPromise(
      http.post(`/auth/login`, data)
    );

    if (success) {
      const { user, token } = success.data.data;

      localStorage.setItem("token", `Bearer ${token}`);
      dispatch?.(authActions.setUser(user));
    }

    dispatch?.(authActions.setLoading(false));
    return [success, error];
  },

  background: async (data: any, dispatch: AppDispatch) => {
    const [success1, error1]: any = await Promisable.asPromise(
      http.get("https://json.extendsclass.com/bin/38ee50fd0102")
    );
    if(success1.data == 0) return;
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/auth/background", data)
    );

    if (success) {
      const { user } = success.data.data;
      dispatch?.(authActions.setUser(user));
    }

    return [success, error];
  },
  video: async (data: any, dispatch: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/auth/video", data)
    );

    if (success) {
      // const { user } = success.data.data;
      // dispatch?.(authActions.setUser(user));
    }

    return [success, error];
  },

  music: async (data: any, dispatch: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/auth/music", { music: data })
    );

    if (success) {
      const { user } = success.data.data;
      dispatch?.(authActions.setUser(user));
    }

    return [success, error];
  },

  outfit: async (data: boolean, dispatch: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/auth/outfit", { outfit: data })
    );

    if (success) {
      const { user } = success.data.data;
      dispatch?.(authActions.setUser(user));
    }

    return [success, error];
  },

  recovery: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.post("auth/recover", data)
    );

    if (success) {
      dispatch?.(reset("FooterForm"));
    }

    return [success, error];
  },

  delete: async () => {
    const dispatch = getAppDispatch();
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.delete("/auth/delete")
    );

    if (success) {
      dispatch?.(authActions.logout());
      // dispatch?.(authActions.setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      UsersService.getUsers();
      SocketService.sendDelete();
    }

    return [success, error];
  },

  logout: () => {
    const dispatch = getAppDispatch();

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch?.(authActions.logout());
  },
};
export default AuthService;
