"use client";

import { useState } from "react";
import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
