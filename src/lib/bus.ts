// Small window-event bus so separate client components can talk
// without a shared provider.

export const PALETTE_EVENT = "palette:open";
export const SAY_EVENT = "status:say";

export function openPalette() {
  window.dispatchEvent(new Event(PALETTE_EVENT));
}

/** Shows a short message in the status bar. */
export function say(message: string) {
  window.dispatchEvent(new CustomEvent<string>(SAY_EVENT, { detail: message }));
}

export async function copyText(text: string, done: string) {
  try {
    await navigator.clipboard.writeText(text);
    say(done);
    return true;
  } catch {
    say("Copying is blocked here. Select the text instead.");
    return false;
  }
}

export function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView();
  window.history.replaceState(null, "", `#${id}`);
  return true;
}

/** Starts a file download without leaving the page. */
export function download(href: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = href.split("/").pop() ?? "";
  document.body.append(link);
  link.click();
  link.remove();
  say("Downloading the CV.");
}
