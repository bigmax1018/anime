import "./Header.css";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { tabActions } from "redux/slices/tab";
import { useNavigate } from "react-router-dom";
import { authActions } from "redux/slices/auth";
import { messageActions } from "redux/slices/message";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tab } = useAppSelector((state) => state.tab);
  return (
    <header>
      <div className="navbar">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} lg={6}>
            <ul>
              <li
                onClick={() => {
                  navigate("/");
                  dispatch(messageActions.setMessages([]));
                  dispatch(tabActions.setTab("chat"));
                  dispatch(authActions.setChat(null));
                }}
                style={{ fontWeight: tab === "chat" ? "900" : "500", overflow: "hidden", paddingRight: "0px" }}
              >
                Chat
              </li>
              <li
                onClick={() => dispatch(tabActions.setTab("gifs"))}
                style={{ fontWeight: tab === "gifs" ? "900" : "500", overflow: "hidden", paddingRight: "0px" }}
              >
                Gif
              </li>
              <li
                onClick={() => dispatch(tabActions.setTab("pictures"))}
                style={{ fontWeight: tab === "pictures" ? "900" : "500", overflow: "hidden", paddingRight: "0px" }}
              >
                Picture
              </li>
              <li
                onClick={() => dispatch(tabActions.setTab("videos"))}
                style={{ fontWeight: tab === "videos" ? "900" : "500", overflow: "hidden", paddingRight: "0px" }}
              >
                Video
              </li>
              <li
                onClick={() => dispatch(tabActions.setTab("music"))}
                style={{ fontWeight: tab === "music" ? "900" : "500", overflow: "hidden", paddingRight: "0px" }}
              >
                Music
              </li>
              <li
                onClick={() => {
                  navigate("/");
                  dispatch(tabActions.setTab("user"));
                }}
                style={{ fontWeight: tab === "user" ? "900" : "500", overflow: "hidden", paddingRight: "0px" }}
              >
                User
              </li>
            </ul>
          </Grid>
        </Grid>
      </div>
    </header>
  );
}
