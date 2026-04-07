"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
         setError(signInRes.error);
         setLoading(false);
         return;
      }

      router.push("/onboarding");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#010d1e] stripe-bg px-4 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#6c7ee6] rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#c9a84c] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10 fade-up visible">
          <Link href="/" className="inline-block mb-6 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mx-auto text-white">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z" fill="currentColor"/>
            </svg>
          </Link>
          <h2 className="text-4xl font-light text-white mb-3" style={{ fontFamily: 'var(--font-primary)' }}>Create Account</h2>
          <p className="text-white/60 font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>Welcome to the official portal</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl relative glow-border">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2 font-secondary">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3.5 text-white placeholder-white/40 focus:border-[#6c7ee6] focus:ring-1 focus:ring-[#6c7ee6] focus:outline-none transition-all sm:text-sm font-secondary"
                  placeholder="Santiago Bernabéu"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2 font-secondary">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3.5 text-white placeholder-white/40 focus:border-[#6c7ee6] focus:ring-1 focus:ring-[#6c7ee6] focus:outline-none transition-all sm:text-sm font-secondary"
                  placeholder="m.bernabeu@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2 font-secondary">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3.5 text-white placeholder-white/40 focus:border-[#6c7ee6] focus:ring-1 focus:ring-[#6c7ee6] focus:outline-none transition-all sm:text-sm font-secondary"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#4264d0] to-[#5c6fd4] hover:from-[#2b4cba] hover:to-[#4264d0] px-8 py-3.5 text-white font-primary font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(66,100,208,0.5)] border border-white/10"
              >
                {loading ? "Creating account..." : "Register"}
                {!loading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
            
            <div className="text-center mt-6 pt-4 border-t border-white/10">
               <span className="text-white/50 text-sm font-secondary mr-2">Already have an account?</span>
               <Link href="/login" className="text-[#6c7ee6] hover:text-[#8b9bf0] text-sm font-semibold transition-colors font-secondary">
                 Sign In
               </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
