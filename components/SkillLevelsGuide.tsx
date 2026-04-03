import React from "react"
import { Trophy, Users } from "lucide-react"
import PageShell from "@/components/PageShell"

const LEVELS = [
  {
    icon: <Users className="w-6 h-6" style={{ color: "#2A5ABD" }} />,
    title: "Анхан шат",
    border: "rgba(42,90,189,0.18)",
    headerBg: "rgba(28,55,160,0.06)",
    items: [
      "Шинээр суралцаж эхэлж байгаа",
      "Ширээний теннисний ерөнхий мэдлэгтэй",
      "Тэмцээний туршлагагүй тоглогчид",
    ],
  },
  {
    icon: <Trophy className="w-6 h-6" style={{ color: "#C8903A" }} />,
    title: "Ахисан шат",
    border: "rgba(200,144,58,0.28)",
    headerBg: "rgba(200,144,58,0.07)",
    items: [
      "Спортын зэрэгтэй (1 болон түүнээс дээш)",
      "Өмнө зохиогдсон дунд буюу сонирхогчийн төрөлд эхний 2т багтсан",
      "Мөн саналаараа орох боломжтой",
    ],
  },
]

const SkillLevelsGuide = () => {
  return (
    <PageShell backLabel="Нүүр хуудас">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: "#1C2340" }}>
          Тоглох түвшингээ сонгох заавар
        </h1>
        <p className="text-sm" style={{ color: "rgba(28,35,64,0.45)" }}>
          Доорх тодорхойлолтуудаас үндэслэж сонголтоо хийнэ үү
        </p>
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

      {/* Level cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        {LEVELS.map((level) => (
          <div
            key={level.title}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(14px)",
              border: `1px solid ${level.border}`,
              boxShadow: "0 2px 14px rgba(28,35,64,0.06)",
            }}
          >
            <div
              className="px-5 py-3.5 flex items-center gap-2.5"
              style={{ background: level.headerBg, borderBottom: `1px solid ${level.border}` }}
            >
              {level.icon}
              <span className="font-black text-sm tracking-wide" style={{ color: "#1C2340" }}>{level.title}</span>
            </div>
            <ul className="px-5 py-4 space-y-2.5">
              {level.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(28,35,64,0.7)" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#C8903A" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Upgrade note */}
      <div
        className="rounded-2xl px-5 py-4 mb-7 text-sm"
        style={{
          background: "rgba(200,144,58,0.07)",
          border: "1px solid rgba(200,144,58,0.22)",
        }}
      >
        <p className="font-bold mb-1" style={{ color: "#C05A30" }}>Анхаар!</p>
        <p style={{ color: "rgba(28,35,64,0.65)" }}>
          Шударга тоглолтыг хангахын тулд ахисан түвшний хүмүүс анхан шатны түвшинд өрсөлдөхөөс татгалзаж, өөрсдийн ур чадварын түвшинд тохирсон ангиллыг сонгохыг уриалж байна.
        </p>
        <p className="mt-3" style={{ color: "#A87028" }}>
          Оролцож буй төрлийнхөө дээд түвшинд тоглох боломж хүн бүрд нээлттэй. Нэмэлт хураамж — $20
        </p>
      </div>

      {/* CTA */}
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

export default SkillLevelsGuide
