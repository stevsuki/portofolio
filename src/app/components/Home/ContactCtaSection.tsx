import LinkButton from "../LinkButton";
import SectionHeading from "../SectionHeading";
import { contactCtaContent } from "@/constants/home";

export default function ContactCtaSection() {
	return (
		<section className="relative flex flex-col items-center text-center gap-6 p-10 md:p-16">
			<div className="absolute inset-0 bg-grid" aria-hidden="true" />
			<div className="glow glow-teal w-[300px] h-[300px] top-0 left-1/2 -translate-x-1/2" />
			<div className="glow glow-blue w-[260px] h-[260px] bottom-0 right-10" />
			<div className="relative z-10 flex flex-col items-center gap-6">
				<SectionHeading
					eyebrow={contactCtaContent.eyebrow}
					prefix={contactCtaContent.headingPrefix}
					highlight={contactCtaContent.headingHighlight}
				/>
				<p className="text-lg max-w-xl">{contactCtaContent.description}</p>
				<LinkButton href="/contact">{contactCtaContent.ctaLabel}</LinkButton>
			</div>
		</section>
	);
}
