import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unity Nodes - Turn Your Minutes into MNT Magic",
  description: "Farm MNT rewards effortlessly with Unity Nodes. Turn every call into crypto gains while supporting decentralized telecom.",
  keywords: ["Unity Nodes", "MNT", "Minutes Network", "DePIN", "cryptocurrency", "telecom", "rewards"],
  authors: [{ name: "Unity Nodes Team" }],
  openGraph: {
    title: "Unity Nodes - Turn Your Minutes into MNT Magic",
    description: "Farm MNT rewards effortlessly with Unity Nodes. Turn every call into crypto gains while supporting decentralized telecom.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unity Nodes - Turn Your Minutes into MNT Magic",
    description: "Farm MNT rewards effortlessly with Unity Nodes. Turn every call into crypto gains while supporting decentralized telecom.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
