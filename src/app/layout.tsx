import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GroceEase",
  description: "Your everyday grocery app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        {children}
        <ToastContainer
          draggable
          closeOnClick
          autoClose={2000}
          position="top-right"
          limit={2}
        />
      </body>
    </html>
  );
}
