import { AuthState } from ".";
import LocalStorage from "utils/localstorage.service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const user = LocalStorage.getItem("user");
const initialState: AuthState = {
  user,
  tab: "online",
  online: [],
  chat: null,
  loading: false,
  edit: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.chat = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      LocalStorage.setItem("user", state.user);
    },
    setFriends: (state, action) => {
      let itemExists = state.user?.friends.some(
        (item: any) => item._id === action.payload?._id
      );
      if (!itemExists) {
        state.user.friends.push(action.payload);
      }
    },
    removeFriend: (state, action) => {
      const id = action.payload?._id;

      let friends = state.user.friends.filter((item: any) => item._id !== id);
      state.user.friends = friends;
      // state.user.friends = state.user.friends.filter(
      //   ({ _id }: any) => _id !== id
      // );
    },
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setOnline: (state, action) => {
      state.online = action.payload;
    },

    setTab: (state, action) => {
      state.tab = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;
export default authReducer;
