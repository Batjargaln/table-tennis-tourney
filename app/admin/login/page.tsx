"use client"

import { useState, useTransition } from "react"
import { adminLogin } from "./action"

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await adminLogin(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(165deg, #FFF7FA 0%, #FDF0F5 22%, #F8E8F2 48%, #EEE5F4 74%, #EAE6F5 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255,183,197,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: "rgba(28,35,64,0.35)" }}>
            АНУ-ын Монголчуудын
          </p>
          <div className="flex items-center gap-3 mb-4 max-w-xs mx-auto">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,138,174,0.5))" }} />
            <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="4"  r="2.5" fill="#FFB7C5" />
              <circle cx="16" cy="10" r="2.5" fill="#FFB7C5" />
              <circle cx="10" cy="16" r="2.5" fill="#FFB7C5" />
              <circle cx="4"  cy="10" r="2.5" fill="#FFB7C5" />
              <circle cx="10" cy="10" r="1.6" fill="#C8903A" />
            </svg>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,138,174,0.5), transparent)" }} />
          </div>
          <h1 className="text-2xl font-black" style={{ color: "#1C2340" }}>Админ нэвтрэх</h1>
          <p className="text-sm mt-1" style={{ color: "#B8762A" }}>Admin Login</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.80)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,183,197,0.35)",
            boxShadow: "0 4px 24px rgba(28,35,64,0.09)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "rgba(28,35,64,0.5)" }}>
                Нууц үг / Password
              </label>
              <input
                name="password"
                type="password"
                required
                autoFocus
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: error ? "1px solid rgba(220,60,60,0.5)" : "1px solid rgba(28,35,64,0.15)",
                  color: "#1C2340",
                  focusRingColor: "rgba(200,144,58,0.3)",
                }}
              />
              {error && <p className="text-xs mt-1.5" style={{ color: "#DC2626" }}>{error}</p>}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 rounded-xl font-black text-sm tracking-wide transition-transform hover:scale-[1.02] disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #D4963C, #A87028)",
                color: "#FFF8F0",
                boxShadow: "0 4px 18px rgba(200,144,58,0.3)",
              }}
            >
              {pending ? "Нэвтэрч байна..." : "Нэвтрэх →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
