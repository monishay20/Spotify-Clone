import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBgRef = useRef();
  const seekBarRef = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { minute: "00", second: "00" },
    totalTime: { minute: "00", second: "00" }
  });

  // Play current audio
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Pause current audio
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  // Play song by ID (switch track)
  const playWithId = (id) => {
    setTrack(songsData[id]);
  };

  // Go to previous song
  const previous = () => {
    if (track.id > 0) {
      setTrack(songsData[track.id - 1]);
    }
  };

  // Go to next song
  const next = () => {
    if (track.id < songsData.length - 1) {
      setTrack(songsData[track.id + 1]);
    }
  };

  // Seek to clicked time in song
  const seekSong = (e) => {
    const clickPosition = e.nativeEvent.offsetX;
    const barWidth = seekBgRef.current.offsetWidth;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (clickPosition / barWidth) * duration;
  };

  // Update seek bar and time display
  useEffect(() => {
    const audio = audioRef.current;

    const formatTime = (num) => (num < 10 ? `0${num}` : `${num}`);

    const handleTimeUpdate = () => {
      const current = audio.currentTime;
      const total = audio.duration || 0;

      if (seekBarRef.current && total) {
        const width = (current / total) * 100;
        seekBarRef.current.style.width = `${width}%`;
      }

      setTime({
        currentTime: {
          minute: formatTime(Math.floor(current / 60)),
          second: formatTime(Math.floor(current % 60))
        },
        totalTime: {
          minute: formatTime(Math.floor(total / 60)),
          second: formatTime(Math.floor(total % 60))
        }
      });
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  // Auto-play when track changes
  useEffect(() => {
  if (audioRef.current && playStatus) {
    audioRef.current.load();
    audioRef.current.play();
  }
}, [track, playStatus]);

  const contextValue = {
    audioRef,
    seekBg: seekBgRef,
    seekBar: seekBarRef,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong
  };

  return (
    <PlayContext.Provider value={contextValue}>
      {children}
    </PlayContext.Provider>
  );
};

export default PlayerContextProvider;


