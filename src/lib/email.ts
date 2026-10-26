/**
 * Native compose link — opens the visitor's configured mail app
 * (Gmail app, Outlook, Apple Mail, etc.) with the recipient filled in.
 * This avoids loading Gmail's heavy web app in a browser tab.
 */
export function mailtoHref(to: string, subject?: string): string {
  return subject ? `mailto:${to}?subject=${encodeURIComponent(subject)}` : `mailto:${to}`;
}

/**
 * Gmail web compose URL — kept for cases where a browser-based
 * compose window is explicitly required.
 */
export function gmailComposeHref(to: string, subject?: string): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
  });

  if (subject) {
    params.set("su", subject);
  }

  return `https://mail.google.com/mail/?${params.toString()}`;
}
