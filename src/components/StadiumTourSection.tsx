"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Component specifically focused on 360 virtual tour button

export default function StadiumTourSection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80vh] min-h-[600px] bg-black overflow-hidden flex items-center justify-center font-primary"
    >
      {/* Background Image with Parallax-style Pan */}
      <div className="absolute inset-0 z-0">
        <img
          src="/stadium_interior.png"
          alt="Santiago Bernabéu 360"
          className={`w-full h-full object-cover transition-transform duration-[10s] ease-out ${visible ? "scale-105 translate-x-4" : "scale-100"}`}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010d1e]/90 via-[#010d1e]/60 to-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">

        {/* Top Info */}
        <div className={`transition-all duration-1000 transform ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider border border-white/20 uppercase">
              Experiencia Inmersiva
            </span>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
            Descubre el <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#8b9bf0]">Nuevo Bernabéu</span>
          </h2>

          <p className="text-lg text-white/80 max-w-xl font-secondary mb-10 leading-relaxed">
            Pisa el césped virtual y explora cada rincón del estadio monumental junto a las estrellas del primer equipo. Una experiencia interactiva 360° exclusiva.
          </p>

          {/* Action Area */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">

            <Link href="/virtual-tour" className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 duration-300">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-200 to-white transition-all group-hover:scale-110"></span>
              <svg className="relative z-10 w-6 h-6 animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 12 2.1 7.1" />
                <path d="M12 12l9.9 4.9" />
                <path d="M12 12v10" />
              </svg>
              <span className="relative z-10">Iniciar Tour 360°</span>
            </Link>

            {/* Action Area End */}

          </div>
        </div>

      </div>
    </section>
  );
}
