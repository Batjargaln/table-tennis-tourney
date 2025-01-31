import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/components/fonts";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Table Tennis Tournament",
  description: "Table Tennis Tournament",
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
