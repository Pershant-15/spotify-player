import { NavLink } from "react-router-dom";
import { playlists } from "../data/library";
import CoverArt from "./CoverArt";
import { HomeIcon, SearchIcon, HeartFilledIcon } from "./Icons";

function BrandMark() {
  // Original mark: green circle with equalizer bars.
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#1db954" />
      <rect x="9" y="14" width="3" height="8" rx="1.5" fill="#000" />
      <rect x="14.5" y="9" width="3" height="14" rx="1.5" fill="#000" />
      <rect x="20" y="12" width="3" height="10" rx="1.5" fill="#000" />
    </svg>
  );
}

export default function Sidebar() {
  const linkClass = ({ isActive }) => `side-link ${isActive ? "active" : ""}`;

  return (
    <aside className="sidebar">
      <div className="panel brand-panel">
        <div className="brand">
          <BrandMark />
          <span>Music Player</span>
        </div>
        <nav className="side-nav">
          <NavLink to="/" end className={linkClass}><HomeIcon size={24} /><span>Home</span></NavLink>
          <NavLink to="/search" className={linkClass}><SearchIcon size={24} /><span>Search</span></NavLink>
          <NavLink to="/liked" className={linkClass}><HeartFilledIcon size={24} /><span>Liked Songs</span></NavLink>
        </nav>
      </div>

      <div className="panel library-panel">
        <h2 className="side-heading">Your Playlists</h2>
        <nav className="playlist-nav">
          {playlists.map((p) => (
            <NavLink key={p.id} to={`/playlist/${p.id}`} className={({ isActive }) => `playlist-link ${isActive ? "active" : ""}`}>
              <CoverArt palette={p.palette} className="mini-cover" />
              <div>
                <div className="pl-title">{p.title}</div>
                <div className="pl-sub">Playlist</div>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
