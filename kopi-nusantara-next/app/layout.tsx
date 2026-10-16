import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kopi Nusantara | Surya Banyutama Suprapto - 535250100",
  description:
    "Kopi Nusantara menghadirkan biji kopi pilihan dari pelosok Indonesia, diseduh langsung setiap hari.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
