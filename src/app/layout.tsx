import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Balgovind Rana — Computer Science × Data Engineering",
  description: "Personal portfolio of Balgovind Rana, a Computer Science student focused on full-stack development, data systems, and real-time digital experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sora.variable} ${jetBrainsMono.variable}`}>{children}</body>
    </html>
  );
}
