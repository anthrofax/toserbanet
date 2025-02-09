import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartModal from "@/components/cart-modal/cart-modal";
import { WixClientConectProvider } from "@/contexts/wix-context";
import { Toaster } from "react-hot-toast";
import "react-confirm-alert/src/react-confirm-alert.css";
import HelpModal from "@/components/help-modal";

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toserbanet",
  description: "Menyediakan segala kebutuhan untuk anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar">
      <body
        className={`${poppins.className} antialiased relative bg-slate-100 overflow-x-hidden`}
      >
        <Toaster />
        <WixClientConectProvider>
          <Navbar />
          <div className="relative">{children}</div>
          <Footer />
          <CartModal />
          <HelpModal />
        </WixClientConectProvider>
      </body>
    </html>
  );
}
