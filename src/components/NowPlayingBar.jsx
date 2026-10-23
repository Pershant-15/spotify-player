import { usePlayer } from "../context/PlayerContext";
import CoverArt from "./CoverArt";
import ProgressBar from "./ProgressBar";
import { formatTime } from "../utils/format";
import {
  PlayIcon, PauseIcon, NextIcon, PrevIcon, ShuffleIcon, RepeatIcon,
  RepeatOneIcon, HeartIcon, HeartFilledIcon, VolumeIcon, MuteIcon,
} from "./Icons";

export default function NowPlayingBar() {
  const {
    currentTrack, isPlaying, currentTime, duration, volume, muted, shuffle,
    repeat, liked, error, togglePlay, next, previous, seek, setVolume,
    toggleMute, toggleShuffle, cycleRepeat, toggleLike,
  } = usePlayer();

  const disabled = !currentTrack;
  const isLiked = currentTrack ? liked.includes(currentTrack.id) : false;
  const shownVolume = muted ? 0 : volume;

  return (
    <footer className="player" aria-label="Now playing">
      <div className="player-left">
        {currentTrack ? (
          <>
            <CoverArt palette={currentTrack.palette} className="player-cover" />
            <div className="player-meta">
              <div className="player-title">{currentTrack.title}</div>
              <div className="player-artist">{currentTrack.artist}</div>
            </div>
            <button
              className={`icon-btn ${isLiked ? "is-on" : ""}`}
              onClick={() => toggleLike(currentTrack.id)}
              aria-label={isLiked ? "Remove from Liked Songs" : "Add to Liked Songs"}
              aria-pressed={isLiked}
            >
              {isLiked ? <HeartFilledIcon size={20} /> : <HeartIcon size={20} />}
            </button>
          </>
        ) : (
          <div className="player-meta">
            <div className="player-title muted">Nothing playing</div>
            <div className="player-artist">Pick a song to start listening</div>
          </div>
        )}
      </div>

      <div className="player-center">
        <div className="controls">
          <button className={`icon-btn ${shuffle ? "is-on" : ""}`} onClick={toggleShuffle} aria-label="Shuffle" aria-pressed={shuffle}>
            <ShuffleIcon size={20} />
          </button>
          <button className="icon-btn" onClick={previous} disabled={disabled} aria-label="Previous">
            <PrevIcon size={24} />
          </button>
          <button className="play-btn" onClick={togglePlay} disabled={disabled} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
          </button>
          <button className="icon-btn" onClick={next} disabled={disabled} aria-label="Next">
            <NextIcon size={24} />
          </button>
          <button
            className={`icon-btn ${repeat !== "off" ? "is-on" : ""}`}
            onClick={cycleRepeat}
            aria-label={`Repeat: ${repeat}`}
          >
            {repeat === "one" ? <RepeatOneIcon size={20} /> : <RepeatIcon size={20} />}
          </button>
        </div>
        <div className="seek">
          <span className="time">{formatTime(currentTime)}</span>
          <ProgressBar value={currentTime} max={duration} onChange={seek} label="Seek" disabled={disabled} />
          <span className="time">{formatTime(duration)}</span>
        </div>
        {error && <div className="player-error" role="alert">{error}</div>}
      </div>

      <div className="player-right">
        <button className="icon-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
          {muted || volume === 0 ? <MuteIcon size={20} /> : <VolumeIcon size={20} />}
        </button>
        <div className="volume">
          <ProgressBar value={shownVolume} max={1} onChange={setVolume} label="Volume" />
        </div>
      </div>
    </footer>
  );
}
