import Login from "pages/Login";
import { useState } from "react";
import Register from "pages/Register";
import { Grid } from "@mui/material";
import Recovery from "pages/Recovery";
import { useAppSelector } from "redux/hooks";
import Button from "components/atoms/Button";
import { useLocation } from "react-router-dom";
import UploadBox from "pages/UploadBox";
import PhotoGallery from "components/templates/PhotoGallery";
import AuthService from "services/auth.service";
import SocketService from "services/socket.service";
import { tabActions } from "redux/slices/tab";
import { useAppDispatch } from "redux/hooks";

export default function User() {
  const [type, setType] = useState("login");
  const user = useAppSelector((state) => state.auth.user);
  const { upload } = useAppSelector((state) => state.tab);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  return (
    <div>
      {/* <h2 className="heading">User</h2> */}

      <div>
        <Grid container justifyContent={"center"}>
          <Grid item xs={12} md={upload ? 12 : 6}>
            {!user && !pathname.includes("profile") ? (
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "16px",
                  // cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <button
                  // variant="text"
                  onClick={() => setType("login")}
                  // sx={{ fontSize: "16px" }}
                  style={{
                    cursor: "pointer", display: "inline", border: 0,
                    fontFamily: "'Varela Round', sans-serif",
                    fontWeight: type == "login" ? 600 : 500,
                    fontSize: "16px",
                    background: "none",
                    color: "white",
                    padding: 0,
                    // marginTop: "2px",
                    marginBottom: "0.83em",
                    userSelect: "text",
                    marginRight: "32px"
                  }}
                >
                  Login
                </button>

                <button
                  onClick={() => setType("register")}
                  style={{
                    cursor: "pointer", display: "inline", border: 0,
                    fontFamily: "'Varela Round', sans-serif",
                    fontWeight: type == "register" ? 600 : 500,
                    fontSize: "16px",
                    background: "none",
                    color: "white",
                    padding: 0,
                    // marginTop: "2px",
                    marginBottom: "0.83em",
                    userSelect: "text",
                    marginRight: "32px"
                  }}
                >
                  Register
                </button>

                <button
                  onClick={() => setType("recovery")}
                  style={{
                    cursor: "pointer", display: "inline", border: 0,
                    fontFamily: "'Varela Round', sans-serif",
                    fontWeight: type == "recovery" ? 600 : 500,
                    fontSize: "16px",
                    background: "none",
                    color: "white",
                    padding: 0,
                    // marginTop: "2px",
                    marginBottom: "0.83em",
                    userSelect: "text",
                  }}
                >
                  Recovery
                </button>
              </div>
            ) : (
              ""
            )}
            {pathname.includes("profile") ? (
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "16px",
                  cursor: "pointer",
                }}
              ></div>
            ) : (
              ""
            )}
            {upload && user && !pathname.includes("profile") && (
              <div style={{
                textAlign: "center", display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <button
                  // variant="text"
                  onClick={() => {
                    SocketService.sendLogout(user?._id);
                    AuthService.logout();
                  }}
                  style={{
                    cursor: "pointer", display: "inline", border: 0,
                    fontFamily: "'Varela Round', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    background: "none",
                    color: "white",
                    padding: 0,
                    // marginTop: "2px",
                    marginBottom: "0.83em",
                    userSelect: "text",
                    marginRight: "32px"
                  }}
                >
                  Logout
                </button>

                <button type="submit" style={{
                  cursor: "pointer", display: "inline", border: 0,
                  fontFamily: "'Varela Round', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  background: "none",
                  color: "white",
                  padding: 0,
                  // marginTop: "2px",
                  marginBottom: "0.83em",
                  userSelect: "text",
                  marginRight: "32px"
                }}>
                  Save
                </button>

                <button
                  // variant="text"
                  type="button"
                  onClick={() => {
                    dispatch(tabActions.setUpload(false));
                    AuthService.delete();
                    // AuthService.logout();
                    // SocketService.sendLogout(user?._id);
                  }}
                  style={{
                    cursor: "pointer", display: "inline", border: 0,
                    fontFamily: "'Varela Round', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    background: "none",
                    color: "white",
                    padding: 0,
                    // marginTop: "2px",
                    marginBottom: "0.83em",
                    userSelect: "text",
                    marginRight: "32px"
                  }}
                // disableElevation
                >
                  Delete
                </button>

                <button
                  // variant="text"
                  onClick={() => dispatch(tabActions.setUpload(true))}
                  style={{
                    cursor: "pointer", display: "inline", border: 0,
                    fontFamily: "'Varela Round', sans-serif",
                    fontWeight: upload ? 600 : 500,
                    fontSize: "16px",
                    background: "none",
                    color: "white",
                    padding: 0,
                    // marginTop: "2px",
                    marginBottom: "0.83em",
                    userSelect: "text",
                    // marginRight: "32px"
                  }}
                >
                  Upload
                </button>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", alignItems: upload ? "center" : "normal", marginLeft: "-1px" }}>
              {upload ? (
                <>
                  <UploadBox />
                  {user.profile_picture ? (
                    <>
                      <PhotoGallery
                        group="profile"
                        image={`${process.env.REACT_APP_FILE_URL}/${user.profile_picture}`}
                      ></PhotoGallery>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : !user && !pathname.includes("profile") ? (
                type === "login" ? (
                  <Login />
                ) : type === "recovery" ? (
                  <Recovery />
                ) : (
                  <Register />
                )
              ) : (
                <Register />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
