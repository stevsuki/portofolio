type SectionHeadingProps = Readonly<{
	eyebrow?: string;
	prefix: string;
	highlight: string;
	description?: string;
	align?: "center" | "start";
	className?: string;
}>;

export default function SectionHeading({
	eyebrow,
	prefix,
	highlight,
	description,
	align = "center",
	className = "",
}: SectionHeadingProps) {
	const isCentered = align === "center";

	return (
		<div
			className={`flex flex-col gap-4 ${isCentered ? "items-center text-center" : "items-start text-start"} ${className}`}
		>
			{eyebrow && (
				<span className="eyebrow inline-flex items-center gap-2.5">
					<span className="w-6 h-px bg-current opacity-50" aria-hidden="true" />
					{eyebrow}
					{isCentered && <span className="w-6 h-px bg-current opacity-50" aria-hidden="true" />}
				</span>
			)}
			<h2 className="text-3xl sm:text-4xl">
				{prefix} <span className="gradient-text">{highlight}</span>
			</h2>
			{description && <p className={`text-muted max-w-xl ${isCentered ? "" : "text-start"}`}>{description}</p>}
		</div>
	);
}
