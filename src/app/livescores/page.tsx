"use client";

import { useEffect, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Team {
  id: number;
  name: string;
  image_path?: string;
  short_code?: string;
}

interface Score {
  goals: number | null;
  participant: string;
}

interface Period {
  description: string;
  minutes?: number;
}

interface Fixture {
  id: number;
  name: string;
  state?: { short_name: string; state: string };
  league?: { name: string; image_path?: string };
  participants?: Team[];
  scores?: Score[];
  periods?: Period[];
  starting_at?: string;
}

type FilterType = "all" | "live" | "finished" | "scheduled";

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Token lives in the server-side API route — never exposed to the browser.

async function fetchLiveScores(): Promise<Fixture[]> {
  // Calls our own Next.js proxy route → avoids CORS & hides the token
  const res = await fetch("/api/livescores", { cache: "no-store" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? `Request failed (${res.status})`);
  }
  const data = await res.json();
  return data.data ?? [];
}

function getStateLabel(state?: string) {
  if (!state) return { label: "Scheduled", color: "text-blue-400", dot: "bg-blue-400" };
  const s = state.toLowerCase();
  if (s === "inplay" || s === "live" || s === "ht" || s === "et")
    return { label: s === "ht" ? "HT" : s === "et" ? "ET" : "LIVE", color: "text-emerald-400", dot: "bg-emerald-400", live: true };
  if (s === "ft" || s === "finished" || s === "aet" || s === "pen")
    return { label: s === "aet" ? "AET" : s === "pen" ? "PEN" : "FT", color: "text-slate-400", dot: "bg-slate-400" };
  if (s === "cancelled" || s === "postponed")
    return { label: s === "cancelled" ? "CAN" : "PST", color: "text-rose-400", dot: "bg-rose-400" };
  return { label: "SCH", color: "text-sky-400", dot: "bg-sky-400" };
}

function getScore(scores: Score[] | undefined, participant: "home" | "away") {
  if (!scores) return null;
  const match = scores.find((s) => s.participant?.toLowerCase() === participant);
  return match?.goals ?? null;
}

function getMinute(periods?: Period[]) {
  if (!periods) return null;
  const active = [...periods].reverse().find((p) => p.minutes != null);
  return active?.minutes ?? null;
}

function TeamBlock({ team, side }: { team?: Team; side: "home" | "away" }) {
  return (
    <div className={`flex flex-col items-center gap-2 w-[90px] ${side === "away" ? "items-center" : "items-center"}`}>
      {team?.image_path ? (
        <img
          src={team.image_path}
          alt={team.name}
          className="w-12 h-12 object-contain drop-shadow-xl"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg font-black">
          {team?.short_code?.[0] ?? team?.name?.[0] ?? "?"}
        </div>
      )}
      <span className="text-xs font-bold text-white/80 text-center leading-tight truncate w-full text-center">
        {team?.short_code ?? team?.name?.substring(0, 10) ?? "TBD"}
      </span>
    </div>
  );
}

function MatchCard({ fixture }: { fixture: Fixture }) {
  const home = fixture.participants?.[0];
  const away = fixture.participants?.[1];
  const homeScore = getScore(fixture.scores, "home");
  const awayScore = getScore(fixture.scores, "away");
  const stateInfo = getStateLabel(fixture.state?.state ?? fixture.state?.short_name);
  const minute = getMinute(fixture.periods);

  return (
    <div className="group relative bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 cursor-pointer">
      {/* Gradient shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

      {/* League Header */}
      <div className="flex items-center gap-2.5 px-4 pt-3 pb-2.5 border-b border-white/[0.06]">
        {fixture.league?.image_path && (
          <img
            src={fixture.league.image_path}
            alt={fixture.league.name}
            className="w-4 h-4 object-contain opacity-80"
          />
        )}
        <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest truncate">
          {fixture.league?.name ?? "Football"}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          {stateInfo.live && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          )}
          <span className={`text-[10px] font-bold tracking-wider ${stateInfo.color}`}>
            {stateInfo.label}
            {stateInfo.live && minute ? ` ${minute}'` : ""}
          </span>
        </div>
      </div>

      {/* Score Row */}
      <div className="flex items-center justify-between px-5 py-5">
        <TeamBlock team={home} side="home" />

        <div className="flex flex-col items-center gap-1 flex-1 px-2">
          {homeScore !== null && awayScore !== null ? (
            <div className="flex items-center gap-2">
              <span className="text-4xl font-black text-white tabular-nums">{homeScore}</span>
              <span className="text-xl font-light text-white/30 mt-0.5">–</span>
              <span className="text-4xl font-black text-white tabular-nums">{awayScore}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-white/30 text-xs font-secondary">vs</span>
              {fixture.starting_at && (
                <span className="text-white/60 text-sm font-bold">
                  {new Date(fixture.starting_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
          )}
        </div>

        <TeamBlock team={away} side="away" />
      </div>

      {/* Footer */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <span className="text-[10px] text-white/30 font-secondary">
          {fixture.starting_at
            ? new Date(fixture.starting_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
            : ""}
        </span>
        <span className="text-[10px] text-white/20 font-secondary">#{fixture.id}</span>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden animate-pulse">
      <div className="flex items-center gap-2 px-4 pt-3 pb-2.5 border-b border-white/[0.04]">
        <div className="w-4 h-4 rounded bg-white/10" />
        <div className="h-2.5 bg-white/10 rounded w-28" />
      </div>
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex flex-col items-center gap-2 w-[90px]">
          <div className="w-12 h-12 rounded-full bg-white/10" />
          <div className="h-2.5 bg-white/10 rounded w-14" />
        </div>
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg" />
          <div className="w-10 h-10 bg-white/10 rounded-lg" />
        </div>
        <div className="flex flex-col items-center gap-2 w-[90px]">
          <div className="w-12 h-12 rounded-full bg-white/10" />
          <div className="h-2.5 bg-white/10 rounded w-14" />
        </div>
      </div>
      <div className="px-4 pb-3 flex justify-between">
        <div className="h-2 bg-white/10 rounded w-12" />
        <div className="h-2 bg-white/10 rounded w-8" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LiveScoresPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (isAuto = false) => {
    if (isAuto) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await fetchLiveScores();
      setFixtures(data);
      setLastUpdated(new Date());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch live scores");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => { load(); }, [load]);

  // Auto-refresh every 30s
  useEffect(() => {
    const id = setInterval(() => load(true), 30_000);
    return () => clearInterval(id);
  }, [load]);

  // Filter logic
  const filtered = fixtures.filter((f) => {
    if (filter === "all") return true;
    const s = (f.state?.state ?? f.state?.short_name ?? "").toLowerCase();
    if (filter === "live") return ["inplay", "live", "ht", "et"].includes(s);
    if (filter === "finished") return ["ft", "finished", "aet", "pen"].includes(s);
    if (filter === "scheduled") return ["ns", "scheduled", "tbd"].includes(s);
    return true;
  });

  const liveCount = fixtures.filter((f) => {
    const s = (f.state?.state ?? f.state?.short_name ?? "").toLowerCase();
    return ["inplay", "live", "ht", "et"].includes(s);
  }).length;

  const filterBtns: { key: FilterType; label: string }[] = [
    { key: "all", label: "All Matches" },
    { key: "live", label: `Live${liveCount > 0 ? ` · ${liveCount}` : ""}` },
    { key: "finished", label: "Finished" },
    { key: "scheduled", label: "Scheduled" },
  ];

  return (
    <main className="min-h-screen bg-[#010d1e] text-white pt-24 pb-20 font-primary">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-700/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-violet-700/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-blue-900/15 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ─── Page Header ─────────────────────────── */}
        <div className="mb-10">
          <p className="text-indigo-400 font-secondary mb-3 tracking-[0.3em] text-xs font-semibold uppercase">
            SportMonks · Real-Time Data
          </p>
          <div className="flex flex-wrap items-end gap-4 justify-between">
            <div>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight">
                Live{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500">
                  Scores
                </span>
              </h1>
              {lastUpdated && (
                <p className="text-white/40 text-sm mt-2 font-secondary flex items-center gap-2">
                  {refreshing && (
                    <svg className="w-3.5 h-3.5 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  Updated {lastUpdated.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  {" · Auto-refreshes every 30s"}
                </p>
              )}
            </div>

            {/* Manual refresh button */}
            <button
              onClick={() => load()}
              disabled={loading || refreshing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-sm font-semibold transition-all duration-200 disabled:opacity-50"
            >
              <svg
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* ─── Stats Bar ───────────────────────────── */}
        {!loading && fixtures.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Total Matches", value: fixtures.length, color: "text-white" },
              { label: "Live Now", value: liveCount, color: "text-emerald-400" },
              {
                label: "Finished",
                value: fixtures.filter((f) => ["ft", "finished", "aet", "pen"].includes((f.state?.state ?? f.state?.short_name ?? "").toLowerCase())).length,
                color: "text-slate-400",
              },
              {
                label: "Scheduled",
                value: fixtures.filter((f) => ["ns", "scheduled", "tbd"].includes((f.state?.state ?? f.state?.short_name ?? "").toLowerCase())).length,
                color: "text-sky-400",
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3.5">
                <p className="text-white/40 text-[11px] uppercase tracking-widest font-secondary mb-1">{stat.label}</p>
                <p className={`text-3xl font-black tabular-nums ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* ─── Filter Tabs ─────────────────────────── */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {filterBtns.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${filter === btn.key
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                  : "bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08]"
                } ${btn.key === "live" && liveCount > 0 ? "!border-emerald-500/50" : ""}`}
            >
              {btn.key === "live" && liveCount > 0 && (
                <span className="inline-flex w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
              {btn.label}
            </button>
          ))}
        </div>

        {/* ─── Content ─────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-2xl">⚠️</div>
            <h3 className="text-xl font-bold text-rose-400">Failed to load scores</h3>
            <p className="text-white/50 text-sm font-secondary max-w-sm text-center">{error}</p>
            <p className="text-white/30 text-xs font-secondary">Make sure your SportMonks API token is valid.</p>
            <button
              onClick={() => load()}
              className="mt-2 px-5 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-400 text-sm font-semibold transition-all"
            >
              Try Again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl">⚽</div>
            <h3 className="text-xl font-bold text-white/60">No matches found</h3>
            <p className="text-white/30 text-sm font-secondary">
              {filter !== "all"
                ? `No ${filter} matches right now.`
                : "No live matches at the moment. Check back soon!"}
            </p>
            {filter !== "all" && (
              <button
                onClick={() => setFilter("all")}
                className="mt-1 px-5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-sm font-semibold text-white/70 hover:text-white transition-all"
              >
                View all matches
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((fixture) => (
              <MatchCard key={fixture.id} fixture={fixture} />
            ))}
          </div>
        )}

        {/* ─── Footer note ─────────────────────────── */}
        {!loading && !error && fixtures.length > 0 && (
          <p className="text-center text-white/20 text-xs font-secondary mt-10">
            Powered by SportMonks · Data auto-refreshes every 30 seconds
          </p>
        )}
      </div>
    </main>
  );
}
