"use client";

import Link from "next/link";

const tourCards = [
  { img: "/tour_stadium_roof.png", label: "Vista panorámica interior del estadio" },
  { img: "/tour_museum_jersey.png", label: "Museo Real Madrid" },
  { img: "/tour_champions_trophy.png", label: "Foto con la Copa de Europa" },
];

export default function TourSection() {
  return (
    <section className="relative py-24 px-[5%] overflow-hidden bg-gradient-to-br from-[#e2e8f0] via-[#f8fafc] to-[#cbd5e1] text-[#1e293b]" id="tour">
      {/* Background stipes simulation */}
      <div className="absolute inset-[-20%] pointer-events-none opacity-50 z-0 radial-gradient-bg"></div>

      <div className="relative z-[2] flex flex-col lg:flex-row items-center justify-between max-w-[1400px] mx-auto gap-12">
        <div className="flex-1 max-w-[480px] fade-up visible">
          <span className="font-primary text-lg text-[#334155] mb-2 block font-medium">Reserva tu visita</span>
          <h2 className="font-secondary text-[clamp(3rem,5vw,5rem)] leading-[1.1] font-light text-[#0f172a] mb-6">
            Tour<br />Bernabéu
          </h2>
          <p className="font-primary text-base text-[#475569] leading-relaxed mb-10">
            Sé protagonista de una experiencia única que te hará viajar a través de la historia del Real Madrid, de sus victorias y sus momentos destacados. En el corazón del coliseo blanco.
          </p>
          <Link href="/tour" className="inline-flex items-center px-7 py-3.5 bg-[#3f31eb] text-white rounded-full font-semibold text-[0.95rem] no-underline transition-all duration-300 shadow-[0_4px_15px_rgba(63,49,235,0.3)] hover:bg-[#2b1fd1] hover:-translate-y-0.5">
            Más información
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>

        <div className="flex-[1.3] fade-up visible w-full">
          <div className="flex justify-end gap-5 overflow-x-auto pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible">
            {tourCards.map((card, i) => (
              <div key={i} className="relative w-[260px] h-[400px] rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.15)] bg-white shrink-0 transition-transform duration-400 group hover:-translate-y-2">
                <img src={card.img} alt={card.label} draggable={false} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 w-full pt-16 pb-6 px-6 bg-gradient-to-t from-[#0f172a]/90 to-transparent">
                  <h4 className="text-white text-[1.1rem] font-secondary font-semibold leading-snug m-0">{card.label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
