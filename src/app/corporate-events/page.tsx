"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";
import CorporateEventsGallery from "@/components/CorporateEventsGallery";

const HERO_SPACES = [
  {
    id: 1,
    name: "Pitch",
    image: "/stadium_interior.png", // User's local asset standing in for the generated pitch image
  },
  {
    id: 2,
    name: "Presidential Box",
    image: "/vip_lounge.png", // User's local asset standing in for the generated presidential box
  },
  {
    id: 3,
    name: "Press Conference Room",
    image: "/stadium_exec.png", // User's local asset standing in for the presentation room
  },
  {
    id: 4,
    name: "Dali Space",
    image: "/corporate_events.png",
  },
  {
    id: 5,
    name: "VIP Lounge",
    image: "/restaurant_gastronomy.png",
  },
];

export default function CorporateEventsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % HERO_SPACES.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? HERO_SPACES.length - 1 : prev - 1));

  // Optional: Auto-play slider
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-black min-h-screen">
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center bg-black overflow-hidden pt-20 group">
        {/* Dynamic Backgrounds */}
        {HERO_SPACES.map((space, index) => (
          <div
            key={space.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={space.image}
              alt={space.name}
              className={`w-full h-full object-cover mix-blend-luminosity transform transition-transform duration-[10000ms] ease-out ${index === currentSlide ? "scale-105" : "scale-100"}`}
              style={{ opacity: 0.4 }}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[1]"></div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 flex flex-col justify-end h-full pb-32">
          <div className="flex flex-col md:flex-row justify-between items-end w-full gap-10">
            <div className="w-full md:w-1/2">
              <h1 className="font-primary text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.1] text-white tracking-tight mb-10">
                The event of your
                <br />
                dreams, whatever
                <br />
                the dimension
              </h1>
              <button className="bg-white/90 hover:bg-white text-black font-semibold text-[14.5px] px-8 py-3.5 rounded-full shadow-[0_4px_14px_rgba(255,255,255,0.2)] backdrop-blur-md transition-all">
                Request Information
              </button>
            </div>

            <div className="w-full md:w-1/3 flex justify-end items-center gap-6 text-white pb-6">
              <button
                onClick={prevSlide}
                className="text-white/60 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <div className="flex flex-col items-center gap-2 min-w-[140px]">
                <div className="flex items-center justify-between w-full font-secondary text-[13px] font-semibold tracking-widest text-white/60">
                  <span className="text-white w-4 text-center">
                    {currentSlide + 1}
                  </span>
                  <div className="flex-1 px-3">
                    <span className="w-full h-[2px] bg-white/30 rounded-full block relative overflow-hidden">
                      <span
                        className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out rounded-full"
                        style={{
                          width: `${((currentSlide + 1) / HERO_SPACES.length) * 100}%`,
                        }}
                      ></span>
                    </span>
                  </div>
                  <span className="w-4 text-center">{HERO_SPACES.length}</span>
                </div>

                <div className="relative h-6 w-full overflow-hidden">
                  {HERO_SPACES.map((space, index) => (
                    <span
                      key={space.id}
                      className={`absolute inset-0 flex items-center justify-center font-primary text-sm font-bold tracking-wide transition-all duration-500 text-center ${index === currentSlide ? "opacity-100 translate-y-0" : index < currentSlide ? "opacity-0 -translate-y-4" : "opacity-0 translate-y-4"}`}
                    >
                      {space.name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={nextSlide}
                className="text-white/60 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-20 bg-black pt-16 pb-32 px-6 md:px-12 xl:px-20">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-primary text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">
            Find your space
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                <img
                  src="/stadium_interior.png"
                  alt="Pitch"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white font-secondary text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center">
                  6500m2
                </div>
              </div>
              <h3 className="font-primary text-xl font-bold text-white mb-2 group-hover:text-[#6c7ee6] transition-colors">
                Pitch
              </h3>
              <div className="flex items-center gap-2 mb-4 text-white/70 font-secondary text-[13px] font-medium">
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>5000 people</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Private Match", "Reception", "Congress", "Gala Dinner"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="bg-white/10 hover:bg-white/20 transition-colors border border-white/5 text-white/80 font-secondary text-[10px] font-bold px-3 py-1.5 flex items-center rounded-md whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                <img
                  src="/vip_lounge.png"
                  alt="Presidential Box"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white font-secondary text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center">
                  876 m2
                </div>
              </div>
              <h3 className="font-primary text-xl font-bold text-white mb-2 group-hover:text-[#6c7ee6] transition-colors">
                Presidential Box
              </h3>
              <div className="flex items-center gap-2 mb-4 text-white/70 font-secondary text-[13px] font-medium">
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>550 people</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Reception", "Presentation", "Awards Ceremony"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 hover:bg-white/20 transition-colors border border-white/5 text-white/80 font-secondary text-[10px] font-bold px-3 py-1.5 flex items-center rounded-md whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                <img
                  src="/stadium_exec.png"
                  alt="Press Conference Room"
                  className="w-full h-full object-cover mix-blend-screen bg-[#1c00ff] opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-[#3f31eb]/20 mix-blend-color"></div>
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white font-secondary text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center">
                  568 m2
                </div>
              </div>
              <h3 className="font-primary text-xl font-bold text-white mb-2 group-hover:text-[#6c7ee6] transition-colors leading-[1.2]">
                Press Conference Room and Mixed Zone
              </h3>
              <div className="flex items-center gap-2 mb-4 text-white/70 font-secondary text-[13px] font-medium">
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>300 people</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CorporateEventsGallery />
    </main>
  );
}
