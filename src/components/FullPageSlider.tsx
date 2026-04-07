"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import NavOverlay from "./NavOverlay";

interface Slide {
  image: string;
  title: string;
  description: string;
  cta?: string;
}

interface FullPageSliderProps {
  slides: Slide[];
}

export default function FullPageSlider({ slides }: FullPageSliderProps) {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("snap-scrolling");
    document.body.classList.add("snap-scrolling");

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPosition / windowHeight);
      setActive(Math.min(Math.max(index, 0), slides.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      document.documentElement.classList.remove("snap-scrolling");
      document.body.classList.remove("snap-scrolling");
      container.removeEventListener("scroll", handleScroll);
    };
  }, [slides.length]);

  return (
    <>
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="full-slider-container" ref={containerRef}>
        {slides.map((slide, i) => (
          <section key={i} className="full-slide">
            <div className="full-slide-bg">
              <img src={slide.image} alt={slide.title} />
              <div className="full-slide-overlay" />
            </div>

            <div className={`full-slide-content ${i === active ? "active" : ""}`}>
              <h1 className="full-slide-title">{slide.title}</h1>
              <p className="full-slide-desc">{slide.description}</p>
              {slide.cta && (
                <button className="btn-secondary mt-6">{slide.cta}</button>
              )}
            </div>
          </section>
        ))}

        <div className="full-slider-pagination">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`pagination-dot ${i === active ? "active" : ""}`}
              onClick={() => {
                if (containerRef.current) {
                  containerRef.current.scrollTo({
                    top: i * window.innerHeight,
                    behavior: "smooth"
                  });
                }
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </main>
    </>
  );
}
