function Icon({ d, size = 24, children, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
      {d ? <path d={d} /> : children}
    </svg>
  );
}

export const PlayIcon = (p) => <Icon d="M8 5v14l11-7z" {...p} />;
export const PauseIcon = (p) => <Icon d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" {...p} />;
export const NextIcon = (p) => <Icon d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" {...p} />;
export const PrevIcon = (p) => <Icon d="M6 6h2v12H6zm3.5 6l8.5 6V6z" {...p} />;
export const ShuffleIcon = (p) => (
  <Icon d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" {...p} />
);
export const RepeatIcon = (p) => (
  <Icon d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" {...p} />
);
export const RepeatOneIcon = (p) => (
  <Icon {...p}>
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
    <path d="M13 15V9h-1l-2 1v1h1.5v4H13z" />
  </Icon>
);
export const HeartIcon = (p) => (
  <Icon d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" {...p} />
);
export const HeartFilledIcon = (p) => (
  <Icon d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" {...p} />
);
export const VolumeIcon = (p) => (
  <Icon d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" {...p} />
);
export const MuteIcon = (p) => (
  <Icon d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" {...p} />
);
export const HomeIcon = (p) => <Icon d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8z" {...p} />;
export const SearchIcon = (p) => (
  <Icon d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" {...p} />
);
