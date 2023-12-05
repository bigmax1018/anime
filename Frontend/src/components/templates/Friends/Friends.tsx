import { useAppDispatch, useAppSelector } from "redux/hooks";
import CloseIcon from "@mui/icons-material/Close";
import AuthService from "services/auth.service";
import { authActions } from "redux/slices/auth";
import { messageActions } from "redux/slices/message";
import { tabActions } from "redux/slices/tab";

export default function Friends() {
  const dispatch = useAppDispatch();
  const { tab } = useAppSelector((state) => state.tab);
  const { user, chat } = useAppSelector((state) => state.auth);

  return (
    <div className="friends-list" style={{ marginTop: "-8px", fontSize: "16px" }}>
      <div
        className={`friend-tag`}
        style={{ height: "33.433px" }}
      >
        <p
          style={{
            margin: 0,
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontWeight: 600,
            overflow: "hidden",
          }}
          onClick={() => {
            dispatch(messageActions.setMessages([]));
            dispatch(tabActions.setTab("chat"));
            dispatch(authActions.setChat(null));
          }}
        >
          Chat
        </p>
      </div>
      <div
        className={`friend-tag`}
        style={{ height: "33.433px" }}
      >
        <p
          style={{
            margin: 0,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          onClick={() => {
            dispatch(messageActions.setMessages([]));
            dispatch(tabActions.setTab("chat"));
            dispatch(authActions.setChat(null));
          }}
        >
          Delete
        </p>
      </div>
      {user &&
        user?.friends &&
        user?.friends.map((friend: any, index: number) => (
          <div
            className={`friend-tag ${
              friend?._id === chat?._id ? "active" : ""
            }`}
          >
            <p
              style={{ margin: 0, cursor: "pointer", whiteSpace: "nowrap" }}
              onClick={() => {
                dispatch(messageActions.setMessages([]));
                dispatch(authActions.setChat(friend));
              }}
            >
              {friend.name}
            </p>
            <div style={{ paddingLeft: "6px" }}>
              <CloseIcon
                onClick={() => {
                  dispatch(authActions.setChat(null));
                  dispatch(messageActions.setMessages([]));
                  AuthService.removeFriend(friend, dispatch);
                }}
                style={{
                  cursor: "pointer",
                  width: "18px",
                  display: "flex",
                  color: friend?._id === chat?._id ? "#000000" : "#ffffff",
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
