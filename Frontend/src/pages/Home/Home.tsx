import { Grid } from "@mui/material";
import Chat from "pages/Chat";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import Gifs from "pages/Gifs";
import Pictures from "pages/Pictures";
import Music from "pages/Music";
import Videos from "pages/Videos";
import User from "pages/User";
import Members from "pages/Members";
import SailorMoon from "pages/SailorMoon";
import ChatBox from "components/molecules/ChatBox";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import MessageService from "services/message.service";
import { authActions } from "redux/slices/auth";
import { socketActions } from "redux/slices/socket";
import { messageActions } from "redux/slices/message";
import UsersService from "services/users.service";

export default function Home() {
  const socket: any = useRef();
  const dispatch = useAppDispatch();
  const { tab } = useAppSelector((state) => state.tab);
  const { users } = useAppSelector((state) => state.user);
  
  const {
    user,
    online,
    tab: memberTab,
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // socket.current = io("http://localhost:3001");
    socket.current = io("https://api.animedisney.com");
    socket.current.on("online-users", (data: any) => {
      console.log(data);
      dispatch(authActions.setOnline(data));
    });
    socket.current.on("connect", () => {
      dispatch(socketActions.setId(socket.current.id));
    });
    socket.current.on("photoUpdate", () => {
      UsersService.getUsers();
    });
    socket.current.on("p-message", (msg: any) => {
      let data = {
        fromSelf: false,
        message: msg.text,
        p_user: msg?.userId,
        type: msg.type,
      };
      if (msg?.userId?._id == undefined && socket.current.id != msg?.socketId || user?._id !== msg?.userId?._id) {
        MessageService.arrivedMessage(data, dispatch);
      }
    });
    
    if (user) {
      socket.current.emit("add-user", user._id);
      socket.current.emit("joinRoom", {
        userId: user._id,
        room: "animedisney",
      });
      socket.current.on("msg-recieved", (msg: any) => {
        let data = {
          fromSelf: false,
          message: msg.message,
          type: msg.type,
        };
        MessageService.arrivedMessage(data, dispatch);
      });
      
      
    } else {
      socket.current.emit("add-user", "Guest");
    }
    return () => {
      socket.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieved", (msg: any) => {
  //       let data = {
  //         fromSelf: false,
  //         message: msg.message,
  //         type: msg.type,
  //       };
  //       MessageService.arrivedMessage(data, dispatch);
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("p-message", (msg: any) => {
  //       let data = {
  //         fromSelf: false,
  //         message: msg.text,
  //         p_user: msg?.userId,
  //         type: msg.type,
  //       };
  //       if (user?._id !== msg?.userId?._id) {
  //         MessageService.arrivedMessage(data, dispatch);
  //       }
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("online-users", (data: any) => {
  //       dispatch(authActions.setOnline(data));
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (user?.friends?.length > 0) {
    } else {
      dispatch(messageActions.setMessages([]));
      MessageService.getChat(dispatch);
    }
    if (!user) {
      dispatch(messageActions.setMessages([]));
      MessageService.getChat(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="main">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <div
            className="basic-box left-section"
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "space-between",
              flexDirection: "column",
              overflow: "hidden"
              // height: "calc(100vh - 124px)",
            }}
          >
            <SailorMoon />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ position: "relative" }}>
            <div className="center-box">
              {tab === "chat" ? (
                <Chat />
              ) : tab === "gifs" ? (
                <Gifs />
              ) : tab === "pictures" ? (
                <Pictures />
              ) : tab === "videos" ? (
                <Videos />
              ) : tab === "music" ? (
                <Music />
              ) : tab === "user" ? (
                <User />
              ) : (
                ""
              )}
              {tab === "chat" ? (
                <ChatBox socket={socket} />
              ) : tab === "user" ? (
                ""
              ) : (
                ""
                // <UploadBox />
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <h2
            className="heading"
            style={{
              // marginTop: "2px",
              padding: "0 24px",
            }}
          >
            <span
              className={`${memberTab === "online" ? "active" : ""}`}
              onClick={() => dispatch(authActions.setTab("online"))}
            >
              {" "}
              Online ({online?.length ?? 0}){" "}
            </span>

            <span
              className={`${memberTab === "registered" ? "active" : ""}`}
              onClick={() => dispatch(authActions.setTab("registered"))}
            >
              {" "}
              Registered ({users.length})
            </span>
            <span
              className={`${memberTab === "friends" ? "active" : ""}`}
              onClick={() => dispatch(authActions.setTab("friends"))}
            >
              {" "}
              Friends ({user?.friends?.length ?? 0})
            </span>
          </h2>
          <div
            className="basic-box right-section"
            style={{ height: "calc( 100vh - 164px )" }}
          >
            <Members userId={null}/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
