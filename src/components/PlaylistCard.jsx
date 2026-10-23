import { Link } from "react-router-dom";
import CoverArt from "./CoverArt";

export default function PlaylistCard({ playlist }) {
  return (
    <Link to={`/playlist/${playlist.id}`} className="card">
      <CoverArt palette={playlist.palette} className="card-cover" />
      <div className="card-title">{playlist.title}</div>
      <div className="card-desc">{playlist.description}</div>
    </Link>
  );
}
