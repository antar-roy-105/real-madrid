"use client";

export default function CorporateSection() {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden" id="corporate">
      <div className="absolute inset-0">
        <img src="/corporate_events.png" alt="Corporate events at Bernabéu" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011e41]/95 via-[#011e41]/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 text-center fade-up visible">
        <span className="font-secondary text-sm font-semibold tracking-[3px] uppercase text-[#8b9bf0] mb-4 block">Eventos Corporativos</span>
        <h2 className="font-primary text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white leading-tight mb-8 drop-shadow-lg">
          Encuentra tu espacio
          <br />
          Crea tu evento
        </h2>
        <a href="#" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white font-primary text-[0.95rem] font-semibold rounded-full border border-white/30 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#010d1e] hover:-translate-y-0.5 hover:border-white">
          Más información
        </a>
      </div>
    </section>
  );
}
