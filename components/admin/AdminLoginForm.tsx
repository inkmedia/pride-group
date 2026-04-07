"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to login. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[420px] rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <div className="mb-6">
        <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-black/45">
          Admin Access
        </p>
        <h1 className="mt-2 text-[28px] font-[600] leading-tight text-black">
          Login
        </h1>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/65">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            className="w-full rounded-xl border border-black/15 px-4 py-3 text-[14px] outline-none transition focus:border-black"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/65">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full rounded-xl border border-black/15 px-4 py-3 text-[14px] outline-none transition focus:border-black"
            required
          />
        </div>

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-[500] text-red-600">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-[#172f55] px-6 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
