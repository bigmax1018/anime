import { useEffect, useRef, useState } from "react";
import ViewIcon from "assets/View.png";
import DeleteIcon from "assets/Delete.png";
import BgIcon from "assets/Background.png";
import AuthService from "services/auth.service";
import { useLightgallery } from "react-lightgallery";
import PictureService from "services/picture.service";
import { pictureActions } from "redux/slices/picture";
import { Grid, MenuItem, Select } from "@mui/material";
import InputName from "components/templates/InputName";
import { backgroundActions } from "redux/slices/background";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import PhotoGallery from "components/templates/PhotoGallery";
import ImageService from "services/image.service";
import SelectType from "components/templates/SelectType";
import { tabActions } from "redux/slices/tab";
import UploadBox from "pages/UploadBox";
import { useLocation } from "react-router-dom";

export default function Pictures() {
  const dispatch = useAppDispatch();
  const { openGallery } = useLightgallery();
  const { user } = useAppSelector((state) => state.auth);
  const { tab, upload } = useAppSelector((state) => state.tab);
  const location = useLocation();
  const { background, property } = useAppSelector((state) => state.background);
  const { pictures, type } = useAppSelector((state) => state.picture);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isScrollBarVisible, setIsScrollBarVisible] = useState(false);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const contentElement = contentRef.current;

    const resizeObserver = new ResizeObserver(() => {
      if (contentElement && contentElement.scrollHeight !== undefined && contentElement.clientHeight !== undefined) {
        setIsScrollBarVisible(contentElement.scrollHeight > contentElement.clientHeight);
        setScrollWidth(contentElement.offsetWidth - contentElement.clientWidth);
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
    PictureService.getPictures(dispatch);
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
      <div className="basic-box" ref={contentRef} style={{ paddingRight: isScrollBarVisible ? (24 - scrollWidth) + 'px' : '24px' }}>
        {upload ? (
          <UploadBox />
        ) : (
          <Grid container columnSpacing={3}>
            {pictures.map((picture: any, index: any) =>
              picture.type === type ? (
                type === "private" ? (
                  user ? (
                    picture?.user_id ===
                      (location.pathname.includes("profile")
                        ? location.pathname.split("/").pop()
                        : user?._id) ? (
                      <Grid item md={6} key={picture._id}>
                        <div className="content-item">
                          <InputName
                            id={picture._id}
                            name={picture.name}
                            type={tab}
                          />
                          <div className="items-box">
                            <PhotoGallery
                              group="picture_private"
                              image={`${process.env.REACT_APP_FILE_URL}/${picture.url}`}
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
                                  onClick={() => openGallery("picture_private")}
                                /> */}
                                <span
                                  onClick={() => openGallery("picture_private")}
                                >
                                  View
                                </span>
                                <span
                                  onClick={() =>
                                    setBg(picture.url, picture._id)
                                  }
                                >
                                  Background
                                </span>
                                {/* <img
                                  src={BgIcon}
                                  alt="BG"
                                  onClick={() =>
                                    setBg(picture.url, picture._id)
                                  }
                                /> */}
                                <span
                                  onClick={() =>
                                    PictureService.deletePicture(
                                      picture._id,
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
                                    PictureService.deletePicture(
                                      picture._id,
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
                  <Grid item md={6} key={picture._id}>
                    <div className="content-item">
                      <InputName
                        id={picture._id}
                        name={picture.name}
                        type={tab}
                      />
                      <div className="items-box">
                        <PhotoGallery
                          group="picture_private"
                          image={`${process.env.REACT_APP_FILE_URL}/${picture.url}`}
                        ></PhotoGallery>
                      </div>
                      <p className="content-icons">
                        {/* <img
                          src={ViewIcon}
                          alt="View"
                          onClick={() => openGallery("picture_private")}
                        /> */}
                        <span onClick={() => openGallery("picture_private")}>
                          View
                        </span>
                        <span
                          onClick={() => setBg(picture.url, picture._id)}
                        >Background</span>
                        {/* <img
                          src={BgIcon}
                          alt="BG"
                          onClick={() => setBg(picture.url, picture._id)}
                        /> */}
                        <span
                          onClick={() =>
                            PictureService.deletePicture(picture._id, dispatch)
                          }
                        >Delete</span>
                        {/* <img
                          src={DeleteIcon}
                          alt="Delete"
                          onClick={() =>
                            PictureService.deletePicture(picture._id, dispatch)
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
