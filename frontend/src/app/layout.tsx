import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import ThemeRegistry from "@/components/ThemeRegistry";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Next.js MUI Redux Boilerplate",
  description: "A professional boilerplate with Next.js, MUI, and Redux Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <StoreProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
