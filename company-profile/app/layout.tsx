import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Taichanese | Taste the Flavor Fiesta",
    template: "%s | Taichanese",
  },
  description:
    "Taichanese menjual sate taichan ayam bakar dengan sambal segar dan jeruk limau. Taste the Flavor Fiesta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
