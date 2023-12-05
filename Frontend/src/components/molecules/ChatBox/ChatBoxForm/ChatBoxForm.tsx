import { Field, reduxForm } from "redux-form";
import { useAppSelector } from "redux/hooks";
import { useEffect, useState } from 'react';
function ChatBoxForm({ handleSubmit }: any) {
  const user = useAppSelector((state) => state.auth.user);
  const { messages } = useAppSelector((state) => state.message);
  const edit = useAppSelector((state) => state.auth.edit);
  const [value, setValue] = useState("");
  useEffect(() => {
    if(edit != null) {
      setValue(messages[edit].message);
    }
  }, [edit]);
  return (
    <form
      onSubmit={handleSubmit}
      className="form"
      style={{ alignItems: "stretch" }}
    >
      <Field
        type="text"
        name="message"
        value={value}
        // placeholder={
        //   user ? "Message" : "Please login to enter message"
        // }
        // disabled={!user}
        component="textarea"
        rows={6}
        style={{
          width: "100%",
          margin: "0",
          background: "none",
          border: "2px solid #ffffff",
        }}
        onKeyDown={(e: any) => {
          if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            // if (user) {
              handleSubmit();
            // }
          }
        }}
      />
      
      <button
        // disabled={!user}
        type="submit"
        style={{
          cursor: "pointer",
          color: "white",
          padding: "18px 24px",
          background: "none",
          border: "2px solid #ffffff",
          borderLeft: 0,
        }}
      >
        Send
      </button>
    </form>
  );
}

export default reduxForm({ form: "ChatBoxForm" })(ChatBoxForm);
