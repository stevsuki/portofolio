import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import { siteConfig } from "@/constants/site";
import "./globals.css";

const outfit = Outfit({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${outfit.className} antialiased`}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
