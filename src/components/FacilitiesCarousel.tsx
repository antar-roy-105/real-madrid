"use client";

import { useState } from "react";

const SLIDES = [
  {
    title: "Tienda oficial",
    text: "2.800 metros cuadrados de experiencia digital inmersiva con más de 40 metros de pantallas LED y dos túneles para acercar a los aficionados a su equipo favorito.",
    image: "/official_store.png" // Placeholder local image
  },
  {
    title: "Área VIP",
    text: "La experiencia más premium. Zonas de hospitalidad exclusivas con servicio de catering y atención personalizada para que la experiencia en un concierto o evento deportivo sea aún más especial.",
    image: "/vip_lounge.png"
  },
  {
    title: "Crea tu evento",
    text: "El Estadio Santiago Bernabéu pone a tu disposición las mejores instalaciones para el desarrollo de cualquier tipo de evento. Desde reuniones de trabajo, convenciones e incentivos hasta la entrega de premios más espectacular en pleno centro de Madrid: el limite lo pones tú.",
    image: "/corporate_events.png"
  },
  {
    title: "Gastronomía",
    text: "El Bernabéu contará con 6 restaurantes y un espacio gastronómico único que abrirán sus puertas próximamente. De esta manera, el estadio ofrecerá a sus visitantes una amplia oferta de alta cocina, convirtiéndose en un referente gastronómico de la ciudad.",
    image: "/restaurant_gastronomy.png"
  }
];

export default function FacilitiesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className="w-full bg-black pt-16 pb-32 overflow-hidden relative font-secondary flex flex-col items-center min-h-[600px]">
      <div className="max-w-[1500px] w-full mx-auto px-4 md:px-12 relative flex flex-col items-center">
        
        {/* Header Title positioned left-ish matching screenshot constraint */}
        <div className="w-full max-w-[1000px] flex justify-start mb-16 pl-6 md:pl-0">
          <h2 className="text-[#d1d5db] text-[17px] md:text-[20px] font-medium tracking-wide drop-shadow-md">
            ¿Qué puedes hacer?
          </h2>
        </div>

        {/* Carousel Area */}
        <div className="relative w-full flex justify-center items-center">
          
          {/* Left Navigation Button - Pushed to extreme edge */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#1c222e] hover:bg-[#2b3546] flex flex-shrink-0 items-center justify-center transition-colors shadow-lg z-30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60 -ml-0.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>

          {/* Center Active Slide Card Container */}
          <div className="w-full relative px-6 md:px-0 max-w-[950px] flex flex-col items-center">
            
            <div className="w-full relative rounded-[20px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10">
              
              {/* Inner Image Wrapper */}
              <div key={currentSlide} className="w-full aspect-[4/3] md:aspect-[21/9] relative bg-[#070b14] animate-[fadeIn_0.5s_ease-out]">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover object-center opacity-40 md:opacity-50"
                />
                
                {/* Detailed Text Block inside the image centered */}
                <div className="absolute inset-0 flex flex-col justify-center items-center px-10 md:px-20 text-center">
                  <p className="text-white text-[13px] md:text-[15px] leading-[1.8] font-bold drop-shadow-xl tracking-wide max-w-[650px]">
                    {slide.text}
                  </p>
                </div>

                <style jsx>{`
                  @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                  }
                `}</style>
              </div>
            </div>

            {/* Massive Display Title Breaking Image Bounds */}
            <div className="relative z-30 pointer-events-none -mt-[35px] md:-mt-[45px] text-center w-full">
              <h1 className="font-primary text-white text-[32px] sm:text-[48px] md:text-[72px] lg:text-[84px] font-normal tracking-tight drop-shadow-2xl">
                {slide.title}
              </h1>
            </div>

          </div>

          {/* Right Navigation Button - Pushed to extreme edge */}
          <button 
            onClick={handleNext}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#1c222e] hover:bg-[#2b3546] flex flex-shrink-0 items-center justify-center transition-colors shadow-lg z-30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60 -mr-0.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>

        </div>

        {/* Bottom Pagination Indicator `1 -- 4` */}
        <div className="mt-14 flex items-center justify-center gap-5 font-bold text-sm">
           <span className="text-white text-[14px]">{currentSlide + 1}</span>
           <div className="w-[60px] h-[2px] relative bg-white/20 rounded-full overflow-hidden">
             {/* Progress bar fill matching the current slide index */}
             <div 
               className="absolute left-0 top-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-500 ease-out" 
               style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
             ></div>
           </div>
           <span className="text-white/40 text-[14px]">{SLIDES.length}</span>
        </div>

      </div>
    </section>
  );
}
