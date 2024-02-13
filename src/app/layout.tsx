import type { Metadata } from "next";
import { openSans } from "@/app/ui/fonts";
import "src/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
      <body className={`${openSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
