import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./header";
import Providers from "./providers";
import BgHome from "./bgHome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Icon Generator AI",
  description: "AI icon generator",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative font-sans antialiased ${inter.variable}`}>
        <TRPCReactProvider>
          <Providers>
            <BgHome  />
            <Header />
            <div className="z-20 relative">
            {children}

            </div>
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
