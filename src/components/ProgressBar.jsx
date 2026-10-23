import { useRef, useState } from "react";

// Flat, solid-color slider used for both the seek bar and the volume control.
export default function ProgressBar({ value, max, onChange, label, disabled = false }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  const update = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    onChange(ratio * max);
  };

  const onPointerDown = (e) => {
    if (disabled || !max) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    update(e);
  };
  const onPointerMove = (e) => {
    if (dragging) update(e);
  };
  const onPointerUp = () => setDragging(false);

  const onKeyDown = (e) => {
    if (disabled || !max) return;
    const step = max * 0.05;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(max, value + step));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(0, value - step));
    }
  };

  return (
    <div
      ref={ref}
      className={`pbar ${dragging ? "dragging" : ""} ${disabled ? "disabled" : ""}`}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={Math.round(max)}
      aria-valuenow={Math.round(value)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    >
      <div className="pbar-track">
        <div className="pbar-fill" style={{ width: `${pct}%` }} />
        <div className="pbar-thumb" style={{ left: `${pct}%` }} />
      </div>
    </div>
  );
}
