"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const leftLinks = [
  { label: "Eventos y conciertos", href: "/events-concerts" },
  { label: "Eventos corporativos", href: "/corporate-events" },
  { label: "Tour", href: "/tour", external: true },
  { label: "Restauración", href: "/restaurants" },
  { label: "Área VIP", href: "/vip-area", external: true },
];

const rightLinks = [
  { label: "Planea tu visita", href: "#" },
  { label: "Preguntas frecuentes", href: "#" },
  { label: "Noticias", href: "#" },
  { label: "Contacto", href: "#" },
];

export default function Footer() {
  const pathname = usePathname();

  // Do not show footer on the auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <footer className="bg-[#021d3a] border-t border-white/10 pt-20 pb-10 px-8 lg:px-[5vw]" id="footer">
      <div className="flex flex-col md:flex-row justify-between pb-16 border-b border-white/10 gap-10">
        <div className="flex flex-col gap-4">
          {leftLinks.map((link, i) => (
            <Link key={i} href={link.href} className="font-secondary text-base text-white/70 font-semibold uppercase tracking-[1.5px] no-underline transition-all duration-300 hover:text-[#c9a84c] hover:translate-x-1 flex items-center gap-2">
              {link.label}
              {link.external && <span className="text-xs opacity-60">↗</span>}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4 items-start md:items-end text-left md:text-right">
          {rightLinks.map((link, i) => (
            <Link key={i} href={link.href} className="font-secondary text-base text-white/70 font-semibold uppercase tracking-[1.5px] no-underline transition-all duration-300 hover:text-[#c9a84c] hover:-translate-x-1 flex items-center gap-2">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center pt-8 mt-5 gap-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 50 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[60px]"
            >
              <path d="M5 28C10 24 15 20 25 20C35 20 40 24 45 28" stroke="#d4d4d4" strokeWidth="2" fill="none" />
              <path d="M5 22C10 18 15 14 25 14C35 14 40 18 45 22" stroke="#d4d4d4" strokeWidth="2" fill="none" />
              <path d="M5 16C10 12 15 8 25 8C35 8 40 12 45 16" stroke="#d4d4d4" strokeWidth="2" fill="none" />
              <path d="M8 10C12 7 17 4 25 4C33 4 38 7 42 10" stroke="#d4d4d4" strokeWidth="1.5" fill="none" />
            </svg>
            <span className="font-primary font-bold text-xl text-white tracking-wider">Bernabéu</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-white/50 font-secondary mt-4 lg:mt-0">
            <a href="#" className="hover:text-white transition-colors">Aviso legal</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-white transition-colors">Política de cookies</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-white transition-colors">Política de privacidad</a>
            <span className="opacity-30">|</span>
            <span>Bernabéu © 2025. Todos los derechos reservados</span>
          </div>
        </div>

        <div className="flex gap-4">
          <a href="#" aria-label="Facebook" className="w-[42px] h-[42px] rounded-full bg-white/5 text-white flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:text-[#c9a84c] hover:-translate-y-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="w-[42px] h-[42px] rounded-full bg-white/5 text-white flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:text-[#c9a84c] hover:-translate-y-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
