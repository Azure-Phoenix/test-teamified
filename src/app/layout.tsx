import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Playground Studio — Where Change Happens",
  description:
    "Design-led branding and communications studio. We're designers, writers, 3D and motion artists, data scientists, social media experts and strategists.",
  openGraph: {
    title: "Playground Studio — Where Change Happens",
    description: "Design-led branding and communications studio based in Sydney.",
    url: "https://playgroundstudio.com.au",
    siteName: "Playground Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
