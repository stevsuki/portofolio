import { Accent } from "@/types/accent";

/**
 * The accent is deliberately a separate axis from light/dark rather than a
 * sixth and seventh entry in next-themes' theme list. A visitor picks a mode
 * and a colour independently, and `resolvedTheme === "dark"` keeps meaning what
 * it does everywhere else in the app.
 *
 * Only the id and the label live here. Every colour value is in globals.css
 * under `[data-accent="<id>"]`, because the tokens have to exist as CSS
 * variables anyway — mirroring them into TypeScript would create two sources of
 * truth for one palette. The swatch dot in the picker reads its colour from a
 * `.swatch-<id>` class defined next to each token block.
 *
 * `teal` needs no block of its own: it is what `:root` and `.dark` already
 * carry, so the default look survives with no attribute set at all.
 */
export const accents: Accent[] = [
	{ id: "teal", label: "Teal" },
	{ id: "blue", label: "Blue" },
	{ id: "violet", label: "Violet" },
	{ id: "rose", label: "Rose" },
	{ id: "amber", label: "Amber" },
];

export const DEFAULT_ACCENT = "teal";

export const accentIds = accents.map((accent) => accent.id);
