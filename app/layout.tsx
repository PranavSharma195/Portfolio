import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";

export const metadata: Metadata = {
  title: "Susmita Khadka – Table Tennis Athlete",
  description: "Elegant portfolio of Susmita Khadka, table tennis athlete from Nepal, with achievements, training history, and contact details.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
