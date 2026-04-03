import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/components/fonts";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Washington, D.C. 2026 · USA Mongolians Table Tennis",
  description: "2026 USA Mongolians Table Tennis Tournament — April 19, Washington D.C.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
