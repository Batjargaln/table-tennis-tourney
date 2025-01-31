"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto py-8 text-center ">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="#">Бүртгүүлэх</Link>
          </li>
          <li>
            <Link href="#">Оноолт</Link>
          </li>
        </ul>
      </nav>
      <div className="max-w-2xl mx-auto">
        <Image
          className="fixed blur-lg"
          src="/background.svg"
          alt="background"
          fill
          style={{ zIndex: -1 }}
        />
        <h2 className="text-4xl font-bold py-16">
          Америкийн монголчуудын 14 дэх удаагийн ширээний теннисний аварга
          шалгаруулах тэмцээн
        </h2>
        <Button asChild>
          <Link href="#">Бүртгүүлэх</Link>
        </Button>
      </div>
    </main>
  );
}
