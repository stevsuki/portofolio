import ExperienceTimeline from "../ExperienceTimeline";
import SectionHeading from "../SectionHeading";
import { experienceContent } from "@/constants/home";

export default function ExperienceSection() {
	return (
		<section className="relative flex flex-col items-center gap-10 p-10 md:p-16">
			<div className="glow glow-teal w-[300px] h-[300px] top-10 right-0" />
			<div className="relative z-10 flex flex-col items-center gap-10 w-full">
				<SectionHeading
					eyebrow={experienceContent.eyebrow}
					prefix={experienceContent.headingPrefix}
					highlight={experienceContent.headingHighlight}
				/>
				<ExperienceTimeline />
			</div>
		</section>
	);
}
