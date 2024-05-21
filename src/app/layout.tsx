import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./header";
import Providers from "./providers";
import LayoutBg from "./layoutBg";
import Footer from "./footer";

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
    <html lang="en" className="scroll-smooth">
      <body className={`relative font-sans antialiased ${inter.variable}`}>
        <TRPCReactProvider>
          <Providers>
            <LayoutBg />
            <Header />
            <div className="relative z-20 pt-[73px]">{children}</div>
            <Footer />
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
