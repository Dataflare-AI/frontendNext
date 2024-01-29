import type { Metadata } from "next";
import { openSans } from "@/app/ui/fonts";
import "src/app/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | FusionAPI",
    default: "FusionAPI",
  },
  description: "",
  // metadataBase: new URL(""),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${openSans.className} antialiased`}>{children}</body>
    </html>
  );
}
