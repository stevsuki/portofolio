import type { SwatchOption } from "@/types/swatch";
import { createSwatchSetting } from "@/lib/swatchSetting";

/**
 * The page's base tone, chosen independently of the accent so any of the five
 * accents sits on any of these four. They are all neutrals for that reason — a
 * coloured background would fight whichever accent it was not designed around.
 *
 * Each one only moves `--background` and the two solid surfaces. `--surface`,
 * `--line` and the text tokens are already low-alpha or near-black/white, so
 * they carry over unchanged and there is far less to keep in sync.
 *
 * `slate` is the default sitting in `:root` and `.dark`, so it needs no block.
 */
export const backgrounds: SwatchOption[] = [
	{ id: "slate", label: "Slate" },
	{ id: "zinc", label: "Zinc" },
	{ id: "stone", label: "Stone" },
	{ id: "ink", label: "Ink" },
];

export const backgroundSetting = createSwatchSetting({
	storageKey: "portfolio-background",
	attribute: "bg",
	options: backgrounds,
	fallback: "slate",
});
