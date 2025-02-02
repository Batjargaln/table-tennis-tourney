"use client";
import TournamentApp from "@/components/TournamentManager";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        DC MONGOL TABLE TENNIS
      </h1>
      <TournamentApp />
    </main>
  );
}
