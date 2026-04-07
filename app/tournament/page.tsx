import { cookies } from "next/headers"
import TournamentApp from "./TournamentManager"
import { fetchInitialTournamentData } from "./action"

export const dynamic = "force-dynamic"

const VALID_CATEGORIES = ["beginner-male", "advanced-male", "beginner-female", "advanced-female", "mixed-doubles"]

export default async function TournamentPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const initialTournamentData = await fetchInitialTournamentData()
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get("admin_token")?.value === process.env.ADMIN_SECRET
  const { cat } = await searchParams
  const initialCategory = cat && VALID_CATEGORIES.includes(cat) ? cat : null

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, #FFF7FA 0%, #FDF0F5 22%, #F8E8F2 48%, #EEE5F4 74%, #EAE6F5 100%)",
      }}
    >
      {/* Soft radial centre bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 20%, rgba(255,183,197,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Falling petals */}
      {([
        ["8%",  "12%", 8, 0.45,  0],
        ["20%", "40%", 6, 0.35, 37],
        ["72%", "25%", 9, 0.40, 74],
        ["85%", "55%", 6, 0.30,111],
        ["48%", "10%", 5, 0.38,148],
        ["60%", "70%", 8, 0.32,185],
        ["5%",  "65%", 6, 0.35,222],
        ["92%", "38%", 5, 0.28,259],
        ["33%", "82%", 7, 0.28,300],
        ["78%", "80%", 5, 0.24,340],
      ] as const).map(([left, top, sz, op, rot], i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left, top,
            width: sz * 2,
            height: sz,
            background: "#FFB7C5",
            opacity: op,
            transform: `rotate(${rot}deg)`,
            borderRadius: "50% 0 50% 0",
          }}
        />
      ))}

      {/* Cherry branch — top left */}
      <div className="absolute top-0 left-0 pointer-events-none select-none opacity-70 hidden sm:block">
        <svg width="220" height="240" viewBox="0 0 300 320" aria-hidden="true">
          <path d="M -8,-8 C 30,55 65,45 105,105 C 138,155 158,188 185,238" stroke="#7A3828" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 45,64 C 62,36 96,20 132,12" stroke="#7A3828" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          <path d="M 105,105 C 130,76 162,60 198,50" stroke="#7A3828" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          {[
            [28,38,9],[74,60,7.5],[110,112,9.5],[96,32,8],[130,16,8.5],[164,65,7.5],[196,54,8.5]
          ].map(([x,y,r],i) => {
            const petals: [number,number][] = [[x,y-r],[x+r*.95,y-r*.31],[x+r*.59,y+r*.81],[x-r*.59,y+r*.81],[x-r*.95,y-r*.31]]
            return (
              <g key={i} opacity={0.85}>
                {petals.map(([px,py],j) => <circle key={j} cx={px} cy={py} r={r*.55} fill={["#FFB7C5","#F6A0B8","#EF8AAE","#F6A0B8","#FFB7C5"][j]} />)}
                <circle cx={x} cy={y} r={r*.28} fill="#FFD9A0" />
              </g>
            )
          })}
        </svg>
      </div>

      {/* Cherry branch — top right mirrored */}
      <div className="absolute top-0 right-0 pointer-events-none select-none opacity-70 hidden sm:block" style={{ transform: "scaleX(-1)" }}>
        <svg width="220" height="240" viewBox="0 0 300 320" aria-hidden="true">
          <path d="M -8,-8 C 30,55 65,45 105,105 C 138,155 158,188 185,238" stroke="#7A3828" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 45,64 C 62,36 96,20 132,12" stroke="#7A3828" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          <path d="M 105,105 C 130,76 162,60 198,50" stroke="#7A3828" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          {[
            [28,38,9],[74,60,7.5],[110,112,9.5],[96,32,8],[130,16,8.5],[164,65,7.5],[196,54,8.5]
          ].map(([x,y,r],i) => {
            const petals: [number,number][] = [[x,y-r],[x+r*.95,y-r*.31],[x+r*.59,y+r*.81],[x-r*.59,y+r*.81],[x-r*.95,y-r*.31]]
            return (
              <g key={i} opacity={0.85}>
                {petals.map(([px,py],j) => <circle key={j} cx={px} cy={py} r={r*.55} fill={["#FFB7C5","#F6A0B8","#EF8AAE","#F6A0B8","#FFB7C5"][j]} />)}
                <circle cx={x} cy={y} r={r*.28} fill="#FFD9A0" />
              </g>
            )
          })}
        </svg>
      </div>

      <div className="relative z-10">
        <TournamentApp initialTournamentData={initialTournamentData} isAdmin={isAdmin} initialCategory={initialCategory} />
      </div>
    </div>
  )
}
