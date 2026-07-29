import LinkButton from "../LinkButton";
import SectionHeading from "../SectionHeading";
import { aboutTeaserContent } from "@/constants/home";

export default function AboutTeaserSection() {
	return (
		<section className="relative flex flex-col items-center text-center gap-6 p-10 md:p-16">
			<div className="glow glow-blue w-[300px] h-[300px] top-0 left-0" />
			<div className="relative z-10 flex flex-col items-center text-center gap-6">
				<SectionHeading
					eyebrow={aboutTeaserContent.eyebrow}
					prefix={aboutTeaserContent.headingPrefix}
					highlight={aboutTeaserContent.headingHighlight}
				/>
				<p className="text-lg text-justify max-w-2xl">{aboutTeaserContent.description}</p>
				<div className="flex flex-wrap items-center justify-center gap-4">
					<LinkButton href="/about">{aboutTeaserContent.ctaLabel}</LinkButton>
					<LinkButton
						href="/Steven_Suki_CV.pdf"
						download
						className="!border-teal-600 !text-teal-600 dark:!border-teal-300 dark:!text-teal-300"
					>
						{aboutTeaserContent.downloadCvLabel}
					</LinkButton>
				</div>
			</div>
		</section>
	);
}
