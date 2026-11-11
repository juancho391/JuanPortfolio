"use client";

import { useEffect, useRef, useState } from "react";
import { profile, projects, sections, stack, work } from "@/content/site";
import { copyText, goTo } from "@/lib/bus";
import { Term } from "./Term";

type Entry = { id: number; cmd: string; out: React.ReactNode };

const help: [string, string][] = [
  ["whoami", "who this is"],
  ["work", "what I ship at Sua Eco"],
  ["projects", "the project index"],
  ["stack", "tools by area"],
  ["contact", "how to reach me"],
  ["github", "open my GitHub profile"],
  ["copy", "copy my email address"],
  ["open <section>", `jump to ${sections.map((s) => s.id).join(", ")}`],
  ["clear", "empty the screen"],
];

const names = ["help", "whoami", "work", "projects", "stack", "contact", "github", "copy", "open", "clear"];
const quick = ["help", "whoami", "work", "projects", "stack", "contact", "github"];

function Pairs({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="sh__pairs">
      {rows.map(([key, value]) => (
        <div key={key}>
          <dt>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function answer(input: string): React.ReactNode {
  const [name, ...args] = input.trim().toLowerCase().split(/\s+/);
  switch (name) {
    case "help":
      return <Pairs rows={help} />;
    case "whoami":
      return (
        <p>
          {profile.fullName}. {profile.role} at {profile.company}, in {profile.location}.
        </p>
      );
    case "work":
      return <Pairs rows={work.map((w) => [w.title, w.line])} />;
    case "projects":
      return (
        <>
          <Pairs rows={projects.map((p) => [p.name, `${p.what} [${p.stack}]`])} />
          <p className="sh__dim">Sample entries until the real projects land.</p>
        </>
      );
    case "stack":
      return <Pairs rows={stack.map((s) => [s.area, s.tools.join(", ")])} />;
    case "contact":
    case "email":
      return (
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span className="sh__dim"> (run copy to put it on your clipboard)</span>
          <br />
          <a href={profile.github} target="_blank" rel="noreferrer">{profile.github.replace("https://", "")}</a>
        </p>
      );
    case "github":
    case "gh":
      window.open(profile.github, "_blank", "noopener,noreferrer");
      return (
        <p>
          Opening <a href={profile.github} target="_blank" rel="noreferrer">{profile.github.replace("https://", "")}</a>.
        </p>
      );
    case "copy":
      void copyText(profile.email, "Address copied.");
      return <p>Copying {profile.email} to your clipboard.</p>;
    case "open":
    case "cd": {
      const target = (args[0] ?? "").replace(/^[#~/]+/, "");
      if (sections.some((s) => s.id === target) && goTo(target)) {
        return <p>Opening {target}.</p>;
      }
      return (
        <p className="sh__err">
          Usage: open &lt;section&gt;. Sections: {sections.map((s) => s.id).join(", ")}.
        </p>
      );
    }
    case "sudo":
      return <p className="sh__err">Permission denied. Try contact instead.</p>;
    case "ls":
      return <p>work projects stack contact</p>;
    default:
      return (
        <p className="sh__err">
          Command not found: {name}. Type help for the list.
        </p>
      );
  }
}

const first: Entry[] = [{ id: 0, cmd: "whoami", out: answer("whoami") }];

/** A small working shell over the page content. */
export function Shell() {
  const [entries, setEntries] = useState<Entry[]>(first);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const nextId = useRef(1);
  const screen = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = screen.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    history.current.unshift(cmd);
    cursor.current = -1;
    setValue("");
    if (cmd.toLowerCase() === "clear") {
      setEntries([]);
      return;
    }
    const entry = { id: nextId.current++, cmd, out: answer(cmd) };
    setEntries((list) => [...list.slice(-30), entry]);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const step = event.key === "ArrowUp" ? 1 : -1;
      const next = Math.max(-1, Math.min(history.current.length - 1, cursor.current + step));
      cursor.current = next;
      setValue(next === -1 ? "" : history.current[next]);
    } else if (event.key === "Tab" && value.trim()) {
      const match = names.find((n) => n.startsWith(value.trim().toLowerCase()));
      if (match && match !== value) {
        event.preventDefault();
        setValue(match);
      }
    } else if (event.key.toLowerCase() === "l" && event.ctrlKey) {
      event.preventDefault();
      setEntries([]);
    }
  }

  return (
    <div className="sh">
      <Term title="visitor@juan: ~" className="sh__term">
        {/* A click anywhere on the screen puts the caret in the input, like a real terminal. */}
        <div
          className="sh__screen"
          ref={screen}
          onClick={(event) => {
            if (!(event.target as HTMLElement).closest("a") && !window.getSelection()?.toString()) {
              field.current?.focus({ preventScroll: true });
            }
          }}
        >
          <div role="log" aria-live="polite" aria-label="Shell output">
            {entries.map((entry) => (
              <div className="sh__entry" key={entry.id}>
                <p className="sh__cmd">
                  <span className="prompt__sign">$</span> {entry.cmd}
                </p>
                <div className="sh__out">{entry.out}</div>
              </div>
            ))}
          </div>
          <form
            className="sh__line"
            onSubmit={(event) => {
              event.preventDefault();
              run(value);
            }}
          >
            <label className="prompt__sign" htmlFor="sh-input">
              <span className="visually-hidden">Shell command</span>
              <span aria-hidden="true">$</span>
            </label>
            <input
              id="sh-input"
              ref={field}
              className="sh__input"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="type help and press enter"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
            />
          </form>
        </div>
      </Term>
      <div className="seg" role="group" aria-label="Run a command">
        {quick.map((cmd) => (
          <button key={cmd} type="button" className="seg__btn seg__btn--cmd" onClick={() => run(cmd)}>
            <span className="seg__label">{cmd}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
