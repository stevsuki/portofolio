import LinkButton from "../LinkButton";
import SectionHeading from "../SectionHeading";
import { aboutTeaserContent } from "@/constants/home";

export default function AboutTeaserSection() {
	return (
		<section className="flex flex-col items-center text-center gap-6 p-10 md:p-16">
			<SectionHeading
				eyebrow={aboutTeaserContent.eyebrow}
				prefix={aboutTeaserContent.headingPrefix}
				highlight={aboutTeaserContent.headingHighlight}
			/>
			<p className="text-lg text-justify max-w-2xl">{aboutTeaserContent.description}</p>
			<LinkButton href="/about">{aboutTeaserContent.ctaLabel}</LinkButton>
		</section>
	);
}
