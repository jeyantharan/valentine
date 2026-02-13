import type { Metadata } from "next";
import "./globals.css";
import BackgroundMusic from "./components/BackgroundMusic";

export const metadata: Metadata = {
  title: "Valentine's Day Wish",
  description: "A special Valentine's Day message",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
