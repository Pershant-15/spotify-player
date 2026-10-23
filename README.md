# Spotify-style Music Player (React)

A React-based Spotify-style music player with playlist and track browsing, real-time audio playback, search/filter functionality, and a persistent Now Playing interface. The app uses React Context for shared playback state and the HTML5 Audio API for programmatic audio control.

## Features
- Playlists and track browsing (Home, Playlist pages)
- Real-time playback: play/pause, next/previous, seek bar, volume and mute
- Shuffle and repeat (off / all / one)
- Search by title, artist or album, with playlist filter chips
- Liked Songs, saved in localStorage
- Persistent Now Playing bar on every page
- Spotify dark theme, flat solid colors, one soft gradient behind playlist headers
- Original SVG cover art

## Tech
React, Vite, React Router, React Context, HTML5 Audio API, CSS

## Run
npm install
npm run dev

## Your own music
Put MP3 files in `public/audio` and add them to `src/data/library.js` with `src: "/audio/yourfile.mp3"`.
Sample tracks stream from the free SoundHelix demo songs.

Built for learning purposes. Not affiliated with Spotify.
