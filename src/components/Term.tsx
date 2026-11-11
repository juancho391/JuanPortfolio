/** A terminal window frame: a title bar over a body. */
export function Term({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`term ${className}`}>
      <div className="term__bar" aria-hidden="true">
        <span className="term__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="term__title">{title}</span>
      </div>
      <div className="term__body">{children}</div>
    </div>
  );
}

/** A decorative shell prompt line above a heading. */
export function Prompt({ cmd }: { cmd: string }) {
  return (
    <p className="prompt" aria-hidden="true">
      <span className="prompt__sign">$</span> {cmd}
    </p>
  );
}
