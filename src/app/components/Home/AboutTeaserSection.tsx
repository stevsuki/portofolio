import LinkButton from "../LinkButton";
import SectionHeading from "../SectionHeading";
import { aboutTeaserContent } from "@/constants/home";

export default function AboutTeaserSection() {
	return (
		<section className="relative flex flex-col items-center text-center gap-6 p-10 md:p-16">
			<div className="glow glow-blue w-[320px] h-[320px] top-0 -left-20" />
			<div className="relative z-10 flex flex-col items-center text-center gap-6">
				<SectionHeading
					eyebrow={aboutTeaserContent.eyebrow}
					prefix={aboutTeaserContent.headingPrefix}
					highlight={aboutTeaserContent.headingHighlight}
				/>
				<p className="text-lg text-justify max-w-2xl">{aboutTeaserContent.description}</p>
				<LinkButton href="/about">{aboutTeaserContent.ctaLabel}</LinkButton>
			</div>
		</section>
	);
}
