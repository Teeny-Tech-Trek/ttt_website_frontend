// Smooth-scrolls to an on-page section by id without polluting the URL with a hash.
//
// The site uses a single long homepage made of <section id="..."> blocks. Section
// navigation should feel like scrolling, not a route change — so we scroll the
// element into view ourselves instead of relying on the browser's `#hash` jump.
//
// `NAV_OFFSET` compensates for the fixed navbar so the section heading isn't hidden
// underneath it after scrolling.
export const NAV_OFFSET = 80;

export function scrollToSection(rawId: string | null | undefined): void {
  if (!rawId) return;
  const id = rawId.replace(/^#/, '').trim();

  // "home" (or an empty target) means the very top of the page.
  if (!id || id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // On a cross-route jump the target section may not be in the DOM yet when this
  // runs (the homepage is still mounting). Poll briefly until it appears (~3s).
  let attempts = 0;
  const maxAttempts = 30;

  const run = () => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: top < 0 ? 0 : top, behavior: 'smooth' });
      return;
    }
    if (attempts++ < maxAttempts) window.setTimeout(run, 100);
  };

  run();
}
