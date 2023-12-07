import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import MusicDropZone from "components/atoms/MusicDropZone";
import ImageService from "services/image.service";
import AuthService from "services/auth.service";
import { backgroundActions } from "redux/slices/background";
import SocketService from "services/socket.service";
import MessageService from "services/message.service";

export default function SailorMoon() {
  const dispatch = useAppDispatch();
  const { user, chat } = useAppSelector((state) => state.auth);
  const visitedUser = useAppSelector((state) => state.user.user);
  const { play, music, outfit, anime, bgType } = useAppSelector(
    (state) => state.background
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [anim, setAnim] = useState(anime);
  const [image, setImage] = useState(false);
  const [characterImage, setCharacterImage] = useState(1);
  // const [changeImage, setChangeImage] = useState(HarleyA);

  const [character, setCharacter] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFirefox = /Firefox/.test(navigator.userAgent);

  useEffect(() => {
    setAnim(anime);
  }, [anime]);

  useEffect(() => {
    setImage(outfit);
  }, [outfit]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      // Set the current time before playing
      audioRef.current.currentTime = currentTime;
      if (play) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [user?.music, music, bgType, visitedUser, play]);

  useEffect(() => {
    ImageService.getBgMusic(dispatch);
  }, []);


  const handlePlay = () => {
    SocketService.musicState(true);
    setCurrentTime(audioRef?.current?.currentTime!);
  };

  const handlePause = () => {
    SocketService.musicState(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <button
          onClick={() =>
            window.open("https://www.paypal.com/paypalme/DamianGower", "_blank")
          }
          style={{
            cursor: "pointer", display: "inline", marginLeft: "32px", border: 0,
            fontFamily: "'Varela Round', sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            background: "none",
            color: "white",
            padding: 0,
            // marginTop: "2px",
            marginBottom: "0.83em",
            userSelect: "text",
          }}
        >
          Donate
        </button>
      </div>
      <div style={{marginTop: isFirefox ? "273px" : "259px"}}>
        <audio
          controls
          loop
          ref={audioRef}
          onPlay={handlePlay}
          onPause={handlePause}
        // onLoad={handlePlay}
        >
          <source
            src={
              visitedUser
                ? `${process.env.REACT_APP_FILE_URL}/${bgType === "private" ? visitedUser?.music : music
                }`
                : user
                  ? `${process.env.REACT_APP_FILE_URL}/${bgType === "private" ? user?.music : music
                  }`
                  : `${process.env.REACT_APP_FILE_URL}/${music}`
            }
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            
          }}
        >
          <button
            onClick={() => dispatch(backgroundActions.setBgType("public"))}
            style={{
              cursor: "pointer",
              border: 0,
              fontFamily: "'Varela Round', sans-serif",
              fontWeight: bgType === "public" ? 600 : 500,
              fontSize: "16px",
              background: "none",
              color: "white",
              padding: 0,
              marginBottom: "0.83em",
              userSelect: "text",
            }}
          >
            Public
          </button>
          <button
            onClick={() => {
              if (visitedUser || user)
                dispatch(backgroundActions.setBgType("private"));
            }}
            style={{
              cursor: user ? "pointer" : "auto",
              border: 0,
              fontFamily: "'Varela Round', sans-serif",
              fontWeight: bgType === "private" ? 600 : 500,
              fontSize: "16px",
              background: "none",
              color: "white",
              padding: 0,
              marginBottom: "0.83em",
              userSelect: "text",
            }}
          >
            Private
          </button>
        </div>
      </div>
      <div className="music-upload-box" style={{marginTop: "290px"}}>
        <MusicDropZone musicType={bgType} />
      </div>
    </>
  );
}
