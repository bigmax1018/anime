import { MessageState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MessageState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.messages = state.messages.filter(({ _id }) => _id !== id);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    updateMessage: (state, action) => {
      const id = action.payload.id;
      state.messages.every(({ _id }, i) => {
        if (id === _id) {
          state.messages[i] = action.payload;
          return false;
        }
        return true;
      });
    },
  },
});

const messageReducer = messageSlice.reducer;

export const messageActions = messageSlice.actions;
export default messageReducer;
