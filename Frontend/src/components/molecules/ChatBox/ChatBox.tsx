import { useAppDispatch, useAppSelector } from "redux/hooks";
// import { messageActions } from "redux/slices/message";
import ChatBoxForm from "./ChatBoxForm";
import { reset, change } from "redux-form";
import MessageService from "services/message.service";
import AuthService from "services/auth.service";
import { useEffect, useState } from 'react';
import { authActions } from "redux/slices/auth";

export default function ChatBox({ socket }: any) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const chat = useAppSelector((state) => state.auth.chat);
  const edit = useAppSelector((state) => state.auth.edit);
  const { socketId } = useAppSelector((state) => state.socket);
  const { messages } = useAppSelector((state) => state.message);
  // useEffect(() => {
  //   if(edit != null) {
  //     // alert(messages[edit].message);
  //     dispatch(change("ChatBoxForm", "message", messages[edit].message));
  //   }
  // }, [edit]);
  // const chat = useAppSelector((state) => state.chat.chats);
  // const guest = useAppSelector((state) => state.user.user);
  const handleSubmit = (values: any) => {
    if (!values?.message) return;
    if(edit != null) {
      let data = {
        id: messages[edit]._id,
        message: values?.message
      };
      MessageService.updateChat(data, dispatch);
      dispatch(authActions.setEdit(null));
      dispatch(reset("ChatBoxForm"));
      return;
    }
    // if (values?.message.trim() && localStorage.getItem('email')) {
    //   socket.emit('message', {
    //     text: values?.message,
    //     name: localStorage.getItem('email'),
    //     id: `${socket.id}${Math.random()}`,
    //     socketID: socket.id,
    //   });
    // }
    // SocketService.send(values?.message, dispatch);
    if (chat) {
      let data = {
        from: user._id,
        to: chat._id,
        message: values?.message,
      };

      MessageService.addMessage(data, dispatch);

      socket.current.emit("send-msg", data);

      AuthService.relationship({ id: chat._id });
    } else {
      if (user) {
        let new_user = { ...user };
        delete new_user.password;

        let data = {
          fromSelf: true,
          message: values?.message,
          p_user: new_user,
        };

        MessageService.addChat(data, dispatch);

        socket.current.emit("chat", data);
      }
      else {
        let new_user = { ...user };
        let data = {
          fromSelf: true,
          message: values?.message,
          p_user: new_user,
          socketId: socketId
        };

        MessageService.addGuestChat(data, dispatch);

        socket.current.emit("chat", data);
      }
    }
    dispatch(reset("ChatBoxForm"));
  };

  return <ChatBoxForm onSubmit={handleSubmit} />;
}
