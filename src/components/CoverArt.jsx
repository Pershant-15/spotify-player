import { PALETTES } from "../data/library";

// Original flat-color cover art drawn with SVG shapes. No images, no gradients.
export default function CoverArt({ palette = 0, pattern, className = "" }) {
  const [bg, a, b] = PALETTES[palette % PALETTES.length];
  const variant = pattern ?? palette % 4;

  return (
    <svg viewBox="0 0 100 100" className={`cover ${className}`} role="img" aria-label="Cover art" preserveAspectRatio="xMidYMid slice">
      <rect width="100" height="100" fill={bg} />
      {variant === 0 && (
        <>
          <circle cx="66" cy="36" r="30" fill={a} />
          <circle cx="30" cy="72" r="15" fill={b} />
        </>
      )}
      {variant === 1 && (
        <>
          <rect x="-10" y="20" width="130" height="16" fill={a} transform="rotate(-25 50 50)" />
          <rect x="-10" y="48" width="130" height="16" fill={b} transform="rotate(-25 50 50)" />
          <rect x="-10" y="76" width="130" height="16" fill={a} transform="rotate(-25 50 50)" />
        </>
      )}
      {variant === 2 && (
        <>
          <polygon points="20,82 50,20 80,82" fill={a} />
          <circle cx="76" cy="26" r="11" fill={b} />
        </>
      )}
      {variant === 3 && (
        <>
          <circle cx="50" cy="50" r="38" fill={a} />
          <circle cx="50" cy="50" r="26" fill={bg} />
          <circle cx="50" cy="50" r="14" fill={b} />
        </>
      )}
    </svg>
  );
}
