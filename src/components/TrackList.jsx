import { usePlayer } from "../context/PlayerContext";
import CoverArt from "./CoverArt";
import { PlayIcon, PauseIcon, HeartIcon, HeartFilledIcon } from "./Icons";

// `tracks` is both what is shown and the queue that starts playing on click.
export default function TrackList({ tracks, sourceId }) {
  const { currentTrack, isPlaying, playTrack, liked, toggleLike } = usePlayer();

  return (
    <div className="tracklist" role="table" aria-label="Tracks">
      <div className="track-row track-head" role="row">
        <div className="track-num">#</div>
        <div>Title</div>
        <div className="col-album">Album</div>
        <div />
      </div>
      {tracks.map((t, i) => {
        const active = currentTrack?.id === t.id;
        const isLiked = liked.includes(t.id);
        return (
          <div
            key={t.id}
            role="row"
            tabIndex={0}
            className={`track-row ${active ? "is-active" : ""}`}
            onClick={() => playTrack(t, tracks, sourceId)}
            onKeyDown={(e) => {
              if (e.key === "Enter") playTrack(t, tracks, sourceId);
            }}
          >
            <div className="track-num">
              <span className="num">{i + 1}</span>
              <span className="play-ico">
                {active && isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
              </span>
            </div>
            <div className="track-main">
              <CoverArt palette={t.palette} className="track-cover" />
              <div className="track-text">
                <div className="track-title">{t.title}</div>
                <div className="track-artist">{t.artist}</div>
              </div>
            </div>
            <div className="col-album track-album">{t.album}</div>
            <div className="track-like">
              <button
                className={`icon-btn ${isLiked ? "is-on" : ""}`}
                aria-label={isLiked ? `Unlike ${t.title}` : `Like ${t.title}`}
                aria-pressed={isLiked}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(t.id);
                }}
              >
                {isLiked ? <HeartFilledIcon size={18} /> : <HeartIcon size={18} />}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
