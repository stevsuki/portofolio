import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import { siteConfig } from "@/constants/site";
import "./globals.css";

const outfit = Outfit({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-outfit",
	display: "swap",
});

// Monospace is reserved for eyebrows and metadata labels — it separates
// structural text from prose without introducing a second display face.
const jetbrainsMono = JetBrains_Mono({
	weight: ["400", "500"],
	subsets: ["latin"],
	variable: "--font-mono-code",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: siteConfig.title,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
};

export const viewport: Viewport = {
	colorScheme: "light dark",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
			<body className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{/* Anchor target for the footer's "back to top" link */}
					<span id="top" aria-hidden="true" />
					<Navbar />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
