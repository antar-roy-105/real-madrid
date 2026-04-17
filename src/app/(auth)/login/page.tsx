import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-10">
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-2 text-sm text-gray-600">
          Login setup is pending. Registration is active now.
        </p>
        <Link className="mt-4 inline-block text-sm font-medium underline" href="/register">
          Back to register
        </Link>
      </div>
    </main>
  );
}
