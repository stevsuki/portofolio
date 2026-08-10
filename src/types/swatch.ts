/** One choice in a swatch row. The colour values themselves live in globals.css
    under the matching `[data-*]` block, so this stays free of hex codes. */
export type SwatchOption = {
	/** Matches both the stored value and the `[data-…="<id>"]` selector */
	id: string;
	label: string;
};
