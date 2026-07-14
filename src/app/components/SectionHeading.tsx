type SectionHeadingProps = Readonly<{
	eyebrow?: string;
	prefix: string;
	highlight: string;
	className?: string;
}>;

export default function SectionHeading({ eyebrow, prefix, highlight, className = "" }: SectionHeadingProps) {
	return (
		<div className={`flex flex-col items-center gap-3 text-center ${className}`}>
			{eyebrow && (
				<span className="text-xs tracking-[0.2em] uppercase text-teal-300/80 font-medium">{eyebrow}</span>
			)}
			<h2 className="text-3xl">
				{prefix} <span className="text-teal-300">{highlight}</span>
			</h2>
		</div>
	);
}
