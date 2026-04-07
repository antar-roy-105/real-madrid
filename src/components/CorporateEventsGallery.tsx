"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// TOP ROW: text card first, then 3 image cards
const topRowImages = [
  { img: "/restaurant_gastronomy.png" }, // food/catering
  { img: "/concert_event.png" },         // concert purple
  { img: "/stadium_exec.png" },          // conference room
];

// BOTTOM ROW: 5 image cards, offset to the right
const bottomRowImages = [
  { img: "/stadium_interior.png" },   // purple lounge
  { img: "/vip_lounge.png" },         // plates/catering
  { img: "/official_store.png" },     // buffet spread
  { img: "/stadium_steps.png" },      // stadium aerial
  { img: "/news_featured.png" },      // outdoor/terrace
];

export default function CorporateEventsGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-12 overflow-hidden select-none"
      id="corporate-gallery"
    >
      {/* ── TOP ROW ── */}
      <div
        className={`flex gap-2.5 px-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        {/* TEXT TILE — first card in the top row */}
        <div
          className="relative shrink-0 rounded-2xl overflow-hidden bg-[#111] flex items-end p-6"
          style={{ width: "22%", aspectRatio: "16/11" }}
        >
          {/* Faint background image */}
          <img
            src="/corporate_events.png"
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10">
            <p className="font-primary text-white font-bold text-[clamp(1.1rem,1.6vw,1.5rem)] leading-tight mb-0.5">
              Eventos
              <br />
              corporativos
            </p>
            <p className="font-primary text-white/55 font-light text-[clamp(1rem,1.4vw,1.3rem)] leading-tight">
              que han sido
              <br />
              un éxito
            </p>
          </div>
        </div>

        {/* Top row image 1 — food */}
        <div
          className="relative shrink-0 rounded-2xl overflow-hidden group"
          style={{ width: "20%", aspectRatio: "16/11" }}
        >
          <img
            src={topRowImages[0].img}
            alt="Corporate catering"
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        {/* Top row image 2 — concert / purple */}
        <div
          className="relative shrink-0 rounded-2xl overflow-hidden group"
          style={{ width: "16%", aspectRatio: "16/11" }}
        >
          <img
            src={topRowImages[1].img}
            alt="Corporate event concert"
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        {/* Top row image 3 — conference room */}
        <div
          className="relative shrink-0 rounded-2xl overflow-hidden group"
          style={{ width: "26%", aspectRatio: "16/11" }}
        >
          <img
            src={topRowImages[2].img}
            alt="Conference room"
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        </div>
      </div>

      {/* ── BOTTOM ROW ── offset ~1 card to the right + slight vertical overlap */}
      <div
        className={`flex gap-2.5 px-4 -mt-3 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        style={{ paddingLeft: "calc(1rem + 22% + 0.625rem)" /* align after text card */ }}
      >
        {/* Bottom row image 1 — purple lounge */}
        <div
          className="relative shrink-0 rounded-2xl overflow-hidden group"
          style={{ width: "18%", aspectRatio: "4/3" }}
        >
          <img
            src={bottomRowImages[0].img}
            alt="VIP lounge"
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        {/* Bottom row image 2 — catering plates */}
        <div
          className="relative shrink-0 rounded-2xl overflow-hidden group"
          style={{ width: "15%", aspectRatio: "4/3" }}
        >
          <img
            src={bottomRowImages[1].img}
            alt="Catering plates"
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        {/* Bottom row image 3 — buffet spread (wide) */}
        <div
          className="relative shrink-0 rounded-2xl overflow-hidden group"
          style={{ width: "22%", aspectRatio: "4/3" }}
        >
          <img
            src={bottomRowImages[2].img}
            alt="Buffet spread"
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        {/* Bottom row image 4 — stadium view */}
        <div
          className="relative shrink-0 rounded-2xl overflow-hidden group"
          style={{ width: "18%", aspectRatio: "4/3" }}
        >
          <img
            src={bottomRowImages[3].img}
            alt="Stadium view"
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        {/* Bottom row image 5 — outdoor terrace */}
        <div
          className="relative shrink-0 rounded-2xl overflow-hidden group"
          style={{ width: "14%", aspectRatio: "4/3" }}
        >
          <img
            src={bottomRowImages[4].img}
            alt="Outdoor terrace"
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        </div>
      </div>
    </section>
  );
}
