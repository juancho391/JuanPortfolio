"use client";

import { useEffect } from "react";

const format = new Intl.NumberFormat("en-US");

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const duration = 900;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = format.format(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/**
 * Scroll reveals, count-ups and the pointer spotlight. Content is visible without this component:
 * the hidden state only applies under the `js` class set in the layout.
 */
export function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");
          if (!reduced) {
            el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          }
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // Pointer spotlight: rows marked data-spot light up under the cursor.
    const onMove = (event: PointerEvent) => {
      const el = (event.target as HTMLElement).closest?.<HTMLElement>("[data-spot]");
      if (!el) return;
      const box = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - box.left}px`);
      el.style.setProperty("--my", `${event.clientY - box.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
