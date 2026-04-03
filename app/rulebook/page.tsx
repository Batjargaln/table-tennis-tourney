import Link from "next/link"

export default function page() {
  const pdfPath = "/MATTA durem.pdf"

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(165deg, #FFF7FA 0%, #FDF0F5 22%, #F8E8F2 48%, #EEE5F4 74%, #EAE6F5 100%)",
      }}
    >
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-5 py-3.5 shrink-0"
        style={{ borderBottom: "1px solid rgba(28,35,64,0.08)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-100"
          style={{ color: "rgba(28,35,64,0.45)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Нүүр хуудас
        </Link>

        <a
          href={pdfPath}
          download="MATTA durem.pdf"
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
          style={{
            background: "rgba(200,144,58,0.1)",
            border: "1px solid rgba(200,144,58,0.28)",
            color: "#A87028",
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Татах
        </a>
      </nav>

      {/* PDF embed — fills remaining height */}
      <div className="flex-1 flex flex-col p-3 sm:p-5 min-h-0">
        {/* Desktop: iframe */}
        <iframe
          src={`${pdfPath}#toolbar=1&navpanes=0`}
          className="hidden sm:block w-full flex-1 rounded-xl"
          style={{ border: "1px solid rgba(28,35,64,0.12)", minHeight: "80vh" }}
          title="MATTA Дүрэм"
        />

        {/* Mobile: can't reliably embed PDF, show open + download buttons */}
        <div
          className="sm:hidden flex-1 flex flex-col items-center justify-center gap-5 rounded-xl p-8 text-center"
          style={{
            background: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(28,35,64,0.1)",
          }}
        >
          <svg className="w-14 h-14" fill="none" stroke="#1C2340" strokeOpacity="0.35" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
          </svg>
          <div>
            <p className="font-bold mb-1" style={{ color: "#1C2340" }}>MATTA Дүрэм</p>
            <p className="text-xs" style={{ color: "rgba(28,35,64,0.4)" }}>PDF файлыг нээх эсвэл татаж авна уу</p>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-black text-sm text-center"
              style={{
                background: "linear-gradient(135deg, #D4963C, #A87028)",
                color: "#FFF8F0",
              }}
            >
              Нээх →
            </a>
            <a
              href={pdfPath}
              download="MATTA durem.pdf"
              className="w-full py-3 rounded-xl font-bold text-sm text-center"
              style={{ border: "1px solid rgba(28,35,64,0.16)", color: "rgba(28,35,64,0.6)" }}
            >
              Татах
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
