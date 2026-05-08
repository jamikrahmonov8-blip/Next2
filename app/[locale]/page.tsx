"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import "./globals.css"
export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-cyan-400">
          NextI18n
        </h1>

        <div className="flex gap-4">
          <Link
            href="/ru"
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition"
          >
            RU
          </Link>

          <Link
            href="/en"
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition"
          >
            EN
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-cyan-400 mb-4 text-sm uppercase tracking-widest">
            {t("small")}
          </p>

          <h2 className="text-6xl font-black leading-tight mb-6">
            {t("title")}
          </h2>

          <p className="text-zinc-400 text-lg mb-8">
            {t("description")}
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-2xl bg-cyan-500 text-black font-bold hover:scale-105 transition">
              {t("button1")}
            </button>

            <button className="px-6 py-3 rounded-2xl border border-zinc-700 hover:bg-zinc-900 transition">
              {t("button2")}
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="h-64 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 mb-6" />

          <h3 className="text-2xl font-bold mb-4">
            {t("cardTitle")}
          </h3>

          <p className="text-zinc-400">
            {t("cardDescription")}
          </p>
        </div>
      </section>
    </main>
  );
}