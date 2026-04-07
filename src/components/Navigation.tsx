"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Do not show navigation/header on the auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <>
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
