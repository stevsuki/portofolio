import LinkButton from "../LinkButton";
import { contactCtaContent } from "@/constants/home";

export default function ContactCtaSection() {
	return (
		<section className="flex flex-col items-center text-center gap-6 p-10 md:p-16">
			<h2 className="text-3xl">
				{contactCtaContent.headingPrefix}{" "}
				<span className="text-teal-300">{contactCtaContent.headingHighlight}</span>
			</h2>
			<p className="text-lg max-w-xl">{contactCtaContent.description}</p>
			<LinkButton href="/contact">{contactCtaContent.ctaLabel}</LinkButton>
		</section>
	);
}
