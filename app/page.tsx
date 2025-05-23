import Image from "next/image"

import TournamentBanner from "@/components/TournamentBanner"

// import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-0 md:py-8 text-center ">
      {/* <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/register">Бүртгүүлэх</Link>
          </li>
          <li>
            <Link href="/tournament">Оноолт</Link>
          </li>
          <li>
            <Link href="/about">Бидний тухай</Link>
          </li>
          <li>
            <Link href="/rulebook">Дүрэм</Link>
          </li>
        </ul>
      </nav> */}
      <div className="max-w-4xl mx-auto">
        <Image
          className="fixed blur-lg"
          src="/background.svg"
          alt="background"
          fill
          style={{ zIndex: -1 }}
        />
        <TournamentBanner />
      </div>
    </main>
  )
}
