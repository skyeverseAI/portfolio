import { Cormorant_Garamond, IBM_Plex_Mono, Lora } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE = "https://skyeverse.space";
const TITLE = "Aakash Aggarwal — AI & Automations Engineer";
const DESCRIPTION =
  "Production AI systems and automations — things built to solve problems that shouldn't have needed a person.";

export const metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  keywords: [
    "Aakash Aggarwal",
    "AI engineer",
    "automation engineer",
    "RAG",
    "LLM",
    "workflow automation",
    "India",
  ],
  authors: [{ name: "Aakash Aggarwal", url: SITE }],
  creator: "Aakash Aggarwal",
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Aakash Aggarwal",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aakash Aggarwal — find the thing being done twice. Delete the second time.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Lets Google show the name, role and profile links in a knowledge panel, and
// resolves "Aakash Aggarwal" -> this site rather than to the GitHub handle.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aakash Aggarwal",
  url: SITE,
  jobTitle: "AI & Automations Engineer",
  email: "mailto:akash.skyeverse@gmail.com",
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  sameAs: [
    "https://www.linkedin.com/in/skyeverse/",
    "https://github.com/skyeverseAI",
    "https://skyeverse.substack.com/",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${lora.variable} ${plexMono.variable}`}
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
