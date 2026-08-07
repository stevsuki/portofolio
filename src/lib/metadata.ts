import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

type PageMetadataOptions = Readonly<{
	/** Short label for the tab — the root layout's template appends the site name */
	title: string;
	description: string;
	/** Route path, used for the canonical URL and the Open Graph `url` */
	path: string;
}>;

/**
 * Per-page metadata, including a complete Open Graph block.
 *
 * Next merges metadata one level deep only: a page that declares `openGraph`
 * replaces the layout's object wholesale rather than extending it. So every
 * page has to restate `siteName`, `type` and `locale`, and this helper exists
 * so that restating happens in one place instead of four.
 */
export function pageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
	const sharedTitle = `${title} - ${siteConfig.name}`;

	return {
		title,
		description,
		alternates: { canonical: path },
		openGraph: {
			type: "website",
			siteName: siteConfig.name,
			locale: "en_US",
			url: path,
			title: sharedTitle,
			description,
		},
		twitter: {
			card: "summary_large_image",
			title: sharedTitle,
			description,
		},
	};
}
