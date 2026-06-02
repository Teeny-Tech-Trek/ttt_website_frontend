import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection } from '../../utils/scrollToSection';

/**
 * Drop-in replacement for `react-router-hash-link`'s `HashLink`.
 *
 * Accepts the same `to` (e.g. "/#pricing", "#contact", "/blogs") and `smooth`
 * props, but instead of pushing the hash into the URL it:
 *   - smooth-scrolls to the section when we're already on the target page
 *     (no history entry, no stale `#hash` left behind), or
 *   - navigates to the target route carrying the section in router state, so the
 *     destination page scrolls after it mounts while the URL stays clean.
 *
 * Modifier / middle clicks fall through to the real `href` so "open in new tab"
 * keeps working and the links remain crawlable for SEO.
 */
export interface SectionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Target like "/#pricing", "#contact" or a plain route "/blogs". */
  to: string;
  /** Accepted for HashLink compatibility — scrolling is always smooth. */
  smooth?: boolean;
}

const SectionLink = React.forwardRef<HTMLAnchorElement, SectionLinkProps>(
  ({ to, smooth: _smooth, children, onClick, ...rest }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [rawPath, rawHash = ''] = to.split('#');
    const path = rawPath || '/';
    const sectionId = rawHash.trim();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      // Let the browser handle new-tab / new-window intents natively.
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button === 1
      ) {
        return;
      }

      event.preventDefault();

      // Plain route link (no section) — behave like a normal router <Link>.
      if (!sectionId) {
        if (location.pathname !== path) navigate(path);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const onTargetPage = location.pathname === path;

      if (onTargetPage) {
        // Already here: just scroll. No navigation, no history entry, no hash.
        scrollToSection(sectionId);
      } else {
        // Go to the target route and let it scroll on mount. The section travels
        // in router state, so the URL stays clean (no `#hash`).
        navigate(path, { state: { scrollTo: sectionId } });
      }
    };

    return (
      <a ref={ref} href={to} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }
);

SectionLink.displayName = 'SectionLink';

export default SectionLink;
