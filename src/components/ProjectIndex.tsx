"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, type ProjectKind } from "@/content/site";

type Filter = "all" | ProjectKind;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "ai", label: "AI" },
  { id: "infra", label: "Infra" },
  { id: "web", label: "Web" },
];

export function ProjectIndex() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = projects.filter((p) => filter === "all" || p.kind === filter);

  return (
    <div className="projects">
      <div className="seg" role="group" aria-label="Filter projects by kind">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className="seg__btn"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {filter === f.id && (
              <motion.span
                layoutId="seg-on"
                className="seg__on"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="seg__label">{f.label}</span>
          </button>
        ))}
      </div>

      <ul className="index" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project) => (
            <motion.li
              key={project.name}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="index__row"
              data-spot
            >
              <h3 className="index__name">
                <span className="tag">{project.kind}</span>
                {project.href ? (
                  <a href={project.href}>{project.name}</a>
                ) : (
                  project.name
                )}
              </h3>
              <p className="index__what">{project.what}</p>
              <p className="index__stack">{project.stack}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <p className="caption">Sample entries until the real projects land.</p>
    </div>
  );
}
