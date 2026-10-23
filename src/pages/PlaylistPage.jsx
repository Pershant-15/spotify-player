import { Link, useParams } from "react-router-dom";
import { playlists, getPlaylistTracks, PALETTES } from "../data/library";
import { usePlayer } from "../context/PlayerContext";
import CoverArt from "../components/CoverArt";
import TrackList from "../components/TrackList";
import { PlayIcon, PauseIcon } from "../components/Icons";

export default function PlaylistPage() {
  const { id } = useParams();
  const { sourceId, isPlaying, togglePlay, playTrack } = usePlayer();
  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) {
    return (
      <div className="page empty-state">
        <h1 className="page-title">Playlist not found</h1>
        <Link to="/" className="pill-btn">Back to Home</Link>
      </div>
    );
  }

  const list = getPlaylistTracks(playlist);
  const playingThis = sourceId === playlist.id;

  const onPlay = () => {
    if (playingThis) togglePlay();
    else playTrack(list[0], list, playlist.id);
  };

  // The only gradient in the app: a soft fade behind the playlist header, like Spotify.
  const heroColor = PALETTES[playlist.palette % PALETTES.length][0];

  return (
    <div>
      <div
        className="playlist-hero"
        style={{ background: `linear-gradient(180deg, ${heroColor} 0%, #121212 100%)` }}
      >
        <CoverArt palette={playlist.palette} className="hero-cover" />
        <div className="hero-text">
          <div className="hero-kicker">Playlist</div>
          <h1 className="hero-title">{playlist.title}</h1>
          <p className="hero-desc">{playlist.description}</p>
          <div className="hero-stats">{list.length} songs</div>
        </div>
      </div>

      <div className="page page-after-hero">
        <div className="action-row">
          <button className="big-play" onClick={onPlay} aria-label={playingThis && isPlaying ? "Pause" : "Play"}>
            {playingThis && isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
          </button>
        </div>
        <TrackList tracks={list} sourceId={playlist.id} />
      </div>
    </div>
  );
}
