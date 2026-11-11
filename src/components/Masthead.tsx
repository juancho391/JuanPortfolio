"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { sections } from "@/content/site";
import { useActiveSection } from "@/lib/useActiveSection";
import { PaletteButton } from "./PaletteButton";

const ids = sections.map((s) => s.id);

export function Masthead() {
  const active = useActiveSection(ids);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  return (
    <header className="mast">
      <nav className="container mast__row" aria-label="Main">
        <a className="mast__mark" href="#top" aria-label="Juan Bedoya, home">
          <span className="mast__user">juan</span>@sua-eco
          <span className="mast__path">:~$</span>
        </a>
        <div className="mast__links">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "location" : undefined}
            >
              {s.label}
              {active === s.id && (
                <motion.span
                  layoutId="mast-on"
                  className="mast__on"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </a>
          ))}
        </div>
        <PaletteButton />
      </nav>
      <motion.span className="mast__progress" style={{ scaleX }} aria-hidden="true" />
    </header>
  );
}
