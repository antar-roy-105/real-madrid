import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "@/app/globals.css";
import "@/app/slider.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bernabéu – Página Oficial",
  description:
    "Página web oficial del Estadio Bernabéu. Conciertos, deportes, eventos corporativos y mucho más. ¡Disfruta de la experiencia en nuestro estadio!",
  icons: {
    icon: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    shortcut: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    apple: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
