"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

export default function OnboardingPage() {
  const router = useRouter();
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const profileData = formData.get("profileData") as string;

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileData }),
      });

      if (!res.ok) {
        throw new Error("Failed to complete onboarding");
      }

      // Update next-auth session onboarding flag without reloading
      await update({ onboarded: true });
      
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#010d1e] stripe-bg px-4 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6c7ee6] rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#c9a84c] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="w-full max-w-xl z-10">
        <div className="text-center mb-10 fade-up visible">
          <Link href="/" className="inline-block mb-6 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mx-auto text-[#c9a84c]">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z" fill="currentColor"/>
            </svg>
          </Link>
          <h2 className="text-4xl font-light text-white mb-3" style={{ fontFamily: 'var(--font-primary)' }}>Welcome Aboard</h2>
          <p className="text-white/60 font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>Just one more step to personalize your experience.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-[#c9a84c]/30 p-8 sm:p-10 rounded-2xl shadow-2xl relative glow-border">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="profileData" className="block text-sm font-medium text-white/80 mb-3 font-secondary">
                  Who is your favorite Real Madrid legend? Tell us briefly about yourself.
                </label>
                <textarea
                  id="profileData"
                  name="profileData"
                  required
                  rows={4}
                  className="block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3.5 text-white placeholder-white/30 focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] focus:outline-none transition-all sm:text-sm font-secondary resize-none"
                  placeholder="I am a lifelong fan since the Zidane era..."
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center !py-3.5 !bg-[#c9a84c] hover:!bg-[#e0c068] !text-black shadow-[0_4px_20px_rgba(201,168,76,0.3)] transition-all"
              >
                {loading ? "Completing setup..." : "Enter Portal"}
                {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
