import LanguageToggle from "@/components/ui/language-toggle";
import Container from "@/components/container";
import { Link, useLocation } from "react-router-dom";

// Minimal header: logo + language switcher. Section links live in the footer.
const Navbar = () => {
  const { pathname } = useLocation();

  // Over the gradient waves behind the legal pages, a near-opaque white pill looks pasted on: let the waves show through
  const onWaves = pathname.startsWith("/legal/");

  const goHome = () => {
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="w-full md:top-6 top-4 mx-auto absolute z-40">
      <Container className="flex items-center justify-between">
        <Link to="/" onClick={goHome} className="flex items-center w-fit">
          <img src="/images/common/logo.svg" alt="Monarch Securities" className="h-10 md:h-12 w-auto" />
        </Link>
        <LanguageToggle className={onWaves ? "bg-white/30 border-white/50" : undefined} />
      </Container>
    </header>
  );
};

export default Navbar;
