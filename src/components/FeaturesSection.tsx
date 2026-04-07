"use client";

import { useState, useEffect } from "react";

const features = [
  {
    img: "/official_store.png",
    text: "2.800 metros cuadrados de experiencia digital inmersiva con más de 40 metros de pantallas LED y dos túneles para acercar a los aficionados a su equipo favorito.",
    name: "Tienda oficial",
  },
  {
    img: "/vip_lounge.png",
    text: "La experiencia más premium. Zonas de hospitalidad exclusivas con servicio de catering y atención personalizada para que la experiencia en un concierto o evento deportivo sea aún más especial.",
    name: "Área VIP",
  },
  {
    img: "/corporate_events.png",
    text: "El Estadio Santiago Bernabéu pone a tu disposición las mejores instalaciones para el desarrollo de cualquier tipo de evento. Desde reuniones de trabajo, convenciones e incentivos hasta la entrega de premios más espectacular.",
    name: "Crea tu evento",
  },
  {
    img: "/restaurant_gastronomy.png",
    text: "El Bernabéu contará con 6 restaurantes y un espacio gastronómico único que abrirán sus puertas próximamente. Una amplia oferta de alta cocina, convirtiéndose en un referente gastronómico de la ciudad.",
    name: "Gastronomía",
  },
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [prevFeature, setPrevFeature] = useState<number | null>(null);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate features every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      navigate("right");
    }, 5000);
    return () => clearInterval(interval);
  }, [activeFeature, isAnimating]);

  const navigate = (dir: "left" | "right") => {
    if (isAnimating) return;
    const next =
      dir === "right"
        ? (activeFeature + 1) % features.length
        : (activeFeature - 1 + features.length) % features.length;

    setDirection(dir);
    setPrevFeature(activeFeature);
    setIsAnimating(true);
    setActiveFeature(next);

    setTimeout(() => {
      setPrevFeature(null);
      setIsAnimating(false);
    }, 700);
  };

  const goToFeature = (index: number) => {
    if (index === activeFeature || isAnimating) return;
    navigate(index > activeFeature ? "right" : "left");
  };

  const canGoLeft = true; // circular, always can
  const canGoRight = true;

  return (
    <section className="py-24 bg-[#010d1e]" id="features">
      <div className="mb-10 text-center">
        <h2 className="font-primary text-[clamp(2.5rem,6vw,4rem)] font-light text-white mb-6">
          ¿Qué puedes hacer?
        </h2>
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto px-6">
        {/* Arrow Buttons */}
        <button
          className={`absolute left-0 top-[200px] -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer z-20 backdrop-blur-md transition-all duration-300 ${
            canGoLeft
              ? "bg-white/10 text-white hover:bg-white/25 hover:scale-110"
              : "bg-white/5 text-white/20 cursor-default"
          }`}
          onClick={() => navigate("left")}
          aria-label="Anterior"
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

        <button
          className={`absolute right-0 top-[200px] -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer z-20 backdrop-blur-md transition-all duration-300 ${
            canGoRight
              ? "bg-white/10 text-white hover:bg-white/25 hover:scale-110"
              : "bg-white/5 text-white/20 cursor-default"
          }`}
          onClick={() => navigate("right")}
          aria-label="Siguiente"
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

        {/* Slide Track */}
        <div className="overflow-hidden min-h-[400px] md:min-h-[420px] relative">
          {features.map((feature, i) => {
            const isActive = i === activeFeature;
            const isPrev = i === prevFeature;

            let translateX = "100%";
            if (isActive) {
              translateX = isAnimating
                ? direction === "right"
                  ? "100%"
                  : "-100%"
                : "0%";
            } else if (isPrev) {
              translateX = direction === "right" ? "-100%" : "100%";
            }

            // Active card: animate in from the side to 0
            // Use keyframe-style via inline style + transition
            const isVisible = isActive || isPrev;

            return (
              <div
                key={i}
                className="absolute top-0 left-0 w-full"
                style={{
                  zIndex: isActive ? 10 : isPrev ? 9 : 0,
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                  transform: `translateX(${
                    isActive
                      ? "0%"
                      : isPrev
                        ? direction === "right"
                          ? "-100%"
                          : "100%"
                        : direction === "right"
                          ? "100%"
                          : "-100%"
                  })`,
                  transition: isVisible
                    ? "transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.7s ease"
                    : "none",
                }}
              >
                {/* ---- ORIGINAL CARD DESIGN UNCHANGED ---- */}
                <div className="flex flex-col md:flex-row gap-8 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl items-center">
                  <img
                    src={feature.img}
                    alt={feature.name}
                    className="w-full md:w-1/2 h-[300px] md:h-[400px] object-cover"
                  />
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left">
                    <p className="font-secondary text-lg text-white/70 leading-relaxed mb-6">
                      {feature.text}
                    </p>
                    <h3 className="font-primary text-3xl font-medium text-white">
                      {feature.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-8 flex items-center justify-center max-w-[400px] mx-auto pt-4">
          <span className="text-[#8b9bf0] font-semibold text-lg">
            {activeFeature + 1}
          </span>
          <div className="flex-1 h-1 bg-white/10 mx-4 rounded-full overflow-hidden relative">
            <div
              className="absolute top-0 left-0 h-full bg-[#6c7ee6] transition-all duration-500"
              style={{
                width: `${((activeFeature + 1) / features.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-white/50 font-semibold text-lg">
            {features.length}
          </span>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-3 mt-6">
          {features.map((_, i) => (
            <button
              key={i}
              id={`feature-btn-${i}`}
              onClick={() => goToFeature(i)}
              className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 ${
                i === activeFeature
                  ? "bg-white/80"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to feature ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
