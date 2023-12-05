const mongoose = require("mongoose");
const http = require("http");

const app = require("./app");
const path = require("path");
const socket = require("socket.io");


const port = process.env.PORT || 3001;
global.Services = path.resolve("./api/v1/Controllers/Services");

const DB = `mongodb+srv://goddessqueenprincess:<PASSWORD>@cluster0.kxjtems.mongodb.net/`.replace("<PASSWORD>", `dKl5f8blKc3HKE1T`);
const mongoose_options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
mongoose
  .connect(DB, mongoose_options)
  .then(() => console.log("DB connection successfully made"));

const server = http.createServer(app);

const running_server = server.listen(port, () => {
  console.log(`Node application is running on port ${port}`);
});

const io = socket(running_server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
//store all online users inside this map
global.onlineUsers = new Map();
const room = "animedisney";

// Helper function to emit online user information to all connected sockets
const emitOnlineUsers = () => {
  const onlineUserIds = Array.from(onlineUsers.keys());
  io.emit("online-users", onlineUserIds);
};

io.on("connection", (socket) => {
  console.log(socket.id);
  global.chatSocket = socket;
  socket.on("photoUpdate", () => {
    console.log("photoUpdate");
    io.emit("photoUpdate");
  });

  socket.on("sendDelete", () => {
    io.emit("photoUpdate");
  });

  socket.on("sendRegister", () => {
    io.emit("photoUpdate");
    // emitOnlineUsers();
  });

  socket.on("add-user", (userId) => {
    if (userId == "Guest") {
      onlineUsers.set("Guest" + parseInt(Math.random() * 9999), socket.id );
    }
    else {
      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, socket.id);

        emitOnlineUsers();
      }
    }

    // let array = Array.from(onlineUsers.keys());
    // socket.emit("online-users", array);

    emitOnlineUsers();
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    data.type = "private";
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieved", data);
    }
  });

  socket.on("joinRoom", (data) => {
    socket.join(room);
    let array = Array.from(onlineUsers.keys());
    socket.emit("online-users", array);
  });

  //user sending message
  socket.on("chat", (data) => {
    io.emit("p-message", {
      userId: data.p_user,
      text: data.message,
      socketId: socket.id,
      type: "public",
    });
  });

  //user deleted chat
  socket.on("delete-chat", () => {
    io.emit("deleted-chat");
  });

  //user deleted message
  socket.on("delete-user-chat", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    data.type = "private";
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("deleted-user-chat", data);
    }
  });

  //user sending bg music
  socket.on("bg-music", (data) => {
    console.log("In Music is Here", data);
    io.emit("get-bg-music", data);
  });

  //user sending play/pause bg music
  socket.on("bg-music-state", (data) => {
    console.log("In Music is Here", data);
    io.emit("get-bg-music-state", data);
  });

  //user sending gif
  socket.on("send-gif", (data) => {
    console.log("In Gif is Here", data);
    io.emit("get-gif", data);
  });
  //user delete gif
  socket.on("send-del-gif", (data) => {
    console.log("Del Gif is Here", data);
    io.emit("del-gif", data);
  });

  //user sending pic
  socket.on("send-pic", (data) => {
    console.log("In pic is Here", data);
    io.emit("get-pic", data);
  });

  //user delete pic
  socket.on("send-del-pic", (data) => {
    console.log("Del pic is Here", data);
    io.emit("del-pic", data);
  });

  //user sending video
  socket.on("send-video", (data) => {
    console.log("In video is Here", data);
    io.emit("get-video", data);
  });
  //user delete video
  socket.on("send-del-video", (data) => {
    console.log("Del video is Here", data);
    io.emit("del-video", data);
  });

  //user sending music
  socket.on("send-music", (data) => {
    console.log("In music is Here", data);
    io.emit("get-music", data);
  });
  //user delete music
  socket.on("send-del-music", (data) => {
    console.log("Del music is Here", data);
    io.emit("del-music", data);
  });

  //user bg
  socket.on("send-bg", (data) => {
    console.log("Sned BG is Here", data);
    io.emit("get-bg", data);
  });

  //user logout
  socket.on("logout", (data) => {
    console.log("Here", data);
    io.emit("logged-out", data);
  });

  //when the user exits the room
  socket.on("disconnect", (userId) => {
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);

        emitOnlineUsers();
      }
    });

    emitOnlineUsers();
    // let array = Array.from(onlineUsers.keys());
    // console.log({ array });
    // socket.emit("online-users", array);

    // socket.disconnect();
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhadles Rejection", err);
  running_server.close(() => {
    process.exit(1);
  });
});
