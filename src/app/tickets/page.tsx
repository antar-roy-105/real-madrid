import Link from "next/link";
import Image from "next/image";

export default function TicketsPage() {
  const matches = [
    {
      id: "1",
      date: new Date("2025-05-15T19:00:00Z").toISOString(),
      opponent: "Barcelona",
      competition: "La Liga",
      price: 150,
      stadium: "Santiago Bernabéu",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"
    },
    {
      id: "2",
      date: new Date("2025-05-22T20:00:00Z").toISOString(),
      opponent: "Atletico Madrid",
      competition: "La Liga",
      price: 120,
      stadium: "Santiago Bernabéu",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg"
    }
  ];

  return (
    <main className="min-h-screen bg-[#010d1e] text-white pt-24 font-primary">
      {/* Background Styling */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#4264d0]/20 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 border-b border-white/10 pb-8 animate-fade-down">
          <p className="text-blue-400 font-secondary mb-3 tracking-[0.3em] text-sm font-semibold uppercase">
            Temporada 2025/2026
          </p>
          <h1 className="text-5xl md:text-7xl font-black drop-shadow-2xl uppercase tracking-tight mb-4">
            Entradas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#8b9bf0]">Oficiales</span>
          </h1>
          <p className="text-white/70 max-w-2xl font-secondary text-lg">
            Asegura tu lugar en el histÃ³rico Estadio Santiago BernabÃ©u. Compra tus entradas con antelaciÃ³n y vive en directo la magia del Real Madrid.
          </p>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.length === 0 ? (
             <div className="col-span-full py-20 text-center bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
               <svg className="w-16 h-16 mx-auto text-white/30 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
               </svg>
               <h3 className="text-2xl font-bold mb-2">PrÃ³ximamente</h3>
               <p className="text-white/50 font-secondary max-w-md mx-auto">
                 Actualmente no hay partidos disponibles o se estÃ¡n actualizando los calendarios. Por favor, vuelve a visitar esta pÃ¡gina en unas horas.
               </p>
             </div>
          ) : (
            matches.map((match) => (
              <div key={match.id} className="group relative bg-[#0a1930] rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/50 flex flex-col">
                
                {/* Match Banner Area */}
                <div className="relative h-48 bg-gradient-to-br from-black to-[#051124] flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/stadium_interior.png')] opacity-20 bg-cover bg-center group-hover:opacity-30 transition-opacity blur-[2px]"></div>
                  
                  <div className="relative z-10 w-full flex items-center justify-between">
                     <div className="flex flex-col items-center gap-2">
                       <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" className="w-14 h-14 drop-shadow-xl" alt="Real Madrid" />
                       <span className="text-xs font-bold font-secondary">RMA</span>
                     </div>
                     <span className="text-2xl font-black italic text-white/40 px-4">VS</span>
                     <div className="flex flex-col items-center gap-2">
                       {/* Generic opponent shield if match.imageUrl isn't present */}
                       {match.imageUrl ? (
                         <img src={match.imageUrl} className="w-14 h-14 drop-shadow-xl object-contain" alt={match.opponent} />
                       ) : (
                         <div className="w-14 h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-xl font-bold font-serif shadow-xl">
                           {match.opponent.charAt(0)}
                         </div>
                       )}
                       <span className="text-xs font-bold font-secondary text-center w-20 truncate">{match.opponent.substring(0,3).toUpperCase()}</span>
                     </div>
                  </div>
                </div>

                {/* Match Info */}
                <div className="p-6 flex-1 flex flex-col">
                  
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-blue-400 text-xs font-bold uppercase tracking-widest font-secondary mb-1">{match.competition}</p>
                      <h3 className="text-2xl font-black uppercase text-white truncate max-w-[200px]">{match.opponent}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold font-secondary text-white/70">Desde</p>
                      <p className="text-2xl font-black text-[#c9a84c]">â‚¬{match.price.toFixed(0)}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-white/70 font-secondary text-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {new Date(match.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-3 text-white/70 font-secondary text-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {new Date(match.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} H
                    </div>
                    <div className="flex items-center gap-3 text-white/70 font-secondary text-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {match.stadium}
                    </div>
                  </div>

                  {/* Buy Button */}
                  <div className="mt-auto">
                    <button className="w-full relative group/btn overflow-hidden rounded-xl bg-white text-black font-bold font-primary py-3.5 flex items-center justify-center gap-2 transition-transform active:scale-95">
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-200 to-white transition-transform group-hover/btn:scale-105"></div>
                      <span className="relative z-10 flex items-center gap-2">
                        Comprar Entradas
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </button>
                  </div>
                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}


