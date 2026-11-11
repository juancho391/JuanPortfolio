"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { sections } from "@/content/site";
import { SAY_EVENT, openPalette } from "@/lib/bus";
import { useActiveSection } from "@/lib/useActiveSection";

const ids = ["top", ...sections.map((s) => s.id)];

const clock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "America/Bogota",
  hour: "2-digit",
  minute: "2-digit",
});

function subscribeClock(onChange: () => void) {
  const timer = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(timer);
}

/** A tmux-style line pinned to the bottom: where you are, how far, local time. */
export function StatusBar() {
  const active = useActiveSection(ids);
  const percent = useRef<HTMLSpanElement>(null);
  const [message, setMessage] = useState("");
  const time = useSyncExternalStore(
    subscribeClock,
    () => clock.format(new Date()),
    () => "--:--",
  );

  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (percent.current) {
      percent.current.textContent = `${Math.round(value * 100)}%`;
    }
  });

  useEffect(() => {
    let timer = 0;
    const onSay = (event: Event) => {
      setMessage((event as CustomEvent<string>).detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(""), 2600);
    };
    window.addEventListener(SAY_EVENT, onSay);
    return () => {
      window.removeEventListener(SAY_EVENT, onSay);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <aside className="status" aria-label="Status bar">
      <span className="status__mode">normal</span>
      <span className="status__path">~/{active && active !== "top" ? active : ""}</span>
      <span className="status__msg" role="status">
        {message}
      </span>
      <span className="status__cell status__pct" ref={percent}>
        0%
      </span>
      <span className="status__cell status__time">pereira {time}</span>
      <button type="button" className="status__key" onClick={openPalette}>
        ⌘K
      </button>
    </aside>
  );
}
