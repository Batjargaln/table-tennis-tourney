"use client";
import TournamentBanner from "@/components/TournamentBanner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto py-8 text-center ">
      <nav>
        <ul className="flex space-x-4">
          <li>
            {/* <Link href="#">Бүртгүүлэх</Link> */}
          </li>
          <li>
            {/* <Link href="#">Оноолт</Link> */}
          </li>
        </ul>
      </nav>
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
  );
}
