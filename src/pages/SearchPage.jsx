import { useMemo, useState } from "react";
import { playlists, tracks, getPlaylistTracks } from "../data/library";
import TrackList from "../components/TrackList";
import { SearchIcon } from "../components/Icons";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | playlist id

  const results = useMemo(() => {
    const pool =
      filter === "all"
        ? tracks
        : getPlaylistTracks(playlists.find((p) => p.id === filter) ?? { trackIds: [] });
    const q = query.trim().toLowerCase();
    if (!q) return pool;
    return pool.filter((t) =>
      [t.title, t.artist, t.album].some((field) => field.toLowerCase().includes(q))
    );
  }, [query, filter]);

  return (
    <div className="page">
      <h1 className="page-title">Search</h1>

      <label className="search-box">
        <SearchIcon size={22} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          aria-label="Search songs, artists or albums"
          autoFocus
        />
      </label>

      <div className="chips" role="group" aria-label="Filter by playlist">
        <button className={`chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All
        </button>
        {playlists.map((p) => (
          <button
            key={p.id}
            className={`chip ${filter === p.id ? "active" : ""}`}
            onClick={() => setFilter(p.id)}
          >
            {p.title}
          </button>
        ))}
      </div>

      <p className="result-count">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>

      {results.length ? (
        <TrackList tracks={results} sourceId="search" />
      ) : (
        <div className="empty-state">
          <h2 className="section-heading">No results for “{query}”</h2>
          <p className="muted">Check the spelling or try a different filter.</p>
        </div>
      )}
    </div>
  );
}
