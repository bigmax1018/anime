import { useEffect, useState, useRef } from "react";
import ViewIcon from "assets/View.png";
import DeleteIcon from "assets/Delete.png";
import BgIcon from "assets/Background.png";
import VideoService from "services/video.service";
import { Grid, MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { backgroundActions } from "redux/slices/background";
import AuthService from "services/auth.service";
import { videoActions } from "redux/slices/video";
import InputName from "components/templates/InputName";
import ReactImageVideoLightbox from "react-image-video-lightbox";
import ImageService from "services/image.service";
import SelectType from "components/templates/SelectType";
import { tabActions } from "redux/slices/tab";
import UploadBox from "pages/UploadBox";
import { useLocation } from "react-router-dom";

export default function Videos() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { tab, upload } = useAppSelector((state) => state.tab);
  const { video, property } = useAppSelector((state) => state.background);
  const [lightbox, setLightbox] = useState(false);
  const [index, setIndex] = useState(0);
  const { videos, publics, privates, type } = useAppSelector(
    (state) => state.video
  );

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
    VideoService.getVideos(dispatch);
  }, [dispatch]);

  const setBg = (image: any, id: any) => {
    let size = "";

    if (property === "") size = "normal";
    else if (property === "normal") size = "stretched";
    else if (property === "stretched") size = "";
    else size = "";

    if (video !== "" && video !== image) size = "normal";

    let data = {
      video: size !== "" ? image : "",
      property: size,
      id,
    };
    dispatch(backgroundActions.setVideo(size !== "" ? image : ""));
    dispatch(backgroundActions.setProperty(size));
    if (user) AuthService.video(data, dispatch);
    else ImageService.background(data, dispatch);
  };

  return (
    <>
      <div>
        <SelectType />
      </div>
      {lightbox && (
        <div style={{ position: "relative", zIndex: 99999 }}>
          <ReactImageVideoLightbox
            data={show ? privates : publics}
            startIndex={0}
            showResourceCount={true}
            onCloseCallback={() => setLightbox(false)}
            onNavigationCallback={() => console.log(`Current index: ${index}`)}
            style={{ zIndex: 9999 }}
          />
        </div>
      )}
      {/* {loading ? (
        <SkeletonLoader />
      ) : ( */}
      <div className="basic-box" ref={contentRef} style={{ paddingRight: isScrollBarVisible ? (isFirefox ? '7px' : '14px') : '24px' }}>
        {upload ? (
          <UploadBox />
        ) : (
          <Grid container columnSpacing={3}>
            {videos.map((video: any, index: any) =>
              video.type === type ? (
                type === "private" ? (
                  user ? (
                    video?.user_id ===
                    (location.pathname.includes("profile")
                      ? location.pathname.split("/").pop()
                      : user?._id) ? (
                      <Grid item md={6} key={video._id}>
                        <div className="content-item">
                          <InputName
                            id={video._id}
                            name={video.name}
                            type={tab}
                          />
                          <div className="items-box">
                            <video
                              controls
                              onPlay={() =>
                                dispatch(backgroundActions.setAnime(true))
                              }
                              onPause={() =>
                                dispatch(backgroundActions.setAnime(false))
                              }
                            >
                              <source
                                src={`${process.env.REACT_APP_FILE_URL}/${video.url}`}
                                type="video/mp4"
                              />
                              <source
                                src={`${process.env.REACT_APP_FILE_URL}/${video.url}`}
                                type="video/ogg"
                              />
                            </video>
                          </div>
                          <p className="content-icons">
                            {location.pathname.includes("profile") ? (
                              ""
                            ) : (
                              <>
                                {/* <img
                                  src={ViewIcon}
                                  alt="View"
                                  onClick={() => {
                                    setLightbox(true);
                                    setIndex(index);
                                    setShow(true);
                                  }}
                                /> */}
                                <span
                                  onClick={() => {
                                    setLightbox(true);
                                    setIndex(index);
                                    setShow(true);
                                  }}
                                >
                                  View
                                </span>
                                <span
                                  onClick={() => setBg(video.url, video._id)}
                                >
                                  Background
                                </span>
                                {/* <img
                                  src={BgIcon}
                                  alt="BG"
                                  onClick={() => setBg(video.url, video._id)}
                                /> */}
                                <span
                                  onClick={() =>
                                    VideoService.deleteVideo(
                                      video._id,
                                      dispatch
                                    )
                                  }
                                >
                                  Delete
                                </span>
                                {/* <img
                                  src={DeleteIcon}
                                  alt="Delete"
                                  onClick={() =>
                                    VideoService.deleteVideo(
                                      video._id,
                                      dispatch
                                    )
                                  }
                                /> */}
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
                  <Grid item md={6} key={video._id}>
                    <div className="content-item">
                      <InputName id={video._id} name={video.name} type={tab} />
                      <div className="items-box">
                        <video
                          controls
                          onPlay={() =>
                            dispatch(backgroundActions.setAnime(true))
                          }
                          onPause={() =>
                            dispatch(backgroundActions.setAnime(false))
                          }
                        >
                          <source
                            src={`${process.env.REACT_APP_FILE_URL}/${video.url}`}
                            type="video/mp4"
                          />
                          <source
                            src={`${process.env.REACT_APP_FILE_URL}/${video.url}`}
                            type="video/ogg"
                          />
                        </video>
                      </div>
                      <p className="content-icons">
                        {/* <img
                          src={ViewIcon}
                          onClick={() => {
                            setLightbox(true);
                            setIndex(index);
                            setShow(false);
                          }}
                          alt="View"
                        /> */}
                        <span
                          onClick={() => {
                            setLightbox(true);
                            setIndex(index);
                            setShow(false);
                          }}
                        >
                          View
                        </span>
                        <span onClick={() => setBg(video.url, video._id)}>
                          Background
                        </span>
                        {/* <img
                          src={BgIcon}
                          alt="BG"
                          onClick={() => setBg(video.url, video._id)}
                        /> */}
                        <span
                          onClick={() =>
                            VideoService.deleteVideo(video._id, dispatch)
                          }
                        >
                          Delete
                        </span>
                        {/* <img
                          src={DeleteIcon}
                          alt="Delete"
                          onClick={() =>
                            VideoService.deleteVideo(video._id, dispatch)
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
