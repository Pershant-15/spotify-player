import { Link } from "react-router-dom";
import { tracks } from "../data/library";
import { usePlayer } from "../context/PlayerContext";
import TrackList from "../components/TrackList";

export default function LikedPage() {
  const { liked } = usePlayer();
  const likedTracks = tracks.filter((t) => liked.includes(t.id));

  return (
    <div className="page">
      <h1 className="page-title">Liked Songs</h1>
      {likedTracks.length ? (
        <>
          <p className="result-count">{likedTracks.length} liked {likedTracks.length === 1 ? "song" : "songs"}</p>
          <TrackList tracks={likedTracks} sourceId="liked" />
        </>
      ) : (
        <div className="empty-state">
          <h2 className="section-heading">Songs you like will appear here</h2>
          <p className="muted">Tap the heart on any track to save it.</p>
          <Link to="/search" className="pill-btn">Find songs</Link>
        </div>
      )}
    </div>
  );
}
