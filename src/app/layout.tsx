import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ScrollToHash } from "@/components/ScrollToHash";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/I18nProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Full-stack developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <I18nProvider>
            <ScrollToHash />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
