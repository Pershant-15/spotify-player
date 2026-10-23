import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const PlayerContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return ctx;
}

const LIKED_KEY = "music-player:liked";
const VOLUME_KEY = "music-player:volume";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: ignore */
  }
}

export function PlayerProvider({ children }) {
  // One Audio element for the whole app, kept outside React state.
  const audioRef = useRef(null);
  if (audioRef.current === null) audioRef.current = new Audio();

  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(-1);
  const [sourceId, setSourceId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(() => readJSON(VOLUME_KEY, 0.8));
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off"); // "off" | "all" | "one"
  const [liked, setLiked] = useState(() => readJSON(LIKED_KEY, []));
  const [error, setError] = useState("");

  // Latest values for event handlers that must not go stale.
  const latest = useRef({ queue, index, shuffle, repeat });
  latest.current = { queue, index, shuffle, repeat };
  const historyRef = useRef([]);

  const loadAndPlay = useCallback((track) => {
    const audio = audioRef.current;
    setError("");
    setCurrentTime(0);
    setDuration(0);
    audio.src = track.src;
    audio.play().catch(() => setIsPlaying(false));
  }, []);

  const playTrack = useCallback(
    (track, list, source = null) => {
      const audio = audioRef.current;
      const { queue: q, index: i } = latest.current;
      if (i >= 0 && q[i] && q[i].id === track.id) {
        // Same track: toggle instead of restarting.
        if (audio.paused) audio.play().catch(() => setIsPlaying(false));
        else audio.pause();
        if (source) setSourceId(source);
        return;
      }
      const newIndex = list.findIndex((t) => t.id === track.id);
      historyRef.current = [];
      setQueue(list);
      setIndex(newIndex);
      setSourceId(source);
      loadAndPlay(track);
    },
    [loadAndPlay]
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (latest.current.index < 0) return;
    if (audio.paused) audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  }, []);

  const next = useCallback(
    (auto = false) => {
      const audio = audioRef.current;
      const { queue: q, index: i, shuffle: sh, repeat: rep } = latest.current;
      if (!q.length) return;

      if (auto && rep === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false));
        return;
      }

      let nextIndex;
      if (sh && q.length > 1) {
        do {
          nextIndex = Math.floor(Math.random() * q.length);
        } while (nextIndex === i);
      } else {
        nextIndex = i + 1;
        if (nextIndex >= q.length) {
          if (auto && rep === "off") {
            // Reached the end of the queue: stop.
            audio.pause();
            audio.currentTime = 0;
            setCurrentTime(0);
            return;
          }
          nextIndex = 0;
        }
      }
      historyRef.current.push(i);
      setIndex(nextIndex);
      loadAndPlay(q[nextIndex]);
    },
    [loadAndPlay]
  );

  const previous = useCallback(() => {
    const audio = audioRef.current;
    const { queue: q, index: i } = latest.current;
    if (!q.length) return;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    let prevIndex;
    if (historyRef.current.length) prevIndex = historyRef.current.pop();
    else prevIndex = i - 1 < 0 ? q.length - 1 : i - 1;
    setIndex(prevIndex);
    loadAndPlay(q[prevIndex]);
  }, [loadAndPlay]);

  const seek = useCallback((seconds) => {
    audioRef.current.currentTime = seconds;
    setCurrentTime(seconds);
  }, []);

  const setVolume = useCallback((v) => {
    const clamped = Math.min(1, Math.max(0, v));
    audioRef.current.volume = clamped;
    setVolumeState(clamped);
    if (clamped > 0) {
      audioRef.current.muted = false;
      setMuted(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }, []);

  const toggleShuffle = useCallback(() => setShuffle((s) => !s), []);
  const cycleRepeat = useCallback(
    () => setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off")),
    []
  );

  const toggleLike = useCallback((id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  // Wire the Audio element's events to React state once.
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
    audio.preload = "metadata";

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => next(true);
    const onError = () => {
      setIsPlaying(false);
      setError("This track could not be loaded. Check your connection.");
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.pause();
    };
    // volume is only the initial value here; later changes go through setVolume
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  useEffect(() => writeJSON(LIKED_KEY, liked), [liked]);
  useEffect(() => writeJSON(VOLUME_KEY, volume), [volume]);

  const currentTrack = index >= 0 ? queue[index] ?? null : null;

  useEffect(() => {
    document.title = currentTrack
      ? `${currentTrack.title} · ${currentTrack.artist}`
      : "Spotify-style Music Player";
  }, [currentTrack]);

  const value = useMemo(
    () => ({
      currentTrack,
      sourceId,
      isPlaying,
      currentTime,
      duration,
      volume,
      muted,
      shuffle,
      repeat,
      liked,
      error,
      playTrack,
      togglePlay,
      next: () => next(false),
      previous,
      seek,
      setVolume,
      toggleMute,
      toggleShuffle,
      cycleRepeat,
      toggleLike,
    }),
    [
      currentTrack, sourceId, isPlaying, currentTime, duration, volume, muted,
      shuffle, repeat, liked, error, playTrack, togglePlay, next, previous,
      seek, setVolume, toggleMute, toggleShuffle, cycleRepeat, toggleLike,
    ]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}
