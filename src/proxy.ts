import { NextResponse, type NextRequest } from "next/server";
import { navItems } from "@/constants/nav";

// The nav is the single source of truth for the pages that actually exist, so
// adding a route there is enough to keep it out of the redirect below.
const knownRoutes = new Set(navItems.map((item) => item.href));

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// "/about/" and "/about" are the same page; only the root keeps its slash.
	const route =
		pathname.length > 1 && pathname.endsWith("/")
			? pathname.slice(0, -1)
			: pathname;

	if (knownRoutes.has(route)) {
		return NextResponse.next();
	}

	return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
	matcher: [
		// Skip Next internals, the generated metadata routes and anything with a
		// file extension (the CV and everything under public/assets).
		// `opengraph-image` is matched anywhere in the path rather than only at the
		// start: every route generates its own card, so the share image for /about
		// lives at /about/opengraph-image and would otherwise be redirected home —
		// leaving the crawler with no preview at all.
		"/((?!_next/|icon|apple-icon|sitemap\\.xml|robots\\.txt|.*opengraph-image|.*\\..*).*)",
	],
};
