import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import { LuFileCode, LuSparkles, LuSquareTerminal } from "react-icons/lu";
import {
  SiArchlinux, SiDjango, SiDocker, SiExpress, SiFastapi, SiGithubactions,
  SiGooglecloud, SiHyprland, SiJavascript, SiLinux, SiModelcontextprotocol,
  SiMongodb, SiMysql, SiNestjs, SiNextdotjs, SiPostgresql, SiPython, SiReact,
  SiRedis, SiTailwindcss, SiUbuntu,
} from "react-icons/si";
import { stack } from "@/content/site";

const icons: Record<string, IconType> = {
  Python: SiPython,
  Django: SiDjango,
  FastAPI: SiFastapi,
  NestJS: SiNestjs,
  Express: SiExpress,
  FastMCP: SiModelcontextprotocol,
  JavaScript: SiJavascript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Docker: SiDocker,
  Linux: SiLinux,
  Ubuntu: SiUbuntu,
  Arch: SiArchlinux,
  Omarchy: SiHyprland,
  GCP: SiGooglecloud,
  AWS: FaAws,
  "GitHub Actions": SiGithubactions,
  "MCP servers": SiModelcontextprotocol,
  OpenCode: LuSquareTerminal,
  Skills: LuSparkles,
  "Spec-driven development": LuFileCode,
};

export function StackGrid() {
  return (
    <div className="stack">
      {stack.map((group) => (
        <section className="stack__group" key={group.area} data-reveal>
          <h3 className="stack__area">
            <span aria-hidden="true">~/stack/</span>
            {group.area}
          </h3>
          <ul className="chips">
            {group.tools.map((tool, i) => {
              const Icon = icons[tool] ?? LuSquareTerminal;
              return (
                <li className="chip" key={tool} style={{ "--i": i } as React.CSSProperties}>
                  <Icon className="chip__icon" aria-hidden="true" />
                  {tool}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
