import { ConvexClientProviders } from "@/providers/ConvexClientProviders";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProviders>{children}</ConvexClientProviders>
      </body>
    </html>
  );
}
