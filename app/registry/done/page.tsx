import Link from "next/link"
import PageShell, { GlassCard } from "@/components/PageShell"

export default function page() {
  return (
    <PageShell backLabel="Нүүр хуудас">
      <GlassCard className="text-center px-8 py-12">
        {/* Checkmark */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(200,144,58,0.1)", border: "1px solid rgba(200,144,58,0.3)" }}
        >
          <svg className="w-8 h-8" fill="none" stroke="#C8903A" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-black mb-2" style={{ color: "#1C2340" }}>
          Бүртгэл амжилттай!
        </h2>
        <p className="text-sm mb-2" style={{ color: "rgba(28,35,64,0.5)" }}>
          Бүртгүүлсэнд баярлалаа!
        </p>
        <p className="text-xs mb-8" style={{ color: "rgba(28,35,64,0.35)" }}>
          4 сарын 19, 2026 · 6403 Chillum Pl NW, Washington, DC 20012
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/registry"
            className="px-7 py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{
              background: "linear-gradient(135deg, #D4963C, #A87028)",
              color: "#FFF8F0",
            }}
          >
            Дахин бүртгэх
          </Link>
          <Link
            href="/"
            className="px-7 py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{
              border: "1px solid rgba(28,35,64,0.16)",
              color: "rgba(28,35,64,0.6)",
            }}
          >
            Нүүр хуудас
          </Link>
        </div>
      </GlassCard>
    </PageShell>
  )
}
