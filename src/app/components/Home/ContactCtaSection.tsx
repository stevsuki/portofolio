import { FiMail } from "react-icons/fi";
import LinkButton from "../LinkButton";
import Section from "../Section";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import SocialIcon from "../SocialIcon";
import { contactCtaContent } from "@/constants/home";
import { siteConfig } from "@/constants/site";

export default function ContactCtaSection() {
	return (
		<Section>
			<Reveal variant="scale" className="w-full">
				{/* The closing panel carries its own ambient layers so the page ends on
				    a deliberate surface instead of trailing off into background */}
				<div className="card card-sheen relative flex flex-col items-center gap-7 px-6 py-16 sm:px-12 md:py-20 text-center overflow-hidden">
					<div className="bg-grid opacity-70" aria-hidden="true" />
					<div
						className="glow glow-teal glow-drift w-[420px] h-[420px] top-0 left-1/2 -translate-x-1/2"
						aria-hidden="true"
					/>
					<div className="glow glow-violet w-[300px] h-[300px] bottom-0 right-0" aria-hidden="true" />

					<div className="relative z-10 flex flex-col items-center gap-7">
						<SectionHeading
							eyebrow={contactCtaContent.eyebrow}
							prefix={contactCtaContent.headingPrefix}
							highlight={contactCtaContent.headingHighlight}
						/>
						<p className="max-w-xl text-base sm:text-lg leading-relaxed text-muted">
							{contactCtaContent.description}
						</p>

						<div className="flex flex-wrap items-center justify-center gap-3">
							<LinkButton href="/contact" variant="primary" withArrow>
								{contactCtaContent.ctaLabel}
							</LinkButton>
							<LinkButton
								href={`mailto:${siteConfig.email}`}
								icon={<FiMail size={16} aria-hidden="true" />}
							>
								{siteConfig.email}
							</LinkButton>
						</div>

						<SocialIcon />
					</div>
				</div>
			</Reveal>
		</Section>
	);
}
