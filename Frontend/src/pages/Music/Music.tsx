import { Grid, MenuItem, Select } from "@mui/material";
import ViewIcon from "assets/View.png";
import DeleteIcon from "assets/Delete.png";
import BgIcon from "assets/Background.png";
import { useEffect, useState, useRef } from "react";
import MusicService from "services/music.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { backgroundActions } from "redux/slices/background";
import AuthService from "services/auth.service";
import { musicActions } from "redux/slices/music";
import InputName from "components/templates/InputName";
import SelectType from "components/templates/SelectType";
import { tabActions } from "redux/slices/tab";
import UploadBox from "pages/UploadBox";
import { useLocation } from "react-router-dom";
import SocketService from "services/socket.service";
import ImageService from "services/image.service";

export default function Musics() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { tab, upload } = useAppSelector((state) => state.tab);

  const { property, bgType } = useAppSelector((state) => state.background);
  const { musics, type } = useAppSelector((state) => state.music);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isScrollBarVisible, setIsScrollBarVisible] = useState(false);
  const isFirefox = /Firefox/.test(navigator.userAgent);

  useEffect(() => {
    const contentElement = contentRef.current;

    const resizeObserver = new ResizeObserver(() => {
      if (contentElement && contentElement.scrollHeight !== undefined && contentElement.clientHeight !== undefined) {
        setIsScrollBarVisible(contentElement.scrollHeight > contentElement.clientHeight);
      }
    });
    if (contentElement) {
      resizeObserver.observe(contentElement);
    }
    return () => {
      if (contentElement) {
        resizeObserver.unobserve(contentElement);
      }
    };
  }, []);

  useEffect(() => {
    MusicService.getMusics(dispatch);
  }, [dispatch]);

  const setBg = (image: any, id: any) => {
    let size = "";

    if (property === "") size = "normal";
    else if (property === "normal") size = "stretched";
    else if (property === "stretched") size = "repeat";
    else if (property === "repeat") size = "";
    else size = "";
    let data = {
      background: size !== "" ? image : "",
      property: size,
      id,
    };
    dispatch(backgroundActions.setBackground(size !== "" ? image : ""));
    dispatch(backgroundActions.setProperty(size));
    if (user) AuthService.background(data, dispatch);
  };

  const setBgMusic = (music: any) => {
    if (bgType === "private") AuthService.music(music.url, dispatch);
    else {
      ImageService.bgMusic(music.url, dispatch);
      dispatch(backgroundActions.setPlay(true));
    }
  };

  return (
    <>
      {/* <Grid container>
        <Grid item xs={12} md={12}> */}
      {/* <div style={{ display: "flex", alignItems: "center" }}> */}
      {/* <h2 className="heading">Music</h2> */}
      <div>
        <SelectType />
      </div>
      {/* </div> */}
      {/* </Grid> */}
      {/* <Grid item xs={1} md={1}>
          <span
            className="cross-icon"
            onClick={() => dispatch(tabActions.setTab("chat"))}
          >
            x
          </span>
        </Grid> */}
      {/* </Grid> */}
      {/* {loading ? (
        <SkeletonLoader />
      ) : ( */}
      <div className="basic-box" ref={contentRef} style={{ paddingRight: isScrollBarVisible ? (isFirefox ? '7px' : '14px') : '24px' }}>
        {upload ? (
          <UploadBox />
        ) : (
          <Grid container columnSpacing={3}>
            {musics.map((music: any) =>
              music.type === type ? (
                type === "private" ? (
                  user ? (
                    music?.user_id ===
                    (location.pathname.includes("profile")
                      ? location.pathname.split("/").pop()
                      : user?._id) ? (
                      <Grid item md={6} key={music._id}>
                        <div className="content-item">
                          <InputName
                            id={music._id}
                            name={music.name}
                            type={tab}
                          />
                          <div className="items-box">
                            <audio
                              controls
                              onPlay={() =>
                                dispatch(backgroundActions.setAnime(true))
                              }
                              onPause={() =>
                                dispatch(backgroundActions.setAnime(false))
                              }
                              style={{ width: "100%" }}
                            >
                              <source
                                src={`${process.env.REACT_APP_FILE_URL}/${music.url}`}
                                type="audio/mpeg"
                              />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                          <p className="content-icons">
                            {location.pathname.includes("profile") ? (
                              ""
                            ) : (
                              <>
                                <span onClick={() => setBgMusic(music)}>
                                  Background
                                </span>
                                <span
                                  onClick={() =>
                                    MusicService.deleteMusic(
                                      music._id,
                                      dispatch
                                    )
                                  }
                                >
                                  Delete
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                      </Grid>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )
                ) : (
                  <Grid item md={6} key={music._id}>
                    <div className="content-item">
                      <InputName id={music._id} name={music.name} type={tab} />
                      <div className="items-box">
                        <audio
                          controls
                          onPlay={() =>
                            dispatch(backgroundActions.setAnime(true))
                          }
                          onPause={() =>
                            dispatch(backgroundActions.setAnime(false))
                          }
                          style={{ width: "100%" }}
                        >
                          <source
                            src={`${process.env.REACT_APP_FILE_URL}/${music.url}`}
                            type="audio/mpeg"
                          />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                      <p className="content-icons">
                        {/* <img src={ViewIcon} alt="View" /> */}
                        <span>Preview</span>
                        <span onClick={() => setBgMusic(music)}>
                          Background
                        </span>
                        {/* <img
                          src={BgIcon}
                          alt="BG"
                          onClick={() => setBg(music.url, music._id)}
                        /> */}
                        <span
                          onClick={() =>
                            MusicService.deleteMusic(music._id, dispatch)
                          }
                        >
                          Delete
                        </span>
                        {/* <img
                          src={DeleteIcon}
                          alt="Delete"
                          onClick={() =>
                            MusicService.deleteMusic(music._id, dispatch)
                          }
                        /> */}
                      </p>
                    </div>
                  </Grid>
                )
              ) : (
                ""
              )
            )}
          </Grid>
        )}
      </div>
      {/* )} */}
    </>
  );
}
