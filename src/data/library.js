// Sample library. Audio streams from free royalty-free SoundHelix demo tracks.
// To use your own MP3s, put them in /public/audio and set src to "/audio/yourfile.mp3".
const song = (n) => `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;

// Flat color palettes used by the drawn SVG covers: [background, shape A, shape B]
export const PALETTES = [
  ["#2d46b9", "#f573a0", "#ffd2d7"],
  ["#1e3264", "#1db954", "#a7f3d0"],
  ["#8d67ab", "#ffcd00", "#f3e8ff"],
  ["#e8115b", "#1e3264", "#ffd2d7"],
  ["#006450", "#ffb464", "#d0f0e0"],
  ["#509bf5", "#0d1b4a", "#d6e8ff"],
  ["#ba5d07", "#f037a5", "#ffe0b5"],
  ["#503750", "#1ed760", "#e9d5e9"],
];

export const tracks = [
  { id: "t1", title: "Midnight Drive", artist: "Neon Harbor", album: "After Hours", palette: 0, src: song(1) },
  { id: "t2", title: "Glass Skyline", artist: "Neon Harbor", album: "After Hours", palette: 0, src: song(2) },
  { id: "t3", title: "Slow Tide", artist: "Aria Vale", album: "Low Light", palette: 1, src: song(3) },
  { id: "t4", title: "Paper Lanterns", artist: "Aria Vale", album: "Low Light", palette: 1, src: song(4) },
  { id: "t5", title: "Golden Hour Loop", artist: "The Quiet Sets", album: "Daybreak", palette: 2, src: song(5) },
  { id: "t6", title: "Wake Up Easy", artist: "The Quiet Sets", album: "Daybreak", palette: 2, src: song(6) },
  { id: "t7", title: "Redline", artist: "Volt Avenue", album: "Overdrive", palette: 3, src: song(7) },
  { id: "t8", title: "Pulse Check", artist: "Volt Avenue", album: "Overdrive", palette: 3, src: song(8) },
  { id: "t9", title: "Forest Static", artist: "Moss & Mono", album: "Green Room", palette: 4, src: song(9) },
  { id: "t10", title: "Deep Focus", artist: "Moss & Mono", album: "Green Room", palette: 4, src: song(10) },
  { id: "t11", title: "Cloud Atlas", artist: "Kairo", album: "Weightless", palette: 5, src: song(11) },
  { id: "t12", title: "Last Train Home", artist: "Kairo", album: "Weightless", palette: 5, src: song(12) },
];

export const playlists = [
  {
    id: "daily-mix",
    title: "Daily Mix 1",
    description: "Neon Harbor, Aria Vale, Kairo and more.",
    palette: 0,
    trackIds: ["t1", "t3", "t11", "t5", "t2", "t12"],
  },
  {
    id: "chill-vibes",
    title: "Chill Vibes",
    description: "Slow tempos for lazy afternoons.",
    palette: 1,
    trackIds: ["t3", "t4", "t6", "t9", "t11"],
  },
  {
    id: "focus-flow",
    title: "Focus Flow",
    description: "Steady beats to help you concentrate.",
    palette: 4,
    trackIds: ["t10", "t9", "t12", "t5", "t4"],
  },
  {
    id: "workout-energy",
    title: "Workout Energy",
    description: "High tempo tracks to keep you moving.",
    palette: 3,
    trackIds: ["t7", "t8", "t1", "t2", "t5"],
  },
];

export const trackById = Object.fromEntries(tracks.map((t) => [t.id, t]));

export const getPlaylistTracks = (playlist) =>
  playlist.trackIds.map((id) => trackById[id]).filter(Boolean);
