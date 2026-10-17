import { forwardRef, type MouseEvent } from "react";
import { scrollToSection, type SectionId } from "@/lib/sections";
import { Link, useLocation, type LinkProps } from "react-router-dom";

type SectionLinkProps = Omit<LinkProps, "to"> & { to: SectionId };

// Scrolls to a landing page section; from any other page it navigates to "/#id" and Layout scrolls on arrival
const SectionLink = forwardRef<HTMLAnchorElement, SectionLinkProps>(({ to, onClick, ...props }, ref) => {
  const { pathname } = useLocation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || pathname !== "/") return;
    if (scrollToSection(to)) {
      e.preventDefault();
      window.history.replaceState(null, "", `/#${to}`);
    }
  };

  return <Link ref={ref} to={`/#${to}`} onClick={handleClick} {...props} />;
});
SectionLink.displayName = "SectionLink";

export default SectionLink;
