import useAutosizeTextArea from "hooks/useAutosizeTextArea";
import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import MessageService from "services/message.service";
import { authActions } from "redux/slices/auth";
export default function UpdateMessage(message: any) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const edit = useAppSelector((state) => state.auth.edit);
  const { messages } = useAppSelector((state) => state.message);

  const updateMessage = (value: any) => {
    console.log({ value });
    
    if (messages[edit].fromSelf) {
      let data = {
        id: messages[edit]._id,
        message: value,
        p_user: user,
        fromSelf: true
      };
      MessageService.updateChat(data, dispatch);
    } else {
      let data = {
        id: messages[edit]._id,
        message: value,
        p_user: user
      };
      MessageService.updateMessage(data, dispatch);
    }
    dispatch(authActions.setEdit(null));
  };

  useAutosizeTextArea(textAreaRef.current, value);

  useEffect(() => {
    setValue(message);
  }, []);
  return (
      <>
      <textarea
        ref={textAreaRef}
        defaultValue={message.message}
        style={{
          resize: "none",
          background: "none",
          border: "none",
          fontSize: "16px",
          lineHeight: 1.333,
          wordBreak: "break-all",
          padding: 0,
          minWidth: "55px",
          overflow: "hidden",
          minHeight: "22.39px",
          position: "absolute",
        }}
        rows={1}
        onChange={(e) => setValue(e.target.value)}
      
        onKeyDown={(e: any) => {
          if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            // if (user) {
            updateMessage(e.target.value);
            // }
          }
        }}
      />
      <div
        style={{
          display: "inline-block",
          visibility: "hidden",
          overflow: "hidden",
          whiteSpace: "pre-wrap",
          fontSize: "16px",
          lineHeight: 1.4,
          wordBreak: "break-all",
          padding: 0,
          maxWidth: "800px",
        }}
      >
      {textAreaRef.current?.value}
      </div>
    </>
  );
}
