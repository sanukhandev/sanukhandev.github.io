import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop ensures that client-side page transitions in React Router
 * immediately reset the scroll position to the top of the viewport (0, 0),
 * avoiding landing at the bottom or middle of destination pages.
 */
export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If navigation targets an in-page anchor hash, allow smooth scrolling to it
    if (hash) {
      const id = hash.replace(/^#/, "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Instant reset to top-left of page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [pathname, search, hash]);

  return null;
}

export default ScrollToTop;
