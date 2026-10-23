import { playlists, tracks } from "../data/library";
import PlaylistCard from "../components/PlaylistCard";
import TrackList from "../components/TrackList";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Home() {
  return (
    <div className="page">
      <h1 className="page-title">{greeting()}</h1>

      <section>
        <h2 className="section-heading">Playlists</h2>
        <div className="card-grid">
          {playlists.map((p) => (
            <PlaylistCard key={p.id} playlist={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-heading">All songs</h2>
        <TrackList tracks={tracks} sourceId="all" />
      </section>
    </div>
  );
}
