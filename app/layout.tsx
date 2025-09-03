import "@/app/globals.css";
import Navbar from "../components/Navbar";
import localFont from "next/font/local";
import Footer from "@/components/footer";
import SessionWrapper from "../components/SessionWrapper";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const workSans = localFont({
  src: [
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

export const metadata = {
  title: "HarleyGrow",
  description: "An AI-powered soilless agriculture technique",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        <SessionWrapper>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
