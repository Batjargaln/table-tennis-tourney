"use client";
import TournamentManager from "@/components/TournamentManager";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Table Tennis Tournament
      </h1>
      <TournamentManager />
    </main>
  );
}
