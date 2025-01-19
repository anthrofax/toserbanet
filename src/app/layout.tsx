import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartModal from "@/components/cart-modal";
import { WixClientConectProvider } from "@/contexts/wix-context";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["400", "600"],
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
    <html lang="en">
      <body className={`${poppins.className} antialiased relative pb-20`}>
        <Toaster />
        <WixClientConectProvider>
          <Navbar />
          <div className="pt-28 lg:pt-20 min-h-screen bg-slate-100">
            {children}
          </div>
          <Footer />

          <CartModal />
        </WixClientConectProvider>
      </body>
    </html>
  );
}
