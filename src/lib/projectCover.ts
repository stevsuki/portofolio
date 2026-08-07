/**
 * Cover treatment for a project, derived from its slug.
 *
 * Lives here rather than in `ProjectCard` because the case-study page opens
 * with the same gradient and the same organic shapes: arriving on the detail
 * page should feel like the card you clicked grew into it, which only holds if
 * both read the colours from one place.
 */

const COVER_VARIANTS = [
	{ bg: "card-cover-0", accent: "text-teal-700 dark:text-teal-200", blob: "bg-teal-900/10 dark:bg-white/10" },
	{ bg: "card-cover-1", accent: "text-sky-700 dark:text-sky-200", blob: "bg-sky-900/10 dark:bg-white/10" },
	{ bg: "card-cover-2", accent: "text-violet-700 dark:text-violet-200", blob: "bg-violet-900/10 dark:bg-white/10" },
];

// Irregular, hand-picked border-radius pairs so each cover reads as a
// unique organic shape rather than a repeated stock icon.
const BLOB_SHAPES = [
	"rounded-[60%_40%_55%_45%/45%_55%_40%_60%]",
	"rounded-[35%_65%_45%_55%/55%_40%_65%_35%]",
	"rounded-[55%_45%_35%_65%/40%_60%_55%_45%]",
];

function hashOf(slug: string) {
	return slug.split("").reduce((accumulator, char) => accumulator + (char.codePointAt(0) ?? 0), 0);
}

export function coverFor(slug: string) {
	const hash = hashOf(slug);

	return {
		...COVER_VARIANTS[hash % COVER_VARIANTS.length],
		blobShapeA: BLOB_SHAPES[hash % BLOB_SHAPES.length],
		blobShapeB: BLOB_SHAPES[(hash + 1) % BLOB_SHAPES.length],
	};
}
