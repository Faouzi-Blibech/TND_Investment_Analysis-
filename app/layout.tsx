import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TND Investment Analysis | Colombus Capital",
  description: "Tunisian Dinar (TND) Investment Analysis Dashboard — Technical Assessment for Colombus Capital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
