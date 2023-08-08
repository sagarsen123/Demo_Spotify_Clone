import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Player.css";
import { useDispatch, useSelector } from "react-redux";
import { currTrackIdx, pausingSongs, playingSongs } from "../../actions";
import songImgSrc from "../../images/SongImgThumbnail.png";
import {
  AiFillStepBackward,
  AiFillStepForward,
  AiFillCaretRight,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";

import { BsPauseFill } from "react-icons/bs";
const Player = () => {
  //reducer
  const myState = useSelector((state) => state.loginAndLogout);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //states
  const [trackIdx, setTrackIdx] = useState(0);
  let songsList = [];
  const [currentTrack, setCurrentTrack] = useState(
    myState.listingofweeksongs.Songs[trackIdx]
  );
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playSong, setPlaySong] = useState(true);

  //volume
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  //refs
  const audioRef = useRef();
  const progressBarRef = useRef();
  const playAnimationRef = useRef();

  //audio Controls
  const togglePlayPause = () => {
    setPlaySong(!playSong);

    if (playSong) {
      dispatch(pausingSongs());
      audioRef.current.pause();
    } else {
      dispatch(playingSongs());
      audioRef.current.play();
    }
  };

  const handlePrevious = () => {
    setPlaySong(false);
    audioRef.current.pause();
    if (trackIdx === 0) return;
    setTrackIdx(trackIdx - 1);
    dispatch(currTrackIdx(trackIdx - 1));
    audioRef.current.pause();
    setPlaySong(true);
  };

  const handleNext = () => {
    setPlaySong(false);
    audioRef.current.pause();
    setTrackIdx(trackIdx + 1);
    dispatch(currTrackIdx(trackIdx + 1));
    audioRef.current.pause();
    setPlaySong(true);
  };

  //utitlity

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}.${formatSeconds}`;
    }
    return "00.00";
  };

  const repeat = useCallback(() => {
    if (localStorage.getItem("token") == null) return navigate("/");
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);
  const handleProgressChange = () => {
    if (localStorage.getItem("token") !== null)
      audioRef.current.currentTime = progressBarRef.current.value;
  };

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  //useEffect
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      return navigate("/");
    }
    songsList = myState.listingofweeksongs.Songs;
    setTrackIdx(myState.currIdx);
    setPlaySong(myState.playingSongs);
    setCurrentTrack(songsList[trackIdx]);
    playAnimationRef.current = requestAnimationFrame(repeat);
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [
    handleNext,
    volume,
    muteVolume,
    myState.currIdx,
    myState.listingofweeksongs,
  ]);

  // const donothing = () => {};

  return (
    <div className="player">
      <div className="playerContainer1">
        <audio
          ref={audioRef}
          src={currentTrack?.preview_url ? currentTrack.preview_url : ""}
          autoPlay
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => {
            setPlaySong(false);
            dispatch(pausingSongs());
          }}
          controls
          style={{ display: "none" }}
        ></audio>

        <div className="songInfo">
          <div className="songInfoImg">
            {currentTrack?.album?.images ? (
              <img src={currentTrack.album.images[2].url} alt="" />
            ) : (
              <img src={songImgSrc} alt="" />
            )}
          </div>
          <div className="SongInfoDetails">
            <h4 className="songName">
              {currentTrack ? currentTrack.name.substring(0,12) : "Song Name"}
            </h4>
            <p className="artistName">
              {currentTrack?.artists
                ? currentTrack.artists[0].name
                : "Artist Name"}
            </p>
          </div>
        </div>
      </div>

      <div className="playerContainer2">


            <div className="musicControls">
              <div className="songControls" onClick={() => handlePrevious()}>
                <AiFillStepBackward
                  className={trackIdx !== 0 ? "musicIcon" : "unClickable"}
                />
              </div>
              <div className="songControls" onClick={togglePlayPause}>
                {!playSong ? (
                  <AiFillCaretRight className="musicIcon" />
                ) : (
                  <BsPauseFill className="musicIcon" />
                )}
              </div>
              <div className="songControls" onClick={() => handleNext()}>
                <AiFillStepForward
                  className={
                    trackIdx === myState.listingofweeksongs.Songs.length - 1
                      ? "unClickable"
                      : "musicIcon"
                  }
                />
              </div>
            </div>

            <div className=" musicdiv">
              <span className="musicTimeStamp">{formatTime(timeProgress)}</span>
              <input
                className="ProgressBar"
                type="range"
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressChange}
              />
              <span className="musicTimeStamp">{formatTime(duration)}</span>
            </div>

            <div className="musicVolume">
              <div
                onClick={() => setMuteVolume((prev) => !prev)}
                className="volumeIcon"
              >
                {muteVolume || volume < 5 ? (
                  <IoMdVolumeOff />
                ) : volume < 40 ? (
                  <IoMdVolumeLow />
                ) : (
                  <IoMdVolumeHigh />
                )}
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                style={{
                  background: `linear-gradient(to right,  rgb(88 113 227) ${volume}%, #ccc ${volume}%)`,
                }}
              />
            </div>
            
      </div>
    </div>
  );
};

export default Player;
