import { Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import NowPlayingBar from "./components/NowPlayingBar";
import Home from "./pages/Home";
import PlaylistPage from "./pages/PlaylistPage";
import SearchPage from "./pages/SearchPage";
import LikedPage from "./pages/LikedPage";

function NotFound() {
  return (
    <div className="page empty-state">
      <h1 className="page-title">Page not found</h1>
      <Link to="/" className="pill-btn">Back to Home</Link>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <NowPlayingBar />
    </div>
  );
}
