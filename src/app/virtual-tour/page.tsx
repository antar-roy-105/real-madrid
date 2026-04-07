"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function VirtualTourPage() {
  const [panPosition, setPanPosition] = useState(0);

  // Auto-pan effect for continuous 360 simulation
  useEffect(() => {
    let frame: number;
    let autoPan = 0;
    
    let direction = 1;
    
    // Smooth 60fps panning
    const draw = () => {
      autoPan += 0.025 * direction;
      // Bounce back and forth
      if (autoPan >= 30) direction = -1;
      if (autoPan <= 0) direction = 1;
      
      setPanPosition(autoPan);
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="fixed inset-0 w-full h-full bg-black overflow-hidden z-[9999] select-none font-primary">
      
      {/* simulated 360 viewer background */}
      <div 
        className="absolute inset-0 h-full w-[140%] transition-none"
        style={{ transform: `translateX(-${panPosition}%)` }}
      >
        <img src="/stadium_interior.png" alt="Stadium 360" className="w-full h-full object-cover" />
      </div>

      {/* Vignette & Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#010d1e]/90 via-black/10 to-[#010d1e]/80 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] pointer-events-none" />

      {/* Header Bar */}
      <header className="absolute top-0 inset-x-0 p-6 md:p-8 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors border border-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" className="w-[30px] h-auto drop-shadow-md" alt="Logo" />
          <h1 className="text-white text-xl font-bold tracking-wider hidden md:block">
            Tour <span className="text-blue-400 font-light">360°</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-blue-600/90 text-white rounded-full text-xs font-bold tracking-widest flex items-center gap-2 border border-blue-400/30">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            VISTA PANORÁMICA GLOBLAL
          </div>
        </div>
      </header>

      {/* Central Media Container (Image and Video) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 pt-16">
        
        <div className="text-center mb-6 animate-fade-down">
          <p className="text-blue-400 font-secondary mb-2 tracking-[0.4em] text-xs md:text-sm font-semibold uppercase">
            Visión Completa
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-black drop-shadow-2xl font-primary leading-none uppercase tracking-tight">
            Santiago Bernabéu
          </h2>
        </div>

        <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[21/9] bg-black/40 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 p-2 md:p-3 shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-2 md:gap-3 overflow-hidden">
          
          {/* Main Video Section */}
          <div className="relative flex-1 bg-black rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer shadow-inner">
            <img src="/stadium_interior.png" alt="Video poster" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 flex flex-col items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500">
              <button className="w-16 h-16 md:w-20 md:h-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 transition-transform hover:scale-110 md:pl-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg"><path d="M5 3l14 9-14 9V3z"/></svg>
              </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3">
              <span className="px-3 py-1 bg-red-600 rounded-full text-white text-[10px] md:text-xs font-bold font-secondary flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                EN DIRECTO
              </span>
              <span className="text-white/80 font-bold text-sm tracking-wide drop-shadow-md">Tour 360°</span>
            </div>
          </div>

          {/* Secondary Image Section */}
          <div className="relative w-full md:w-[35%] flex-shrink-0 bg-black rounded-xl md:rounded-2xl overflow-hidden group">
            <img src="/news_featured.png" alt="Gallery" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 z-10">
               <p className="text-white font-primary font-bold text-lg md:text-xl drop-shadow-lg">El Césped</p>
               <p className="text-white/70 font-secondary text-xs uppercase tracking-widest mt-0.5">Galería de Imágenes</p>
            </div>
          </div>
          
        </div>

      </div>

    </main>
  );
}
