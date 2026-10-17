"use client";
import Container from "@/components/container";
import UserMenu from "@/components/sections/shared/user-menu";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "react-router-dom";

// Minimal header: logo only. Section links live in the footer.
const Navbar = () => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  const goHome = () => {
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="w-full md:top-6 top-4 mx-auto absolute z-40">
      <Container className="flex items-center justify-between">
        <Link to="/" onClick={goHome} className="flex items-center w-fit">
          <img src="/images/common/logo.svg" alt="Monarch Securities" className="h-10 md:h-12 w-auto" />
        </Link>
        {!loading && user && <UserMenu />}
      </Container>
    </header>
  );
};

export default Navbar;
