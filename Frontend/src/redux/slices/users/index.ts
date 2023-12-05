export { default, userActions, userSlice } from "./usersSlice";

export interface UserState {
  user: any;
  users: any[];
  roomUsers: any[];
}
