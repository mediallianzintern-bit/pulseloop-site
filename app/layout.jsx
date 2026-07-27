import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata = {
  title: "PulseLoop: The AI-Enabled Sales Assistant for Media Organizations",
  description:
    "Bridge the gap between real-time sales execution and personalised corporate training. PulseLoop empowers media sales professionals to make smarter decisions in live client meetings, while feeding behavioural data into adaptive learning pathways.",
  openGraph: {
    title: "PulseLoop: The AI-Enabled Sales Assistant for Media Organizations",
    description:
      "Sales enablement and adaptive learning in one Dual-Loop platform, built for enterprise media and telecom teams.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
