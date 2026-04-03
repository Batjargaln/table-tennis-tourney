import React from "react"
import PageShell, { GlassCard } from "@/components/PageShell"

const SECTIONS = [
  {
    key: "goal",
    title: "Зорилго",
    items: [
      "Ширээний теннисний спортыг олон нийтэд сурталчлах, тоглогчдын дундах өрсөлдөөнийг нэмэгдүүлэх, туршлага солилцох, ур чадварыг дээшлүүлэхэд оршино.",
    ],
  },
  {
    key: "classes",
    title: "Төрөл, ангилал",
    items: [
      "Эрэгтэй ганцаарчилсан – ахисан шат",
      "Эрэгтэй ганцаарчилсан – анхан шат",
      "Эмэгтэй ганцаарчилсан – ахисан шат",
      "Эмэгтэй ганцаарчилсан – анхан шат",
    ],
  },
  {
    key: "rules",
    title: "Дүрэм",
    items: [
      "Бүх тоглолтууд 5 үе 11 оноогоор явагдана",
      "Ганцаарчилсан төрлийн тоглолтууд хэсгийн журмаар явна",
      "Хэсэг бүр 3–4 хүнтэй байна",
      "Хэсгээс хамгийн өндөр оноотой 2 тоглогч хагас шигшээд шалгарна",
      "Хагас шигшээ тоглолтууд хасагдах журмаар явна",
    ],
  },
  {
    key: "time",
    title: "Тэмцээн явагдах газар, хугацаа",
    items: [
      "2026 оны 04-р сарын 19-ний өдөр",
      "6403 Chillum Pl NW, Washington, DC 20012",
    ],
  },
]

const Rulebook = () => {
  return (
    <PageShell backLabel="Нүүр хуудас">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(28,35,64,0.32)" }}>
          2026 · Washington, D.C.
        </p>
        <h1 className="text-3xl font-black mb-1" style={{ color: "#1C2340" }}>Тэмцээний дүрэм</h1>
        {/* Petal divider */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,138,174,0.5))" }} />
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="3"  r="2.2" fill="#FFB7C5" opacity="0.9" />
            <circle cx="13" cy="8" r="2.2" fill="#FFB7C5" opacity="0.9" />
            <circle cx="8"  cy="13" r="2.2" fill="#FFB7C5" opacity="0.9" />
            <circle cx="3"  cy="8" r="2.2" fill="#FFB7C5" opacity="0.9" />
            <circle cx="8"  cy="8" r="1.4" fill="#C8903A" />
          </svg>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,138,174,0.5), transparent)" }} />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4 mb-6">
        {SECTIONS.map((section) => (
          <div
            key={section.key}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(28,35,64,0.1)",
              boxShadow: "0 2px 12px rgba(28,35,64,0.06)",
            }}
          >
            {/* Section header */}
            <div
              className="px-5 py-3"
              style={{
                background: "rgba(200,144,58,0.07)",
                borderBottom: "1px solid rgba(200,144,58,0.18)",
              }}
            >
              <h3 className="font-bold text-sm tracking-wide" style={{ color: "#A87028" }}>
                {section.title}
              </h3>
            </div>
            {/* Items */}
            <ul className="px-5 py-4 space-y-2.5">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(28,35,64,0.7)" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#C8903A" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Warning note */}
      <div
        className="rounded-2xl px-5 py-4 mb-6 text-sm"
        style={{
          background: "rgba(220,80,60,0.05)",
          border: "1px solid rgba(220,80,60,0.18)",
        }}
      >
        <p className="font-bold mb-1" style={{ color: "#C05030" }}>Анхаар!</p>
        <p style={{ color: "rgba(28,35,64,0.65)" }}>
          Шударга тоглолтыг хангахын тулд ахисан түвшний хүмүүс анхан шатны түвшинд өрсөлдөхөөс татгалзаж, өөрсдийн ур чадварын түвшинд тохирсон ангиллыг сонгохыг уриалж байна.
        </p>
        <p className="mt-3" style={{ color: "rgba(28,35,64,0.45)" }}>
          Оролцож буй төрлийнхөө дээд түвшинд тоглох боломж хүн бүрд нээлттэй. Нэмэлт хураамж — $20
        </p>
      </div>

      {/* Register CTA */}
      <div className="text-center">
        <a
          href="/registry"
          className="inline-block px-9 py-3 rounded-xl font-black text-base transition-transform hover:scale-105 shadow-lg"
          style={{
            background: "linear-gradient(135deg, #D4963C, #A87028)",
            color: "#FFF8F0",
            boxShadow: "0 4px 20px rgba(200,144,58,0.3)",
          }}
        >
          Бүртгүүлэх →
        </a>
      </div>
    </PageShell>
  )
}

export default Rulebook
