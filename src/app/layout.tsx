import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { DeviceProvider } from "@/components/DeviceProvider";
import { WelcomeGate } from "@/components/WelcomeGate";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "REFLECTOR — Light, held in time",
    template: "%s · REFLECTOR",
  },
  description:
    "REFLECTOR is a Geneva watch maison. Dress, city, and complication pieces from six thousand dollars.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <DeviceProvider>
          <WelcomeGate />
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
          <MobileDock />
        </DeviceProvider>
      </body>
    </html>
  );
}
