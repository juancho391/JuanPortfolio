"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { race } from "@/content/site";

/**
 * Replays one agent request through the old and the new path.
 * Server-rendered in its finished state, so it reads without scripting
 * and under reduced motion.
 */
export function LatencyRace() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef(0);
  const [running, setRunning] = useState(false);

  const paint = useCallback((elapsedSeconds: number) => {
    const lanes = root.current?.querySelectorAll<HTMLElement>("[data-lane]");
    let done = true;
    lanes?.forEach((lane) => {
      const total = Number(lane.dataset.seconds);
      const progress = Math.min(elapsedSeconds / total, 1);
      if (progress < 1) done = false;
      lane.style.setProperty("--p", String(progress));
      const nodes = lane.querySelectorAll<HTMLElement>("[data-node]");
      nodes.forEach((node, i) => {
        node.dataset.on = String(progress >= i / (nodes.length - 1));
      });
      const readout = lane.querySelector("[data-seconds-out]");
      if (readout) {
        readout.textContent = String(Math.floor(Math.min(elapsedSeconds, total)));
      }
    });
    return done;
  }, []);

  const play = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(frame.current);
    setRunning(true);
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = ((now - start) / 1000) * race.playbackSpeed;
      if (paint(elapsed)) {
        setRunning(false);
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [paint]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [play]);

  return (
    <figure
      ref={root}
      className="race diagram"
      aria-label="Diagram of one agent request, before and after the rework"
    >
      {race.lanes.map((lane) => (
        <div
          key={lane.id}
          className={`lane lane--${lane.id}`}
          data-lane
          data-seconds={lane.seconds}
        >
          <p className="lane__label">{lane.label}</p>
          <div className="track">
            <span className="track__fill" aria-hidden="true" />
            <ol className="track__nodes">
              {lane.steps.map((step) => (
                <li key={step} className="node" data-node data-on="true">
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <p className="readout">
            <span className="readout__n" data-seconds-out>
              {lane.seconds}
            </span>
            <span className="readout__u">&nbsp;s</span>
          </p>
        </div>
      ))}
      <div className="race__foot">
        <figcaption>
          One request through the agent, replayed at {race.playbackSpeed} times
          its real speed.
        </figcaption>
        <button
          type="button"
          className="btn btn--secondary btn--small race__replay"
          onClick={play}
          disabled={running}
        >
          Replay
        </button>
      </div>
    </figure>
  );
}
