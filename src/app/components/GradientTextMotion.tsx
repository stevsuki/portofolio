"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * `.gradient-text` pans its background forever, and `background-position` is a
 * paint property here clipped to the glyph outlines — so every heading using it
 * repaints continuously whether or not anyone can see it. This parks the ones
 * that are out of view.
 *
 * Deliberately driven from one place rather than from the six call sites: most
 * of them sit in server components, and this way the effect stays a pure CSS
 * class that works on its own if the script never runs.
 *
 * Nothing here changes how a visible heading looks. A paused animation keeps
 * its position and resumes from it, and the margin restarts each element before
 * it scrolls into view.
 */
export default function GradientTextMotion() {
	const pathname = usePathname();

	useEffect(() => {
		if (typeof IntersectionObserver === "undefined") return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const element = entry.target as HTMLElement;
					element.dataset.idle = entry.isIntersecting ? "false" : "true";
				}
			},
			{ rootMargin: "150px 0px" },
		);

		// `template.tsx` remounts the tree per navigation, so the elements are
		// different nodes on every route — hence the rescan keyed on pathname.
		for (const element of document.querySelectorAll(".gradient-text")) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	}, [pathname]);

	return null;
}
