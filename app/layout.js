import { IBM_Plex_Mono, Sora } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Akash — AI Automation Engineer",
  description:
    "Building operational AI systems that run. Production-grade agents, voice pipelines, and internal tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${ibmPlexMono.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
