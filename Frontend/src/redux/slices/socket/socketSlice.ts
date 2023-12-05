import { SocketState } from ".";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SocketState = {
  socketId: ""
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.socketId = action.payload;
    },
  },
});

const socketReducer = socketSlice.reducer;

export const socketActions = socketSlice.actions;
export default socketReducer;
