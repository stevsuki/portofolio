import ExperienceTimeline from "../ExperienceTimeline";
import SectionHeading from "../SectionHeading";
import { experienceContent } from "@/constants/home";

export default function ExperienceSection() {
	return (
		<section className="flex flex-col items-center gap-10 p-10 md:p-16">
			<SectionHeading
				eyebrow={experienceContent.eyebrow}
				prefix={experienceContent.headingPrefix}
				highlight={experienceContent.headingHighlight}
			/>
			<ExperienceTimeline />
		</section>
	);
}
