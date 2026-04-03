import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wispr Chat",
  description: "Trust-scored discovery engine for AI agent components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
