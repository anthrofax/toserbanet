import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartModal from "@/components/cart-modal";
import { WixClientConectProvider } from "@/contexts/wix-context";
import { Toaster } from "react-hot-toast";
import "react-confirm-alert/src/react-confirm-alert.css";

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
        className={`${poppins.className} antialiased relative pb-[10rem] min-[360px]:pb-[5rem] min-[414px]:pb-[92px] bg-slate-100 overflow-x-hidden`}
      >
        <Toaster />
        <WixClientConectProvider>
          <Navbar />
          <div className="pt-32 lg:pt-20 min-h-[80vh] relative">
            {children}
            <CartModal />
          </div>
          <Footer />
        </WixClientConectProvider>
      </body>
    </html>
  );
}
