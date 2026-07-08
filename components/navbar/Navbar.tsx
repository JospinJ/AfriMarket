"use client";

import { useCallback, useEffect, useState } from "react";
import { NavbarTopBar } from "@/components/navbar/NavbarTopBar";
import { NavbarMainBar } from "@/components/navbar/NavbarMainBar";
import { NavbarSecondaryBar } from "@/components/navbar/NavbarSecondaryBar";
import { MegaMenu } from "@/components/navbar/MegaMenu";
import { MobileDrawer } from "@/components/navbar/MobileDrawer";
import { MobileSearchOverlay } from "@/components/navbar/MobileSearchOverlay";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggleMega = useCallback(() => setMegaOpen((o) => !o), []);
  const handleCloseMega = useCallback(() => setMegaOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <NavbarTopBar collapsed={scrolled} />
        <NavbarMainBar scrolled={scrolled} />
        <NavbarSecondaryBar megaOpen={megaOpen} onToggleMega={handleToggleMega} />
        <MegaMenu open={megaOpen} onClose={handleCloseMega} />
      </header>

      <MobileDrawer />
      <MobileSearchOverlay />
    </>
  );
}
