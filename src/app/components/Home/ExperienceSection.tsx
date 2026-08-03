import ExperienceTimeline from "../ExperienceTimeline";
import Section from "../Section";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import { experienceContent } from "@/constants/home";

export default function ExperienceSection() {
	return (
		<Section
			decoration={<div className="glow glow-teal glow-drift w-[400px] h-[400px] top-10 -right-24" aria-hidden="true" />}
		>
			<Reveal>
				<SectionHeading
					eyebrow={experienceContent.eyebrow}
					prefix={experienceContent.headingPrefix}
					highlight={experienceContent.headingHighlight}
				/>
			</Reveal>
			<ExperienceTimeline />
		</Section>
	);
}
