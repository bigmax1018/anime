import { Grid } from "@mui/material";
import Gifs from "pages/Gifs";
import Members from "pages/Members";
import Music from "pages/Music";
import Pictures from "pages/Pictures";
import SailorMoon from "pages/SailorMoon";
import User from "pages/User";
import Videos from "pages/Videos";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { tabActions } from "redux/slices/tab";
import { userActions } from "redux/slices/users";
import UsersService from "services/users.service";
import { authActions } from "redux/slices/auth";

export default function Profile() {
  const [id, setId] = useState<string>("");
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { tab } = useAppSelector((state) => state.tab);
  const { users } = useAppSelector((state) => state.user);
  const profileUser = useAppSelector((state) => state.user.user);
  const {
    user,
    online,
    tab: memberTab,
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(tabActions.setTab("user"));

    let pathArray = pathname.split("/");
    let userId = pathArray.pop();
    if ((user == null || user._id == undefined || userId != user._id) && userId != undefined) {
      setId(userId);
    }

    // Polling logic here
    const interval = setInterval(() => {
      UsersService.getUser(userId);
    }, 1000); // every 1 second

    return () => {
      dispatch(userActions.setUser(null));
      clearInterval(interval); // Clear the interval when the component is unmounted or pathname changes
    };
  }, [pathname]);


  return (
    <div className="main">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <div
            className="basic-box left-section"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "calc(100vh - 124px)",
              overflow: "hidden"
            }}
          >
            <SailorMoon />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ position: "relative" }}>
            <div className="center-box">
              {tab === "gifs" ? (
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
              Friends ({id ? (profileUser?.friends?.length ?? 0) : (user?.friends?.length ?? 0)})
            </span>
          </h2>
          <div
            className="basic-box right-section"
            style={{ height: "calc( 100vh - 164px )", padding: " 0px 24px" }}
          >
            <Members userId={id} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
