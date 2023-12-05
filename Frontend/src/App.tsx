import "./App.css";

import { BrowserRouter, useLocation } from "react-router-dom";

import AppRoutes from "routes/AppRoutes";
import Toaster from "components/atoms/Toaster";
import Header from "components/templates/Header";
import AppModal from "components/templates/AppModal";
import RegisterAppDispatch from "components/atoms/RegisterAppDispatch";

import theme from "./theme";
import React, { useEffect, useRef } from "react";
import createCache from "@emotion/cache";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/lab";
import dateAdapter from "@mui/lab/AdapterDateFns";
import "lightgallery.js/dist/css/lightgallery.css";
import { ThemeProvider } from "@mui/material/styles";
import { LightgalleryProvider } from "react-lightgallery";
import { backgroundActions } from "redux/slices/background";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ImageService from "services/image.service";
import AuthService from "services/auth.service";
import SocketService from "services/socket.service";

const cache = createCache({ key: "css", prepend: true });

export default function App() {
  const dispatch = useAppDispatch();
  const { user, chat } = useAppSelector((state) => state.auth);
  const visitedUser = useAppSelector((state) => state.user.user);
  const { background, property, video } = useAppSelector(
    (state) => state.background
  );

  useEffect(() => {
    if (visitedUser) {
      dispatch(backgroundActions.setBackground(visitedUser?.background));
      dispatch(backgroundActions.setProperty(visitedUser?.property));
      dispatch(backgroundActions.setVideo(visitedUser?.video));
    } else if (user) {
      dispatch(backgroundActions.setBackground(user?.background));
      dispatch(backgroundActions.setProperty(user?.property));
      dispatch(backgroundActions.setVideo(user?.video));
    } else {
      ImageService.getBackground(dispatch);
    }
  }, [user, visitedUser]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      AuthService.isLoggedIn(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    SocketService.getMusic(dispatch);
    SocketService.getMusicState(dispatch);
    SocketService.deleteAllChat(dispatch);
    SocketService.deleteUserChat(chat?._id, dispatch);
    SocketService.loggedOut(user?._id);
    SocketService.getGif(dispatch);
    SocketService.delGif(dispatch);
    SocketService.getPic(dispatch);
    SocketService.delPic(dispatch);
    SocketService.getVideo(dispatch);
    SocketService.delVideo(dispatch);
    SocketService.getMusicTab(dispatch);
    SocketService.delMusic(dispatch);
    SocketService.getBg(dispatch);
    // SocketService.OnlineUsers(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url("${process.env.REACT_APP_FILE_URL}/${
          visitedUser
            ? visitedUser?.background
            : user
            ? user?.background
            : background
        }")`,
        backgroundSize: `${
          property === "stretched"
            ? "100% 100%"
            : property === "repeat"
            ? "unset"
            : "contain"
        }`,
        backgroundPosition: `${property === "repeat" ? "unset" : "center"}`,
        backgroundRepeat: `${property === "repeat" ? "round" : "no-repeat"}`,
        height: "100vh",
      }}
    >
      {video && (
        <React.Fragment key={video}>
          <video
            loop
            autoPlay
            className={`${
              property === "normal" ? "bg-video-normal" : ""
            } bg-video`}
          >
            <source
              src={`${process.env.REACT_APP_FILE_URL}/${
                visitedUser ? visitedUser?.video : video
              }`}
              type="video/mp4"
            />
            <source
              src={`${process.env.REACT_APP_FILE_URL}/${
                visitedUser ? visitedUser?.video : video
              }`}
              type="video/ogg"
            />
          </video>
        </React.Fragment>
      )}
      <SnackbarProvider
        maxSnack={5}
        hideIconVariant
        preventDuplicate
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        iconVariant={{
          success: "✅",
          error: "✖️",
          warning: "⚠️",
          info: "ℹ️",
        }}
      >
        <Toaster />
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <LightgalleryProvider>
              <LocalizationProvider dateAdapter={dateAdapter}>
                <CssBaseline />
                <RegisterAppDispatch />
                <BrowserRouter>
                  <Header />
                  <AppModal />
                  <AppRoutes />
                </BrowserRouter>
              </LocalizationProvider>
            </LightgalleryProvider>
          </ThemeProvider>
        </CacheProvider>
      </SnackbarProvider>
    </div>
  );
}
