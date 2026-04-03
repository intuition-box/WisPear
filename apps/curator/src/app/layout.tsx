import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wispr Curator",
  description: "Stake $TRUST on the tools you vouch for",
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
