"use client"

import { ReactNode } from "react"
import Link from "next/link"

interface PageShellProps {
  children: ReactNode
  backLabel?: string
  backHref?: string
}

/** Shared light-theme wrapper used by all sub-pages */
export default function PageShell({
  children,
  backLabel = "Нүүр хуудас",
  backHref = "/",
}: PageShellProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(165deg, #FFF7FA 0%, #FDF0F5 22%, #F8E8F2 48%, #EEE5F4 74%, #EAE6F5 100%)",
      }}
    >
      {/* Soft radial bloom */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(255,183,197,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Top nav */}
      <nav
        className="relative z-10 flex items-center gap-2 px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(28,35,64,0.08)" }}
      >
        <Link
          href={backHref}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-100"
          style={{ color: "rgba(28,35,64,0.45)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1C2340")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(28,35,64,0.45)")}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {backLabel}
        </Link>
      </nav>

      {/* Page content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </div>
    </div>
  )
}

/** Glass card used throughout sub-pages */
export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(28,35,64,0.1)",
        boxShadow: "0 2px 20px rgba(28,35,64,0.07)",
      }}
    >
      {children}
    </div>
  )
}
