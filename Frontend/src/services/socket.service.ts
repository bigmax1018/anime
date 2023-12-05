import io from "socket.io-client";
import { AppDispatch } from "./../redux/store";
import MessageService from "./message.service";
import LocalStorage from "utils/localstorage.service";
import { backgroundActions } from "redux/slices/background";
import { messageActions } from "redux/slices/message";
import AuthService from "./auth.service";
import { authActions } from "redux/slices/auth";
import { gifActions } from "redux/slices/gif";
import { pictureActions } from "redux/slices/picture";
import { videoActions } from "redux/slices/video";
import { musicActions } from "redux/slices/music";

// export const socket = io("http://localhost:3001");
export const socket = io("https://api.animedisney.com");

const SocketService = {
  sendDelete: () => {
    socket.emit("sendDelete");
  },

  sendRegister: () => {
    socket.emit("sendRegister");
  },

  sendMusic: (value: any) => {
    socket.emit("bg-music", value);
  },

  musicState: (value: any) => {
    socket.emit("bg-music-state", value);
  },

  getMusic: (dispatch: any) => {
    // socket.emit("send Music", value, () => console.log("done"));
    socket.on("get-bg-music", (value: any) => {
      dispatch?.(backgroundActions.setMusic(value));
    });
  },
  getMusicState: (dispatch: any) => {
    // socket.emit("send Music", value, () => console.log("done"));
    socket.on("get-bg-music-state", (value: any) => {
      dispatch?.(backgroundActions.setPlay(value));
    });
  },

  sendDeleteChat: () => {
    socket.emit("delete-chat");
  },

  sendUpdatePhoto: () => {
    socket.emit("photoUpdate");
  },

  deleteAllChat: (dispatch: any) => {
    socket.on("deleted-chat", () => {
      dispatch?.(messageActions.setMessages([]));
    });
  },

  OnlineUsers: (dispatch: any) => {
    socket.on("online-users", (data: any) => {
      dispatch?.(authActions.setOnline(data));
    });
  },

  sendDeleteUserChat: (from: any, to: any) => {
    let payload = {
      from,
      to,
    };
    socket.emit("delete-user-chat", payload);
  },

  deleteUserChat: (from: any, dispatch: any) => {
    socket.on("deleted-user-chat", (data) => {
      if (data.from === from) {
        dispatch?.(messageActions.setMessages([]));
      }
    });
  },

  sendLogout: (user: any) => {
    socket.emit("logout", user);
  },

  loggedOut: (user: any) => {
    socket.on("logged-out", (data) => {
      let currentUser = LocalStorage.getItem("user");
      console.log("Here IS", data, currentUser._id);

      if (data === currentUser._id) {
        AuthService.logout();
      }
    });
  },

  sendGif: (value: any) => {
    socket.emit("send-gif", value);
  },

  sendDelGif: (value: any) => {
    socket.emit("send-del-gif", value);
  },

  getGif: (dispatch: any) => {
    socket.on("get-gif", (gif: any) => {
      dispatch?.(gifActions.addGif(gif));
    });
  },
  delGif: (dispatch: any) => {
    socket.on("del-gif", (id: any) => {
      dispatch?.(gifActions.deleteGif(id));
    });
  },

  sendPic: (value: any) => {
    socket.emit("send-pic", value);
  },

  sendDelPic: (value: any) => {
    socket.emit("send-del-pic", value);
  },

  getPic: (dispatch: any) => {
    socket.on("get-pic", (pic: any) => {
      dispatch?.(pictureActions.addPicture(pic));
    });
  },
  delPic: (dispatch: any) => {
    socket.on("del-pic", (id: any) => {
      dispatch?.(pictureActions.deletePicture(id));
    });
  },

  sendVideo: (value: any) => {
    socket.emit("send-video", value);
  },

  sendDelVideo: (value: any) => {
    socket.emit("send-del-video", value);
  },

  getVideo: (dispatch: any) => {
    socket.on("get-video", (video: any) => {
      dispatch?.(videoActions.addVideo(video));
    });
  },
  delVideo: (dispatch: any) => {
    socket.on("del-video", (id: any) => {
      dispatch?.(videoActions.deleteVideo(id));
    });
  },

  sendMusicTab: (value: any) => {
    socket.emit("send-music", value);
  },

  sendDelMusic: (value: any) => {
    socket.emit("send-del-music", value);
  },

  getMusicTab: (dispatch: any) => {
    socket.on("get-music", (music: any) => {
      dispatch?.(musicActions.addMusic(music));
    });
  },
  delMusic: (dispatch: any) => {
    socket.on("del-music", (id: any) => {
      dispatch?.(musicActions.deleteMusic(id));
    });
  },

  sendBg: (value: any) => {
    socket.emit("send-bg", value);
  },
  getBg: (dispatch: any) => {
    socket.on("get-bg", (background: any) => {
      dispatch?.(backgroundActions.setBackground(background?.background));
      dispatch?.(backgroundActions.setProperty(background?.property));
      dispatch?.(backgroundActions.setVideo(background?.video));
    });
  },

  // Below
  // This
  // Code
  // Is
  // Very
  // Old
  // and
  // Not
  // used

  send: (value: any, dispatch: AppDispatch) => {
    // socket.emit("sendMessage", value, () => console.log("done"));

    if (value.trim() && localStorage.getItem("email")) {
      socket.emit("message", {
        text: value,
        name: LocalStorage.getItem("email"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
  },

  message: (dispatch: AppDispatch) => {
    // socket.on("messageResponse", (data: any) => {
    //   MessageService.addMessage(data, dispatch);
    // });
    socket.on("msg-recieved", (msg: any) => {
      let data = {
        fromSelf: false,
        message: msg,
      };
      MessageService.arrivedMessage(data, dispatch);
    });
  },
  // message: (id: any, dispatch: AppDispatch) => {
  //   socket.on("message", (message: any) => {
  //     dispatch(messageActions.addMessage(message));
  //     MessageService.addMessage(id, message);
  //   });
  // },
};

export default SocketService;
