import { LuMail } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { CommandPalette } from "@/components/CommandPalette";
import { CopyEmail } from "@/components/CopyEmail";
import { LatencyRace } from "@/components/LatencyRace";
import { Masthead } from "@/components/Masthead";
import { Motion } from "@/components/Motion";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Shell } from "@/components/Shell";
import { StackGrid } from "@/components/StackGrid";
import { StatusBar } from "@/components/StatusBar";
import { Prompt, Term } from "@/components/Term";
import { background, caseStudy, profile, work } from "@/content/site";

const numbers = new Intl.NumberFormat("en-US");

export default function Home() {
  const mailto = `mailto:${profile.email}`;

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <Masthead />

      <main id="main">
        <section className="hero" id="top">
          <div className="container hero__grid">
            <div className="hero__text">
              <p className="prompt prompt--typed" aria-hidden="true">
                <span className="prompt__sign">$</span>{" "}
                <span className="typed">whoami</span>
              </p>
              <h1>
                agents that <span className="verb">answer</span> in seconds.
                <span className="cursor" aria-hidden="true" />
              </h1>
              <p className="lead">
                {profile.name}, backend and AI engineer at {profile.company},
                in {profile.location}.
              </p>
              <div className="actions">
                <a className="btn btn--primary" href={mailto}>
                  <LuMail aria-hidden="true" />
                  Email Juan
                </a>
                <a className="btn btn--secondary" href="#work">
                  See the work
                </a>
                <a
                  className="btn btn--secondary btn--icon"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Juan on GitHub"
                >
                  <SiGithub aria-hidden="true" />
                </a>
              </div>
            </div>
            <Term title="agent --trace request.log" className="hero__term">
              <LatencyRace />
            </Term>
          </div>
        </section>

        <section className="section section--l" id="work">
          <div className="container work">
            <div className="work__head" data-reveal>
              <Prompt cmd="ls work/" />
              <h2>what i ship at sua eco</h2>
              <p className="lead">An AI startup, where I work today.</p>
            </div>
            <div className="rows">
              {work.map((item, i) => (
                <article
                  className="row"
                  key={item.title}
                  data-reveal
                  data-spot
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="row__n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.line}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="case">
          <div className="container">
            <div className="split-head" data-reveal>
              <div>
                <Prompt cmd="cat classifier.md" />
                <h2>a model that reads coffee leaves</h2>
              </div>
              <p className="lead">
                I led it end to end: an EfficientNet classifier that spots
                disease in coffee plants.
              </p>
            </div>

            <figure
              className="pipeline well blueprint diagram"
              aria-label="Diagram of the classifier pipeline, from dataset to agent"
              data-reveal
            >
              <div className="track track--pipe">
                <span className="track__fill" aria-hidden="true" />
                <ol className="track__nodes">
                  {caseStudy.steps.map((step) => (
                    <li className="node" data-on="true" key={step}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <figcaption>
                Transfer learning on EfficientNet, shipped as an API the agent
                calls.
              </figcaption>
            </figure>

            <dl className="stats" data-reveal>
              {caseStudy.figures.map((figure) => (
                <div className="stat" key={figure.label}>
                  <dt>{figure.label}</dt>
                  <dd className="stat__value">
                    <span data-count={figure.value}>
                      {numbers.format(figure.value)}
                    </span>
                    {figure.suffix && (
                      <span className="stat__unit">{figure.suffix}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section section--s" id="projects">
          <div className="container">
            <div className="section__head" data-reveal>
              <Prompt cmd="ls projects/" />
              <h2>more on the bench</h2>
            </div>
            <ProjectIndex />
          </div>
        </section>

        <section className="section" id="stack">
          <div className="container">
            <div className="split-head" data-reveal>
              <div>
                <Prompt cmd="ls stack/" />
                <h2>the stack i reach for</h2>
              </div>
              <p className="lead">Python first, on Linux every day.</p>
            </div>
            <StackGrid />
          </div>
        </section>

        <section className="section" id="shell">
          <div className="container">
            <div className="split-head" data-reveal>
              <div>
                <Prompt cmd="./ask-me.sh" />
                <h2>or just ask the shell</h2>
              </div>
              <p className="lead">It runs. Type a command, or tap one.</p>
            </div>
            <div data-reveal>
              <Shell />
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="background-title">
          <div className="container">
            <h2 className="visually-hidden" id="background-title">
              background
            </h2>
            <dl className="facts" data-reveal>
              {background.map((fact) => (
                <div className="fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="close" id="contact">
        <div className="container">
          <div data-reveal>
            <Prompt cmd="ping juan" />
            <h2 className="close__line">
              have an agent that keeps people waiting?
              <span className="cursor" aria-hidden="true" />
            </h2>
          </div>
          <div className="close__contact" data-reveal>
            <a className="close__email" href={mailto}>
              {profile.email}
            </a>
            <CopyEmail email={profile.email} />
            <a
              className="btn btn--secondary"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <SiGithub aria-hidden="true" />
              GitHub
            </a>
            {profile.phone && (
              <a className="close__phone" href={`tel:${profile.phone}`}>
                {profile.phone}
              </a>
            )}
          </div>
          <div className="close__foot">
            <p>
              {profile.fullName}, {profile.location}.
            </p>
            <nav className="close__links" aria-label="Footer">
              <a href="#work">Work</a>
              <a href="#projects">Projects</a>
              <a href="#stack">Stack</a>
              <a href="#shell">Shell</a>
              <a href="#top">Back to top</a>
            </nav>
          </div>
        </div>
      </footer>

      <StatusBar />
      <CommandPalette />
      <Motion />
    </>
  );
}
