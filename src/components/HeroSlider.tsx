"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  { src: "news_featured.png", alt: "Bernabéu Hero Banner" },
  { src: "stadium_hero.png", alt: "Bernabéu Foto 1" },
  { src: "concert_event.png", alt: "Bernabéu Stadium aerial view" },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden" id="hero">
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-[1.8s] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${i === active ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={`w-full h-full object-cover origin-center transition-transform duration-[12s] ease-linear transform-gpu ${i === active ? "scale-[1.15]" : "scale-100"
                }`}
            />
          </div>
        ))}
        {/* Overlay gradient matched to original design */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#010d1e]/30 via-[#010d1e]/10 to-[#010d1e]/95" style={{ background: 'linear-gradient(to bottom, rgba(1, 13, 30, 0.3) 0%, rgba(1, 13, 30, 0.1) 40%, rgba(1, 13, 30, 0.6) 80%, rgba(1, 13, 30, 0.95) 100%)' }} />
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            className="w-[50px] h-1 bg-white/30 rounded-sm relative overflow-hidden p-0 cursor-pointer"
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            id={`hero-dot-${i}`}
          >
            <span
              className="absolute top-0 left-0 h-full bg-white transition-all ease-linear block"
              style={{
                width: i === active ? '100%' : '0%',
                transitionDuration: i === active ? '5s' : '0s'
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
