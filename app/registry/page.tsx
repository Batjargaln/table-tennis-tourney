import React from "react"
import PageShell, { GlassCard } from "@/components/PageShell"
import RegistrationForm from "./RegistrationForm"

export default function page() {
  return (
    <PageShell backLabel="Нүүр хуудас">
      <GlassCard>
        <div
          className="px-6 py-4 rounded-t-2xl"
          style={{ borderBottom: "1px solid rgba(28,35,64,0.1)", background: "rgba(28,55,160,0.05)" }}
        >
          <h2 className="text-xl font-black tracking-wide" style={{ color: "#1C2340" }}>
            Тэмцээний бүртгэл
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "rgba(28,35,64,0.4)" }}>
            2026 · Washington, D.C.
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <RegistrationForm />
        </div>
      </GlassCard>
    </PageShell>
  )
}
