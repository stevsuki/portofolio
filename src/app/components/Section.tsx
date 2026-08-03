type SectionProps = Readonly<{
	children: React.ReactNode;
	id?: string;
	/** Absolutely positioned background layers (glows, grid) rendered behind the content */
	decoration?: React.ReactNode;
	className?: string;
	innerClassName?: string;
}>;

/**
 * Shared vertical rhythm and measure for every page section, so spacing stays
 * consistent instead of each section repeating its own padding values.
 */
export default function Section({
	children,
	id,
	decoration,
	className = "",
	innerClassName = "",
}: SectionProps) {
	return (
		<section id={id} className={`relative px-5 sm:px-8 py-20 md:py-28 overflow-hidden scroll-mt-24 ${className}`}>
			{decoration}
			<div className={`relative z-10 flex flex-col items-center gap-12 w-full max-w-6xl mx-auto ${innerClassName}`}>
				{children}
			</div>
		</section>
	);
}
