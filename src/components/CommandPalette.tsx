"use client";

import { useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import { LuArrowUp, LuCopy, LuDownload, LuHash, LuMail, LuSearch } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { profile, sections } from "@/content/site";
import { PALETTE_EVENT, copyText, download, goTo } from "@/lib/bus";

/** Command palette on Cmd/Ctrl+K. Doubles as the menu on small screens. */
export function CommandPalette() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const open = () => {
      const el = dialog.current;
      if (!el || el.open) return;
      el.showModal();
      el.querySelector("input")?.focus();
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else open();
      }
    };
    window.addEventListener(PALETTE_EVENT, open);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(PALETTE_EVENT, open);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const run = (action: () => void) => {
    dialog.current?.close();
    action();
  };

  return (
    <dialog
      ref={dialog}
      className="palette"
      aria-label="Command palette"
      onClose={() => setSearch("")}
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current?.close();
      }}
    >
      <Command label="Command palette" loop>
        <div className="palette__in">
          <LuSearch aria-hidden="true" />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Type a command or search"
          />
          <kbd>esc</kbd>
        </div>
        <Command.List>
          <Command.Empty>No command matches.</Command.Empty>
          <Command.Group heading="Go to">
            {sections.map((s) => (
              <Command.Item key={s.id} value={`go ${s.label}`} onSelect={() => run(() => goTo(s.id))}>
                <LuHash aria-hidden="true" />
                {s.label}
              </Command.Item>
            ))}
            <Command.Item value="go top" onSelect={() => run(() => goTo("top"))}>
              <LuArrowUp aria-hidden="true" />
              Back to top
            </Command.Item>
          </Command.Group>
          <Command.Group heading="Actions">
            <Command.Item
              value="email juan write mail"
              onSelect={() => run(() => window.location.assign(`mailto:${profile.email}`))}
            >
              <LuMail aria-hidden="true" />
              Email Juan
            </Command.Item>
            <Command.Item
              value="download cv resume pdf"
              onSelect={() => run(() => download(profile.cv))}
            >
              <LuDownload aria-hidden="true" />
              Download CV
            </Command.Item>
            <Command.Item
              value="github profile code repos"
              onSelect={() => run(() => window.open(profile.github, "_blank", "noopener,noreferrer"))}
            >
              <SiGithub aria-hidden="true" />
              Open GitHub
            </Command.Item>
            <Command.Item
              value="copy email address"
              onSelect={() => run(() => void copyText(profile.email, "Address copied."))}
            >
              <LuCopy aria-hidden="true" />
              Copy email address
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </dialog>
  );
}
