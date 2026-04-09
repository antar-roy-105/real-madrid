"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Header({
  onMenuToggle,
  menuOpen,
}: {
  onMenuToggle: () => void;
  menuOpen: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      // Hide header when scrolling DOWN past 80px, show when scrolling UP
      if (currentY > 80) {
        if (diff > 4) {
          setHidden(true);   // scrolling down → hide
        } else if (diff < -4) {
          setHidden(false);  // scrolling up → show
        }
      } else {
        setHidden(false);    // near top → always show
      }

      setScrolled(currentY > 50);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ExternalArrow = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[1000] px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${scrolled
        ? "bg-black/95 backdrop-blur-xl border-b border-white/5"
        : "bg-black/85 backdrop-blur-md border-b border-white/5"
        } ${hidden ? "-translate-y-full shadow-none" : "translate-y-0"}`}
      id="header"
    >
      <Link href="/" className="flex flex-col items-center justify-center gap-1 z-[1001] mt-1" id="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"
          alt="Real Madrid Logo"
          className="w-[40px] h-auto drop-shadow-md mb-1"
        />
        <span className="font-primary font-bold text-[17px] tracking-wide text-white leading-none">Bernabéu</span>
      </Link>

      <div className="flex items-center gap-10">
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/events-concerts" className="text-white hover:text-white/80 transition-colors text-[14.5px] font-medium font-secondary tracking-wide drop-shadow-md">Events and concerts</Link>
          <Link href="/corporate-events" className="text-white hover:text-white/80 transition-colors text-[14.5px] font-medium font-secondary tracking-wide drop-shadow-md">Corporate events</Link>
          <Link href="/tour" className="text-white hover:text-white/80 transition-colors text-[14.5px] font-medium font-secondary tracking-wide drop-shadow-md flex items-center gap-1.5">Tour <ExternalArrow /></Link>
          <Link href="/restaurants" className="text-white hover:text-white/80 transition-colors text-[14.5px] font-medium font-secondary tracking-wide drop-shadow-md">Food & Drink</Link>
          <Link href="/vip-area" className="text-white hover:text-white/80 transition-colors text-[14.5px] font-medium font-secondary tracking-wide drop-shadow-md flex items-center gap-1.5">VIP hospitality <ExternalArrow /></Link>
        </nav>


        <button
          className="relative w-8 h-6 flex flex-col justify-between z-[1001] cursor-pointer ml-4 mr-2"
          id="menu-toggle"
          onClick={onMenuToggle}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? (
            <>
              <span className="block w-full h-[2px] bg-white rounded-sm transition-transform duration-300 transform translate-y-[11px] rotate-45"></span>
              <span className="block w-full h-[2px] bg-white rounded-sm transition-opacity duration-300 opacity-0"></span>
              <span className="block w-full h-[2px] bg-white rounded-sm transition-transform duration-300 transform -translate-y-[11px] -rotate-45"></span>
            </>
          ) : (
            <svg viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[32px] h-[22px] overflow-visible drop-shadow-md">
              <path d="M2 19C8 17 12 14 20 14C28 14 32 17 38 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M2 12C8 10 12 7 20 7C28 7 32 10 38 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M2 5C8 3 12 0 20 0C28 0 32 3 38 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </button>


      </div>
    </header>
  );
}
