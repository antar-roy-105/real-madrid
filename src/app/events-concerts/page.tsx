"use client";

import { useState } from "react";
import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";
import TourSection from "@/components/TourSection";
import FacilitiesCarousel from "@/components/FacilitiesCarousel";

export default function EventsConcertsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todo");

  const events = [
    {
      id: 1,
      title: "NFL Madrid Game 2026",
      image: "/stadium_interior.png",
      category: "Deportes",
    },
    {
      id: 2,
      title: "Partidos Real Madrid C.F.",
      subtitle: "Temporada 25/26",
      image: "/stadium_hero.png", // Using stadium hero as placeholder for team players
      category: "Deportes",
    },
  ];

  const filteredEvents =
    activeFilter === "Todo"
      ? events
      : events.filter((e) => e.category === activeFilter);

  return (
    <main className="bg-black min-h-screen font-secondary text-white">
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Spacing for fixed header */}
      <div className="w-full h-[100px]"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full pb-20">
        {/* Breadcrumb */}
        <div className="text-[11px] md:text-[13px] text-white/60 mb-8 flex gap-2 font-medium tracking-wide">
          <span className="hover:text-white cursor-pointer transition-colors">
            Home
          </span>
          <span>&gt;</span>
          <span className="text-white font-bold">Events and concerts</span>
        </div>

        {/* Featured Hero Card */}
        <div className="w-full rounded-[30px] overflow-hidden relative shadow-2xl shadow-black/50 aspect-[4/3] md:aspect-[21/9] mb-16 group">
          <img
            src="/stadium_interior.png" // Placeholder NFL/Stadium image
            alt="NFL Madrid Game 2026"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Gradient Overlay precisely mimicking the left-side dark blue gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#121b2d] via-[#121b2d]/80 to-transparent w-full md:w-[60%]"></div>

          <div className="absolute inset-y-0 left-0 pl-10 md:pl-20 flex flex-col justify-center z-10 w-full md:w-[60%]">
            <h1 className="font-primary text-[42px] md:text-[64px] lg:text-[72px] font-normal leading-[1.05] tracking-tight text-white mb-8">
              NFL Madrid
              <br />
              Game 2026
            </h1>
            <button className="bg-gradient-to-r from-gray-200 to-gray-400 hover:from-white hover:to-white text-black font-semibold text-[13px] md:text-[15px] px-8 py-3.5 rounded-full w-max shadow-lg transition-all duration-300">
              More information
            </button>
          </div>
        </div>

        {/* Upcoming Events Section Header */}
        <div className="w-full mb-8">
          <h2 className="text-white font-bold text-[18px] md:text-[20px] mb-3 font-secondary tracking-tight">
            Próximos eventos
          </h2>
          <div className="w-[120px] md:w-[140px] h-[2px] bg-white"></div>
        </div>

        {/* Filter Bar */}
        <div className="w-full bg-[#1c2235] rounded-[30px] p-2 flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar">
          {["Todo", "Deportes", "Familiar"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 md:px-8 py-2 md:py-2.5 rounded-full text-[13px] md:text-[14px] font-semibold transition-all shrink-0 ${
                activeFilter === filter
                  ? "bg-white text-black shadow-md shadow-white/10"
                  : "bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Dynamic Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="w-full flex flex-col group cursor-pointer"
            >
              <div className="w-full aspect-[16/10] rounded-3xl overflow-hidden mb-5">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-white font-bold text-[18px] md:text-[20px] mb-1 font-secondary tracking-tight group-hover:text-gray-300 transition-colors">
                {evt.title}
              </h3>
              {evt.subtitle && (
                <div className="flex items-center gap-1.5 text-[#3b82f6] font-medium text-[13px] tracking-wide">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {evt.subtitle}
                </div>
              )}
            </div>
          ))}
          {filteredEvents.length === 0 && (
            <div className="col-span-full py-20 flex justify-center items-center text-white/50 italic">
              No events found for this category.
            </div>
          )}
        </div>
      </div>

      <TourSection />

      <FacilitiesCarousel />
    </main>
  );
}
