"use client";

import { useState } from "react";
import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";

export default function RestaurantsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Using local images to avoid unsplash URLs
  const restaurants = [
    {
      id: 1,
      image: "/vip_lounge.png",
      title: "Arzábal Bernabéu",
      description: "Gourmet bar, private dining areas, and 50 meters of glass walls framing a unique experience with views of the pitch. Traditional and modern fusion.",
      location: "Access: Padre Damián Street - Gate 57",
      hours: "Open daily from 12 pm to 1 am. On match or event days, please check with the restaurant.",
      type: "Traditional Spanish cuisine",
      socials: ["instagram"],
      hasReserve: true,
      hasCall: true
    },
    {
      id: 2,
      image: "/restaurant_gastronomy.png",
      title: "Puerta 57",
      description: "The first restaurant in a stadium in Spain offering a unique experience at the Bernabéu, with views of the pitch and traditional high-end cuisine.",
      location: "Access: Padre Damián Street - Gate 57",
      hours: "Mon - Sat: 13:00 - 16:30 & 20:30 - 00:00. Sun: 13:00 - 16:30.",
      type: "Traditional Spanish cuisine",
      socials: ["instagram", "x"],
      hasReserve: true,
      hasCall: false
    },
    {
      id: 3,
      image: "/stadium_exec.png",
      title: "Real Café Bernabéu",
      description: "Enjoy a unique atmosphere overlooking the stadium pitch. Perfect for a quick bite or a relaxed dinner with family and friends in a modern setting.",
      location: "Access: Concha Espina - Gate 30",
      hours: "Open daily from 10 am to 11 pm.",
      type: "Modern Spanish cuisine",
      socials: ["instagram"],
      hasReserve: true,
      hasCall: true
    },
    {
      id: 4,
      image: "/corporate_events.png", // Stand-in for KO Sushi
      title: "KŌ by 99 Sushi Bar",
      description: "A contemporary izakaya with a Japanese soul, luxurious interior design, and the best views of the Bernabéu from its 10th-floor terrace.",
      location: "Access: Padre Damián Street 3 - Gate 39",
      hours: "Open daily from 1 pm to 12 am. On match or event days, please check with the restaurant.",
      type: "Japanese cuisine",
      socials: ["instagram"],
      hasReserve: true,
      hasCall: true
    },
    {
      id: 5,
      image: "/stadium_interior.png", // Stand-in for Starbucks
      title: "Starbucks Bernabéu",
      description: "Starbucks' first flagship store in Spain. A unique space where everyone is welcome, filled with art, coffee and history, offering cuisine, merchandise and exclusive experiences.",
      location: "Avenida de Concha Espina, 1 - Puerta 73",
      hours: "Mon - Thu: 8:30 - 22:00. Fri: 8:30 - 23:00. Sat: 8:30 - 23:00. Sun & Hol: 8:30 - 22:00. On match or event days, please check with the restaurant.",
      type: "Specialty coffee",
      socials: ["instagram"],
      hasReserve: true,
      hasCall: false
    },
    {
      id: 6,
      image: "/tour_stadium_roof.png", // Stand-in for Market
      title: "Bernabéu Market",
      description: "Bernabéu Market, Madrid's new gastronomic district, brings together a carefully curated culinary offering and pays tribute to products, trends and gastronomic culture that unit us.",
      location: "Avenida Concha Espina 1. Access: Plaza de los Sagrados Corazones, Gate Puerta 54",
      hours: "Monday to Sunday, from 10:00-00:00h. On match or event days, please check with the restaurant.",
      type: "Spanish and international cuisine.",
      socials: ["instagram", "facebook"],
      hasReserve: false,
      hasCall: false
    }
  ];

  return (
    <main className="bg-black min-h-screen font-secondary">
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="relative w-full pt-32 pb-24 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} data={restaurant} />
          ))}
        </div>

      </section>

      {/* Plan Your Visit Section */}
      <section className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#b1bcc9] via-[#eef2f6] to-[#b1bcc9]">
        {/* Abstract diagonal stripes */}
        <div className="absolute inset-y-0 right-[-10%] w-[50%] opacity-10 pointer-events-none transform -skew-x-[25deg] bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#000_10px,#000_12px)]"></div>
        <div className="absolute inset-y-0 left-[-10%] w-[30%] opacity-5 pointer-events-none transform skew-x-[25deg] bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#000_10px,#000_12px)]"></div>

        <div className="relative z-10 text-center px-4 max-w-2xl flex flex-col items-center">
          <h2 className="font-primary text-[#1a202c] text-[2rem] md:text-[2.6rem] font-light leading-[1.2] mb-8 tracking-tight">
            Find all the information you need to<br className="hidden md:block" /> make your experience unforgettable.
          </h2>
          <button className="bg-[#472df7] hover:bg-[#3416eb] text-white font-semibold text-[14px] px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-[#472df7]/25 w-max">
            Plan your visit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* RM Play Ad Banner */}
      <section className="w-full bg-[#1E2533] py-20 flex justify-center px-4 sm:px-8">
        <div className="w-full max-w-[1000px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative min-h-[340px]">

          <div className="flex-1 p-10 md:p-14 z-20 flex flex-col items-start justify-center relative bg-white">
            <div className="flex items-center gap-2 mb-3 text-[#1E2533] font-primary font-bold text-[19px] tracking-wide">
              <span className="w-7 h-7 flex items-center justify-center bg-[#1E2533] text-white rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
              </span>
              Play
            </div>
            <h2 className="font-primary text-[#1E2533] text-4xl md:text-[44px] font-bold leading-[1.15] mb-6">
              <span className="text-[#3b21f3] italic font-extrabold tracking-tighter">All</span> Real Madrid<br />in one place
            </h2>
            <button className="bg-[#472df7] hover:bg-[#3416eb] text-white font-semibold text-[14px] px-7 py-2.5 rounded shadow-lg shadow-[#472df7]/30 transition-colors w-max">
              Watch free
            </button>
          </div>

          <div className="md:w-[48%] relative z-10 flex justify-center items-end bg-[#3b21f3] overflow-hidden md:rounded-bl-[200px] md:rounded-tl-[200px] min-h-[200px] md:min-h-[auto]">
            {/* Soft decorative circles imitating the blue background shape */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#472df7] to-[#1e0fb3]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#2109df] rounded-full blur-[60px] opacity-60 pointer-events-none"></div>

            {/* Simulated Player Image area */}
            <div className="absolute inset-0 z-10 h-full w-full flex justify-center items-end overflow-hidden">
              <img
                src="/news_featured.png" // Using the local news asset as a placeholder since we don't have Vinicius Jr cutout
                alt="RM Play"
                className="w-full h-full object-cover mix-blend-hard-light opacity-50 filter drop-shadow-2xl"
              />
              <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#2109df] to-transparent"></div>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}

// Subcomponent for the Restaurant Cards
function RestaurantCard({ data }: { data: any }) {
  return (
    <div className="bg-[#3b414f] rounded-3xl overflow-hidden flex flex-col h-full border border-white/5 shadow-2xl transition-transform hover:-translate-y-1 duration-300">

      {/* Image Container with Slider Dots */}
      <div className="relative w-full aspect-[4/3] bg-black">
        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        {/* Faux Slider Dots centered at bottom of image */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-100"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-7 flex flex-col flex-grow">

        <h3 className="font-primary text-white text-[26px] font-bold mb-3 leading-tight tracking-tight">
          {data.title}
        </h3>

        <p className="text-white/80 text-[13px] leading-relaxed mb-6 font-medium">
          {data.description}
        </p>

        {/* Info Rows */}
        <div className="flex flex-col gap-3.5 mb-8">

          <div className="flex items-start gap-3">
            <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span className="text-white/80 text-[12px] leading-snug">{data.location}</span>
          </div>

          <div className="flex items-start gap-3">
            <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span className="text-white/80 text-[12px] leading-snug">{data.hours}</span>
          </div>

          <div className="flex items-start gap-3">
            <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span className="text-white/80 text-[12px] leading-snug">{data.type}</span>
          </div>

        </div>

        {/* Social Icons row pushed to bottom before buttons */}
        <div className="mt-auto flex justify-end gap-3 mb-6">
          {data.socials.includes('instagram') && (
            <button className="text-white hover:text-white/80 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </button>
          )}
          {data.socials.includes('x') && (
            <button className="text-white hover:text-white/80 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </button>
          )}
          {data.socials.includes('facebook') && (
            <button className="text-white hover:text-white/80 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {data.hasReserve && (
            <button className="flex-1 bg-[#D9E1EB] hover:bg-white text-black font-semibold text-[13px] py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors">
              Reserve
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </button>
          )}
          {data.hasCall && (
            <button className="flex-1 bg-[#472df7] hover:bg-[#3416eb] text-white font-semibold text-[13px] py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors">
              Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
