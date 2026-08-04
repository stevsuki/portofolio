"use client";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { openCommandPalette } from "@/lib/commandPalette";

/**
 * Makes the ⌘K shortcut discoverable — without a visible entry point the
 * palette only exists for people who already guessed it was there.
 *
 * The labelled pill only appears from `lg` up. Between `md` and `lg` the nav
 * links are already on screen and the header has no room left, so it collapses
 * to the icon — which is also all a touch device needs, having no keyboard to
 * hint at in the first place.
 */
export default function CommandPaletteTrigger() {
	// Resolved after mount: the server has no way to know the visitor's platform,
	// and rendering the wrong glyph first would be a hydration mismatch.
	const [shortcutKey, setShortcutKey] = useState<string | null>(null);

	useEffect(() => {
		const isApple = /mac|iphone|ipad|ipod/i.test(navigator.userAgent);
		setShortcutKey(isApple ? "⌘" : "Ctrl");
	}, []);

	return (
		<button
			type="button"
			onClick={openCommandPalette}
			aria-label="Open quick search"
			className="group flex items-center justify-center lg:justify-between gap-2 w-10 lg:w-auto h-10 lg:pl-3.5 lg:pr-2 rounded-full border border-line bg-surface text-muted hover:text-accent hover:border-accent/60 transition-colors duration-300"
		>
			<span className="flex items-center gap-2">
				<FiSearch size={16} aria-hidden="true" />
				<span className="hidden lg:inline text-sm">Search</span>
			</span>
			{shortcutKey && (
				<span className="kbd hidden lg:inline-flex whitespace-nowrap group-hover:border-accent/50">
					{shortcutKey} K
				</span>
			)}
		</button>
	);
}
