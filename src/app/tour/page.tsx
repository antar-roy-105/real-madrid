"use client";

import { useState } from "react";
import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";

export default function TourPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-[#050B1B] min-h-screen font-secondary">
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Background & Hero Container */}
      <section className="relative w-full min-h-screen pt-32 pb-24 px-4 md:px-8 overflow-hidden flex flex-col items-center">
        {/* Background Graphic - Dark blue stadium/tunnel vibe */}
        <div className="absolute inset-0 z-0">
          <img
            src="/stadium_interior.png"
            alt="Stadium Interior"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050E] via-[#081534]/95 to-[#02050E]"></div>

          {/* Faux light spots imitating the player silhouettes background in the screenshot */}
          <div className="absolute top-[20%] left-[15%] w-[600px] h-[600px] bg-blue-600/25 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute top-[30%] right-[15%] w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto text-center flex flex-col items-center mb-16">
          <h3 className="text-white/90 tracking-[0.2em] font-medium text-xs md:text-sm mb-3 mt-4 font-secondary uppercase">
            Reserve your visit
          </h3>
          <h1 className="text-white font-primary font-bold text-[3.5rem] md:text-[5.5rem] mb-10 tracking-tight leading-none uppercase drop-shadow-2xl">
            Tour Bernabéu
          </h1>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            <button className="bg-white text-black font-semibold text-[11px] tracking-wider px-5 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              INDIVIDUAL
            </button>
            <button className="bg-transparent border border-white/30 text-white font-semibold text-[11px] tracking-wider px-5 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M6 12h.01M18 12h.01"></path>
              </svg>
              MADRIDISTA PREMIUM
              <svg
                width="12"
                height="12"
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
            <button className="bg-transparent border border-white/30 text-white font-semibold text-[11px] tracking-wider px-5 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              SCHOOLS
            </button>
            <button className="bg-transparent border border-white/30 text-white font-semibold text-[11px] tracking-wider px-5 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              GROUPS
            </button>
            <button className="bg-transparent border border-white/30 text-white font-semibold text-[11px] tracking-wider px-5 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              AGENCIES
              <svg
                width="12"
                height="12"
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

          <p className="text-white/90 text-[15px] font-medium mb-12">
            SAVE <span className="font-bold text-white">3€</span> without going
            to the ticket office, buy online.
          </p>

          <h2 className="text-white/90 font-primary text-[22px] font-extrabold uppercase tracking-widest drop-shadow-lg">
            When would you like to come?
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2 md:px-0 items-end">
          <TourCard
            title="Classic"
            price="35 €"
            oldPrice="38 € at the ticket office"
            features={[
              "Real Madrid C.F. Museum",
              "Panoramic view of the inside of the stadium",
              "Changing rooms and dugouts",
              "Includes temporary visit to press room subject to availability",
            ]}
          />

          <TourCard
            title={
              <span>
                Classic Tour
                <br />+ Realmadrid Games
              </span>
            }
            price="57 €"
            oldPrice="60 € at the ticket office"
            features={[
              "Real Madrid C.F. Museum",
              "Exclusive access to the RM Games area",
              "Panoramic view of the inside of the stadium",
              "Locker Rooms and Dugouts",
            ]}
            tall
          />

          <TourCard
            title={
              <span>
                Classic
                <br />
                Flexible Time
              </span>
            }
            price="42 €"
            oldPrice="45 € at the ticket office"
            features={[
              "Real Madrid C.F. Museum",
              "Panoramic view of the stadium from inside",
              "Dressing room and dugouts",
              "Open time slot on the selected date",
              "Includes temporary visit to press room",
            ]}
          />

          <TourCard
            title="Guided"
            price="54 €"
            oldPrice="57 € at the ticket office"
            features={[
              "Real Madrid C.F. Museum",
              "Panoramic view of the stadium from inside",
              "Dressing room and dugouts",
              "Guided tour",
              "Includes temporary visit to press room subject to availability",
            ]}
          />
        </div>
      </section>
    </main>
  );
}

// Subcomponent for the pricing cards
function TourCard({ title, price, oldPrice, features, tall = false }: any) {
  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-2 ${tall ? "min-h-[580px]" : "min-h-[540px]"}`}
    >
      {/* Card Header Section */}
      <div className="pt-10 pb-7 px-6 text-center flex-grow-0 relative bg-gradient-to-b from-[#f3f6fa] to-white border-b border-gray-100">
        <div className="flex justify-center items-center mb-1">
          <h3 className="font-primary text-[#2A3B5A] text-[34px] font-light leading-[1.15]">
            {title}
          </h3>
        </div>
        <p className="text-[#8492A6] text-[9.5px] font-bold tracking-[0.25em] uppercase mb-8">
          Tour Bernabéu
        </p>

        <div className="flex flex-col items-center justify-center mb-7">
          <div className="text-[#2A3B5A] flex items-baseline gap-1.5">
            <span className="text-[13px] font-medium text-[#576981]">from</span>
            <span className="font-primary text-[42px] font-semibold leading-none">
              {price}
            </span>
          </div>
          <div className="text-[#8492A6] text-[11px] mt-1 font-medium">
            ({oldPrice})
          </div>
        </div>

        <button className="w-full bg-[#005CC8] hover:bg-[#004DAA] text-white font-bold text-[13px] tracking-wide rounded-lg py-3.5 transition-colors shadow-lg shadow-[#005CC8]/30">
          BUY
        </button>
      </div>

      {/* Card Features Section */}
      <div className="px-7 pt-7 pb-10 flex-grow bg-white">
        <h4 className="text-[#2A3B5A] text-[13px] font-bold mb-5 flex items-center gap-1">
          It includes{" "}
          <span className="text-[#005CC8] text-[11px]">
            (<span className="underline">*</span>):
          </span>
        </h4>
        <ul className="space-y-4">
          {features.map((feature: string, idx: number) => (
            <li
              key={idx}
              className="flex items-start text-[#4A5D7A] text-[13px] leading-[1.4] font-medium"
            >
              <span className="text-[#8492A6] mr-2 mt-0.5 font-bold">-</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
