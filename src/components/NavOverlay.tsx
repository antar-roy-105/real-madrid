"use client";

import Link from "next/link";

type Link = { label: string; href: string; external?: boolean };

const navLinks: Link[] = [
  { label: "Inicio", href: "/" },
  { label: "Live Scores", href: "/livescores" },
  { label: "Eventos y conciertos", href: "/events-concerts" },
  { label: "Eventos corporativos", href: "/corporate-events" },
  { label: "Tour", href: "/tour" },
  { label: "Restauración", href: "/restaurants" },
  { label: "Área VIP", href: "/vip-area" },
  { label: "Planea tu visita", href: "#plan" },
  { label: "Preguntas frecuentes", href: "#faq" },
  { label: "Noticias", href: "#news" },
  { label: "Contacto", href: "#contact" },
];

export default function NavOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <nav
      className={`fixed inset-0 z-[999] bg-gradient-to-br from-[#010d1e] via-[#011e41] to-[#010d1e] flex flex-col justify-center px-12 py-16 transition-all duration-500 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      id="nav-overlay"
    >
      <div className="absolute inset-0 pointer-events-none stripe-bg opacity-30"></div>



      <ul className="flex flex-col gap-3 z-10">
        {navLinks.map((link, i) => (
          <li key={i}>
            <a
              href={link.href}
              className={`inline-flex items-center gap-2 font-primary text-3xl font-semibold text-[#8b9bf0] hover:text-white transition-all duration-500 transform ${open ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"} ${i === 0 ? "text-white font-extrabold" : ""}`}
              onClick={onClose}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {link.label}
              {link.external && <span className="text-sm opacity-60">↗</span>}
            </a>
          </li>
        ))}
      </ul>



      <div className="absolute bottom-10 left-12 right-12 flex items-center justify-between z-10">
        <div className="text-sm font-semibold text-white/70 flex items-center gap-1 cursor-pointer">
          ES <span className="text-xs">▾</span>
        </div>

        <div className="flex gap-4">
          <a href="#" aria-label="Facebook" className="w-9 h-9 grid place-items-center text-white/70 hover:text-white transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="w-9 h-9 grid place-items-center text-white/70 hover:text-white transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
