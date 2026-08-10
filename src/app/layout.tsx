import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import CommandPalette from "./components/CommandPalette";
import ScrollToTop from "./components/ScrollToTop";
import GradientTextMotion from "./components/GradientTextMotion";
import { siteConfig } from "@/constants/site";
import { jsonLd } from "@/lib/jsonLd";
import { accentIds } from "@/data/accents";
import { ACCENT_STORAGE_KEY } from "@/lib/accent";
import "./globals.css";

/**
 * next-themes ships a blocking script for the light/dark class; the accent is
 * ours to restore, and it has to happen before the first paint or the page
 * flashes teal for a frame before switching to the stored colour.
 *
 * The id list is interpolated from the same array the picker renders, so a
 * palette added there is accepted here without a second edit. Nothing here
 * touches user input — a stored value that is not on the list is ignored.
 */
const accentScript = `(function(){try{var a=localStorage.getItem(${JSON.stringify(
	ACCENT_STORAGE_KEY,
)});if(${JSON.stringify(accentIds)}.indexOf(a)>-1)document.documentElement.dataset.accent=a}catch(e){}})()`;

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
	// Lets every relative URL below (canonicals, the generated share cards)
	// resolve to an absolute one, which is the only form social crawlers accept
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.title,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	applicationName: siteConfig.name,
	authors: [{ name: siteConfig.name, url: siteConfig.url }],
	creator: siteConfig.name,
	publisher: siteConfig.name,
	keywords: siteConfig.keywords,
	alternates: { canonical: "/" },
	// `opengraph-image.tsx` supplies the image for each route; declaring it here
	// too would override the per-route card with a single shared one.
	openGraph: {
		type: "website",
		siteName: siteConfig.name,
		locale: "en_US",
		url: "/",
		title: siteConfig.title,
		description: siteConfig.description,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.title,
		description: siteConfig.description,
	},
	// Proves ownership of the domain to Google Search Console. The value is the
	// token from the "HTML tag" verification method and must stay on the site
	// for the property to remain verified.
	verification: {
		google: "fRASa4GJyCevi5psDLBuiM2FFe0lrEsJMlpXMCS-J8s",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			// Without these a result is capped at a thumbnail and a short snippet
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
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
				{/* First thing in the body so the stored accent lands on <html> before
				    anything is painted, the same slot next-themes uses for its own */}
				<script dangerouslySetInnerHTML={{ __html: accentScript }} />
				{/* Machine-readable identity for search engines. Rendered once at the
				    root because the graph describes the site and its author, not any
				    one page. */}
				<script
					type="application/ld+json"
					// The payload is a local object literal, never user input
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				{/* disableTransitionOnChange is what keeps the theme swap cheap: without
				    it every `transition-colors` on the page repaints for its full
				    duration at once. The visible fade is handled by the view
				    transition in ThemeToggle instead, which the GPU composites. */}
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{/* Anchor target for the footer's "back to top" link */}
					<span id="top" aria-hidden="true" />
					{/* First stop on a keyboard visit, so the navbar can be jumped */}
					<a href="#main-content" className="skip-link">
						Skip to content
					</a>
					<Navbar />
					{children}
					<Footer />
					<ScrollToTop />
					<CommandPalette />
					<GradientTextMotion />
				</ThemeProvider>
			</body>
		</html>
	);
}
