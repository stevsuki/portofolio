import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import { siteConfig } from "@/constants/site";
import "./globals.css";

const outfit = Outfit({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: siteConfig.title,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
			<body className={`${outfit.className} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<Navbar />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
