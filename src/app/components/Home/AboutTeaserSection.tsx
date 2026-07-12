import LinkButton from "../LinkButton";
import { aboutTeaserContent } from "@/constants/home";

export default function AboutTeaserSection() {
	return (
		<section className="flex flex-col items-center text-center gap-6 p-10 md:p-16">
			<h2 className="text-3xl">
				{aboutTeaserContent.headingPrefix}{" "}
				<span className="text-teal-300">{aboutTeaserContent.headingHighlight}</span>
			</h2>
			<p className="text-lg text-justify max-w-2xl">{aboutTeaserContent.description}</p>
			<LinkButton href="/about">{aboutTeaserContent.ctaLabel}</LinkButton>
		</section>
	);
}
