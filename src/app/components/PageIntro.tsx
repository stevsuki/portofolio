type PageIntroProps = Readonly<{
	eyebrow: string;
	headingPrefix: string;
	headingHighlight: string;
	description?: string;
}>;

/** Shared page header for the sub-pages, so /about, /project and /contact open identically. */
export default function PageIntro({ eyebrow, headingPrefix, headingHighlight, description }: PageIntroProps) {
	return (
		<div className="flex flex-col items-center gap-4 text-center">
			<span className="eyebrow animate-hero inline-flex items-center gap-2.5" style={{ "--delay": "0ms" } as React.CSSProperties}>
				<span className="w-6 h-px bg-current opacity-50" aria-hidden="true" />
				{eyebrow}
				<span className="w-6 h-px bg-current opacity-50" aria-hidden="true" />
			</span>
			<h1 className="animate-hero text-4xl sm:text-5xl" style={{ "--delay": "80ms" } as React.CSSProperties}>
				{headingPrefix} <span className="gradient-text">{headingHighlight}</span>
			</h1>
			{description && (
				<p
					className="animate-hero max-w-2xl text-base sm:text-lg leading-relaxed text-muted"
					style={{ "--delay": "160ms" } as React.CSSProperties}
				>
					{description}
				</p>
			)}
		</div>
	);
}
