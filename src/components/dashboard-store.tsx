"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import LogoutButton from "@/components/logout-button";
import VideoCard from "@/components/video-card";

type Video = {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  likes: number;
  tags: string;
  performer: string;
  performerAvatar: string;
  isHD: boolean;
  createdAt: string;
};

const mainCategories = [
  "All",
  "Trending",
  "Most Viewed",
  "Newest",
  "HD Only",
  "Longest",
];

const subCategories = [
  "Tutorials",
  "Gaming",
  "Music",
  "Cooking",
  "Fitness",
  "Vlogs",
  "Entertainment",
  "Education",
  "DIY",
  "News",
  "Travel",
  "Technology",
  "Fashion",
  "Art",
  "Comedy",
  "Nature",
];

const sortOptions: Record<string, string> = {
  All: "newest",
  Trending: "popular",
  "Most Viewed": "popular",
  Newest: "newest",
  "HD Only": "newest",
  Longest: "newest",
};

export default function DashboardStore({ userName }: { userName: string }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [search, setSearch] = useState("");
  const [activeMainCat, setActiveMainCat] = useState("All");
  const [activeSubCat, setActiveSubCat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const allCategories = useMemo(() => ["All Categories", ...subCategories], []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      // Category filter
      if (activeSubCat) {
        params.set("category", activeSubCat);
      }

      // Search
      if (search.trim()) {
        params.set("search", search.trim());
      }

      // Sort
      const sort = sortOptions[activeMainCat] || "newest";
      params.set("sort", sort);

      const res = await fetch(`/api/videos?${params.toString()}`);
      const data = await res.json();

      let filtered: Video[] = data.videos || [];

      // Client-side filters for special categories
      if (activeMainCat === "HD Only") {
        filtered = filtered.filter((v) => v.isHD);
      }
      if (activeMainCat === "Longest") {
        filtered = filtered.sort((a, b) => b.duration - a.duration);
      }

      setVideos(filtered);
      setMessage(
        filtered.length === 0
          ? "No videos found 😏 Try different filters!"
          : "",
      );
    } catch {
      setVideos([]);
      setMessage("Failed to load videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [activeMainCat, activeSubCat, search]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-rose-950/20 via-black to-black" />

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 py-6 sm:px-6">
        {/* Header / Top Navigation */}
        <header className="mb-6 rounded-2xl bg-zinc-950/80 p-5 backdrop-blur border border-rose-900/40">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-rose-400/80 font-medium">
                football player
              </p>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                bernabu stadium
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                Welcome back, {userName}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/catagory"
                className="dashboard-fade-in rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                All Categories
              </Link>
              <LogoutButton />
            </div>
          </div>

          {/* Search */}
          <div className="mt-5">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search videos, performers, tags, categories..."
              className="w-full rounded-xl bg-zinc-900 border border-rose-900/50 px-5 py-3 text-lg placeholder-zinc-500 focus:border-rose-500 outline-none transition"
            />
          </div>

          {/* Main categories (tabs) */}
          <div className="mt-5 flex flex-wrap gap-2">
            {mainCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveMainCat(cat);
                  setActiveSubCat(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  activeMainCat === cat
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-600/40"
                    : "bg-zinc-900 border border-zinc-700 hover:border-rose-600/60 text-zinc-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sub categories */}
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Categories
            </p>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveSubCat(
                      cat === "All Categories"
                        ? null
                        : activeSubCat === cat
                          ? null
                          : cat,
                    )
                  }
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                    (cat === "All Categories" && !activeSubCat) ||
                    activeSubCat === cat
                      ? "bg-pink-600/80 text-white"
                      : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 border border-zinc-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main content - grid of video cards */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {activeMainCat === "All"
                ? "All Videos"
                : `${activeMainCat} Videos`}
              {activeSubCat && ` • ${activeSubCat}`}
            </h2>
            <p className="text-sm text-rose-300/80">
              {message || `${videos.length} videos found`}
            </p>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 animate-pulse"
                >
                  <div className="aspect-video bg-zinc-800" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-zinc-800 rounded w-3/4" />
                    <div className="h-3 bg-zinc-800 rounded w-1/2" />
                    <div className="h-3 bg-zinc-800 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              <div className="text-6xl mb-4">🎬</div>
              No videos found in this category 😢
              <br />
              Try changing filters or search terms!
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  thumbnailUrl={video.thumbnailUrl}
                  duration={video.duration}
                  views={video.views}
                  likes={video.likes}
                  performer={video.performer}
                  performerAvatar={video.performerAvatar}
                  isHD={video.isHD}
                  category={video.category}
                  tags={video.tags}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="mt-12 py-6 text-center text-sm text-zinc-500 border-t border-zinc-800"></footer>
      </div>
    </main>
  );
}
