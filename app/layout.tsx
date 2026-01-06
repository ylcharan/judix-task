import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Judix Task",
  description: "Full-stack application with authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
