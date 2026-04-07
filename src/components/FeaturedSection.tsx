"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

const featured = [
  {
    img: "/restaurant_gastronomy.png",
    title: "Experiencia culinaria de primer nivel",
    link: "#",
  },
  {
    img: "/stadium_steps.png",
    title: "El Bernabéu se abre al mejor arte urbano",
    link: "#",
  },
  {
    img: "/falcons_helmet.png",
    title: "Los Falcons jugarán en el Bernabéu",
    link: "#",
  },
  {
    img: "/stadium_exec.png",
    title: "La NFL vuelve al Bernabéu",
    link: "#",
  },
];

export default function FeaturedSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardWidth = 900; // max card width
  const gap = 24; // gap between cards

  const getOffset = useCallback(
    (index: number) => {
      // Center the card at `index` in the viewport
      if (typeof window === "undefined") return 0;
      const viewportW = window.innerWidth;
      const actualCardWidth = Math.min(viewportW * 0.85, cardWidth);
      const totalItemWidth = actualCardWidth + gap;
      const centerOffset = (viewportW - actualCardWidth) / 2;
      return -(index * totalItemWidth) + centerOffset;
    },
    [cardWidth, gap]
  );

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(getOffset(currentIndex));
    const handleResize = () => setOffset(getOffset(currentIndex));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, getOffset]);

  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < featured.length - 1;

  const slide = (direction: "left" | "right") => {
    if (isAnimating) return;

    let nextIndex = currentIndex;
    if (direction === "left" && canGoLeft) {
      nextIndex = currentIndex - 1;
    } else if (direction === "right" && canGoRight) {
      nextIndex = currentIndex + 1;
    } else {
      return;
    }

    setIsAnimating(true);
    setCurrentIndex(nextIndex);
    setOffset(getOffset(nextIndex));

    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  return (
    <section className="py-16 bg-[#010d1e] relative overflow-hidden" id="news">
      <div className="mb-6 pl-[5vw]">
        <h2 className="font-secondary text-lg font-normal text-white tracking-wide">
          Destacados
        </h2>
      </div>

      <div className="relative w-full">
        {/* Left Arrow - always visible when can go left */}
        <button
          className={`absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer z-10 backdrop-blur-md transition-all duration-300 ${
            canGoLeft
              ? "bg-white/10 text-white hover:bg-white/25 hover:scale-110"
              : "bg-white/5 text-white/20 cursor-default"
          }`}
          onClick={() => slide("left")}
          aria-label="Anterior"
          disabled={!canGoLeft}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Track - no manual scrolling, only arrows control position */}
        <div
          className="overflow-hidden w-full"
          style={{ touchAction: "pan-y" }}
        >
          <div
            ref={trackRef}
            className="flex"
            style={{
              gap: `${gap}px`,
              transform: `translateX(${offset}px)`,
              transition: "transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)",
              willChange: "transform",
            }}
          >
            {featured.map((item, i) => (
              <article
                key={i}
                className={`shrink-0 w-[min(85vw,900px)] aspect-video rounded-xl overflow-hidden relative cursor-pointer group/card transition-all duration-700 ${
                  i === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-40 scale-[0.95]"
                }`}
                id={`featured-card-${i}`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover/card:scale-105 select-none pointer-events-none"
                />
                <div className="absolute inset-0 flex flex-row justify-between items-end p-10 bg-gradient-to-t from-[#010d1e]/90 via-[#010d1e]/20 to-transparent">
                  <h3
                    className="font-primary font-light text-white leading-tight drop-shadow-lg max-w-[65%] transition-all duration-700 ease-out origin-bottom-left"
                    style={{
                      fontSize: i === currentIndex ? "clamp(1.5rem, 3.5vw, 2.8rem)" : "clamp(1rem, 2.5vw, 1.8rem)",
                      opacity: i === currentIndex ? 1 : 0.3,
                      transform: i === currentIndex
                        ? "translateY(0px) scale(1)"
                        : "translateY(12px) scale(0.9)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <Link
                    href={item.link}
                    className="inline-flex items-center text-sm font-bold px-6 py-3 rounded-full text-[#111] bg-white/95 shadow-md no-underline whitespace-nowrap hover:bg-white hover:-translate-y-0.5 transition-all duration-700 ease-out origin-bottom-right"
                    style={{
                      opacity: i === currentIndex ? 1 : 0,
                      transform: i === currentIndex
                        ? "translateY(0px) scale(1)"
                        : "translateY(16px) scale(0.85)",
                    }}
                  >
                    Más información
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Arrow - always visible when can go right */}
        <button
          className={`absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer z-10 backdrop-blur-md transition-all duration-300 ${
            canGoRight
              ? "bg-white/10 text-white hover:bg-white/25 hover:scale-110"
              : "bg-white/5 text-white/20 cursor-default"
          }`}
          onClick={() => slide("right")}
          aria-label="Siguiente"
          disabled={!canGoRight}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
