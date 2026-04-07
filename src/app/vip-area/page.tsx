"use client";

import { useState } from "react";
import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";

export default function VipAreaPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-white min-h-screen font-secondary text-[#2A3B5A]">
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Since the global header is dark, we add a solid black offset to make it look intentionally framed, or just add top padding */}
      <div className="w-full bg-black h-20"></div>

      {/* Information Section */}
      <section className="w-full pt-16 pb-12 px-6 md:px-12 max-w-[1200px] mx-auto bg-white flex justify-center md:justify-start">
        <div className="flex flex-col md:pl-[25%] lg:pl-[20%]">
          <h2 className="font-primary text-[22px] font-bold text-[#1a2b50] mb-6">
            Information and registration
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="w-[7px] h-[7px] bg-[#5338f6] rounded-full"></span>
              <a
                href="mailto:areavip@realmadrid.es"
                className="text-[#5338f6] font-medium text-[15px] hover:underline"
              >
                areavip@realmadrid.es
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-[7px] h-[7px] bg-[#5338f6] rounded-full"></span>
              <a
                href="tel:+34913984377"
                className="text-[#5338f6] font-medium text-[15px] hover:underline"
              >
                +34 913 984 377
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-[7px] h-[7px] bg-[#5338f6] rounded-full"></span>
              <a
                href="#"
                className="text-[#5338f6] font-medium text-[15px] hover:underline"
              >
                Contact form
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-[7px] h-[7px] bg-[#5338f6] rounded-full"></span>
              <a
                href="#"
                className="text-[#5338f6] font-medium text-[15px] hover:underline"
              >
                Frequently asked questions
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* "You may be interested in" Carousel Section */}
      <section className="w-full py-16 bg-[#f4f7fa] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 relative">
          <h2 className="font-primary text-[28px] font-bold text-[#1a2b50] mb-10 tracking-tight">
            You may be interested in
          </h2>

          <div className="relative">
            {/* Left fade/arrow. Just visual implementation for the layout */}
            <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 cursor-pointer text-[#8b9cb3] hover:text-[#5338f6] transition-colors hidden xl:block">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>

            <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 cursor-pointer text-[#5338f6] hidden xl:block">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <InterestCard
                title="NFL Madrid Game 2026"
                image="/stadium_interior.png"
              />
              <InterestCard title="VIP season" image="/vip_lounge.png" />
              <InterestCard title="VIP match" image="/stadium_exec.png" />
              <InterestCard title="Basketball VIP" image="/stadium_steps.png" />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming VIP Matches Section */}
      <section className="w-full py-16 bg-white min-h-[600px]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20">
          <h2 className="font-primary text-[28px] font-bold text-[#1a2b50] mb-8 tracking-tight">
            Upcoming VIP matches
          </h2>

          {/* Timeline filter */}
          <div className="w-full bg-[#f4f7fa] rounded-full px-2 py-2 mb-10 flex text-center overflow-x-auto hide-scrollbar">
            {[
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
            ].map((month, idx) => (
              <div
                key={idx}
                className={`flex-1 min-w-[50px] text-[13px] font-medium py-1.5 rounded-full cursor-pointer transition-colors ${
                  month === "Apr"
                    ? "bg-[#5338f6] text-white shadow-md"
                    : "text-[#6b7b93] hover:text-[#1a2b50]"
                }`}
              >
                {month}
              </div>
            ))}
          </div>

          {/* Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MatchCard
              competition="Champions League"
              title="Cuartos de final (ida)"
              homeColor="#fff"
              awayName="Bayern Munich"
              awayColor="#dc052d"
              date="Tuesday, Apr 7, 9:00 PM h"
              price="690"
              isTbc={false}
            />

            <MatchCard
              competition="La Liga"
              title="Matchday 31"
              homeColor="#fff"
              awayName="Girona"
              awayColor="#ca1b23"
              date="Friday, Apr 10, 9:00 PM h"
              price="250"
              isTbc={false}
            />

            <MatchCard
              competition="La Liga"
              title="Matchday 33"
              homeColor="#fff"
              awayName="Alavés"
              awayColor="#0066cc"
              date="Apr 22 (date and time to be confirmed)"
              price="250"
              isTbc={true}
            />
          </div>
        </div>
      </section>

      {/* Ad Banners Section */}
      <section className="w-full py-20 bg-[#eef2f6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-center gap-6 lg:gap-8 items-center md:items-stretch">
          {/* Ad 1: RM Play */}
          <div className="w-[340px] h-[340px] bg-[#0c1326] relative flex flex-col items-center justify-end overflow-hidden group cursor-pointer shadow-lg">
            <div className="absolute top-4 left-4 flex items-center gap-1 z-20">
              <span className="w-5 h-5 flex items-center justify-center bg-transparent text-white border border-white/20 rounded-full">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </span>
              <span className="text-white text-[11px] font-bold">Play</span>
            </div>
            <div className="absolute top-4 right-4 bg-white text-[#0c1326] text-[8px] font-bold px-2 py-0.5 rounded flex items-center gap-1 z-20">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Premium
            </div>

            <img
              src="/news_featured.png"
              alt="RM Play"
              className="absolute top-0 w-full h-[70%] object-cover mix-blend-luminosity opacity-40 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1326] via-[#0c1326]/80 to-transparent"></div>

            <div className="relative z-10 w-full px-6 flex flex-col items-center pb-8 border-t border-white/10 pt-4 mt-auto arch-top">
              <div className="text-white text-[11px] mb-1 opacity-90">
                en el corazón de
              </div>
              <h3 className="text-white font-primary font-bold text-[22px] tracking-tight leading-tight text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                La Decimoquinta
              </h3>
              <div className="text-white text-[11px] font-medium mt-4 mb-2">
                Available now
              </div>
              <button className="bg-[#472df7] hover:bg-[#3416eb] text-white text-[12px] font-bold px-6 py-1.5 rounded-full transition-colors w-max">
                Watch Now
              </button>
            </div>
            {/* Custom CSS arc for the border */}
            <div className="absolute bottom-[23%] w-[150%] h-[100px] border-t border-[#472df7]/40 rounded-[50%] blur-[1px]"></div>
          </div>

          {/* Ad 2: Dubai */}
          <div className="w-[340px] h-[340px] bg-[#d3c8ba] relative flex flex-col items-start justify-end p-6 overflow-hidden group cursor-pointer shadow-lg rounded-tl-[80px]">
            <div className="absolute top-4 right-4 text-white text-[11px] font-bold z-20">
              visitdubai.com
            </div>
            <img
              src="/stadium_interior.png"
              alt="Dubai"
              className="absolute top-0 w-full h-[60%] object-cover grayscale opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>

            {/* Faux Players standing in */}
            <div className="absolute bottom-0 right-[-10%] w-[80%] h-[70%] z-10 flex items-end justify-end">
              <img
                src="/tour_museum_jersey.png"
                alt="Players"
                className="h-[90%] object-contain mix-blend-darken filter contrast-125"
              />
            </div>

            <div className="relative z-20 mb-8 max-w-[50%]">
              <h3 className="text-[#101b3f] font-primary font-black text-[22px] tracking-tighter leading-[1] mb-4">
                DISCOVER
                <br />
                DUBAI
                <br />
                WITH US
              </h3>
              <div className="text-[#101b3f] font-extrabold italic text-sm text-[#00c3ff]">
                DUBAI{" "}
                <span className="text-black font-normal text-[10px] pl-1 relative -top-1">
                  is Real
                </span>
              </div>
            </div>
          </div>

          {/* Ad 3: Premium */}
          <div className="w-[340px] h-[340px] bg-[#0c1326] relative flex flex-col justify-center px-8 cursor-pointer shadow-lg overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-[#005CC8]/40 mix-blend-screen opacity-50"></div>
            {/* Subtle background stars/dots */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>

            <div className="relative z-10 flex flex-col">
              <div className="text-white font-primary font-bold text-[18px] tracking-widest uppercase flex items-center gap-1.5 leading-[1.1] mb-2">
                <span>BECOME</span>
                <span className="text-[#facc15]">MADRIDISTA PREMIUM</span>
                <span>FOR</span>
              </div>

              <div className="flex items-start">
                <div className="relative flex flex-col items-center mt-3 mr-1">
                  <span className="text-white text-[15px] line-through decoration-red-500 font-bold opacity-80 decoration-2">
                    35€
                  </span>
                </div>
                <div className="text-white font-primary font-light text-[110px] leading-none tracking-tighter">
                  25
                </div>
                <div className="flex flex-col ml-1 -mt-2">
                  <span className="text-white font-primary text-[50px] font-light leading-[0.8] mb-1">
                    €
                  </span>
                  <span className="text-white font-bold text-[13px] tracking-widest pl-1">
                    1<sup className="text-[8px]">ST</sup>/YEAR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Subcomponent: Interest Card
function InterestCard({ title, image }: { title: string; image: string }) {
  return (
    <div className="relative w-full aspect-[16/9] lg:aspect-[4/2.5] rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-black/5">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <h3 className="absolute bottom-5 left-6 font-primary text-white text-[19px] font-bold drop-shadow-md">
        {title}
      </h3>
    </div>
  );
}

// Subcomponent: Match Card
function MatchCard({
  competition,
  title,
  awayName,
  homeColor,
  awayColor,
  date,
  price,
  isTbc,
}: any) {
  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden relative shadow-[0_15px_30px_rgba(0,0,0,0.1)] flex flex-col group transition-transform duration-300 hover:-translate-y-1 h-[420px]">
      {/* Top Half: Dark Header */}
      <div className="w-full bg-gradient-to-br from-[#101931] to-[#1a2b50] relative h-[160px] flex items-center justify-between px-8 z-10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>

        {/* Real Madrid Placeholder */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center font-bold text-[#101931] text-[10px] shadow-[0_0_15px_rgba(255,255,255,0.2)] border-2 border-yellow-500 relative">
            <span className="absolute -top-[5px] w-[14px] h-[14px] rounded-full bg-yellow-500 flex items-center justify-center font-serif text-[8px] text-white">
              +
            </span>
            RM
          </div>
          <span className="text-white font-semibold text-[10px]">
            Real Madrid
          </span>
        </div>

        {/* Competition Name (fake logo) */}
        <div className="relative z-10 opacity-90 pb-4">
          <span className="text-white font-primary font-bold italic tracking-tighter text-[28px] drop-shadow-md pr-1">
            {competition === "La Liga" ? "LL" : "UCL"}
          </span>
        </div>

        {/* Away Team Placeholder */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-[10px] shadow-lg border border-white/20"
            style={{ backgroundColor: awayColor }}
          >
            {awayName.substring(0, 3).toUpperCase()}
          </div>
          <span className="text-white font-semibold text-[10px]">
            {awayName}
          </span>
        </div>
      </div>

      {/* Bottom Half: White Details */}
      <div className="p-7 flex flex-col flex-1 bg-white">
        <h3 className="font-primary text-[#101931] text-[19px] font-bold tracking-tight">
          {competition}
        </h3>
        <div className="text-[#101931] text-[13px] font-medium mb-6">
          {title}
        </div>

        <div className="flex flex-col gap-2.5 mb-auto">
          {/* Calendar row */}
          <div className="flex items-start gap-2.5">
            <svg
              className={`shrink-0 mt-0.5 ${isTbc ? "text-[#e50046]" : "text-[#8492a6]"}`}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span
              className={`text-[12px] font-medium leading-snug ${isTbc ? "text-[#e50046]" : "text-[#576981]"}`}
            >
              {date}
            </span>
          </div>
          {/* Location row */}
          <div className="flex items-center gap-2.5">
            <svg
              className="shrink-0 text-[#8492a6]"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-[#576981] text-[12px] font-medium">
              Bernabéu
            </span>
          </div>
          {/* VIP row */}
          <div className="flex items-center gap-2.5">
            <svg
              className="shrink-0 text-[#8492a6]"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="text-[#101931] font-bold text-[12px]">
              VIP from {price} €
            </span>
          </div>
        </div>

        {/* Button */}
        <button 
          onClick={() => alert("¡Iniciando reserva VIP para " + awayName + "!\nSerás redirigido a la pasarela de pago de Hospitality.")}
          className="w-full mt-6 bg-[#5338f6] hover:bg-[#432be0] active:scale-95 text-white font-bold text-[12px] py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Buy Hospitality tickets
        </button>
      </div>
    </div>
  );
}
