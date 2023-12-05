import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import tabReducer from "./slices/tab";
import gifReducer from "./slices/gif";
import authReducer from "./slices/auth";
import userReducer from "./slices/users";
import musicReducer from "./slices/music";
import videoReducer from "./slices/video";
import modalReducer from "./slices/modal";
import loaderReducer from "./slices/loader";
import pictureReducer from "./slices/picture";
import backgroundReducer from "./slices/background";
import formLoaderReducer from "./slices/formLoader";
import messageReducer from "./slices/message/messageSlice";
import socketReducer from "./slices/socket";

const appReducer = combineReducers({
  form: formReducer,
  socket: socketReducer,
  tab: tabReducer,
  gif: gifReducer,
  auth: authReducer,
  user: userReducer,
  music: musicReducer,
  video: videoReducer,
  modal: modalReducer,
  loader: loaderReducer,
  picture: pictureReducer,
  message: messageReducer,
  background: backgroundReducer,
  formLoader: formLoaderReducer,
});

const rootReducer = (state: any, action: any) => {
  // if (action.type === "auth/logout") state.auth = {};
  return appReducer(state, action);
};

export default rootReducer;
