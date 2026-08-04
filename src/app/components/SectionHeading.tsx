type SectionAlign = "center" | "start" | "responsive";

type SectionHeadingProps = Readonly<{
	eyebrow?: string;
	prefix: string;
	highlight: string;
	description?: string;
	/**
	 * `responsive` is centred until `lg` and left-aligned above it — for headings
	 * that stack above their content on a phone but share a row with it on a wide
	 * screen. It exists so callers never have to pass a competing alignment in
	 * `className`: Tailwind emits `items-start`/`text-start` after their centred
	 * counterparts, so an override sent that way silently loses.
	 */
	align?: SectionAlign;
	className?: string;
}>;

const ALIGNMENT: Record<SectionAlign, string> = {
	center: "items-center text-center",
	start: "items-start text-start",
	responsive: "items-center text-center lg:items-start lg:text-start",
};

/** Whether the eyebrow gets its closing rule, and at which widths */
const TRAILING_RULE: Record<SectionAlign, string | null> = {
	center: "",
	start: null,
	responsive: "lg:hidden",
};

export default function SectionHeading({
	eyebrow,
	prefix,
	highlight,
	description,
	align = "center",
	className = "",
}: SectionHeadingProps) {
	// Closed off on both sides wherever the text is centred, so a lone leading
	// rule never drags the eyebrow visually off centre.
	const trailingRule = TRAILING_RULE[align];

	return (
		<div className={`flex flex-col gap-4 ${ALIGNMENT[align]} ${className}`}>
			{eyebrow && (
				<span className="eyebrow inline-flex items-center gap-2.5">
					<span className="w-6 h-px bg-current opacity-50" aria-hidden="true" />
					{eyebrow}
					{trailingRule !== null && (
						<span className={`w-6 h-px bg-current opacity-50 ${trailingRule}`} aria-hidden="true" />
					)}
				</span>
			)}
			<h2 className="text-3xl sm:text-4xl">
				{prefix} <span className="gradient-text">{highlight}</span>
			</h2>
			{/* Alignment is inherited from the wrapper rather than restated here */}
			{description && <p className="text-muted max-w-xl">{description}</p>}
		</div>
	);
}
