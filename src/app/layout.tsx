import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navigation/NavBar";
import { Footer } from "@/components/navigation/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Avery Keuben",
    openGraph: {
        type: "website",
        title: "Avery Keuben"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
                <body className={inter.className}>
                    <NavBar />
                    {children}
                    <Footer />
                </body>
        </html>
    );
}
