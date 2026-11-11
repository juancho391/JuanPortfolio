"use client";

import { openPalette } from "@/lib/bus";

export function PaletteButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`kbd-btn ${className}`}
      onClick={openPalette}
      aria-haspopup="dialog"
    >
      <span>Commands</span>
      <kbd>⌘K</kbd>
    </button>
  );
}
