import { useEffect, useState, useRef } from "react";
import ViewIcon from "assets/View.png";
import DeleteIcon from "assets/Delete.png";
import BgIcon from "assets/Background.png";
import { gifActions } from "redux/slices/gif";
import GifService from "services/gif.service";
import AuthService from "services/auth.service";
import { useLightgallery } from "react-lightgallery";
import InputName from "components/templates/InputName";
import { Grid, MenuItem, Select } from "@mui/material";
import { backgroundActions } from "redux/slices/background";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import PhotoGallery from "components/templates/PhotoGallery";
import ImageService from "services/image.service";
import SelectType from "components/templates/SelectType";
import { tabActions } from "redux/slices/tab";
import UploadBox from "pages/UploadBox";
import { useLocation } from "react-router-dom";

export default function Gifs() {
  const dispatch = useAppDispatch();

  const { openGallery } = useLightgallery();
  const location = useLocation();
  const { tab, upload } = useAppSelector((state) => state.tab);
  const { user } = useAppSelector((state) => state.auth);
  const { gifs, type } = useAppSelector((state) => state.gif);
  const { background, property } = useAppSelector((state) => state.background);

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
    GifService.getGifs(dispatch);
  }, [dispatch]);

  const setBg = (image: any, id: any) => {
    let size = "";
    if (property === "") size = "normal";
    else if (property === "normal") size = "stretched";
    else if (property === "stretched") size = "repeat";
    else if (property === "repeat") size = "";
    else size = "";

    if (background !== "" && background !== image) size = "normal";

    let data = {
      background: size !== "" ? image : "",
      property: size,
      video: "",
      id,
    };
    dispatch(backgroundActions.setBackground(size !== "" ? image : ""));
    dispatch(backgroundActions.setProperty(size));
    dispatch?.(backgroundActions.setVideo(""));
    if (user) AuthService.background(data, dispatch);
    else ImageService.background(data, dispatch);
  };

  return (
    <>
      <div>
        <SelectType />
      </div>
      {/* {loading ? (
        <SkeletonLoader />
      ) : ( */}
      <div className="basic-box" ref={contentRef} style={{ paddingRight: isScrollBarVisible ? (isFirefox ? '7px' : '14px') : '24px', marginLeft: "-1px" }}>
        {upload ? (
          <UploadBox />
        ) : (
          <Grid container columnSpacing={3} gridAutoFlow="dense">
            {gifs.map((gif: any, index: any) =>
              gif.type === type ? (
                type === "private" ? (
                  user ? (
                    gif?.user_id ===
                    (location.pathname.includes("profile")
                      ? location.pathname.split("/").pop()
                      : user?._id) ? (
                      <Grid item md={6} key={gif._id}>
                        <div className="content-item">
                          <InputName id={gif._id} name={gif.name} type={tab} />
                          <div className="items-box">
                            <PhotoGallery
                              group="gif_private"
                              image={`${process.env.REACT_APP_FILE_URL}/${gif.url}`}
                            ></PhotoGallery>
                          </div>
                          <p className="content-icons">
                            {location.pathname.includes("profile") ? (
                              ""
                            ) : (
                              <>
                                {/* <img
                                  src={ViewIcon}
                                  alt="View"
                                  onClick={() => openGallery("gif_private")}
                                /> */}
                                <span
                                  onClick={() => openGallery("gif_private")}
                                >
                                  View
                                </span>
                                <span onClick={() => setBg(gif.url, gif._id)}>
                                  Background
                                </span>
                                {/* <img
                                  src={BgIcon}
                                  alt="BG"
                                  onClick={() => setBg(gif.url, gif._id)}
                                /> */}
                                <span
                                  onClick={() =>
                                    GifService.deleteGif(gif._id, dispatch)
                                  }
                                >
                                  Delete
                                </span>
                                {/* <img
                                  src={DeleteIcon}
                                  alt="Delete"
                                  onClick={() =>
                                    GifService.deleteGif(gif._id, dispatch)
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
                  <Grid item md={6} key={gif._id}>
                    <div className="content-item">
                      <InputName id={gif._id} name={gif.name} type={tab} />
                      <div className="items-box">
                        <PhotoGallery
                          group="gif_public"
                          image={`${process.env.REACT_APP_FILE_URL}/${gif.url}`}
                        ></PhotoGallery>
                      </div>
                      <p className="content-icons">
                        {/* <img
                          src={ViewIcon}
                          alt="View"
                          onClick={() => openGallery("gif_public")}
                        /> */}
                        <span onClick={() => openGallery("gif_public")}>
                          View
                        </span>
                        <span onClick={() => setBg(gif.url, gif._id)}>
                          Background
                        </span>
                        {/* <img
                          src={BgIcon}
                          alt="BG"
                          onClick={() => setBg(gif.url, gif._id)}
                        /> */}
                        <span
                          onClick={() =>
                            GifService.deleteGif(gif._id, dispatch)
                          }
                        >
                          Delete
                        </span>
                        {/* <img
                          src={DeleteIcon}
                          alt="Delete"
                          onClick={() =>
                            GifService.deleteGif(gif._id, dispatch)
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
