import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  weight:["400", "500", "600", "700"],
  subsets:["latin"],
  });

export const metadata: Metadata = {
  title: "My Portfile",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <div className="bg-[#222] text-white h-screen snap-y snap-mandatory
        overflow-y-scroll overflow-x-hidden no-scrollbar">
        {children}
        </div>
        </body>
    </html>
  );
}
